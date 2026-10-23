import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createP2PSession } from '../logic/p2p-session.mjs';
import { createSessionContext } from '../logic/session-context.mjs';
import { createMatchingPaymentDomain, REQUEST_STATUS } from '../logic/matching-payment.mjs';
import { loadSeed, validInput, clone, seedUrl, T0 } from './fixtures.mjs';

const json=name=>JSON.parse(readFileSync(new URL(`../data/${name}`,import.meta.url),'utf8'));
const make=()=>createP2PSession(loadSeed(),json('po-catalog.json'),json('matching-scenarios.json'));
const token=s=>s.command(s.generation());
const as=(s,id)=>{assert.equal(s.setUser(id,token(s)).ok,true);};
function setup(s,{live=false,gr=true,pass=false}={}) {
  let prId='PR-D';
  if(live) {as(s,'REQ-01');prId=s.beginNew(token(s)).pr.pr_id;
    s.edit(prId,{...validInput,item:{...validInput.item,description:'Máy quét USB tổng hợp'}},token(s));s.submit(prId,token(s));
    as(s,'MGR-01');s.decide(prId,'APPROVE',{},token(s));}
  as(s,'BUY-01');const poId=s.po.create(prId,token(s)).po.po_id;
  s.po.submit(poId,{supplier_id:'SUP-DEMO-01',unit_price:'12.5'},token(s));as(s,'PM-01');s.po.decide(poId,'APPROVE',{},token(s));
  if(gr) {as(s,'WH-01');assert.equal(s.documents.recordGR(poId,{received_on:'10/10/2026',quantity:live?1.5:40},token(s)).ok,true);}
  as(s,'AP-01');const i=s.documents.recordInvoice(poId,{number:'HD-P4-001',invoice_on:'09/10/2026',supplier_id:'SUP-DEMO-01',
    description:live?'Máy quét USB tổng hợp':'Cuộn giấy in nhiệt K80, khổ 80 mm, dài 45 m',quantity:live?1.5:40,
    unit_price:pass?12.5:15,amount:live?(pass?18.75:22.5):(pass?500:600),note:''},token(s));
  assert.equal(i.ok,true);return {poId,invoiceId:i.invoice.invoice_id};
}
const select=(s,id,outcome='PASS',version='v1')=>s.matching.select(id,outcome,version,token(s));
const run=(s,id)=>s.matching.run(id,token(s));
const prepare=(s,id)=>s.payment.prepare(id,token(s));
const edit=(s,id,i,patch)=>s.documents.saveInvoice(id,i,patch,token(s));
const reviewed=(s,id,r)=>s.payment.review(id,r).view_token;
const send=(s,id,r,view,patch={content:'Đề nghị xử lý hóa đơn tổng hợp',explanation:''})=>s.payment.send(id,r,patch,view,token(s));

test('P4 full live chain FAIL → partial correction FAIL → PASS → prepare/send → return/resend → approve',()=>{
  const s=make(),{poId:id,invoiceId:i}=setup(s,{live:true});select(s,id,'FAIL');
  const first=run(s,id);assert.equal(first.result.outcome,'FAIL');assert.equal(first.result.inputs.po.source_pr_id,'PR-NEW-1');
  const ex=s.matching.summary(id).exception;assert.equal(ex.owner_id,'AP-01');assert.equal(ex.status,'OPEN');
  s.matching.note(id,'Kiểm tra đơn giá và tiền tổng hợp.',token(s));edit(s,id,i,{unit_price:12.5});
  assert.equal(run(s,id).result.outcome,'FAIL');assert.equal(s.matching.summary(id).exception.exception_id,ex.exception_id);
  edit(s,id,i,{amount:18.75});select(s,id);const pass=run(s,id);assert.equal(pass.result.outcome,'PASS');
  assert.equal(s.matching.summary(id).exception_effective,true);
  const p=prepare(s,id),r=p.request.payment_request_id,original=clone(p.request.prepared_evidence);
  assert.equal(send(s,id,r,reviewed(s,id,r)).ok,true);as(s,'FIN-01');assert.equal(s.payment.queue().rows.length,1);
  assert.equal(s.payment.decide(id,r,'RETURN',{reason:'Cần giải trình.'},token(s)).request.status,REQUEST_STATUS.RETURNED);
  as(s,'AP-01');const resultBefore=s.matching.summary(id).condition.latest.result_id;
  assert.equal(send(s,id,r,reviewed(s,id,r),{content:'Đã hoàn thiện',explanation:'Đã làm rõ.'}).ok,true);
  assert.equal(s.matching.summary(id).condition.latest.result_id,resultBefore);
  as(s,'FIN-01');const approved=s.payment.decide(id,r,'APPROVE',{},token(s));assert.equal(approved.ok,true);
  assert.equal(approved.request.status,REQUEST_STATUS.APPROVED);assert.equal(approved.request.approved_by,'FIN-01');
  assert.equal(approved.request.submissions.length,2);assert.deepEqual(approved.request.prepared_evidence,original);assert.equal(s.payment.queue().rows.length,0);
});

