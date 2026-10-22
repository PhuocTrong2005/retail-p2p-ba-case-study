import { createP2PSession } from './logic/p2p-session.mjs';

const response = await fetch(new URL('./data/seed.json', import.meta.url));
if (!response.ok) throw new Error('Không nạp được dữ liệu mẫu');
const seed = await response.json();
const catalogResponse = await fetch(new URL('./data/po-catalog.json', import.meta.url));
if (!catalogResponse.ok) throw new Error('Không nạp được danh mục PO');
const session = createP2PSession(seed, await catalogResponse.json());
const root = document.querySelector('#app');
const $ = selector => document.querySelector(selector);
const label = seed.metadata.data_label;
const names = { requester_id:'Người yêu cầu', unit_id:'Đơn vị yêu cầu', cost_center_id:'Trung tâm chi phí',
  business_reason:'Lý do nghiệp vụ', needed_by:'Ngày cần hàng', 'item.description':'Mô tả hàng hóa',
  'item.quantity':'Số lượng', 'item.estimated_unit_price':'Đơn giá ước tính' };
let screen = 'list', currentId = null, draft = null, baseline = null, errors = {}, notice = '', query = '', busy = false;
let confirming = false;
let formGeneration = session.generation(), sourceBack = null;
const clone = x => structuredClone(x);
const dirty = () => ['form', 'po-form'].includes(screen) && JSON.stringify(draft) !== baseline;
const isManager = () => session.context().user_id === 'MGR-01';
const isPurchasing = () => ['PROCUREMENT_OFFICER','PROCUREMENT_MANAGER','FINANCE_MANAGER'].includes(session.actor()?.role_id);
const isBuyer = () => session.actor()?.role_id === 'PROCUREMENT_OFFICER';
const home = () => isPurchasing() ? 'po-list' : isManager() ? 'queue' : 'list';
const command = (generation = session.generation()) => session.command(generation);
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key,value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else if (key === 'value') node.value = value ?? '';
    else if (value !== false && value != null) node.setAttribute(key, value === true ? '' : String(value));
  }
  for (const child of children.flat(Infinity)) if (child != null) node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  return node;
}
const p = text => el('p',{},text);
const button = (text, action, id, secondary = false) => el('button',{type:'button',class:`btn${secondary ? ' secondary' : ''}`, 'data-action':action,'data-id':id,'data-generation':session.generation()},text);
const back = (text, action) => el('button',{type:'button',class:'back','data-action':action},text);
const badge = text => el('span',{class:`badge ${{'Nháp':'draft','Chờ chỉnh sửa':'return','Đã từ chối':'reject','Đã duyệt':'approved'}[text] ?? ''}`},text);
const metricLabel = () => el('p',{class:'metric-label'},label);
const date = value => /^\d{4}-\d{2}-\d{2}$/.test(value ?? '') ? value.split('-').reverse().join('/') : value ?? '';
function time(value) {
  return new Intl.DateTimeFormat('vi-VN',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(value)).replace(',','');
}
const money = value => Number.isFinite(Number(value)) && value !== '' ? `${Number(value).toLocaleString('vi-VN',{maximumFractionDigits:20})} VND` : 'Chưa có giá hợp lệ';
const panel = (...children) => el('div',{class:'panel'},...children);
function heading(title, action) { return el('div',{class:'page-head'},el('div',{class:'heading-row'},el('h1',{tabindex:'-1'},title),action)); }
function table(headers, rows, cls='') {
  return el('div',{class:'table-wrap'},el('table',{class:cls},cls==='queue-table'?el('colgroup',{},['col-id','','col-owner','col-round','col-date','col-wait','col-action'].map(c=>el('col',{class:c}))):null,
    el('thead',{},el('tr',{},headers.map(h=>el('th',{scope:'col'},h)))),el('tbody',{},rows)));
}
const cell = content => el('td',{},content);
function showDialog(title, message, accept='Xác nhận', cancel='Hủy') {
  if (confirming) return Promise.resolve(false);
  confirming = true;
  $('#dialog-title').textContent = title; $('#dialog-message').textContent = message;
  $('#dialog-confirm').textContent = accept; $('#dialog-cancel').textContent = cancel;
  const dialog = $('#confirm-dialog'); dialog.showModal();
  return new Promise(resolve => {
    const finish = value => { dialog.close(); confirming = false; resolve(value); };
    $('#dialog-confirm').onclick = () => finish(true);
    $('#dialog-cancel').onclick = () => finish(false);
    dialog.oncancel = event => { event.preventDefault(); finish(false); };
  });
}
async function leave(action) {
  if (dirty() && !await showDialog('Bỏ thay đổi chưa lưu?', 'Phần nhập chưa lưu sẽ bị bỏ. Bạn có thể tiếp tục chỉnh sửa.', 'Bỏ thay đổi', 'Tiếp tục chỉnh sửa')) return false;
  action(); return true;
}
function route(next, id, generation = session.generation()) {
  if (generation !== session.generation()) { notice='Phiên đã được khôi phục. Mở lại hồ sơ hiện tại.'; render(); return; }
  history.replaceState(null,'',location.pathname+location.search);
  notice = ''; errors = {}; draft = null; baseline = null; currentId = id ?? null;
  if (next === 'new') {
    const result = session.beginNew(command(generation));
    if (!result.ok) return;
    draft = result.pr; currentId = draft.pr_id; screen = 'form';
  } else if (next === 'form') {
    const result = session.openForm(id);
    if (!result.ok) { screen = isManager() ? 'queue' : 'list'; render(); return; }
    draft = result.pr; screen = 'form';
  } else if (next === 'po-form') {
    const result = session.po.detail(id);
    if (!result.ok || !result.actions.edit) { screen=home(); render(); return; }
    const po=result.po;
    draft={supplier_id:po.supplier_id,unit_price:po.unit_price,delivery_terms:po.delivery_terms,commercial_terms:po.commercial_terms};
    screen='po-form';
  } else screen = next;
  formGeneration=generation;
  if (draft) { if(screen==='form') draft.needed_by = date(draft.needed_by); baseline = JSON.stringify(draft); }
  render(); root.querySelector('h1')?.focus(); window.scrollTo(0,0);
}
function listView() {
  const input = el('input',{type:'search',id:'search-pr',value:query,placeholder:'Ví dụ: PR-B','aria-describedby':'search-note'});
  const search = el('div',{class:'field search-row'},el('label',{for:'search-pr'},'Tìm theo mã PR hoặc mô tả'),input,
    el('span',{class:'hint',id:'search-note'},'Bỏ khoảng trắng hai đầu; không phân biệt hoa/thường.'),button('Xóa tìm kiếm','clear',null,true));
  const results = el('div',{id:'results'});
  function update() {
    const normalized = query.trim().toLocaleLowerCase('vi');
    const rows = session.list().filter(r => `${r.pr_id} ${r.description ?? ''}`.toLocaleLowerCase('vi').includes(normalized));
    results.replaceChildren(rows.length ? table(['Mã PR','Mô tả ngắn','Tình trạng','Bước tiếp theo','Thao tác'],rows.map(r=>el('tr',{},
      cell(el('strong',{},r.pr_id)),cell(r.description || 'Chưa nhập mô tả'),cell(badge(r.status)),
      cell(r.status==='Chờ chỉnh sửa' ? 'Chỉnh sửa và gửi lại' : r.status==='Nháp' ? 'Hoàn thiện và gửi' : 'Xem thông tin'),
      cell(el('div',{class:'actions'},button('Xem','detail',r.pr_id,true),['Nháp','Chờ chỉnh sửa'].includes(r.status) ? button('Chỉnh sửa','form',r.pr_id,true) : null))
    )),'list-table') : el('div',{class:'empty'},el('h3',{},'Không tìm thấy PR'),p('Thử mã PR hoặc mô tả khác, hoặc xóa tìm kiếm.')));
  }
  input.addEventListener('input',()=>{ query=input.value; update(); }); update();
  return [heading('PR của tôi',button('Tạo PR','new')),p('REQ-01 · Chỉ các yêu cầu của bạn trong Đơn vị mẫu.'),panel(search,results)];
}
const inputId = field => `field-${field.replaceAll('.','-')}`;
function field(key, tag='input', readonly=false, options=[]) {
  const value = key.startsWith('item.') ? draft.item[key.slice(5)] : draft[key];
  const id = inputId(key), hasError = Boolean(errors[key]);
  const attrs = { id, name:key, value, readonly, 'aria-required':'true', 'aria-describedby':`required-note ${id}-hint${hasError ? ` ${id}-error` : ''}`,
    'aria-invalid':hasError ? 'true' : null, type:tag==='input'?'text':null,
    inputmode:key.includes('quantity') || key.includes('price') ? 'decimal' : null };
  const control = el(tag,attrs,...(tag==='select' ? options.map(o=>el('option',{value:o.id},o.name)) : []));
  if (tag==='select') control.value=value;
  if (tag==='textarea') control.value=value ?? '';
  if (key==='unit_id') control.value='Đơn vị mẫu';
  control.addEventListener('input',()=>{
    if (readonly) return;
    if (key.startsWith('item.')) draft.item[key.slice(5)]=control.value; else draft[key]=control.value;
    if (key==='item.estimated_unit_price') $(`#${id}-hint`).textContent=money(control.value);
  });
  const hint = readonly ? 'Tự điền trong demo, chỉ đọc.' : key==='needed_by' ? 'dd/mm/yyyy · không bắt buộc là ngày tương lai.' :
    key==='item.quantity' ? 'Số lớn hơn 0; dùng dấu chấm cho phần lẻ.' : key==='item.estimated_unit_price' ? money(value) : '';
  return el('div',{class:`field${hasError?' has-error':''}${key==='business_reason'?' wide':''}`},
    el('label',{for:id},`${names[key]}${key==='item.estimated_unit_price'?' · VND':''} *`),control,
    el('span',{class:'hint',id:`${id}-hint`},hint),hasError ? el('span',{class:'error-text',id:`${id}-error`},errors[key]) : null);
}
function formView() {
  const detail = session.detail(currentId), returned = detail.ok && detail.status==='Chờ chỉnh sửa';
  const errorKeys = Object.keys(errors);
  const summary = errorKeys.length ? el('div',{class:'callout error',id:'errors',tabindex:'-1',role:'alert'},el('strong',{},'Chưa gửi được PR. Kiểm tra các trường sau:'),
    el('ul',{},errorKeys.map(k=>el('li',{},el('a',{href:`#${inputId(k)}`,class:'error-link'},errors[k]))))) : null;
  return [back('← Về PR của tôi','list'),heading(`${returned?'Chỉnh sửa':detail.ok?'Hoàn thiện':'Tạo'} ${currentId}`),
    el('div',{class:'status-line'},badge(returned?'Chờ chỉnh sửa':'Nháp')),returned ? el('div',{class:'callout warn'},el('strong',{},'Lý do trả lại'),p(detail.return_reason ?? 'Không xác định do thiếu lý do trả lại'),p(detail.next_step)) : null,
    summary, el('form',{id:'pr-form',novalidate:true},panel(el('h2',{},'Thông tin yêu cầu'),
      el('p',{class:'hint',id:'required-note'},returned?'Bắt buộc khi gửi lại; có thể lưu phần sửa khi chưa đầy đủ.':'Bắt buộc khi gửi; có thể lưu nháp khi chưa đầy đủ.'),
      el('div',{class:'request-grid'},field('requester_id','input',true),field('unit_id','input',true),
        field('cost_center_id','select',false,[{id:'',name:'Chọn trung tâm chi phí'},...seed.reference_data.cost_centers]),field('needed_by'),field('business_reason','textarea')),
      el('h2',{},'Hàng hóa đề nghị'),el('div',{class:'line-grid'},field('item.description'),field('item.quantity'),field('item.estimated_unit_price')),
      el('div',{class:'action-bar'},p('Lưu trong phiên demo; tải lại trang sẽ khôi phục dữ liệu mẫu.'),
        el('div',{class:'actions'},button(returned?'Lưu phần sửa':'Lưu nháp','save',currentId,true),button(returned?'Gửi lại':'Gửi','submit',currentId)))) )];
}
function detailView() {
  const d=session.detail(currentId);
  if (!d.ok) return [heading('Không tìm thấy PR trong phạm vi được phép')];
  const pr=d.pr;
  const info = [ ['Người yêu cầu',pr.requester_id],['Cửa hàng / Bộ phận yêu cầu','Đơn vị mẫu'],
    ['Trung tâm chi phí',seed.reference_data.cost_centers.find(c=>c.id===pr.cost_center_id)?.name ?? 'Chưa chọn'],['Ngày cần hàng',date(pr.needed_by)],['Lý do nghiệp vụ',pr.business_reason] ];
  const history=session.history(currentId);
  const actions=el('div',{class:'actions'},d.actions.edit?button('Chỉnh sửa','form',currentId):null,
    d.actions.decide?button('Phê duyệt','approve',currentId):null,d.actions.decide?button('Trả lại để chỉnh sửa','return',currentId,true):null,
    d.actions.decide?button('Từ chối','reject',currentId,true):null);
  return [sourceBack?back('← Quay lại ngữ cảnh PO','source-back'):back(isPurchasing()?'← Về PR đã duyệt và PO':isManager()?'← Về hàng đợi':'← Về PR của tôi',home()),heading(`${isManager()&&d.actions.decide?'Xem xét':'Chi tiết'} ${currentId}`),
    el('div',{class:'status-line'},badge(d.status),`Vòng ${d.round || 'chưa mở'}`),
    d.status==='Chờ chỉnh sửa'?el('div',{class:'callout warn'},el('strong',{},'Lý do trả lại'),p(d.return_reason ?? 'Không xác định do thiếu dữ liệu'),p(d.next_step)):null,
    panel(el('h2',{},'Thông tin yêu cầu'),el('dl',{class:'readonly-grid'},info.map(([name,value],i)=>el('div',{class:i===4?'wide':''},el('dt',{},name),el('dd',{},value || 'Chưa nhập')))),
      el('h2',{},'Hàng hóa đề nghị'),table(['Mô tả hàng hóa hữu hình','Số lượng','Đơn giá ước tính · VND'],[el('tr',{},cell(pr.item?.description || 'Chưa nhập'),cell(pr.item?.quantity ?? ''),cell(money(pr.item?.estimated_unit_price)))],'item-table'),
      el('div',{class:'waiting-line'},el('strong',{},'Thời gian chờ'),el('span',{id:'detail-wait'},d.wait?.label ?? 'Không xác định')),
      p(`Thời điểm báo cáo: ${time(session.context().time)} (UTC+07:00) · Phạm vi PR này.`),
      d.wait?.label?.startsWith('Không xác định')?el('div',{class:'callout warn',role:'alert'},'Chưa xác định được thời gian chờ do dữ liệu thiếu hoặc không hợp lệ.'):null,
      el('details',{class:'disclosure'},el('summary',{},'Cách tính và chất lượng dữ liệu'),p(`PR-MET-02 · Không xác định: ${d.wait?.label?.startsWith('Không xác định')?1:0}.`)),metricLabel(),
      actions.childNodes.length?el('div',{class:'action-bar'},p(d.actions.decide?'Chọn quyết định cho vòng đang chờ.':'Tiếp tục chỉnh sửa nội dung theo lý do trả lại.'),actions):null,
      d.ready_for_purchasing?p('Đã duyệt — Mua hàng có thể lập PO ngay trong cùng phiên. Chọn vai Nhân viên mua hàng để tiếp tục.'):null),
    panel(el('h2',{},'Lịch sử quy trình'),el('ol',{class:'history'},history.events.map(e=>el('li',{},el('time',{datetime:e.occurred_at},time(e.occurred_at)),el('div',{},
      el('strong',{},`${e.actor_id} · ${{FIRST_VALID_SUBMIT:'Gửi hợp lệ lần đầu',VALID_RESUBMIT:'Gửi lại hợp lệ',RETURN_FOR_EDIT:'Trả lại chỉnh sửa',APPROVE:'Phê duyệt',REJECT:'Từ chối'}[e.event_type]} · vòng ${e.review_round}`),
      e.return_reason?p(e.return_reason):null,pr.demo_clarification?.resubmit_event_id===e.event_id?p(pr.demo_clarification.note):null)))),
      p('Lịch sử quy trình tối thiểu; không tái dựng nội dung chứng từ tại các lần gửi quá khứ.'),metricLabel())];
}
function queueView() {
  const report=session.metrics(), queue=session.queue();
  if (!report.ok || !queue.ok) return [heading('Không có quyền xem hàng đợi')];
  const m=report, r=m.met03;
  const warnings=m.quality.partial || m.met01.unknown_count!==0 || m.met02.unknown_count!==0 || r.unknown_count!==0;
  return [heading('Hàng đợi xem xét PR'),p('MGR-01 · Đơn vị mẫu · Chỉ PR còn chờ quyết định ở vòng hiện tại.'),
    warnings?el('div',{class:'callout warn',role:'alert'},'Có hồ sơ không xác định hoặc tập nguồn chưa đầy đủ. Số liệu chỉ phản ánh phần xác định được.'):null,
    panel(el('h2',{},'PR cần xem xét',el('span',{class:'count',id:'queue-count'},`${m.met01.count} PR`)),queue.rows.length?table(['Mã PR','Mô tả ngắn','Người yêu cầu','Vòng','Mốc gửi xem xét','Thời gian chờ','Thao tác'],queue.rows.map(d=>el('tr',{},cell(el('strong',{},d.pr.pr_id)),cell(d.pr.item.description),cell(d.pr.requester_id),cell(d.round),cell(time(d.wait.opened_at)),cell(d.wait.label),cell(button('Xem xét','detail',d.pr.pr_id,true)))),'queue-table'):
      el('div',{class:'empty'},el('h3',{},'Không có PR chờ xem xét'),p('Các PR đang chỉnh sửa, đã duyệt hoặc từ chối không nằm trong hàng đợi.')),
      p(`Thời điểm báo cáo: ${time(m.T)} (UTC+07:00) · Phạm vi Đơn vị mẫu.`),
      metricLabel()),
    panel(el('div',{class:'cohort-heading'},el('h2',{},'Tỷ lệ PR từng bị trả lại'),el('strong',{class:'rate',id:'return-rate'},r.label,el('span',{},`${r.numerator} / ${r.denominator} PR`))),
      p(`Nhóm PR trong kỳ: [${time(seed.demo_config.cohort.start_inclusive)}, ${time(seed.demo_config.cohort.end_exclusive)}) · UTC+07:00.`),
      p(`Thời điểm báo cáo: ${time(m.T)} (UTC+07:00) · Toàn bộ nhóm PR trong kỳ của Đơn vị mẫu, gồm cả PR ngoài hàng đợi.`),
      el('p',{class:'cohort-context',id:'cohort-context'},`Trong nhóm: ${r.context.waiting} PR chờ xem xét · ${r.context.awaiting_edit} PR chờ chỉnh sửa.`),
      el('details',{class:'disclosure'},el('summary',{},'Cách tính và chất lượng dữ liệu'),
        el('p',{class:'small',id:'quality-current'},`Không xác định — PR-MET-01: ${m.met01.unknown_count}; PR-MET-02: ${m.met02.unknown_count}.`),
        el('p',{class:'small',id:'quality-cohort'},`Không xác định — PR-MET-03: ${r.unknown_count}; chưa xác định nhóm PR trong kỳ: ${r.unknown_cohort.length}; lịch sử trả lại: ${r.unknown_return_history.length}; tình trạng ngữ cảnh: ${r.context.unknown_count}; bản ghi không gắn PR: ${m.quality.unlinked_records}.`),
        p('PR-MET-01 đếm vòng hiện tại còn mở. PR-MET-02 tính giờ liên tục từ mốc mở vòng đó. PR-MET-03 chọn lần gửi đầu trong kỳ, xét trả lại đến thời điểm báo cáo; mỗi PR chỉ đếm một lần.'),p(`Nhóm PR trong kỳ đã xác định: ${r.cohort_ids.join(', ') || 'Không có dữ liệu'}.`),p('Không áp dụng: PR xác định không đang chờ. Không xác định: thiếu hoặc sai dữ liệu. Không có dữ liệu: mẫu số tỷ lệ bằng 0.')),metricLabel())];
}
function poListView() {
  if (!isPurchasing()) return [heading('Không có quyền xem PO')];
  const sources=session.po.sources(), docs=session.po.list();
  return [heading('PR đã duyệt và đơn đặt hàng'),p(`${session.context().user_id} · Đơn vị mẫu · Một PO cho mỗi PR trong demo.`),metricLabel(),
    isBuyer()?panel(el('h2',{},'PR sẵn sàng lập PO'),sources.rows.length?table(['PR nguồn','Nhu cầu','Bước tiếp theo'],sources.rows.map(r=>el('tr',{},
      cell(button(r.pr_id,'po-source',r.pr_id,true)),cell(r.description),cell(r.po_id?button(`Mở ${r.po_id}`,'po-detail',r.po_id,true):button('Lập PO','po-create',r.pr_id))))):p('Chưa có PR đã duyệt. Tạo/gửi PR và Quản lý phê duyệt trong cùng phiên để tiếp tục.')):null,
    panel(el('h2',{},'Đơn đặt hàng trong phiên'),docs.length?table(['Mã PO / PR nguồn','Tình trạng','Vòng / tuyến đã chốt','Bước tiếp theo','Thao tác'],docs.map(d=>el('tr',{},
      cell(`${d.po.po_id} / ${d.po.source_pr_id}`),cell(badge(d.po.status)),cell(`Vòng ${d.po.round || 'chưa gửi'} · ${d.po.finance_required===null?'Chưa chốt':d.po.finance_required?'Có Finance bổ sung':'Không Finance bổ sung'}`),
      cell(d.next_step),cell(button(d.actions.decide?'Xem xét':'Xem PO','po-detail',d.po.po_id,true))))):el('div',{class:'empty'},el('h3',{},'Chưa có PO trong phiên'),p(isBuyer()?'Chọn PR đã duyệt ở trên để lập PO.':'Mua hàng cần lập và gửi PO trước khi phê duyệt.')))
  ];
}
function poSourcePanel(po) {
  const s=po.source_snapshot;
  return panel(el('h2',{},'Thông tin kế thừa từ PR · chỉ đọc'),button(`Mở PR nguồn ${po.source_pr_id}`,'po-source',po.source_pr_id,true),
    el('dl',{class:'readonly-grid'},[['Người yêu cầu',s.requester_id],['Đơn vị','Đơn vị mẫu'],['Trung tâm chi phí',s.cost_center_id],['Ngày cần hàng',date(s.needed_by)],['Lý do nghiệp vụ',s.business_reason]].map(([k,v])=>el('div',{},el('dt',{},k),el('dd',{},v)))),
    table(['Hàng hóa','Số lượng','Giá ước tính PR · VND'],[el('tr',{},cell(s.item.description),cell(s.item.quantity),cell(money(s.item.estimated_unit_price)))]),
    p(`Bản sao lúc lập PO · Phê duyệt nguồn ${po.source_approval_event_id} · ${po.source_approval.actor_id} · ${time(po.source_approval.occurred_at)}.`),
    p('Giá mua PO được nhập riêng; không thay đổi PR nguồn.'));
}
const poFieldLabels={supplier_id:'Nhà cung cấp',unit_price:'Giá mua · VND',delivery_terms:'Thông tin giao hàng',commercial_terms:'Thông tin thương mại'};
function poField(key, tag='input') {
  const id=`po-${key}`, required=['supplier_id','unit_price'].includes(key);
  const control=el(tag,{id,name:key,value:draft[key],type:tag==='input'?'text':null,inputmode:key==='unit_price'?'decimal':null,
    'aria-required':String(required),'aria-invalid':errors[key]?'true':null,'aria-describedby':`${id}-hint${errors[key]?` ${id}-error`:''}`},
    tag==='select'?[el('option',{value:''},'Chọn nhà cung cấp'),...session.po.suppliers().map(s=>el('option',{value:s.id,disabled:!s.active||!s.approved},s.name))]:[]);
  control.value=draft[key] ?? '';
  control.addEventListener('input',()=>{draft[key]=control.value;});
  return el('div',{class:`field${errors[key]?' has-error':''}`},el('label',{for:id},`${poFieldLabels[key]}${required?' *':' · tùy chọn'}`),control,
    el('span',{class:'hint',id:`${id}-hint`},key==='unit_price'?'Số hữu hạn không âm, cho phép 0; dùng dấu chấm cho phần lẻ.':key==='supplier_id'?'Danh mục tổng hợp; NCC không đủ điều kiện không được chọn.':'Không bắt buộc.'),
    errors[key]?el('span',{class:'error-text',id:`${id}-error`},errors[key]):null);
}
function poFormView() {
  const result=session.po.detail(currentId);
  if (!result.ok || !result.actions.edit) return [heading('PO không được phép chỉnh sửa')];
  const po=result.po, keys=Object.keys(errors);
  return [back('← Về chi tiết PO','po-detail'),heading(`Soạn ${po.po_id}`),metricLabel(),badge(po.status),
    po.return_reason?el('div',{class:'callout warn'},el('strong',{},'Lý do trả lại'),p(po.return_reason),p(result.next_step)):null,
    poSourcePanel(po),keys.length?el('div',{class:'callout error',role:'alert',tabindex:'-1',id:'po-errors'},el('strong',{},'Chưa hoàn tất thao tác PO. Kiểm tra các trường:'),
      el('ul',{},keys.map(k=>el('li',{},el('a',{href:`#po-${k}`},errors[k]))))):null,
    el('form',{id:'po-form',novalidate:true},panel(el('h2',{},'Thông tin riêng của PO'),p('Dấu * bắt buộc khi gửi; có thể lưu phần nhập chưa đầy đủ. Trường nguồn PR giữ nguyên.'),
      el('div',{class:'request-grid'},poField('supplier_id','select'),poField('unit_price'),poField('delivery_terms','textarea'),poField('commercial_terms','textarea')),
      p(`Tuyến cho lần gửi tiếp theo: Mua hàng bắt buộc${session.financeRequired()?' → Tài chính bổ sung':' · không Tài chính bổ sung'}. Chọn trong Điều khiển demo trước khi gửi.`),
      el('div',{class:'action-bar'},p('Lưu trong phiên chung; tải lại sẽ khôi phục toàn bộ dữ liệu.'),el('div',{class:'actions'},button('Lưu PO','po-save',po.po_id,true),button(po.status==='Chờ chỉnh sửa'?'Gửi lại PO':'Gửi PO','po-submit',po.po_id)))))];
}
function poDetailView() {
  const d=session.po.detail(currentId);
  if (!d.ok) return [heading('Không tìm thấy PO trong phạm vi được phép')];
  const po=d.po, suppliers=session.po.suppliers(), actions=el('div',{class:'actions'});
  if(d.actions.edit) actions.append(button('Chỉnh sửa PO','po-form',po.po_id));
  if(d.actions.decide) actions.append(button('Phê duyệt PO','po-approve',po.po_id),button('Trả lại PO','po-return',po.po_id,true));
  if(isBuyer() && !po.issued_at) {
    const issue=button('Phát hành mô phỏng','po-issue',po.po_id); issue.disabled=!d.actions.issue; actions.append(issue);
  }
  const eventNames={CREATE:'Lập PO từ PR đã duyệt',SAVE:'Lưu nội dung PO',SUBMIT:'Gửi PO',APPROVE:'Phê duyệt PO',RETURN_FOR_EDIT:'Trả lại PO',ISSUE_SIMULATED:'Phát hành mô phỏng'};
  return [back('← Về PR đã duyệt và PO','po-list'),heading(`Chi tiết ${po.po_id}`),metricLabel(),
    el('div',{class:'status-line'},badge(po.status),`Vòng ${po.round || 'chưa gửi'}`),el('div',{class:'callout',id:'po-next'},p(d.next_step)),
    po.return_reason?el('div',{class:'callout warn'},el('strong',{},'Lý do trả lại'),p(po.return_reason)):null,poSourcePanel(po),
    panel(el('h2',{},'Thông tin PO'),el('dl',{class:'readonly-grid'},[
      ['Nhà cung cấp',suppliers.find(s=>s.id===po.supplier_id)?.name ?? 'Chưa chọn'],['Giá mua PO',money(po.unit_price)],
      ['Giao hàng',po.delivery_terms || 'Chưa nhập'],['Thương mại',po.commercial_terms || 'Chưa nhập'],
      ['Tuyến của vòng hiện tại',po.finance_required===null?'Chưa gửi/chưa chốt':po.finance_required?'Mua hàng → Tài chính bổ sung':'Mua hàng; không Tài chính bổ sung'],
      ['Phát hành',po.issued_at?`Mô phỏng · ${po.issued_by} · ${time(po.issued_at)}`:'Chưa phát hành']
    ].map(([k,v])=>el('div',{},el('dt',{},k),el('dd',{},v)))),
    !po.issued_at && !d.actions.issue?p('Chưa thể phát hành: phải hoàn tất mọi phê duyệt bắt buộc của vòng hiện tại, sau đó chuyển đúng vai Nhân viên mua hàng.'):null,actions),
    panel(el('h2',{},'Lịch sử PO'),el('ol',{class:'history',id:'po-history'},po.history.map(e=>el('li',{},el('time',{datetime:e.occurred_at},time(e.occurred_at)),
      el('div',{},el('strong',{},`${e.actor_id} · ${eventNames[e.event_type]} · vòng ${e.review_round}`),e.reason?p(e.reason):null,
        e.event_type==='SUBMIT'?p(e.finance_required?'Tuyến đã chốt: Mua hàng → Tài chính bổ sung.':'Tuyến đã chốt: Mua hàng, không Tài chính bổ sung.'):null)))),
      p('Lịch sử quy trình tối thiểu trong bộ nhớ; không phải audit store vận hành.'))];
}
function mutatePO(action, generation, id=currentId) {
  if(busy) return;
  busy=true;
  try {
    const token=command(generation);
    const result=action==='po-create'?session.po.create(id,token):action==='po-save'?session.po.save(id,clone(draft),token):
      action==='po-submit'?session.po.submit(id,clone(draft),token):action==='po-issue'?session.po.issue(id,token):
      session.po.decide(id,action==='po-approve'?'APPROVE':'RETURN_FOR_EDIT',{reason:$('#po-return-reason')?.value},token);
    if(!result.ok) {
      if(result.code==='RETURN_REASON_REQUIRED') {
        $('#po-return-error').textContent='Nhập lý do trả lại không trống.'; $('#po-return-reason').setAttribute('aria-invalid','true'); $('#po-return-reason').focus(); return;
      }
      errors=result.errors ?? {};
      notice=result.code==='PO_VALIDATION_FAILED'?'Thông tin PO chưa hợp lệ; phần nhập được giữ để chỉnh sửa.':
        result.code==='STALE_SESSION'?'Phiên đã được khôi phục. Mở lại hồ sơ hiện tại.':'Thao tác PO bị chặn. Kiểm tra vai trò, trạng thái và phê duyệt hiện tại.';
      render(); $('#po-errors')?.focus(); return;
    }
    const target=action==='po-create'?'po-form':action==='po-save'?'po-form':'po-detail';
    route(target,result.po.po_id);
    notice=action==='po-create'?(result.existing?'Đã mở PO hiện có của PR này.':'Đã lập PO từ đúng PR đã duyệt trong phiên.'):
      action==='po-save'?'Đã lưu PO trong phiên.':action==='po-submit'?'Đã gửi PO đến Trưởng bộ phận mua hàng.':action==='po-issue'?'Đã ghi phát hành mô phỏng; không gửi email.':'Đã ghi quyết định PO.';
    render();
  } finally {setTimeout(()=>{busy=false;},400);}
}
function render() {
  const c=session.context();
  $('#role').value=c.user_id; $('#budget').value=c.budget_outcome;
  $('#context').textContent=`${session.actor()?.display_name} · ${c.user_id} · Đơn vị mẫu`;
  $('#finance-route').value=String(session.financeRequired());
  $('#clock').textContent=`${time(c.time)} (UTC+07:00)`; $('#clock').dateTime=c.time;
  $('#demo-state').textContent=`Kịch bản ngân sách: ${{PASS:'Đạt',INSUFFICIENT:'Không đủ ngân sách',UNAVAILABLE:'Nguồn dữ liệu ngân sách không khả dụng'}[c.budget_outcome]} · Chỉ áp dụng lần kiểm tra tiếp theo, giữ đến khi đổi.`;
  $('#module-nav').replaceChildren(button(isPurchasing()?'PR đã duyệt và PO':isManager()?'Hàng đợi PR':'PR của tôi',home(),null,true));
  const content=screen==='po-list'?poListView():screen==='po-form'?poFormView():screen==='po-detail'?poDetailView():screen==='list'?listView():screen==='form'?formView():screen==='detail'?detailView():queueView();
  root.replaceChildren(el('section',{class:'view','data-screen':{list:'PR-SCR-01',form:'PR-SCR-02',detail:'PR-SCR-03',queue:'PR-SCR-04','po-list':'PO-LIST','po-form':'PO-FORM','po-detail':'PO-DETAIL'}[screen]},
    notice?el('div',{class:`callout${notice.includes('ngân sách')?' warn':''}`,role:'status',id:'notice'},notice):null,...content));
  const renderedGeneration=formGeneration;
  $('#pr-form')?.addEventListener('submit',event=>{event.preventDefault(); mutate('submit',renderedGeneration);});
  $('#po-form')?.addEventListener('submit',event=>{event.preventDefault(); mutatePO('po-submit',renderedGeneration);});
}
function mutate(action, generation=formGeneration) {
  if (busy) return;
  if(generation!==session.generation() || !draft || screen!=='form') {notice='Biểu mẫu không còn thuộc ngữ cảnh hiện tại. Mở lại PR để tiếp tục.';render();return;}
  busy=true;
  try {
    const edit=session.edit(currentId,{cost_center_id:draft.cost_center_id,business_reason:draft.business_reason,needed_by:draft.needed_by,item:clone(draft.item)},command(generation));
    if (!edit.ok) { notice='Không được phép chỉnh sửa PR này.'; render(); return; }
    const result=action==='save'?session.save(currentId,command(generation)):session.submit(currentId,command(generation));
    baseline=JSON.stringify(draft); errors={};
    if (result.ok && action==='submit') { screen='detail'; draft=null; notice='Đã chuyển PR đến Quản lý cửa hàng xem xét.'; }
    else if (result.ok) notice='Đã lưu nội dung trong phiên demo.';
    else if (result.code==='VALIDATION_FAILED') {
      for (const [key,value] of Object.entries(result.errors)) errors[key]=`${names[key]}: ${{REQUIRED:'không được để trống.',INVALID_DATE:'nhập ngày lịch hợp lệ (dd/mm/yyyy).',POSITIVE_NUMBER_REQUIRED:'nhập số lớn hơn 0, dùng dấu chấm cho phần lẻ.',NONNEGATIVE_NUMBER_REQUIRED:'nhập số không âm, dùng dấu chấm cho phần lẻ.',INVALID_COST_CENTER:'chọn trung tâm chi phí hợp lệ.',INVALID_UNIT:'đơn vị không hợp lệ.',INVALID_REQUESTER:'người yêu cầu không hợp lệ.'}[value.code]}`;
      notice='Chưa kiểm tra ngân sách vì thông tin trường chưa hợp lệ.';
    } else notice=result.code==='INSUFFICIENT_BUDGET'?'Không đủ ngân sách. Chưa chuyển xem xét; chỉnh sửa thông tin hoặc đổi kịch bản demo rồi Gửi/Gửi lại.':
      result.code==='BUDGET_UNAVAILABLE'?'Nguồn dữ liệu ngân sách không khả dụng. Chưa kết luận đủ hoặc thiếu; thử lại bằng Gửi/Gửi lại.':'Thao tác bị chặn; kiểm tra ngữ cảnh PR.';
    render(); if (Object.keys(errors).length) $('#errors').focus();
  } finally { setTimeout(()=>{busy=false;},400); }
}
root.addEventListener('click',async event=>{
  const target=event.target.closest('[data-action]');
  if (!target || event.detail>1 || busy || confirming) return;
  const action=target.dataset.action, id=target.dataset.id;
  const generation=Number(target.dataset.generation ?? session.generation());
  if(generation!==session.generation()) {notice='Phiên đã được khôi phục. Mở lại hồ sơ hiện tại.';render();return;}
  if(action==='po-source') {
    await leave(()=>{sourceBack={screen,id:currentId,query};route('detail',id,generation);}); return;
  }
  if(action==='source-back' && sourceBack) {
    const prior=sourceBack;sourceBack=null;query=prior.query;route(prior.screen,prior.id,generation);return;
  }
  if (['list','queue','new','form','detail','po-list','po-form','po-detail'].includes(action)) {
    await leave(()=>{sourceBack=null;route(action,id ?? (['po-form','po-detail'].includes(action)?currentId:undefined),generation);}); return;
  }
  if(['po-create','po-save','po-submit','po-approve','po-return-confirm','po-issue'].includes(action)) {
    mutatePO(action,['po-save','po-submit'].includes(action)?formGeneration:generation,id); return;
  }
  if(action==='po-return') {
    if($('#po-return-panel'))return;
    const block=el('div',{class:'callout warn',id:'po-return-panel'},el('label',{for:'po-return-reason'},'Lý do trả lại PO *'),
      el('textarea',{id:'po-return-reason','aria-required':'true','aria-describedby':'po-return-error'}),el('span',{id:'po-return-error',class:'error-text',role:'alert'}),
      el('div',{class:'actions'},button('Hoàn tất trả lại PO','po-return-confirm',id),button('Hủy','po-return-cancel',id,true)));
    root.querySelector('.panel').append(block);$('#po-return-reason').focus();return;
  }
  if(action==='po-return-cancel') {$('#po-return-panel')?.remove();return;}
  if (action==='clear') { query=''; render(); $('#search-pr').focus(); return; }
  if (['save','submit'].includes(action)) { mutate(action,generation); return; }
  if (action==='return') {
    if ($('#return-panel')) return;
    const area=el('textarea',{id:'return-reason','aria-required':'true','aria-describedby':'return-error'});
    const block=el('div',{class:'callout warn',id:'return-panel'},el('label',{for:'return-reason'},'Lý do trả lại *'),area,
      el('span',{id:'return-error',class:'error-text',role:'alert'}),el('div',{class:'actions'},button('Hoàn tất trả lại','return-confirm',id),button('Hủy','return-cancel',id,true)));
    root.querySelector('.panel').append(block); area.focus(); return;
  }
  if (action==='return-cancel') { $('#return-panel')?.remove(); return; }
  if (action==='reject' && !await showDialog(`Xác nhận từ chối ${id}?`,'Sau khi từ chối, PR này không thể chỉnh sửa hoặc gửi lại. PR không được chuyển Mua hàng.','Xác nhận từ chối')) return;
  const type={approve:'APPROVE',reject:'REJECT','return-confirm':'RETURN_FOR_EDIT'}[action];
  if (!type) return;
  busy=true;
  const result=session.decide(id,type,{reason:$('#return-reason')?.value,confirmed:action==='reject'},command(generation));
  if (!result.ok && result.code==='RETURN_REASON_REQUIRED') { $('#return-error').textContent='Nhập lý do trả lại không trống.'; $('#return-reason').setAttribute('aria-invalid','true'); $('#return-reason').focus(); }
  else { notice=result.ok?'Đã ghi nhận quyết định.':'Thao tác bị chặn; PR không còn chờ quyết định.'; render(); }
  setTimeout(()=>{busy=false;},400);
});
$('#role').addEventListener('change',async event=>{
  const next=event.target.value; event.target.value=session.context().user_id;
  if (busy || confirming) return;
  await leave(()=>{ session.setUser(next,command()); query=''; sourceBack=null; route(home()); });
});
$('#budget').addEventListener('change',event=>{ session.setBudget(event.target.value,command()); const oldFocus=document.activeElement?.id; render(); if(oldFocus) document.getElementById(oldFocus)?.focus(); });
$('#finance-route').addEventListener('change',event=>{session.setFinance(event.target.value==='true',command());render();});
$('#module-nav').addEventListener('click',async event=>{
  const target=event.target.closest('[data-action]');if(!target||busy||confirming)return;
  await leave(()=>{sourceBack=null;route(home());});
});
$('#reset').addEventListener('click',async()=>{
  if (busy || !await showDialog('Khôi phục dữ liệu mẫu?','Bỏ mọi thay đổi, phần nhập, lịch sử phát sinh và đưa vai trò, ngân sách, đồng hồ về ban đầu.','Khôi phục')) return;
  session.reset({confirmed:true},command()); query=''; screen='list'; currentId=null; draft=null; baseline=null; errors={}; notice=''; sourceBack=null;formGeneration=session.generation();
  history.replaceState(null,'',location.pathname+location.search); window.scrollTo(0,0);
  document.querySelector('.demo').open=false; render(); root.querySelector('h1').focus();
});
window.addEventListener('beforeunload',event=>{ if (dirty()) { event.preventDefault(); event.returnValue=''; } });
for(const user of session.users().filter(u=>!['REQ-01','MGR-01'].includes(u.id))) $('#role').append(el('option',{value:user.id},`${user.display_name} · ${user.id}`));
render();
