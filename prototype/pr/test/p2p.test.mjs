import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createP2PSession } from '../logic/p2p-session.mjs';
import { PO_STATUS } from '../logic/po-session.mjs';
import { loadSeed, validInput, T0, clone, seedUrl } from './fixtures.mjs';

const catalog = () => JSON.parse(readFileSync(new URL('../data/po-catalog.json', import.meta.url), 'utf8'));
const session = (seed = loadSeed()) => createP2PSession(seed, catalog());
const cmd = s => s.command(s.generation());
const as = (s, id) => { assert.equal(s.setUser(id, cmd(s)).ok, true); return s; };
const inputs = { supplier_id: 'SUP-DEMO-01', unit_price: '0', delivery_terms: '', commercial_terms: '' };
const create = s => { as(s,'BUY-01'); const r=s.po.create('PR-D',cmd(s)); assert.equal(r.ok,true); return r.po.po_id; };
const submit = (s,id,patch=inputs) => { const r=s.po.submit(id,patch,cmd(s)); assert.equal(r.ok,true);return r; };

test('P2 live PR submit/approve becomes the same PO source immediately, then issue', () => {
  const s=session(); const id=s.beginNew(cmd(s)).pr.pr_id;
  s.edit(id,validInput,cmd(s));assert.equal(s.submit(id,cmd(s)).ok,true);
  as(s,'MGR-01');const approval=s.decide(id,'APPROVE',{},cmd(s));assert.equal(approval.ok,true);
  as(s,'BUY-01');assert.ok(s.po.sources().rows.some(r=>r.pr_id===id));
  const p=s.po.create(id,cmd(s));assert.equal(p.ok,true);const poid=p.po.po_id;
  assert.equal(p.po.source_approval_event_id,approval.event.event_id);
  assert.equal(p.po.source_snapshot.item.quantity,1.5);
  assert.equal(p.po.source_snapshot.item.estimated_unit_price,0);
  assert.equal(s.context().time,'2026-10-10T15:00:00+07:00');
  submit(s,poid,{...inputs,unit_price:'25000.5'});as(s,'PM-01');s.po.decide(poid,'APPROVE',{},cmd(s));
  as(s,'BUY-01');assert.equal(s.po.detail(poid).po.status,PO_STATUS.ELIGIBLE);
  assert.equal(s.po.detail(poid).po.issued_at,null);
  assert.equal(s.po.issue(poid,cmd(s)).po.status,PO_STATUS.ISSUED);
  assert.equal(s.context().time,'2026-10-10T18:00:00+07:00');
  assert.equal(s.history(id).events.at(-1).event_id,approval.event.event_id);
  assert.equal(s.detail(id).pr.item.estimated_unit_price,0);
});

test('P2 create checks all ineligible PR states, ambiguous IDs, evidence and source validation', () => {
  const s=session();const draft=s.beginNew(cmd(s)).pr.pr_id;s.save(draft,cmd(s));
  as(s,'BUY-01');const time=s.context().time;
  for(const id of ['PR-A','PR-B','PR-C','PR-E',draft,'MISSING']) assert.equal(s.po.create(id,cmd(s)).ok,false);
  assert.equal(s.context().time,time);assert.equal(s.po.list().length,0);
  const defects=[
    d=>{d.events=d.events.filter(e=>e.pr_id!=='PR-D');},
    d=>{delete d.events.find(e=>e.event_id==='D-2').actor_id;},
    d=>{d.purchase_requisitions.push(clone(d.purchase_requisitions.find(p=>p.pr_id==='PR-D')));},
    d=>{d.purchase_requisitions.find(p=>p.pr_id==='PR-D').item.quantity=0;},
    d=>{d.purchase_requisitions.find(p=>p.pr_id==='PR-D').unit_id='OTHER';},
    d=>{d.historical_checks=d.historical_checks.filter(c=>c.event_id!=='D-1');}
  ];
  for(const defect of defects){const data=loadSeed();defect(data);const t=as(session(data),'BUY-01');assert.equal(t.po.create('PR-D',cmd(t)).ok,false);assert.equal(t.context().time,T0);}
});