test('P4 missing GR really produces WAIT, no exception and independent prepare guard; GR does not grant PASS',()=>{
  const s=make(),{poId:id}=setup(s,{gr:false,pass:true});
  const waiting=run(s,id);assert.equal(waiting.result.outcome,'WAIT');assert.deepEqual(waiting.result.missing,['Phiếu nhận hàng']);
  assert.equal(s.matching.summary(id).exception,null);const before=Date.parse(s.context().time);
  assert.equal(prepare(s,id).code,'NOT_ELIGIBLE');assert.equal(Date.parse(s.context().time),before+3600000);assert.equal(s.matching.summary(id).request_id,null);
  assert.equal(send(s,id,'FAKE','FAKE').ok,false);
  as(s,'WH-01');s.documents.recordGR(id,{received_on:'10/10/2026',quantity:40},token(s));as(s,'AP-01');
  assert.equal(prepare(s,id).code,'NOT_ELIGIBLE');assert.equal(run(s,id).result.outcome,'PASS');assert.equal(prepare(s,id).ok,true);
});

test('P4 literal scenario applicability blocks unsupported data or wrong selected outcome, never forces PASS',()=>{
  const s=make(),{poId:id,invoiceId:i}=setup(s);
  const before=Date.parse(s.context().time);assert.equal(run(s,id).code,'NO_APPLICABLE_SCENARIO');
  assert.equal(Date.parse(s.context().time),before+3600000);assert.equal(s.matching.summary(id).results.length,0);
  select(s,id,'FAIL');assert.equal(run(s,id).result.fixture.example_id,'PAPER-40');
  edit(s,id,i,{amount:123});assert.equal(run(s,id).code,'NO_APPLICABLE_SCENARIO');select(s,id);assert.equal(run(s,id).code,'NO_APPLICABLE_SCENARIO');
  assert.equal(s.matching.summary(id).results.length,1);assert.equal(prepare(s,id).ok,false);
  assert.equal(select(s,id,'OVERRIDE').ok,false);assert.equal(select(s,id,'PASS','v999').ok,false);
});

test('P4 FAIL/notes/corrected data/resolved label alone cannot pass prepare or send',()=>{
  const s=make(),{poId:id,invoiceId:i}=setup(s,{pass:true});run(s,id);const r=prepare(s,id).request.payment_request_id;
  const view=reviewed(s,id,r);edit(s,id,i,{unit_price:15,amount:600});select(s,id,'FAIL');run(s,id);
  const forged=s.matching.summary(id);forged.exception.status='RESOLVED';forged.condition.eligible=true;
  assert.equal(send(s,id,r,view).code,'NOT_ELIGIBLE');s.matching.note(id,'Đã liên hệ để sửa.',token(s));
  edit(s,id,i,{unit_price:12.5,amount:500});assert.equal(send(s,id,r,view).code,'NOT_ELIGIBLE');
  assert.equal(s.matching.summary(id).exception.status,'OPEN');assert.equal(s.matching.setExceptionStatus,undefined);
  const t=make(),b=setup(t);select(t,b.poId,'FAIL');run(t,b.poId);assert.equal(prepare(t,b.poId).ok,false);
});

