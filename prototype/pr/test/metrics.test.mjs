import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateMetrics, inspectHistory } from '../logic/metrics.mjs';
import { formatWait, formatRatioHalfUp, timestamp } from '../logic/time.mjs';
import { loadSeed, singlePR, addEvent, clone, T0 } from './fixtures.mjs';

test('seed baseline is derived from workflow evidence; no source mutation', () => {
  const data = loadSeed(), before = clone(data), m = calculateMetrics(data,T0);
  assert.deepEqual(m.met01.pr_ids,['PR-A','PR-C']);
  assert.deepEqual(m.met02.values.map(v=>[v.pr_id,v.hours]), [['PR-A',195],['PR-B',null],['PR-C',96],['PR-D',null],['PR-E',null]]);
  assert.deepEqual(m.met03.cohort_ids,['PR-A','PR-B','PR-D','PR-E']);
  assert.deepEqual([m.met03.numerator,m.met03.denominator,m.met03.percent,m.met03.label],[1,4,25,'25,00%']);
  assert.deepEqual(m.met03.context,{waiting:1,awaiting_edit:1,unknown_count:0});
  assert.deepEqual([m.met01.unknown_count,m.met02.unknown_count,m.met03.unknown_count,m.quality.unlinked_records],[0,0,0,0]);
  assert.deepEqual(data,before);
});

test('S included, E excluded; empty cohort is no data, not zero percent', () => {
  for (const [at, denominator] of [['2026-10-01T00:00:00+07:00',1],['2026-10-08T00:00:00+07:00',0]]) {
    const d = singlePR(); d.events[0].occurred_at = at;
    const m = calculateMetrics(d,T0); assert.equal(m.met03.denominator,denominator);
    assert.equal(m.met03.label,denominator ? '0,00%' : 'Không có dữ liệu');
    assert.equal(m.met03.percent,denominator ? 0 : null);
  }
});

test('decision exactly at T included; after T excluded even if array places it first', () => {
  const d = singlePR(); addEvent(d,'APPROVE',T0,1);
  assert.equal(calculateMetrics(d,T0).met01.count,0);
  d.events[1].occurred_at = '2026-10-10T12:00:00.001+07:00'; d.events.reverse();
  assert.equal(calculateMetrics(d,T0).met01.count,1);
});

test('same timestamp uses event_order, independent of array order or type priority', () => {
  const d = singlePR(); addEvent(d,'RETURN_FOR_EDIT',T0,1,{return_reason:'Làm rõ nhu cầu'});
  addEvent(d,'VALID_RESUBMIT',T0,2); d.events.reverse();
  let m = calculateMetrics(d,T0); assert.equal(m.met01.count,1); assert.equal(m.met02.values[0].hours,0);
  d.events.find(e=>e.event_type==='RETURN_FOR_EDIT').event_order = 4;
  m = calculateMetrics(d,T0); assert.equal(m.met01.unknown_count,1); assert.equal(m.met01.count,0);
});

test('missing tie order or contradictory source order marks invalid', () => {
  for (const order of [undefined,1,0,-1,1.5]) {
    const d = singlePR(); addEvent(d,'RETURN_FOR_EDIT',d.events[0].occurred_at,1,{return_reason:'Làm rõ',event_order:order});
    const m = calculateMetrics(d,T0); assert.equal(m.met01.unknown_count,1); assert.equal(m.met03.denominator,0);
  }
});

test('return after E counts, resubmission in cohort period does not change first-cohort membership', () => {
  const m = calculateMetrics(loadSeed(),T0);
  assert.equal(m.met03.numerator,1); assert.ok(m.met03.counted_ids.includes('PR-B'));
  assert.equal(m.met03.cohort_ids.includes('PR-C'),false);
});

test('multiple returns of one PR count once', () => {
  const d = singlePR();
  addEvent(d,'RETURN_FOR_EDIT','2026-10-03T08:00:00+07:00',1,{return_reason:'Căn cứ số lượng'});
  addEvent(d,'VALID_RESUBMIT','2026-10-04T08:00:00+07:00',2);
  addEvent(d,'RETURN_FOR_EDIT','2026-10-05T08:00:00+07:00',2,{return_reason:'Làm rõ nhu cầu'});
  const m = calculateMetrics(d,T0); assert.equal(m.met03.numerator,1); assert.equal(m.met03.denominator,1);
  assert.equal(m.met03.context.awaiting_edit,1); assert.equal(m.met01.count,0);
});

test('missing log is unknown, explicit new draft is excluded with known provenance', () => {
  const d = singlePR(); d.events = []; d.historical_checks = [];
  const unknown = calculateMetrics(d,T0); assert.equal(unknown.met01.unknown_count,1);
  assert.equal(unknown.met02.values[0].hours,null); assert.match(unknown.met02.values[0].label,/Không xác định/);
  assert.equal(unknown.met03.unknown_cohort.length,1); assert.equal(unknown.met03.label,'Không có dữ liệu');
  const draft = calculateMetrics(d,T0,{explicitDrafts:['PR-A']});
  assert.equal(draft.met01.unknown_count,0); assert.equal(draft.met02.values[0].label,'Không áp dụng');
  assert.equal(draft.met03.unknown_count,0);
});