test('P2 one PO per PR, detached snapshots, immutable source fields and read-only role boundaries', () => {
  const s=session();const id=create(s);const time=s.context().time;
  const again=s.po.create('PR-D',cmd(s));assert.equal(again.existing,true);assert.equal(again.po.po_id,id);
  assert.equal(s.context().time,time);assert.equal(s.po.list().length,1);
  const detached=s.po.detail(id);detached.po.source_snapshot.item.quantity=999;detached.po.history.length=0;
  assert.equal(s.po.detail(id).po.source_snapshot.item.quantity,40);assert.equal(s.po.detail(id).po.history.length,1);
  for(const patch of [{source_pr_id:'PR-A'},{source_snapshot:{}},{status:PO_STATUS.ELIGIBLE},{finance_required:false},{unit_price:{value:1}}])assert.equal(s.po.save(id,patch,cmd(s)).ok,false);
  assert.equal(s.edit('PR-D',validInput,cmd(s)).ok,false);assert.equal(s.context().time,time);
  as(s,'REQ-01');assert.equal(s.po.detail(id).ok,false);assert.equal(s.po.sources().ok,false);assert.equal(s.po.create('PR-D',cmd(s)).ok,false);
  as(s,'PM-01');assert.equal(s.po.detail(id).ok,true);assert.equal(s.po.save(id,inputs,cmd(s)).ok,false);
  assert.equal(s.po.create('PR-D',cmd(s)).ok,false);assert.equal(s.metrics().ok,false);
  assert.equal(s.setUser('CFO',cmd(s)).ok,false);
});

test('P2 PO validation blocks invalid suppliers and prices; zero and fractional price allowed', () => {
  const s=session();const id=create(s);let attempts=0;
  for(const supplier_id of ['', 'SUP-DEMO-02','SUP-DEMO-03','MISSING']){
    const r=s.po.submit(id,{...inputs,supplier_id},cmd(s));assert.equal(r.code,'PO_VALIDATION_FAILED');assert.ok(r.errors.supplier_id);attempts++;
  }
  for(const unit_price of ['', ' ', '-1', '1e3', '1,5', '1.000.000', 'NaN','Infinity',Infinity,NaN]){
    const r=s.po.submit(id,{...inputs,unit_price},cmd(s));assert.equal(r.code,'PO_VALIDATION_FAILED');assert.ok(r.errors.unit_price);attempts++;
  }
  const before=s.po.detail(id).po;
  assert.equal(before.round,0);assert.equal(before.status,PO_STATUS.DRAFT);assert.equal(before.history.length,1);
  assert.equal(before.attempts.length,attempts);
  assert.equal(s.context().time,new Date(Date.parse('2026-10-10T13:00:00+07:00')+attempts*3600000+7*3600000).toISOString().replace('Z','+07:00').replace('.000',''));
  assert.equal(submit(s,id).po.unit_price,0);
  const t=session();const other=create(t);assert.equal(submit(t,other,{...inputs,unit_price:'+1.25'}).po.unit_price,1.25);
});

test('P2 incomplete draft save retains content without routing; pending PO cannot be edited', () => {
  const s=session();const id=create(s);
  assert.equal(s.po.save(id,{delivery_terms:'Giao tại cửa hàng'},cmd(s)).ok,true);
  assert.equal(s.po.detail(id).po.status,PO_STATUS.DRAFT);assert.equal(s.context().time,'2026-10-10T14:00:00+07:00');
  assert.equal(s.po.detail(id).po.delivery_terms,'Giao tại cửa hàng');submit(s,id);
  const time=s.context().time;assert.equal(s.po.save(id,{unit_price:'9'},cmd(s)).ok,false);
  assert.equal(s.po.submit(id,inputs,cmd(s)).ok,false);assert.equal(s.context().time,time);
});

