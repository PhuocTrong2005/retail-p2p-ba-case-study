import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createPRSession } from '../logic/pr-session.mjs';
import { validatePR, parseNumber, parseDate } from '../logic/validation.mjs';
import { loadSeed, clone, seedUrl, T0, validInput } from './fixtures.mjs';

const session = () => createPRSession(loadSeed());
const manager = s => { assert.equal(s.setUser('MGR-01').ok, true); return s; };
const newValid = s => { const id = s.beginNew().pr.pr_id; assert.equal(s.edit(id, validInput).ok, true); return id; };

test('SIM-04 standard sequence, without intervening saves', t => {
  const s = session(), actual = [];
  const capture = () => {
    const context = s.context(); manager(s); const m = s.metrics();
    actual.push({ time: context.time, count: m.met01.count,
      ages: Object.fromEntries(m.met02.values.filter(v => v.hours !== null).map(v => [v.pr_id, v.hours])),
      fraction: [m.met03.numerator, m.met03.denominator], context: m.met03.context });
    s.setUser(context.user_id);
  };
  capture();
  s.edit('PR-B', { business_reason: 'Khu khuyến mại có 20 vị trí, mỗi vị trí cần hai kẹp.' });
  s.setBudget('UNAVAILABLE');
  assert.equal(s.context().time, T0);
  assert.equal(s.submit('PR-B').code, 'BUDGET_UNAVAILABLE'); capture();
  s.setBudget('PASS');
  const resubmission = s.submit('PR-B');
  assert.equal(resubmission.event.review_round, 2);
  assert.equal(resubmission.event.event_type, 'VALID_RESUBMIT'); capture();
  manager(s); assert.equal(s.decide('PR-A', 'RETURN_FOR_EDIT', { reason: 'Làm rõ hai quầy cần thay thiết bị.' }).ok, true); capture();
  assert.equal(s.reset({ confirmed: true }).ok, true); capture();
  const expected = [
    [12, 2, { 'PR-A':195, 'PR-C':96 }, [1,4], 1,1],
    [13, 2, { 'PR-A':196, 'PR-C':97 }, [1,4], 1,1],
    [14, 3, { 'PR-A':197, 'PR-B':0, 'PR-C':98 }, [1,4], 2,0],
    [15, 2, { 'PR-B':1, 'PR-C':99 }, [2,4], 1,1],
    [12, 2, { 'PR-A':195, 'PR-C':96 }, [1,4], 1,1]
  ].map(([hour, count, ages, fraction, waiting, awaiting_edit]) => ({
    time: `2026-10-10T${hour}:00:00+07:00`, count, ages, fraction,
    context: { waiting, awaiting_edit, unknown_count: 0 }
  }));
  assert.deepEqual(actual, expected);
  t.diagnostic(JSON.stringify(actual));
});

test('new form is unsaved; save incomplete draft and reopen copies', () => {
  const s = session(), id = s.beginNew().pr.pr_id;
  assert.equal(s.context().time, T0); assert.equal(s.list().length, 5);
  s.edit(id, { business_reason: 'Nội dung đang nhập' });
  assert.equal(s.detail(id).ok, false);
  assert.equal(s.save(id).status, 'Nháp');
  assert.equal(s.context().time, '2026-10-10T13:00:00+07:00');
  assert.equal(s.openForm(id).pr.business_reason, 'Nội dung đang nhập');
  const detached = s.openForm(id); detached.pr.business_reason = 'tampered';
  assert.equal(s.openForm(id).pr.business_reason, 'Nội dung đang nhập');
  assert.deepEqual(s.history(id).events, []);
  manager(s); const metrics = s.metrics();
  assert.equal(metrics.met01.unknown_count, 0); assert.equal(metrics.met03.denominator, 4);
});

test('edit is unsaved; save returned content retains returned label and closed round', () => {
  const s = session(), before = s.detail('PR-B').pr.business_reason;
  s.edit('PR-B', { business_reason: 'Làm rõ 20 vị trí, hai kẹp mỗi vị trí.' });
  assert.equal(s.detail('PR-B').pr.business_reason, before);
  assert.equal(s.save('PR-B').status, 'Chờ chỉnh sửa');
  assert.equal(s.detail('PR-B').round, 1); assert.equal(s.history('PR-B').events.length, 2);
  s.save('PR-B'); assert.equal(s.context().time, '2026-10-10T14:00:00+07:00');
});