test('P4 current revision must match latest result; changing then reverting cannot revive old PASS',()=>{
  const s=make(),{poId:id,invoiceId:i}=setup(s,{pass:true});const first=run(s,id).result;
  const r=prepare(s,id).request.payment_request_id,view=reviewed(s,id,r),prepared=clone(s.payment.detail(id,r).request.prepared_evidence);
  edit(s,id,i,{amount:600});edit(s,id,i,{amount:500});assert.equal(s.matching.summary(id).condition.current,false);
  assert.equal(send(s,id,r,view).code,'NOT_ELIGIBLE');const newResult=run(s,id).result;
  assert.notEqual(newResult.result_id,first.result_id);assert.equal(newResult.assessment_order,2);
  assert.equal(send(s,id,r,view).code,'VIEW_STALE');
  const sent=send(s,id,r,reviewed(s,id,r));assert.equal(sent.ok,true);assert.equal(sent.request.submissions[0].result_id,newResult.result_id);
  assert.deepEqual(sent.request.prepared_evidence,prepared);assert.equal(sent.request.prepared_evidence.result_id,first.result_id);
});

test('P4 source/scenario change is per transaction, no clock, and changing back cannot revive result',()=>{
  const s=make(),{poId:id}=setup(s,{pass:true});run(s,id);const r=prepare(s,id).request.payment_request_id,view=reviewed(s,id,r);
  const time=s.context().time,revision=s.documents.summary(id).input_revision;select(s,id,'PASS','v1');assert.equal(s.matching.summary(id).condition.eligible,true);
  select(s,id,'FAIL');select(s,id);assert.equal(s.context().time,time);assert.equal(s.documents.summary(id).input_revision,revision);
  assert.equal(s.matching.summary(id).condition.current,false);assert.equal(send(s,id,r,view).code,'NOT_ELIGIBLE');
  run(s,id);const next=s.matching.summary(id).condition.latest.result_id;select(s,id,'PASS','v2');assert.equal(s.matching.summary(id).condition.current,false);
  const changed=run(s,id).result;assert.equal(changed.source_version,'v2');assert.notEqual(changed.result_id,next);
  assert.equal(send(s,id,r,view).code,'VIEW_STALE');
});

test('P4 new Result ID alone needs review, not reprepare; content survives blocked send and refresh',()=>{
  const s=make(),{poId:id}=setup(s,{pass:true});run(s,id);const p=prepare(s,id),r=p.request.payment_request_id,view=reviewed(s,id,r);
  run(s,id);const patch={content:'Nội dung chưa mất',explanation:'Làm rõ'};
  assert.equal(send(s,id,r,view,patch).code,'VIEW_STALE');assert.equal(s.payment.detail(id,r).request.content,patch.content);
  const time=s.context().time;const refreshed=s.payment.review(id,r);assert.equal(s.context().time,time);assert.equal(refreshed.request.content,patch.content);
  assert.equal(send(s,id,r,refreshed.view_token,patch).ok,true);
});