for(const finance of [false,true]) test(`P2 route ${finance}: Procurement mandatory, issue guards and current-round approvals`, () => {
  const s=session();const id=create(s);s.setFinance(finance,cmd(s));submit(s,id);
  const before=s.context().time;assert.equal(s.po.issue(id,cmd(s)).ok,false);assert.equal(s.context().time,before);
  as(s,'FIN-01');assert.equal(s.po.decide(id,'APPROVE',{},cmd(s)).ok,false);
  s.setFinance(!finance,cmd(s));assert.equal(s.po.detail(id).po.finance_required,finance);
  as(s,'PM-01');assert.equal(s.po.decide(id,'APPROVE',{},cmd(s)).ok,true);
  as(s,'BUY-01');const afterPM=s.context().time;
  if(finance){assert.equal(s.po.issue(id,cmd(s)).ok,false);assert.equal(s.context().time,afterPM);as(s,'FIN-01');assert.equal(s.po.decide(id,'APPROVE',{},cmd(s)).ok,true);}
  else{as(s,'FIN-01');assert.equal(s.po.decide(id,'APPROVE',{},cmd(s)).ok,false);}
  as(s,'BUY-01');const eventCount=s.po.detail(id).po.history.length;
  const token=cmd(s);assert.equal(s.po.issue(id,token).ok,true);const time=s.context().time;
  assert.equal(s.po.issue(id,token).code,'DUPLICATE_COMMAND');assert.equal(s.po.issue(id,cmd(s)).ok,false);
  assert.equal(s.context().time,time);const po=s.po.detail(id).po;assert.equal(po.history.length,eventCount+1);
  assert.equal(po.history.filter(e=>e.event_type==='ISSUE_SIMULATED').length,1);
  assert.equal(s.po.save(id,{unit_price:'1'},cmd(s)).ok,false);
});

for(const returningRole of ['PM-01','FIN-01']) test(`P2 ${returningRole} return with reason, edit/resubmit starts again at Procurement`, () => {
  const s=session();const id=create(s);s.setFinance(true,cmd(s));submit(s,id);
  as(s,'PM-01');if(returningRole==='FIN-01'){s.po.decide(id,'APPROVE',{},cmd(s));as(s,'FIN-01');}
  const time=s.context().time, history=s.po.detail(id).po.history.length;
  assert.equal(s.po.decide(id,'RETURN_FOR_EDIT',{reason:' \u00a0\t'},cmd(s)).code,'RETURN_REASON_REQUIRED');
  assert.equal(s.context().time,time);assert.equal(s.po.detail(id).po.history.length,history);
  assert.equal(s.po.decide(id,'REJECT',{},cmd(s)).ok,false);
  s.po.decide(id,'RETURN_FOR_EDIT',{reason:'  Làm rõ giá mua.  '},cmd(s));
  as(s,'BUY-01');assert.equal(s.po.detail(id).po.return_reason,'Làm rõ giá mua.');
  s.po.save(id,{unit_price:'15.25'},cmd(s));s.setFinance(false,cmd(s));submit(s,id,{...inputs,unit_price:'15.25'});
  const p=s.po.detail(id).po;assert.equal(p.round,2);assert.equal(p.finance_required,false);
  assert.deepEqual(p.approvals,{procurement:null,finance:null});assert.equal(p.status,PO_STATUS.PROCUREMENT);
  const t=s.context().time;assert.equal(s.po.issue(id,cmd(s)).ok,false);assert.equal(s.context().time,t);
  as(s,'FIN-01');assert.equal(s.po.decide(id,'APPROVE',{},cmd(s)).ok,false);
  as(s,'PM-01');s.po.decide(id,'APPROVE',{},cmd(s));as(s,'BUY-01');assert.equal(s.po.issue(id,cmd(s)).ok,true);
  assert.ok(s.po.detail(id).po.history.some(e=>e.event_type==='RETURN_FOR_EDIT'&&e.review_round===1));
});

