import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createP2PSession } from '../logic/p2p-session.mjs';
import { loadSeed, validInput, T0, clone, seedUrl } from './fixtures.mjs';

const catalog = () => JSON.parse(readFileSync(new URL('../data/po-catalog.json',import.meta.url),'utf8'));
const make = () => createP2PSession(loadSeed(),catalog());
const token = s => s.command(s.generation());
const as = (s,id) => { assert.equal(s.setUser(id,token(s)).ok,true);return s; };
const invoiceInput = { number:'INV-DEMO-SUP-001',invoice_on:'09/10/2026',supplier_id:'SUP-DEMO-03',
  description:'Mặt hàng do AP nhập độc lập',quantity:'2.5',unit_price:'0',amount:'123.45',note:'' };
const grInput = quantity => ({received_on:'08/10/2026',quantity});
function purchase(s,{live=false,approved=true,finance=false}={}) {
  let prId='PR-D';
  if(live) {
    as(s,'REQ-01');prId=s.beginNew(token(s)).pr.pr_id;s.edit(prId,validInput,token(s));
    assert.equal(s.submit(prId,token(s)).ok,true);as(s,'MGR-01');s.decide(prId,'APPROVE',{},token(s));
  }
  as(s,'BUY-01');const poId=s.po.create(prId,token(s)).po.po_id;
  if(approved) {
    s.setFinance(finance,token(s));s.po.submit(poId,{supplier_id:'SUP-DEMO-01',unit_price:'12.5'},token(s));
    as(s,'PM-01');s.po.decide(poId,'APPROVE',{},token(s));
    if(finance) {as(s,'FIN-01');s.po.decide(poId,'APPROVE',{},token(s));}
  }
  return poId;
}
const recordGR = (s,id,quantity=40) => {as(s,'WH-01');return s.documents.recordGR(id,grInput(quantity),token(s));};
const recordInvoice = (s,id,input=invoiceInput) => {as(s,'AP-01');return s.documents.recordInvoice(id,input,token(s));};

for(const order of ['gr-first','invoice-first']) test(`P3 ${order}: live PR/PO references, no issue gate, independent invoice data and no assessment`,()=>{
  const s=make(),id=purchase(s,{live:true});
  assert.equal(s.po.detail(id).po.issued_at,null);
  let g,i;
  if(order==='gr-first') {g=recordGR(s,id,1.5);i=recordInvoice(s,id);}
  else {
    i=recordInvoice(s,id);assert.equal(i.readiness.label,'Chờ phiếu nhận hàng');
    const before=clone(i.invoice);g=recordGR(s,id,1.5);as(s,'AP-01');assert.deepEqual(s.documents.invoice(id).invoice,before);
  }
  assert.equal(g.ok,true);assert.equal(i.ok,true);as(s,'AP-01');
  const result=s.documents.invoice(id);
  assert.equal(result.readiness.label,'Đủ dữ liệu tối thiểu — chưa đối chiếu');
  assert.equal(result.readiness.input_revision,2);assert.deepEqual(result.readiness.missing,[]);
  assert.equal(result.invoice.supplier_id,'SUP-DEMO-03');assert.equal(result.invoice.amount,123.45);
  assert.equal(result.invoice.quantity,2.5);assert.equal(result.invoice.unit_price,0);
  assert.equal(g.gr.source_pr_id,'PR-NEW-1');assert.equal(result.invoice.source_pr_id,'PR-NEW-1');
  assert.equal(s.documents.gr(id).gr.po_id,id);assert.equal(result.invoice.po_id,id);
  assert.equal(g.gr.received_on,'2026-10-08');assert.notEqual(g.gr.recorded_at.slice(0,10),g.gr.received_on);
  assert.equal('result_id' in result,false);assert.equal('assessment' in result,false);
});

test('P3 invoice accepts existing draft PO with missing fields; reads current PO completeness',()=>{
  const s=make(),id=purchase(s,{approved:false});const r=recordInvoice(s,id);
  assert.equal(r.ok,true);assert.equal(r.readiness.label,'Chờ phiếu nhận hàng');
  assert.deepEqual(r.readiness.missing,['Nhà cung cấp PO','Giá mua PO','Phiếu nhận hàng']);
  as(s,'BUY-01');s.po.save(id,{supplier_id:'SUP-DEMO-01',unit_price:'0'},token(s));
  as(s,'AP-01');assert.deepEqual(s.documents.readiness(id).missing,['Phiếu nhận hàng']);
  assert.equal(s.documents.summary(id).input_revision,1);
});