test('first known but incomplete decision log is a separate PR-MET-03 unknown group', () => {
  const d = singlePR(); d.metadata.history_coverage.complete_through = '2026-10-05T00:00:00+07:00';
  const m = calculateMetrics(d,T0);
  assert.equal(m.met01.unknown_count,1); assert.equal(m.met03.cohort_ids.length,1);
  assert.equal(m.met03.unknown_cohort.length,0); assert.equal(m.met03.unknown_return_history.length,1);
  assert.equal(m.met03.denominator,0); assert.equal(m.met03.context.unknown_count,1);
});

test('proven return establishes numerator despite incomplete current status: independent quality', () => {
  const d = singlePR(); addEvent(d,'RETURN_FOR_EDIT','2026-10-03T08:00:00+07:00',1,{return_reason:'Làm rõ'});
  d.metadata.history_coverage.complete_through = '2026-10-04T00:00:00+07:00';
  const m = calculateMetrics(d,T0);
  assert.equal(m.met01.unknown_count,1); assert.equal(m.met02.unknown_count,1);
  assert.equal(m.met03.numerator,1); assert.equal(m.met03.denominator,1); assert.equal(m.met03.unknown_count,0);
  assert.deepEqual(m.met03.context,{waiting:0,awaiting_edit:0,unknown_count:1});
});

test('irrelevant later defect does not erase proven return or out-of-cohort exclusion', () => {
  const d = singlePR(); addEvent(d,'RETURN_FOR_EDIT','2026-10-03T08:00:00+07:00',1,{return_reason:'Làm rõ'});
  addEvent(d,'VALID_RESUBMIT','2026-10-04T08:00:00+07:00',9);
  let m = calculateMetrics(d,T0); assert.equal(m.met01.unknown_count,1); assert.equal(m.met03.numerator,1);
  d.events[0].occurred_at = '2026-09-29T08:00:00+07:00';
  m = calculateMetrics(d,T0); assert.equal(m.met03.unknown_count,0); assert.equal(m.met03.denominator,0);
});

test('duplicate identical event is used once; conflicting duplicate first invalidates cohort', () => {
  const d = singlePR(); d.events.push(clone(d.events[0]));
  assert.equal(calculateMetrics(d,T0).met01.count,1);
  d.events[1].review_round = 2;
  const m = calculateMetrics(d,T0); assert.equal(m.met01.unknown_count,1); assert.equal(m.met03.unknown_cohort.length,1);
});

test('conflicting decision affects current status and return history but retains valid first cohort', () => {
  const d = singlePR(); const event = addEvent(d,'APPROVE','2026-10-03T08:00:00+07:00',1);
  d.events.push({...event,event_type:'RETURN_FOR_EDIT',return_reason:'Làm rõ'});
  const m = calculateMetrics(d,T0); assert.equal(m.met01.unknown_count,1);
  assert.equal(m.met03.unknown_cohort.length,0); assert.equal(m.met03.unknown_return_history.length,1);
});

test('missing identity has separate unlinked count and not a false zero-unknown claim', () => {
  const d = singlePR(); d.events.push({...clone(d.events[0]),event_id:'UNLINKED',pr_id:null});
  const m = calculateMetrics(d,T0); assert.equal(m.quality.unlinked_records,1);
  for (const met of [m.met01,m.met02,m.met03]) assert.equal(met.unknown_count,'Không xác định đầy đủ');
  assert.equal(m.met01.count,1); assert.equal(m.quality.partial,true);
});

test('duplicate PR identity and orphan event are reported rather than silently deduplicated', () => {
  const d = singlePR(); d.purchase_requisitions.push(clone(d.purchase_requisitions[0]));
  let m = calculateMetrics(d,T0); assert.equal(m.met01.unknown_count,1); assert.equal(m.met03.unknown_cohort.length,1);
  d.events.push({...clone(d.events[0]),event_id:'ORPHAN',pr_id:'MISSING'});
  m = calculateMetrics(d,T0); assert.equal(m.quality.unlinked_records,1);
});

test('missing submit evidence, timestamp, offset or invalid calendar date is unknown', () => {
  for (const mutate of [
    d=>{delete d.events[0].required_fields_passed;},
    d=>{d.events[0].budget_check_passed=false;},
    d=>{d.events[0].check_reference='MISSING';},
    d=>{d.historical_checks[0].budget_check_passed=false;},
    d=>{delete d.events[0].occurred_at;},
    d=>{d.events[0].occurred_at='2026-10-02T09:00:00';},
    d=>{d.events[0].occurred_at='2026-02-30T09:00:00+07:00';}
  ]) {
    const d = singlePR(); mutate(d); const m = calculateMetrics(d,T0);
    assert.equal(m.met01.unknown_count,1); assert.equal(m.met02.values[0].hours,null); assert.equal(m.met03.unknown_count,1);
  }
});