for(const phase of ['PENDING','APPROVED']) test(`P4 ${phase} locks invoice/note/source/results for X, allows Y and reads`,()=>{
  const s=make(),x=setup(s,{pass:true});run(s,x.poId);const r=prepare(s,x.poId).request.payment_request_id;
  send(s,x.poId,r,reviewed(s,x.poId,r));
  if(phase==='APPROVED'){as(s,'FIN-01');assert.equal(s.payment.decide(x.poId,r,'APPROVE',{},token(s)).ok,true);}
  const y=setup(s,{live:true,pass:true});const time=s.context().time;
  assert.equal(edit(s,x.poId,x.invoiceId,{amount:0}).code,'TRANSACTION_LOCKED');
  assert.equal(edit(s,x.poId,x.invoiceId,{note:'Even note'}).code,'TRANSACTION_LOCKED');
  assert.equal(select(s,x.poId,'FAIL').code,'TRANSACTION_LOCKED');assert.equal(run(s,x.poId).code,'TRANSACTION_LOCKED');
  assert.equal(s.context().time,time);assert.equal(s.documents.summary(x.poId).actions.edit_invoice,false);
  assert.equal(s.matching.summary(x.poId).condition.eligible,true);assert.equal(s.payment.detail(x.poId,r).ok,true);
  assert.equal(select(s,y.poId).ok,true);assert.equal(run(s,y.poId).ok,true);assert.equal(edit(s,y.poId,y.invoiceId,{note:'Y allowed'}).ok,true);
  assert.equal(s.matching.summary(x.poId).condition.eligible,true);
});

test('P4 return reason, mandatory content/resubmit explanation, save/notes/no-op do not stale matching',()=>{
  const s=make(),{poId:id}=setup(s,{pass:true});run(s,id);const r=prepare(s,id).request.payment_request_id,view=reviewed(s,id,r);
  assert.ok(send(s,id,r,view,{content:' \u00a0 ',explanation:''}).errors.content);
  const resultId=s.matching.summary(id).condition.latest.result_id;
  s.payment.save(id,r,{content:'Nội dung lưu'},token(s));s.payment.save(id,r,{},token(s));assert.equal(s.matching.summary(id).condition.latest.result_id,resultId);
  assert.equal(send(s,id,r,view).ok,true);as(s,'FIN-01');const time=s.context().time;
  assert.equal(s.payment.decide(id,r,'RETURN',{reason:' \t'},token(s)).code,'RETURN_REASON_REQUIRED');assert.equal(s.context().time,time);
  assert.equal(s.payment.decide(id,r,'RETURN',{reason:'  Làm rõ  '},token(s)).request.return_reason,'Làm rõ');
  as(s,'AP-01');const newView=reviewed(s,id,r);assert.ok(send(s,id,r,newView).errors.explanation);
  assert.equal(send(s,id,r,newView,{content:'Mới',explanation:'Đã giải trình'}).ok,true);assert.equal(s.matching.summary(id).condition.latest.result_id,resultId);
});

test('P4 after return invoice correction requires a fresh applicable PASS, then uses same request',()=>{
  const s=make(),{poId:id,invoiceId:i}=setup(s,{pass:true});run(s,id);const r=prepare(s,id).request.payment_request_id;
  send(s,id,r,reviewed(s,id,r));as(s,'FIN-01');s.payment.decide(id,r,'RETURN',{reason:'Sửa dữ liệu'},token(s));as(s,'AP-01');
  edit(s,id,i,{unit_price:15,amount:600});select(s,id,'FAIL');run(s,id);
  assert.equal(send(s,id,r,reviewed(s,id,r),{content:'Đã sửa',explanation:'Đã sửa'}).code,'NOT_ELIGIBLE');
  edit(s,id,i,{unit_price:12.5,amount:500});select(s,id);run(s,id);
  assert.equal(send(s,id,r,reviewed(s,id,r),{content:'Đã sửa',explanation:'Đã sửa'}).request.payment_request_id,r);
});