test('P3 GR needs all current-round approvals, including Finance; not issued is allowed',()=>{
  const s=make(),id=purchase(s,{approved:false});
  const check=()=>{as(s,'WH-01');const before=s.context().time;assert.equal(s.documents.recordGR(id,grInput(40),token(s)).ok,false);assert.equal(s.context().time,before);assert.equal(s.po.detail(id).ok,false);};
  check();as(s,'BUY-01');s.setFinance(true,token(s));s.po.submit(id,{supplier_id:'SUP-DEMO-01',unit_price:'0'},token(s));check();
  as(s,'PM-01');s.po.decide(id,'APPROVE',{},token(s));check();
  as(s,'FIN-01');s.po.decide(id,'RETURN_FOR_EDIT',{reason:'Làm rõ'},token(s));check();
  as(s,'BUY-01');s.po.submit(id,{},token(s));check();
  as(s,'PM-01');s.po.decide(id,'APPROVE',{},token(s));check();
  as(s,'FIN-01');s.po.decide(id,'APPROVE',{},token(s));
  assert.equal(recordGR(s,id).ok,true);
});

test('P3 numeric/date/required GR errors tick once, keep no receipt/revision, then accept fractional quantity',()=>{
  const s=make(),id=purchase(s,{live:true});as(s,'WH-01');
  const invalid=['',' ',0,-1,'1e2','1,5','NaN','Infinity',NaN,Infinity,'1.2.3'];
  for(const quantity of invalid){const before=Date.parse(s.context().time);const r=s.documents.recordGR(id,grInput(quantity),token(s));assert.ok(r.errors.quantity);assert.equal(Date.parse(s.context().time),before+3600000);assert.equal(s.documents.summary(id).gr_id,null);}
  for(const received_on of ['','31/02/2026','2026-13-01','2026-02-29','not a date']) assert.ok(s.documents.recordGR(id,{received_on,quantity:1.5},token(s)).errors.received_on);
  const mismatch={received_on:'10/10/2026',quantity:'1.25'},original=clone(mismatch);
  assert.match(s.documents.recordGR(id,mismatch,token(s)).errors.quantity,/Ngoài phạm vi demo/);assert.deepEqual(mismatch,original);
  assert.equal(s.documents.recordGR(id,{received_on:'29/02/2024',quantity:'+1.50'},token(s)).gr.quantity,1.5);
  as(s,'AP-01');assert.equal(s.documents.summary(id).input_revision,1);
});

test('P3 invoice required strings, suppliers, dates and numbers validated without overwriting previous data',()=>{
  const s=make(),id=purchase(s);as(s,'AP-01');
  for(const key of ['number','invoice_on','supplier_id','description','quantity','unit_price','amount']) {
    const before=Date.parse(s.context().time);const r=s.documents.recordInvoice(id,{...invoiceInput,[key]:' '},token(s));
    assert.ok(r.errors[key],key);assert.equal(Date.parse(s.context().time),before+3600000);assert.equal(s.documents.summary(id).input_revision,0);
  }
  for(const key of ['quantity','unit_price','amount']) for(const value of [-1,'1e3','1,25','1.000.000','NaN',NaN,Infinity,'Infinity']) {
    assert.ok(s.documents.recordInvoice(id,{...invoiceInput,[key]:value},token(s)).errors[key]);
  }
  assert.ok(s.documents.recordInvoice(id,{...invoiceInput,quantity:0},token(s)).errors.quantity);
  for(const invoice_on of ['2026-02-29','31/04/2026']) assert.ok(s.documents.recordInvoice(id,{...invoiceInput,invoice_on},token(s)).errors.invoice_on);
  assert.ok(s.documents.recordInvoice(id,{...invoiceInput,supplier_id:'FAKE'},token(s)).errors.supplier_id);
  const good=s.documents.recordInvoice(id,{...invoiceInput,unit_price:0,amount:0},token(s));assert.equal(good.ok,true);
  const before=clone(good.invoice);assert.ok(s.documents.saveInvoice(id,before.invoice_id,{amount:-1},token(s)).errors.amount);
  assert.deepEqual(s.documents.invoice(id).invoice,before);assert.equal(s.documents.summary(id).input_revision,1);
});