test('P2 shared clock extends only known PR coverage, keeps metric formulas/cohort and seed bytes', () => {
  const data=loadSeed(), original=clone(data);const hash=()=>createHash('sha256').update(readFileSync(seedUrl)).digest('hex');const before=hash();
  const s=session(data);create(s);as(s,'MGR-01');const m=s.metrics();
  assert.equal(m.T,'2026-10-10T13:00:00+07:00');assert.equal(m.met01.count,2);assert.equal(m.met01.unknown_count,0);
  assert.deepEqual(m.met02.values.filter(v=>v.hours!==null).map(v=>v.hours),[196,97]);
  assert.equal(m.met03.label,'25,00%');assert.equal(m.met03.denominator,4);assert.equal(m.met03.unknown_count,0);
  const bad=loadSeed();bad.purchase_requisitions[0].history_coverage={complete_through:'2026-10-09T12:00:00+07:00'};
  const t=session(bad);create(t);as(t,'MGR-01');assert.equal(t.metrics().met01.unknown_count,1);
  assert.deepEqual(data,original);assert.equal(hash(),before);
});

test('P2 command replay and stale forms cannot mutate after actor change or reset with reused IDs', () => {
  const s=session();const oldPR=s.beginNew(cmd(s)).pr.pr_id;const oldPRCommand=cmd(s);
  const id=create(s);const oldPOCommand=cmd(s);const actorCommand=cmd(s);
  as(s,'PM-01');assert.equal(s.po.save(id,inputs,actorCommand).code,'INVALID_COMMAND_CONTEXT');
  const before=s.context();assert.equal(s.reset({confirmed:false},cmd(s)).ok,false);assert.deepEqual(s.context(),before);
  assert.equal(s.reset({confirmed:true},cmd(s)).ok,true);assert.equal(s.context().time,T0);assert.equal(s.context().user_id,'REQ-01');
  assert.equal(s.context().budget_outcome,'PASS');assert.equal(s.financeRequired(),false);
  assert.equal(s.beginNew(cmd(s)).pr.pr_id,oldPR);
  assert.equal(s.edit(oldPR,validInput,oldPRCommand).code,'STALE_SESSION');
  assert.equal(s.save(oldPR,oldPRCommand).code,'STALE_SESSION');
  assert.equal(create(s),id);assert.equal(s.po.save(id,inputs,oldPOCommand).code,'STALE_SESSION');
  const token=cmd(s);s.po.save(id,inputs,token);const time=s.context().time;const history=s.po.detail(id).po.history.length;
  assert.equal(s.po.save(id,inputs,token).code,'DUPLICATE_COMMAND');assert.equal(s.context().time,time);assert.equal(s.po.detail(id).po.history.length,history);
  assert.equal(s.po.submit(id,inputs).code,'STALE_SESSION');
});

test('P2 runtime PR-only standard sequence is unchanged after whole-session reset', () => {
  const s=session();create(s);s.reset({confirmed:true},cmd(s));
  s.setBudget('UNAVAILABLE',cmd(s));assert.equal(s.submit('PR-B',cmd(s)).code,'BUDGET_UNAVAILABLE');
  assert.equal(s.context().time,'2026-10-10T13:00:00+07:00');s.setBudget('PASS',cmd(s));s.submit('PR-B',cmd(s));
  as(s,'MGR-01');s.decide('PR-A','RETURN_FOR_EDIT',{reason:'Làm rõ nhu cầu.'},cmd(s));
  const m=s.metrics();assert.equal(m.T,'2026-10-10T15:00:00+07:00');assert.equal(m.met01.count,2);
  assert.equal(m.met03.label,'50,00%');assert.deepEqual(m.met02.values.filter(v=>v.hours!==null).map(v=>v.hours),[1,99]);
});

test('P2 runtime reopens the existing PR form with role checks and detached unsaved values', () => {
  const s=session();assert.equal(s.openForm('PR-B').ok,true);
  const form=s.openForm('PR-B');form.pr.business_reason='Unstored edit';
  assert.notEqual(s.openForm('PR-B').pr.business_reason,'Unstored edit');
  const id=s.beginNew(cmd(s)).pr.pr_id;s.edit(id,validInput,cmd(s));s.save(id,cmd(s));
  assert.equal(s.openForm(id).pr.business_reason,validInput.business_reason);
  assert.equal(s.openForm('PR-D').ok,false);as(s,'BUY-01');
  assert.equal(s.openForm('PR-B').ok,false);assert.equal(s.openForm(id).ok,false);
});