test('P4 role/link/immutable-patch checks before ticks, detached results and finance scope',()=>{
  const s=make(),{poId:id}=setup(s,{pass:true});run(s,id);const r=prepare(s,id).request.payment_request_id;
  const detached=s.matching.summary(id);detached.results[0].outcome='FAIL';assert.equal(s.matching.summary(id).condition.eligible,true);
  const time=s.context().time;
  for(const patch of [{amount:1},{supplier_id:'FAKE'},{po_id:'PO-DEMO-2'},{prepared_result_id:'FAKE'}])assert.equal(s.payment.save(id,r,patch,token(s)).code,'INVALID_PATCH');
  assert.equal(s.payment.detail(id,'OTHER').ok,false);assert.equal(s.payment.detail('OTHER',r).ok,false);
  for(const role of ['REQ-01','MGR-01','BUY-01','PM-01','WH-01','FIN-01']) {
    as(s,role);assert.equal(run(s,id).ok,false);assert.equal(prepare(s,id).ok,false);assert.equal(send(s,id,r,'FAKE').ok,false);
    assert.equal(s.payment.save(id,r,{content:'No'},token(s)).ok,false);
  }
  assert.equal(s.payment.detail(id,r).ok,false);as(s,'WH-01');assert.equal(s.matching.summary(id).ok,false);
  as(s,'AP-01');assert.equal(s.payment.queue().ok,false);assert.equal(s.payment.decide(id,r,'APPROVE',{},token(s)).ok,false);assert.equal(s.context().time,time);
});

test('P4 one request, command replay, stale view for other request, reset invalidates result/forms despite IDs reuse',()=>{
  const s=make(),a=setup(s,{pass:true});run(s,a.poId);const r=prepare(s,a.poId).request.payment_request_id,view=reviewed(s,a.poId,r);
  const before=s.context().time;assert.equal(prepare(s,a.poId).existing,true);assert.equal(s.context().time,before);
  const b=setup(s,{live:true,pass:true});run(s,b.poId);const rb=prepare(s,b.poId).request.payment_request_id;
  assert.equal(send(s,b.poId,rb,view).code,'VIEW_STALE');
  const command=token(s);assert.equal(s.payment.send(a.poId,r,{content:'Một lần'},view,command).ok,true);const time=s.context().time;
  assert.equal(s.payment.send(a.poId,r,{content:'Hai lần'},view,command).code,'DUPLICATE_COMMAND');assert.equal(send(s,a.poId,r,view).ok,false);assert.equal(s.context().time,time);
  const oldCommand=token(s);s.reset({confirmed:true},token(s));assert.equal(s.context().time,T0);
  const newer=setup(s,{pass:true});assert.equal(newer.poId,a.poId);assert.equal(s.matching.summary(newer.poId).results.length,0);assert.equal(s.matching.summary(newer.poId).request_id,null);
  assert.equal(s.matching.run(newer.poId,oldCommand).code,'STALE_SESSION');run(s,newer.poId);const same=prepare(s,newer.poId).request.payment_request_id;
  assert.equal(same,r);reviewed(s,newer.poId,same);assert.equal(send(s,newer.poId,same,view).code,'VIEW_STALE');
});

test('P4 resolved exception stays historical when source/input changes; new FAIL reopens same record',()=>{
  const s=make(),{poId:id,invoiceId:i}=setup(s);select(s,id,'FAIL');run(s,id);edit(s,id,i,{unit_price:12.5,amount:500});select(s,id);run(s,id);
  const ex=s.matching.summary(id).exception;assert.equal(s.matching.summary(id).exception_effective,true);
  edit(s,id,i,{amount:600});assert.equal(s.matching.summary(id).exception_effective,false);assert.equal(s.matching.summary(id).exception.resolved_result_id,ex.resolved_result_id);
  select(s,id,'FAIL');run(s,id);assert.equal(s.matching.summary(id).exception.status,'OPEN');assert.equal(s.matching.summary(id).exception.exception_id,ex.exception_id);
});