test('P3 invoice edit keeps ID/source, before/after and increments revision on change then reversion',()=>{
  const s=make(),id=purchase(s),i=recordInvoice(s,id).invoice;
  const edit=patch=>s.documents.saveInvoice(id,i.invoice_id,patch,token(s));
  assert.equal(edit({amount:'50'}).invoice.invoice_revision,2);
  let r=edit({amount:'123.45'});assert.equal(r.invoice.invoice_revision,3);assert.equal(r.readiness.input_revision,3);
  const beforeTime=Date.parse(s.context().time);r=edit({amount:'+123.450',invoice_on:'2026-10-09'});
  assert.equal(r.invoice.invoice_revision,3);assert.equal(r.readiness.input_revision,3);assert.equal(Date.parse(s.context().time),beforeTime+3600000);
  r=edit({note:'Chỉ ghi chú'});assert.equal(r.invoice.invoice_revision,3);assert.equal(r.readiness.input_revision,3);
  assert.equal(r.invoice.invoice_id,i.invoice_id);assert.equal(r.invoice.po_id,id);
  assert.equal(r.invoice.history.length,5);assert.equal(r.invoice.history[1].before.amount,123.45);assert.equal(r.invoice.history[1].after.amount,50);
  assert.equal(r.invoice.history[2].before.amount,50);assert.equal(r.invoice.history[2].after.amount,123.45);
  recordGR(s,id);as(s,'AP-01');assert.equal(s.documents.invoice(id).invoice.invoice_revision,3);assert.equal(s.documents.summary(id).input_revision,4);
  assert.deepEqual(s.documents.revisionHistory(id).changes.map(c=>[c.before,c.after]),[[0,1],[1,2],[2,3],[3,4]]);
});

test('P3 each invoice business field changes revision, pure note/time/reads/roles do not',()=>{
  const s=make(),id=purchase(s),i=recordInvoice(s,id).invoice;
  const patches=[{number:'Other'},{invoice_on:'11/10/2026'},{supplier_id:'SUP-DEMO-02'},{description:'Other item'},{quantity:3},{unit_price:1},{amount:99}];
  patches.forEach((patch,n)=>assert.equal(s.documents.saveInvoice(id,i.invoice_id,patch,token(s)).invoice.invoice_revision,n+2));
  const before=s.documents.summary(id);as(s,'BUY-01');s.po.create('PR-D',token(s));as(s,'AP-01');
  s.documents.invoice(id);s.documents.gr(id);assert.deepEqual(s.documents.summary(id),before);
  const record=s.documents.invoice(id).invoice;record.history.length=0;record.amount=9999;
  assert.equal(s.documents.invoice(id).invoice.amount,99);assert.equal(s.documents.invoice(id).invoice.history.length,8);
});

test('P3 transactions isolated and cross-document/immutable references rejected without tick',()=>{
  const s=make(),a=purchase(s),b=purchase(s,{live:true});
  const ia=recordInvoice(s,a).invoice,ib=recordInvoice(s,b).invoice;recordGR(s,a);as(s,'AP-01');
  const before=s.context().time;
  assert.equal(s.documents.invoice(a,ib.invoice_id).ok,false);assert.equal(s.documents.gr(b,s.documents.gr(a).gr.gr_id).ok,false);
  assert.equal(s.documents.saveInvoice(b,ia.invoice_id,{amount:9},token(s)).ok,false);
  for(const patch of [{po_id:b},{source_pr_id:'PR-A'},{invoice_id:ib.invoice_id},{invoice_revision:500},{history:[]},{gr_id:'GR-DEMO-2'}]) {
    assert.equal(s.documents.saveInvoice(a,ia.invoice_id,patch,token(s)).ok,false);
  }
  assert.equal(s.documents.recordInvoice('MISSING',invoiceInput,token(s)).ok,false);assert.equal(s.documents.summary('MISSING').ok,false);
  assert.equal(s.context().time,before);
  s.documents.saveInvoice(b,ib.invoice_id,{amount:0},token(s));
  assert.equal(s.documents.summary(a).input_revision,2);assert.equal(s.documents.summary(b).input_revision,2);
  assert.equal(s.documents.invoice(a).invoice.amount,123.45);
});

test('P3 role boundaries deny writes and hidden documents; warehouse only approved PO/GR',()=>{
  const s=make(),id=purchase(s),i=recordInvoice(s,id).invoice;recordGR(s,id);
  const before=s.context().time;
  for(const role of ['REQ-01','MGR-01','BUY-01','PM-01','FIN-01','WH-01']) {
    as(s,role);assert.equal(s.documents.recordInvoice(id,invoiceInput,token(s)).ok,false);
    assert.equal(s.documents.saveInvoice(id,i.invoice_id,{amount:3},token(s)).ok,false);
    if(role!=='WH-01') assert.equal(s.documents.recordGR(id,grInput(40),token(s)).ok,false);
  }
  as(s,'AP-01');assert.equal(s.documents.recordGR(id,grInput(40),token(s)).ok,false);
  as(s,'WH-01');assert.equal(s.documents.invoice(id).ok,false);assert.equal(s.documents.revisionHistory(id).ok,false);
  assert.equal(s.documents.summary(id).invoice_id,null);assert.equal(s.detail('PR-D').ok,false);assert.equal(s.documents.gr(id).ok,true);
  assert.equal(s.metrics().ok,false);assert.equal(s.context().time,before);
  const c=catalog();c.additional_users.push({id:'FOREIGN',role_id:'AP',unit_id:'OTHER'});
  const t=createP2PSession(loadSeed(),c);assert.equal(t.setUser('FOREIGN',token(t)).ok,false);
});