test('validation runs first, retains input and advances once without budget check or event', () => {
  const s = session(), id = s.beginNew().pr.pr_id; s.setBudget('UNAVAILABLE');
  s.edit(id, { needed_by: '29/02/2026', item: { quantity: '1e3' } });
  const r = s.submit(id);
  assert.equal(r.code, 'VALIDATION_FAILED'); assert.equal(r.budget_checked, false);
  assert.equal(r.errors.needed_by.field, 'needed_by'); assert.ok(r.errors['item.quantity']);
  assert.equal(s.context().time, '2026-10-10T13:00:00+07:00');
  assert.equal(s.detail(id).pr.item.quantity, '1e3'); assert.equal(s.detail(id).status, 'Nháp');
  assert.equal(s.detail(id).feedback.budget_checked, false); assert.equal(s.history(id).events.length, 0);
});

for (const [outcome, code] of [['INSUFFICIENT','INSUFFICIENT_BUDGET'], ['UNAVAILABLE','BUDGET_UNAVAILABLE']]) {
  test(`budget ${outcome} persists across attempts; no review round`, () => {
    const s = session(); s.setBudget(outcome);
    for (let i = 0; i < 2; i++) {
      const r = s.submit('PR-B'); assert.equal(r.code, code); assert.equal(r.budget_checked, true);
      assert.equal(s.detail('PR-B').status, 'Chờ chỉnh sửa');
    }
    assert.equal(s.history('PR-B').events.length, 2);
    assert.equal(s.context().time, '2026-10-10T14:00:00+07:00');
    s.setBudget('PASS'); assert.equal(s.submit('PR-B').event.review_round, 2);
  });
}

test('first valid submission uses normalized numbers/date and blocks repeat', () => {
  const s = session(), id = newValid(s), r = s.submit(id);
  assert.equal(r.event.event_type, 'FIRST_VALID_SUBMIT'); assert.equal(r.event.review_round, 1);
  assert.equal(r.event.event_order, 1); assert.equal(r.event.occurred_at, '2026-10-10T13:00:00+07:00');
  assert.equal(s.detail(id).pr.needed_by, '2026-10-15'); assert.equal(s.detail(id).pr.item.quantity, 1.5);
  const before = s.context(); assert.equal(s.submit(id).ok, false); assert.deepEqual(s.context(), before);
  assert.equal(s.history(id).events.length, 1);
  manager(s); assert.equal(s.metrics().met01.count, 3); assert.equal(s.metrics().met03.denominator, 4);
});

test('return requires nonblank Unicode reason; denied actions are atomic', () => {
  const s = manager(session()); const before = [s.context(), s.detail('PR-A'), s.history('PR-A')];
  for (const reason of [undefined, '', ' \t\n\u00a0']) assert.equal(s.decide('PR-A','RETURN_FOR_EDIT',{reason}).code, 'RETURN_REASON_REQUIRED');
  assert.deepEqual([s.context(), s.detail('PR-A'), s.history('PR-A')], before);
  assert.equal(s.decide('PR-A','RETURN_FOR_EDIT',{reason:'  Làm rõ nhu cầu.  '}).ok, true);
  assert.equal(s.history('PR-A').events.at(-1).return_reason, 'Làm rõ nhu cầu.');
  assert.equal(s.detail('PR-A').status, 'Chờ chỉnh sửa');
  assert.equal(s.edit('PR-A',{business_reason:'manager edit'}).ok, false);
  s.setUser('REQ-01'); assert.match(s.detail('PR-A').next_step, /kiểm tra lại/);
  assert.equal(s.detail('PR-A').return_reason, 'Làm rõ nhu cầu.');
  assert.equal(s.submit('PR-A').event.review_round, 2);
});

test('approve closes round, makes available to purchasing and blocks second decision', () => {
  const s = manager(session()); const r = s.decide('PR-A','APPROVE');
  assert.equal(r.ready_for_purchasing, true); assert.equal(r.status, 'Đã duyệt');
  const before = s.context(); assert.equal(s.decide('PR-A','APPROVE').ok, false);
  assert.equal(s.decide('PR-A','RETURN_FOR_EDIT',{reason:'again'}).ok, false);
  assert.deepEqual(s.context(), before);
  s.setUser('REQ-01'); assert.equal(s.save('PR-A').ok, false); assert.equal(s.submit('PR-A').ok, false);
});

