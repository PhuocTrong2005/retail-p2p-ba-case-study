import { nonblank } from './validation.mjs';

export const REQUEST_STATUS = Object.freeze({ PREPARED:'Đã chuẩn bị', PENDING:'Chờ Tài chính duyệt',
  RETURNED:'Chờ AP chỉnh sửa', APPROVED:'Đã phê duyệt' });
const copy = value => structuredClone(value);
const fail = (code, reason) => ({ok:false,code,reason});
const readers = ['AP','PROCUREMENT_OFFICER','PROCUREMENT_MANAGER','FINANCE_MANAGER'];
const editable = request => [REQUEST_STATUS.PREPARED,REQUEST_STATUS.RETURNED].includes(request?.status);

// Real reference/revision gates around explicitly configured, synthetic outcomes.
export function createMatchingPaymentDomain(runtime, po, documents, config) {
  const source = copy(config ?? {source_id:'',versions:[],scenarios:[],examples:[]});
  let transactions, requests, views;
  function reset() {transactions=new Map();requests=new Map();views=new Map();}
  reset();runtime.onReset(reset);
  const actor = () => runtime.actor();
  const is = role => actor()?.unit_id===runtime.context().unit_id && actor()?.role_id===role;
  const mayRead = () => actor()?.unit_id===runtime.context().unit_id && readers.includes(actor()?.role_id);
  const locked = id => [REQUEST_STATUS.PENDING,REQUEST_STATUS.APPROVED].includes(requests.get(id)?.status);
  function transaction(id) {
    if(!transactions.has(id)) transactions.set(id,{selection:{scenario_id:'PASS',source_version:'v1',selection_revision:0},results:[],exception:null,attempts:[],source_history:[]});
    return transactions.get(id);
  }
  function inputs(id) {
    if(!mayRead()) return fail('FORBIDDEN','Không có quyền xem giao dịch.');
    const result=documents.assessmentInput(id);
    if(!result.ok) return result;
    const {po:p,gr:g,invoice:i}=result;
    if(p.po_id!==id || p.unit_id!==runtime.context().unit_id ||
      (g && (g.po_id!==id || g.unit_id!==p.unit_id || g.source_pr_id!==p.source_pr_id)) ||
      (i && (i.po_id!==id || i.unit_id!==p.unit_id || i.source_pr_id!==p.source_pr_id))) return fail('INVALID_LINK','Chứng từ không cùng giao dịch/đơn vị.');
    return result;
  }
  function condition(id) {
    const data=inputs(id);
    if(!data.ok) return data;
    const t=transaction(id),latest=t.results.at(-1),selection=t.selection;
    const current=Boolean(latest&&latest.input_revision===data.input_revision&&latest.source_id===source.source_id&&
      latest.source_version===selection.source_version&&latest.scenario_id===selection.scenario_id&&
      latest.selection_revision===selection.selection_revision&&latest.invoice_id===data.invoice?.invoice_id&&latest.gr_id===(data.gr?.gr_id ?? undefined));
    let reason='';
    if(data.missing.length) reason=`Chờ dữ liệu: ${data.missing.join(', ')}.`;
    else if(!latest) reason='Chưa có kết quả đối chiếu mô phỏng.';
    else if(!current) reason='Kết quả đã hết hiệu lực; cần đối chiếu lại.';
    else if(latest.outcome!=='PASS') reason=latest.outcome==='WAIT'?'Chờ dữ liệu; cần chạy lại khi đủ.':'Không đạt (mô phỏng); cần khắc phục và đối chiếu lại.';
    return {ok:true,eligible:!reason,current,reason,latest:copy(latest ?? null),input_revision:data.input_revision,missing:copy(data.missing)};
  }
  function proof(id) {
    const data=inputs(id),c=condition(id),s=transaction(id).selection;
    return {po_id:id,invoice_id:data.invoice?.invoice_id,gr_id:data.gr?.gr_id,source_pr_id:data.po?.source_pr_id,
      input_revision:data.input_revision,result_id:c.latest?.result_id ?? null,source_id:source.source_id,...copy(s)};
  }
  const fingerprint = id => JSON.stringify(proof(id));
  function event(request,action,extra={}) {
    request.history.push({event_id:runtime.nextId('PAYMENT-EVENT-'),action,actor_id:actor().id,
      occurred_at:runtime.context().time,...copy(extra)});
  }
  function attempt(id,action,code,reason,extra={}) {
    transaction(id).attempts.push({attempt_id:runtime.nextId('CONTROL-ATTEMPT-'),action,code,reason,
      actor_id:actor().id,occurred_at:runtime.context().time,...proof(id),...copy(extra)});
    return fail(code,reason);
  }
  function canRequest(id,requestId) {
    const r=requests.get(id);
    return r && r.payment_request_id===requestId && inputs(id).ok && (is('AP') || (is('FINANCE_MANAGER')&&r.submissions.length>0));
  }
  function detail(id,requestId) {
    if(!canRequest(id,requestId)) return fail('NOT_FOUND_OR_FORBIDDEN','Không tìm thấy đề nghị trong phạm vi được phép.');
    const r=requests.get(id),data=inputs(id);
    return {ok:true,request:copy(r),supporting:{...proof(id),supplier_id:data.invoice?.supplier_id,amount:data.invoice?.amount,
      number:data.invoice?.number},condition:condition(id),actions:{edit:is('AP')&&editable(r),decide:is('FINANCE_MANAGER')&&r.status===REQUEST_STATUS.PENDING}};
  }
  function patchValues(request,patch) {
    if(!patch||typeof patch!=='object'||Array.isArray(patch)||Object.keys(patch).some(k=>!['content','explanation'].includes(k)) ||
      Object.values(patch).some(v=>typeof v!=='string')) return null;
    return {content:request.content,explanation:request.explanation,...Object.fromEntries(Object.entries(patch).map(([k,v])=>[k,v.trim()]))};
  }
  function applicable(data,selection) {
    if(!source.versions.includes(selection.source_version)) return null;
    const p=data.po,g=data.gr,i=data.invoice;
    for(const example of source.examples) {
      const expected=example.po;
      if(p.source_snapshot.item.description!==expected.description || p.source_snapshot.item.quantity!==expected.quantity ||
        p.supplier_id!==expected.supplier_id || p.unit_price!==expected.unit_price || g.quantity!==example.gr_quantity ||
        i.description!==expected.description || i.quantity!==expected.quantity || i.supplier_id!==expected.supplier_id) continue;
      const variant=example.variants[selection.scenario_id]?.find(v=>v.unit_price===i.unit_price&&v.amount===i.amount);
      if(variant) return {example_id:example.id,...copy(variant)};
    }
    return null;
  }
  return Object.freeze({
    locked,condition,detail,
    summary(id) {
      const data=inputs(id);
      if(!data.ok || !data.invoice) return fail('NOT_FOUND_OR_FORBIDDEN','Cần hóa đơn thuộc giao dịch đang xem.');
      const t=transaction(id),r=requests.get(id),c=condition(id);
      return {ok:true,...copy(t),condition:c,locked:locked(id),source_id:source.source_id,data_label:source.data_label,
        request_id:r&&(is('AP')||is('FINANCE_MANAGER')&&r.submissions.length)?r.payment_request_id:null,
        exception_effective:Boolean(t.exception?.status==='RESOLVED'&&c.eligible&&t.exception.resolved_result_id===c.latest.result_id),
        actions:{run:is('AP')&&!locked(id),note:is('AP')&&!locked(id)&&Boolean(t.exception),prepare:is('AP')&&!r}};
    },
    scenarios: () => ({scenarios:copy(source.scenarios),versions:copy(source.versions)}),
    select(id,scenarioId,version) {
      const data=inputs(id);
      if(!data.ok||!data.invoice) return fail('NOT_FOUND_OR_FORBIDDEN','Cần hóa đơn trong phạm vi được phép.');
      if(locked(id)) return fail('TRANSACTION_LOCKED','Giao dịch đang chờ Finance hoặc đã duyệt; không đổi nguồn/kịch bản.');
      if(!source.scenarios.some(s=>s.id===scenarioId)||!source.versions.includes(version)) return fail('INVALID_SCENARIO','Nguồn/kịch bản không có trong cấu hình demo.');
      const t=transaction(id),old=copy(t.selection);
      if(old.scenario_id===scenarioId&&old.source_version===version) return {ok:true};
      t.selection={scenario_id:scenarioId,source_version:version,selection_revision:old.selection_revision+1};
      t.source_history.push({before:old,after:copy(t.selection),actor_id:actor().id,occurred_at:runtime.context().time});
      return {ok:true};
    },
    run(id) {
      const data=inputs(id);
      if(!is('AP')||!data.ok||!data.invoice) return fail('NOT_FOUND_OR_FORBIDDEN','AP chạy cho đúng hóa đơn trong phiên.');
      if(locked(id)) return fail('TRANSACTION_LOCKED','Giao dịch đang khóa; không công bố kết quả mới.');
      runtime.tick();
      const t=transaction(id),selection=t.selection,fixture=data.missing.length?null:applicable(data,selection);
      if(!data.missing.length&&!fixture) return attempt(id,'ASSESS','NO_APPLICABLE_SCENARIO','Chưa có tình huống mô phỏng phù hợp với đầu vào và lựa chọn này; không công bố PASS.');
      const result={...proof(id),result_id:runtime.nextId('RESULT-'),assessment_order:t.results.length+1,
        outcome:data.missing.length?'WAIT':selection.scenario_id,actor_id:actor().id,occurred_at:runtime.context().time,
        missing:copy(data.missing),fixture:copy(fixture),inputs:copy(data)};
      t.results.push(result);
      if(result.outcome==='FAIL') {
        if(!t.exception) t.exception={exception_id:runtime.nextId('EXCEPTION-'),invoice_id:data.invoice.invoice_id,po_id:id,
          owner_id:actor().id,opened_at:runtime.context().time,status:'OPEN',history:[]};
        t.exception.status='OPEN';t.exception.attributes=copy(fixture.attributes);t.exception.reason=fixture.reason;
      } else if(t.exception) {
        t.exception.status=result.outcome==='PASS'?'RESOLVED':'OPEN';
        if(result.outcome==='PASS') {t.exception.resolved_result_id=result.result_id;t.exception.resolved_at=runtime.context().time;}
      }
      if(t.exception) t.exception.history.push({action:result.outcome,result_id:result.result_id,actor_id:actor().id,occurred_at:runtime.context().time});
      attempt(id,'ASSESS','OK',result.outcome);
      return {ok:true,result:copy(result)};
    },
    note(id,text) {
      if(!is('AP')||!inputs(id).ok||!transaction(id).exception) return fail('NOT_FOUND_OR_FORBIDDEN','Không có ngoại lệ được phép ghi chú.');
      if(locked(id)) return fail('TRANSACTION_LOCKED','Giao dịch chỉ đọc khi chờ Finance hoặc đã duyệt.');
      if(typeof text!=='string') return fail('INVALID_PATCH','Ghi chú phải là chuỗi.');
      runtime.tick();
      if(!nonblank(text)) return attempt(id,'NOTE','NOTE_REQUIRED','Nhập ghi chú điều tra không trống.');
      transaction(id).exception.history.push({action:'NOTE',text:text.trim(),actor_id:actor().id,occurred_at:runtime.context().time});return {ok:true};
    },
    prepare(id) {
      const data=inputs(id);
      if(!is('AP')||!data.ok||!data.invoice) return fail('NOT_FOUND_OR_FORBIDDEN','AP chuẩn bị cho đúng hóa đơn.');
      if(requests.has(id)) return {...detail(id,requests.get(id).payment_request_id),existing:true};
      runtime.tick();const c=condition(id);
      if(!c.eligible) return attempt(id,'PREPARE','NOT_ELIGIBLE',c.reason);
      const r={payment_request_id:runtime.nextId('PAYMENT-'),po_id:id,invoice_id:data.invoice.invoice_id,unit_id:data.po.unit_id,
        status:REQUEST_STATUS.PREPARED,content:'',explanation:'',round:0,return_reason:null,
        prepared_evidence:{...proof(id),actor_id:actor().id,occurred_at:runtime.context().time},submissions:[],history:[]};
      requests.set(id,r);event(r,'PREPARE',{evidence:r.prepared_evidence});attempt(id,'PREPARE','OK','Đã chuẩn bị.');return detail(id,r.payment_request_id);
    },
    review(id,requestId) {
      const d=detail(id,requestId);
      if(!d.ok||!is('AP')||!editable(d.request)) return fail('NOT_EDITABLE_OR_FORBIDDEN','Đề nghị không được phép mở form gửi.');
      const view_token=`${runtime.generation()}:${runtime.nextId('VIEW-')}`;views.set(view_token,{generation:runtime.generation(),actor_id:actor().id,requestId,fingerprint:fingerprint(id)});
      return {...d,view_token};
    },
    save(id,requestId,patch) {
      if(!is('AP')||!canRequest(id,requestId)||!editable(requests.get(id))) return fail('NOT_EDITABLE_OR_FORBIDDEN','Đề nghị không được sửa ở bước này.');
      const r=requests.get(id),values=patchValues(r,patch);
      if(!values) return fail('INVALID_PATCH','Chỉ sửa nội dung và giải trình.');
      runtime.tick();const before={content:r.content,explanation:r.explanation};Object.assign(r,values);event(r,'SAVE',{before,after:values});return detail(id,requestId);
    },
    send(id,requestId,patch,viewToken) {
      if(!is('AP')||!canRequest(id,requestId)||!editable(requests.get(id))) return fail('NOT_EDITABLE_OR_FORBIDDEN','Đề nghị không được gửi ở bước này.');
      const r=requests.get(id),values=patchValues(r,patch);
      if(!values) return fail('INVALID_PATCH','Chỉ nhận nội dung và giải trình.');
      runtime.tick();const before={content:r.content,explanation:r.explanation};Object.assign(r,values);
      const c=condition(id),view=views.get(viewToken),errors={};
      if(!nonblank(r.content)) errors.content='Nhập nội dung đề nghị không trống.';
      if(r.round>0&&!nonblank(r.explanation)) errors.explanation='Nhập giải trình khi gửi lại.';
      let code=!c.eligible?'NOT_ELIGIBLE':Object.keys(errors).length?'REQUEST_VALIDATION_FAILED':
        !view||view.generation!==runtime.generation()||view.actor_id!==actor().id||view.requestId!==requestId||view.fingerprint!==fingerprint(id)?'VIEW_STALE':null;
      if(code) {
        const reason=code==='NOT_ELIGIBLE'?c.reason:code==='VIEW_STALE'?'Dữ liệu vừa xem đã cũ; bấm Xem lại dữ liệu hiện hành rồi gửi lại.':'Kiểm tra nội dung/giải trình bắt buộc.';
        event(r,'SEND_BLOCKED',{code,before,after:values});return {...attempt(id,'SEND',code,reason),errors};
      }
      r.round++;r.status=REQUEST_STATUS.PENDING;r.return_reason=null;
      const evidence={...proof(id),round:r.round,actor_id:actor().id,occurred_at:runtime.context().time,
        supporting:copy(detail(id,requestId).supporting),content:r.content,explanation:r.explanation};
      r.submissions.push(evidence);event(r,'SEND',{evidence});attempt(id,'SEND','OK','Đã gửi Finance.');return detail(id,requestId);
    },
    decide(id,requestId,type,{reason}={}) {
      if(!is('FINANCE_MANAGER')||!canRequest(id,requestId)||requests.get(id).status!==REQUEST_STATUS.PENDING||!['APPROVE','RETURN'].includes(type)) return fail('FORBIDDEN_OR_INVALID_DECISION','Không phải đề nghị đang chờ Finance.');
      if(type==='RETURN'&&!nonblank(reason)) return fail('RETURN_REASON_REQUIRED','Nhập lý do trả lại không trống.');
      const r=requests.get(id),c=condition(id);
      if(type==='APPROVE'&&(!c.eligible||JSON.stringify(Object.fromEntries(Object.keys(proof(id)).map(k=>[k,r.submissions.at(-1)[k]])))!==fingerprint(id))) return fail('NOT_ELIGIBLE','Điều kiện hoặc bằng chứng gửi không còn hiện hành.');
      runtime.tick();r.status=type==='APPROVE'?REQUEST_STATUS.APPROVED:REQUEST_STATUS.RETURNED;
      if(type==='RETURN') r.return_reason=reason.trim();else {r.approved_by=actor().id;r.approved_at=runtime.context().time;}
      event(r,type,{...(type==='RETURN'?{reason:r.return_reason}:{evidence:proof(id)})});return detail(id,requestId);
    },
    queue() {
      if(!is('FINANCE_MANAGER')) return fail('FORBIDDEN','Chỉ Finance xem hàng đợi đề nghị.');
      return {ok:true,rows:[...requests.values()].filter(r=>r.status===REQUEST_STATUS.PENDING&&inputs(r.po_id).ok).map(r=>detail(r.po_id,r.payment_request_id))};
    }
  });
}