test('P3 duplicate create/commands add no document, revision or hour; GR exposes no edit/delete',()=>{
  const s=make(),id=purchase(s);as(s,'WH-01');const command=token(s),g=s.documents.recordGR(id,grInput(40),command);
  const time=s.context().time;assert.equal(s.documents.recordGR(id,grInput(40),command).code,'DUPLICATE_COMMAND');
  const again=s.documents.recordGR(id,grInput(2),token(s));assert.equal(again.existing,true);assert.deepEqual(again.gr,g.gr);assert.equal(s.context().time,time);
  const i=recordInvoice(s,id);const before=s.context().time;
  assert.equal(s.documents.recordInvoice(id,{...invoiceInput,amount:9},token(s)).existing,true);assert.equal(s.context().time,before);
  const save=token(s);s.documents.saveInvoice(id,i.invoice.invoice_id,{note:'Once'},save);const saved=s.documents.invoice(id);
  assert.equal(s.documents.saveInvoice(id,i.invoice.invoice_id,{note:'Again'},save).code,'DUPLICATE_COMMAND');assert.deepEqual(s.documents.invoice(id),saved);
  assert.equal(s.documents.saveGR,undefined);assert.equal(s.documents.deleteGR,undefined);
});

test('P3 reset invalidates old form commands despite reused IDs and resets both domains',()=>{
  const s=make(),id=purchase(s);const i=recordInvoice(s,id).invoice,old=token(s);recordGR(s,id);
  as(s,'AP-01');const oldInvoiceCommand=token(s),before=s.documents.summary(id);
  assert.equal(s.reset({confirmed:false},token(s)).ok,false);assert.deepEqual(s.documents.summary(id),before);
  s.reset({confirmed:true},token(s));assert.equal(s.context().time,T0);assert.equal(s.context().user_id,'REQ-01');
  const same=purchase(s);assert.equal(same,id);as(s,'AP-01');assert.equal(s.documents.summary(id).input_revision,0);
  assert.equal(s.documents.saveInvoice(id,i.invoice_id,{amount:0},old).code,'STALE_SESSION');
  assert.equal(s.documents.recordInvoice(id,invoiceInput,oldInvoiceCommand).code,'STALE_SESSION');
  const newInvoice=s.documents.recordInvoice(id,invoiceInput,token(s));assert.equal(newInvoice.invoice.invoice_id,i.invoice_id);
  assert.equal(s.documents.gr(id).ok,false);assert.equal(s.documents.summary(id).input_revision,1);
});

test('P3 stale actor token and extra source fields cannot be replayed on forms',()=>{
  const s=make(),id=purchase(s);as(s,'WH-01');const old=token(s);as(s,'AP-01');const time=s.context().time;
  assert.equal(s.documents.recordGR(id,grInput(40),old).code,'INVALID_COMMAND_CONTEXT');
  assert.equal(s.documents.recordInvoice(id,{...invoiceInput,po_id:id},token(s)).code,'INVALID_PATCH');
  as(s,'WH-01');assert.equal(s.documents.recordGR(id,{...grInput(40),gr_id:'FAKE'},token(s)).code,'INVALID_PATCH');
  assert.equal(s.context().time,time);
});

test('P3 shared clock recalculates PR metrics, preserves original inputs and PR-only sequence after reset',()=>{
  const seed=loadSeed(),original=clone(seed),bytes=readFileSync(seedUrl),c=catalog(),copy=clone(c);
  const s=createP2PSession(seed,c),id=purchase(s);recordInvoice(s,id);recordGR(s,id);as(s,'MGR-01');
  assert.equal(s.context().time,'2026-10-10T17:00:00+07:00');
  assert.deepEqual(s.metrics().met02.values.filter(v=>v.hours!==null).map(v=>v.hours),[200,101]);
  assert.equal(s.metrics().met01.count,2);assert.equal(s.metrics().met03.label,'25,00%');
  s.reset({confirmed:true},token(s));s.setBudget('UNAVAILABLE',token(s));s.submit('PR-B',token(s));
  s.setBudget('PASS',token(s));s.submit('PR-B',token(s));as(s,'MGR-01');s.decide('PR-A','RETURN_FOR_EDIT',{reason:'Làm rõ'},token(s));
  assert.equal(s.context().time,'2026-10-10T15:00:00+07:00');assert.equal(s.metrics().met03.label,'50,00%');
  assert.deepEqual(seed,original);assert.deepEqual(c,copy);assert.deepEqual(readFileSync(seedUrl),bytes);
});