test('reject requires explicit true confirmation; closes permanently without reason', () => {
  const s = manager(session()); const before = s.context();
  for (const confirmed of [undefined,false,'yes',1]) assert.equal(s.decide('PR-A','REJECT',{confirmed}).code, 'CONFIRMATION_REQUIRED');
  assert.deepEqual(s.context(), before);
  const r = s.decide('PR-A','REJECT',{confirmed:true}); assert.equal(r.status, 'Đã từ chối');
  assert.equal('return_reason' in r.event, false);
  assert.equal(s.decide('PR-A','APPROVE').ok, false); s.setUser('REQ-01');
  for (const id of ['PR-A','PR-E','PR-D']) {
    assert.equal(s.edit(id,{business_reason:'edit'}).ok, false);
    assert.equal(s.save(id).ok, false); assert.equal(s.submit(id).ok, false);
  }
});

test('role changes, budget selection and reads never advance clock or alter evidence', () => {
  const s = session(), initial = s.history('PR-C');
  assert.equal(s.metrics().code, 'FORBIDDEN'); assert.equal(s.queue().code, 'FORBIDDEN');
  assert.equal(s.decide('PR-A','APPROVE').ok, false);
  s.list(); s.detail('PR-B'); s.history('PR-A'); s.setBudget('INSUFFICIENT');
  manager(s); s.queue(); assert.equal(s.metrics().met01.count,2); assert.equal(s.metrics().met03.numerator,1);
  assert.equal(s.submit('PR-B').ok, false); assert.equal(s.beginNew().ok, false);
  assert.deepEqual(s.history('PR-C'), initial); assert.equal(s.context().time, T0);
  assert.equal(s.setUser('missing').ok, false); assert.equal(s.setBudget('other').ok, false);
});

test('SIM-03 scopes detail/history/form/actions by owner and unit; metrics use entire unit', () => {
  const seed = loadSeed();
  const otherOwner = clone(seed.purchase_requisitions[0]); otherOwner.pr_id = 'OTHER-OWNER'; otherOwner.requester_id = 'REQ-OTHER';
  const otherUnit = clone(seed.purchase_requisitions[0]); otherUnit.pr_id = 'OTHER-UNIT'; otherUnit.unit_id = 'UNIT-OTHER';
  seed.purchase_requisitions.push(otherOwner, otherUnit);
  const s = createPRSession(seed);
  assert.equal(s.list().length, 5);
  for (const id of ['OTHER-OWNER','OTHER-UNIT']) {
    assert.equal(s.detail(id).ok, false); assert.equal(s.history(id).ok, false);
    assert.equal(s.openForm(id).ok, false); assert.equal(s.edit(id,{}).ok, false); assert.equal(s.submit(id).ok, false);
  }
  manager(s); assert.equal(s.list().length, 6); assert.equal(s.detail('OTHER-OWNER').ok, true);
  assert.equal(s.detail('OTHER-UNIT').ok, false); assert.equal(s.history('OTHER-UNIT').ok, false);
  assert.equal(s.decide('OTHER-UNIT','APPROVE').ok, false);
  assert.equal(s.metrics().met01.unknown_count, 1); assert.equal(s.metrics().met03.denominator, 4);
  assert.equal(s.queue().rows.length, 2);
  s.detail('PR-A'); assert.equal(s.metrics().met03.denominator, 4);
});

test('missing-log record is unknown and cannot become an editable draft', () => {
  const seed = loadSeed(); seed.events = seed.events.filter(e => e.pr_id !== 'PR-A');
  const s = createPRSession(seed); assert.equal(s.detail('PR-A').status, 'Không xác định');
  assert.equal(s.openForm('PR-A').ok, false); assert.equal(s.save('PR-A').ok, false); assert.equal(s.submit('PR-A').ok, false);
  manager(s); assert.equal(s.decide('PR-A','APPROVE').ok, false); assert.equal(s.context().time, T0);
});

test('immutable owner/unit/metadata patch is blocked before data or clock changes', () => {
  const s = session(), before = s.detail('PR-B');
  for (const patch of [{requester_id:'REQ-OTHER'}, {unit_id:'UNIT-OTHER'}, {pr_id:'x'}, {demo_clarification:{}}, {item:[]}, {item:{unknown:1}}]) assert.equal(s.edit('PR-B',patch).ok, false);
  assert.deepEqual(s.detail('PR-B'), before); assert.equal(s.context().time, T0);
});