test('invalid sequences cannot open parallel rounds or reopen terminal PRs', () => {
  for (const [types,rounds] of [
    [['VALID_RESUBMIT'],[2]], [['APPROVE','VALID_RESUBMIT'],[1,2]],
    [['REJECT','VALID_RESUBMIT'],[1,2]], [['APPROVE','REJECT'],[1,1]], [['RETURN_FOR_EDIT','VALID_RESUBMIT'],[2,3]]
  ]) {
    const d = singlePR(); types.forEach((type,i)=>addEvent(d,type,`2026-10-0${3+i}T08:00:00+07:00`,rounds[i],type==='RETURN_FOR_EDIT'?{return_reason:'Làm rõ'}:{}));
    assert.equal(calculateMetrics(d,T0).met01.unknown_count,1);
  }
});

test('unit scope excludes other-unit documents and their known events', () => {
  const d = loadSeed(); d.purchase_requisitions.find(p=>p.pr_id==='PR-A').unit_id = 'OTHER';
  const m = calculateMetrics(d,T0);
  assert.deepEqual(m.met01.pr_ids,['PR-C']); assert.deepEqual(m.met03.cohort_ids,['PR-B','PR-D','PR-E']);
  assert.equal(m.met03.denominator,3); assert.equal(m.quality.unlinked_records,0);
});

test('fractional wait stays raw; half-up only at display including exact tie', () => {
  const d = singlePR(); d.events[0].occurred_at = '2026-10-10T10:59:42+07:00';
  const v = calculateMetrics(d,T0).met02.values[0];
  assert.equal(v.hours,1.005); assert.equal(v.milliseconds,3618000); assert.equal(v.label,'1,01 giờ');
  d.events[0].occurred_at = '2026-10-10T10:59:42.001+07:00';
  const fraction = calculateMetrics(d,T0).met02.values[0];
  assert.equal(fraction.hours,3617999/3600000); assert.equal(fraction.label,'1,00 giờ');
  assert.equal(formatWait(0),'0,00'); assert.equal(formatRatioHalfUp(1,8),'0.13');
  assert.equal(formatRatioHalfUp(2,3),'0.67');
});

test('timestamp accepts explicit equivalent offsets but rejects impossible times', () => {
  assert.equal(timestamp(T0),timestamp('2026-10-10T05:00:00Z'));
  for (const value of ['2026-10-10T24:00:00+07:00','2026-10-10T12:60:00+07:00','2026-10-10T12:00:00+25:00','2026-02-29T12:00:00Z']) assert.ok(Number.isNaN(timestamp(value)));
});

test('invalid reporting bounds fail explicitly; caller must provide T', () => {
  const d = loadSeed(); assert.throws(()=>calculateMetrics(d,undefined),RangeError);
  assert.throws(()=>calculateMetrics(d,'2026-10-07T00:00:00+07:00'),RangeError);
  d.demo_config.cohort.end_exclusive=d.demo_config.cohort.start_inclusive;
  assert.throws(()=>calculateMetrics(d,T0),RangeError);
});

test('metadata actor/text defects do not invent mathematical dependencies', () => {
  const d = singlePR(); delete d.events[0].actor_id; d.purchase_requisitions[0].business_reason='';
  assert.equal(inspectHistory(d,d.purchase_requisitions[0],T0).status,'Chờ xem xét');
  assert.equal(calculateMetrics(d,T0).met01.count,1);
});

test('absent events collection is missing history, not a crash or implicit draft', () => {
  const d = singlePR(); delete d.events;
  const m = calculateMetrics(d,T0); assert.equal(m.met01.unknown_count,1);
  assert.equal(m.met02.values[0].label,'Không xác định do thiếu dữ liệu');
  assert.equal(m.met03.unknown_cohort.length,1);
});

test('unknown reasons distinguish missing fields from invalid timestamps or evidence', () => {
  const d = singlePR(); delete d.events[0].occurred_at;
  assert.equal(calculateMetrics(d,T0).met02.values[0].label,'Không xác định do thiếu dữ liệu');
  d.events[0].occurred_at = '2026-02-30T09:00:00+07:00';
  assert.equal(calculateMetrics(d,T0).met02.values[0].label,'Không xác định do dữ liệu không hợp lệ');
});

test('missing return reason is missing workflow evidence, never a valid inferred return', () => {
  const d = singlePR(); addEvent(d,'RETURN_FOR_EDIT','2026-10-03T08:00:00+07:00',1);
  const m = calculateMetrics(d,T0);
  assert.equal(m.met01.unknown_count,1); assert.equal(m.met03.numerator,0);
  assert.equal(m.met03.unknown_return_history.length,1); assert.equal(m.met03.context.unknown_count,1);
});