test('P4 logic-only abnormal data after prepare/send: missing GR blocks send and approve, return remains possible',()=>{
  const s=make(),{poId:id}=setup(s,{pass:true});
  const data={ok:true,po:s.po.detail(id).po,gr:s.documents.gr(id).gr,invoice:s.documents.invoice(id).invoice,input_revision:2,missing:[]};
  const runtime=createSessionContext(loadSeed(),json('po-catalog.json').additional_users);runtime.setUser('AP-01');
  const fixture=createMatchingPaymentDomain(runtime,{}, {assessmentInput:()=>clone(data)},json('matching-scenarios.json'));
  fixture.run(id);const r=fixture.prepare(id).request.payment_request_id;const view=fixture.review(id,r).view_token;
  const receipt=clone(data.gr);data.gr=null;data.missing=['Phiếu nhận hàng'];data.input_revision++;
  assert.equal(fixture.send(id,r,{content:'Giữ nội dung'},view).code,'NOT_ELIGIBLE');assert.equal(fixture.detail(id,r).request.content,'Giữ nội dung');
  data.gr=receipt;data.missing=[];data.input_revision++;fixture.run(id);assert.equal(fixture.send(id,r,{content:'Đã xem lại'},fixture.review(id,r).view_token).ok,true);
  data.input_revision++;runtime.setUser('FIN-01');const time=runtime.context().time;
  assert.equal(fixture.decide(id,r,'APPROVE').code,'NOT_ELIGIBLE');assert.equal(runtime.context().time,time);
  assert.equal(fixture.decide(id,r,'RETURN',{reason:'Khắc phục'}).ok,true);
  runtime.setUser('AP-01');data.invoice.po_id='OTHER';assert.equal(fixture.run(id).code,'NOT_FOUND_OR_FORBIDDEN');
});

test('P4 shared clock and configuration never mutate seed/catalog/scenarios; PR-only sequence restored',()=>{
  const seed=loadSeed(),catalog=json('po-catalog.json'),config=json('matching-scenarios.json'),original=clone({seed,catalog,config}),bytes=readFileSync(seedUrl);
  const s=createP2PSession(seed,catalog,config),{poId:id}=setup(s,{pass:true});const before=Date.parse(s.context().time);run(s,id);prepare(s,id);
  assert.equal(Date.parse(s.context().time),before+7200000);as(s,'MGR-01');assert.equal(s.metrics().met01.count,2);assert.equal(s.metrics().met03.label,'25,00%');
  s.reset({confirmed:true},token(s));s.setBudget('UNAVAILABLE',token(s));s.submit('PR-B',token(s));s.setBudget('PASS',token(s));s.submit('PR-B',token(s));
  as(s,'MGR-01');s.decide('PR-A','RETURN_FOR_EDIT',{reason:'Làm rõ'},token(s));assert.equal(s.context().time,'2026-10-10T15:00:00+07:00');assert.equal(s.metrics().met03.label,'50,00%');
  assert.deepEqual({seed,catalog,config},original);assert.deepEqual(readFileSync(seedUrl),bytes);
});

test('P4 logic-only latest WAIT never revives earlier PASS, does not create or close a discrepancy',()=>{
  const s=make(),{poId:id}=setup(s,{pass:true});
  const data={ok:true,po:s.po.detail(id).po,gr:s.documents.gr(id).gr,invoice:s.documents.invoice(id).invoice,input_revision:2,missing:[]};
  const runtime=createSessionContext(loadSeed(),json('po-catalog.json').additional_users);runtime.setUser('AP-01');
  const f=createMatchingPaymentDomain(runtime,{}, {assessmentInput:()=>clone(data)},json('matching-scenarios.json'));
  f.run(id);const r=f.prepare(id).request.payment_request_id;
  data.invoice.unit_price=15;data.invoice.amount=600;data.input_revision++;f.select(id,'FAIL','v1');f.run(id);
  const ex=f.summary(id).exception.exception_id;data.gr=null;data.missing=['Phiếu nhận hàng'];data.input_revision++;
  assert.equal(f.run(id).result.outcome,'WAIT');assert.equal(f.summary(id).exception.exception_id,ex);assert.equal(f.summary(id).exception.status,'OPEN');
  assert.equal(f.send(id,r,{content:'Không được vượt cổng'},f.review(id,r).view_token).code,'NOT_ELIGIBLE');
  assert.equal(f.summary(id).results[0].outcome,'PASS');assert.equal(f.summary(id).condition.eligible,false);
});