test('C clarification remains attached to C-3; process history never invents document snapshots', () => {
  const s = session(), c = s.detail('PR-C');
  assert.equal(c.pr.demo_clarification.resubmit_event_id, 'C-3');
  assert.match(c.pr.business_reason, /sáu khu/);
  assert.doesNotMatch(c.pr.demo_clarification.business_reason_before_clarification, /sáu khu/);
  assert.equal(s.history('PR-C').document_snapshots_available, false);
  assert.equal(s.history('PR-C').events[0].business_reason, undefined);
  assert.equal(s.history('PR-C').events.length, 3);
});

test('reset confirmation, isolation, history and deterministic IDs', () => {
  const s = session(), baseline = s.list(), id = newValid(s), event = s.submit(id).event;
  manager(s); s.setBudget('INSUFFICIENT'); s.decide('PR-A','APPROVE');
  const before = s.context(); assert.equal(s.reset().ok, false); assert.deepEqual(s.context(), before);
  s.reset({confirmed:true}); assert.deepEqual(s.list(), baseline);
  assert.deepEqual(s.context(), {time:T0,user_id:'REQ-01',budget_outcome:'PASS',unit_id:'UNIT-01',data_label:loadSeed().metadata.data_label});
  assert.equal(s.detail(id).ok, false); assert.equal(s.openForm(id).ok, false);
  const secondId = newValid(s); assert.equal(secondId, id); assert.deepEqual(s.submit(secondId).event, event);
});

test('source seed object, historical events/checks and file bytes remain unchanged', () => {
  const hash = () => createHash('sha256').update(readFileSync(seedUrl)).digest('hex');
  const beforeHash = hash(), seed = loadSeed(), before = clone(seed), s = createPRSession(seed);
  const id = newValid(s); s.submit(id); s.setBudget('UNAVAILABLE'); s.submit('PR-B');
  manager(s); s.decide('PR-A','APPROVE'); s.reset({confirmed:true});
  assert.deepEqual(seed, before); assert.equal(hash(), beforeHash);
  for (const id of ['PR-A','PR-B','PR-C','PR-D','PR-E']) {
    const source = before.events.filter(e => e.pr_id === id);
    assert.deepEqual(s.history(id).events.map(e => e.event_id), source.map(e => e.event_id));
  }
});

test('validation accepts fractions, zero price, past dates and leap years; no extra policies', () => {
  const seed = loadSeed(), p = clone(seed.purchase_requisitions[0]);
  p.needed_by = '29/02/2024'; p.item.quantity = '+1.25'; p.item.estimated_unit_price = '0';
  const r = validatePR(p, seed.reference_data); assert.equal(r.valid, true); assert.equal(r.normalized.item.quantity, 1.25);
  assert.equal(parseDate('29/02/2026'), null); assert.equal(parseDate('31/04/2026'), null);
  assert.equal(parseDate('29/02/2000'), '2000-02-29'); assert.equal(parseDate('29/02/1900'), null);
  for (const value of ['', ' ', '1e3', '1,5', '1.000.000', '100 VND', '.5', '1.', 'NaN', 'Infinity', Infinity, NaN, null, true]) assert.equal(parseNumber(value), null);
  for (const [value, expected] of [[' +1.5 ',1.5],['-0',-0],['100000',100000]]) assert.equal(parseNumber(value), expected);
});

test('field validation rejects inactive/mismatched references and Unicode-only content', () => {
  const seed = loadSeed(), p = clone(seed.purchase_requisitions[0]);
  seed.reference_data.units[0].active = false; seed.reference_data.cost_centers[0].unit_id = 'OTHER';
  p.business_reason = '\u00a0\t'; p.item.description = '\n '; p.item.quantity = '0'; p.item.estimated_unit_price = '-0.01';
  const e = validatePR(p,seed.reference_data).errors;
  for (const field of ['unit_id','cost_center_id','business_reason','item.description','item.quantity','item.estimated_unit_price']) assert.ok(e[field]);
});

test('ambiguous duplicate identity is blocked in the handler, including across units', () => {
  const seed = loadSeed(); seed.purchase_requisitions.push({...clone(seed.purchase_requisitions[0]),unit_id:'OTHER'});
  const s = manager(createPRSession(seed));
  assert.equal(s.detail('PR-A').status,'Không xác định');
  assert.equal(s.decide('PR-A','APPROVE').ok,false); assert.equal(s.context().time,T0);
});
