import { parseNumber, nonblank, validatePR } from './validation.mjs';

export const PO_STATUS = Object.freeze({
  DRAFT: 'Đang soạn', PROCUREMENT: 'Chờ Mua hàng duyệt', FINANCE: 'Chờ Tài chính bổ sung',
  RETURNED: 'Chờ chỉnh sửa', ELIGIBLE: 'Đủ điều kiện phát hành', ISSUED: 'Đã phát hành (mô phỏng)'
});
const clone = value => structuredClone(value);
const fail = code => ({ ok: false, code });
const editable = p => [PO_STATUS.DRAFT, PO_STATUS.RETURNED].includes(p.status);
const inputKeys = new Set(['supplier_id', 'unit_price', 'delivery_terms', 'commercial_terms']);

// PO owns its documents; PR stays in the existing PR domain. No second PR seed.
export function createPODomain(runtime, pr, seed, catalog) {
  const suppliers = clone(catalog.suppliers);
  let documents = [];
  runtime.onReset(() => { documents = []; });
  const role = () => runtime.actor()?.role_id;
  const isBuyer = () => role() === 'PROCUREMENT_OFFICER';
  const mayRead = () => ['PROCUREMENT_OFFICER', 'PROCUREMENT_MANAGER', 'FINANCE_MANAGER'].includes(role());
  const find = id => documents.find(p => p.po_id === id && p.unit_id === runtime.context().unit_id);
  const readable = p => p && mayRead();
  const source = p => {
    const result = pr.approvedSource(p.source_pr_id);
    return result.ok && result.approval_event.event_id === p.source_approval_event_id;
  };
  const step = p => (p.status === PO_STATUS.PROCUREMENT && role() === 'PROCUREMENT_MANAGER') ||
    (p.status === PO_STATUS.FINANCE && p.finance_required && p.approvals.procurement && role() === 'FINANCE_MANAGER');
  function append(p, type, extra = {}) {
    const event = { event_id: runtime.nextId('PO-EVENT-'), po_id: p.po_id, event_type: type,
      actor_id: runtime.context().user_id, occurred_at: runtime.context().time,
      review_round: p.round, event_order: p.history.length + 1, ...clone(extra) };
    p.history.push(event); return event;
  }
  function patchOf(p, patch) {
    if (!patch || typeof patch !== 'object' || Array.isArray(patch) ||
        Object.keys(patch).some(k => !inputKeys.has(k)) || Object.values(patch).some(v => typeof v !== 'string' && typeof v !== 'number')) return null;
    if (['supplier_id', 'delivery_terms', 'commercial_terms'].some(k => k in patch && typeof patch[k] !== 'string')) return null;
    return { supplier_id: p.supplier_id, unit_price: p.unit_price, delivery_terms: p.delivery_terms,
      commercial_terms: p.commercial_terms, ...clone(patch) };
  }
  function validate(p, values, complete) {
    const errors = {};
    if (complete || nonblank(values.supplier_id)) {
      if (!suppliers.some(s => s.id === values.supplier_id && s.active === true && s.approved === true)) errors.supplier_id = 'Chọn nhà cung cấp đang hoạt động và đã được phê duyệt.';
    }
    const price = parseNumber(values.unit_price);
    if (complete || String(values.unit_price).trim() !== '') {
      if (price === null || price < 0) errors.unit_price = 'Nhập giá mua hữu hạn, không âm; dùng dấu chấm cho phần lẻ. Giá 0 được phép.';
    }
    const quantity = parseNumber(p.source_snapshot.item.quantity);
    if (quantity === null || quantity <= 0) errors.source = 'Số lượng nguồn phải hữu hạn và lớn hơn 0.';
    return { errors, price };
  }
  function write(id, patch, submit) {
    const p = find(id);
    if (!isBuyer() || !readable(p) || !editable(p)) return fail('NOT_EDITABLE_OR_FORBIDDEN');
    if (!source(p)) return fail('INVALID_PR_LINK');
    const values = patchOf(p, patch);
    if (!values) return fail('INVALID_PATCH');
    runtime.tick();
    const { errors, price } = validate(p, values, submit);
    const attempt = { attempt_id: runtime.nextId('PO-ATTEMPT-'), actor_id: runtime.context().user_id,
      occurred_at: runtime.context().time, action: submit ? 'SUBMIT' : 'SAVE', errors: clone(errors) };
    p.attempts.push(attempt);
    if (Object.keys(errors).length) return { ...fail('PO_VALIDATION_FAILED'), errors, time: runtime.context().time };
    const before = Object.fromEntries([...inputKeys].map(k => [k, p[k]]));
    Object.assign(p, values, { unit_price: price ?? values.unit_price });
    if (submit) {
      p.round++; p.finance_required = runtime.finance();
      p.approvals = { procurement: null, finance: null };
      p.return_reason = null; p.status = PO_STATUS.PROCUREMENT;
      append(p, 'SUBMIT', { finance_required: p.finance_required, submitted_values: clone(values) });
    } else append(p, 'SAVE', { before, after: clone(values) });
    return detail(id);
  }
  function detail(id) {
    const p = find(id);
    if (!readable(p)) return fail('NOT_FOUND_OR_FORBIDDEN');
    const linked = source(p);
    const eligible = linked && p.status === PO_STATUS.ELIGIBLE &&
      p.approvals.procurement?.round === p.round &&
      (!p.finance_required || p.approvals.finance?.round === p.round);
    return { ok: true, po: clone(p), generation: runtime.generation(),
      actions: { edit: isBuyer() && editable(p) && linked, submit: isBuyer() && editable(p) && linked,
        decide: Boolean(step(p) && linked), issue: Boolean(isBuyer() && eligible) },
      next_step: ({ [PO_STATUS.DRAFT]: 'Mua hàng hoàn thiện và gửi PO.',
        [PO_STATUS.PROCUREMENT]: 'Trưởng bộ phận mua hàng phê duyệt hoặc trả lại.',
        [PO_STATUS.FINANCE]: 'Trưởng bộ phận tài chính phê duyệt bổ sung hoặc trả lại.',
        [PO_STATUS.RETURNED]: 'Mua hàng chỉnh sửa và gửi lại; vòng mới bắt đầu từ phê duyệt Mua hàng.',
        [PO_STATUS.ELIGIBLE]: 'Mua hàng có thể phát hành mô phỏng; PO chưa được phát hành.',
        [PO_STATUS.ISSUED]: 'Phát hành mô phỏng đã ghi nhận; GR và hóa đơn chưa triển khai trong P2.' })[p.status] };
  }
  return Object.freeze({
    suppliers: () => mayRead() ? clone(suppliers) : [],
    list: () => mayRead() ? documents.filter(readable).map(p => detail(p.po_id)) : [],
    sources() {
      if (!isBuyer()) return fail('FORBIDDEN');
      return { ok: true, rows: pr.list().filter(p => pr.approvedSource(p.pr_id).ok).map(p => ({
        ...p, po_id: documents.find(d => d.source_pr_id === p.pr_id)?.po_id ?? null
      })) };
    },
    detail,
    create(prId) {
      if (!isBuyer()) return fail('FORBIDDEN');
      const s = pr.approvedSource(prId);
      if (!s.ok) return fail('PR_NOT_APPROVED_OR_FORBIDDEN');
      if (!validatePR(s.pr, seed.reference_data).valid) return fail('INVALID_PR_SOURCE');
      const existing = documents.find(p => p.source_pr_id === prId);
      if (existing) return { ...detail(existing.po_id), existing: true };
      runtime.tick();
      const p = { po_id: runtime.nextId('PO-DEMO-'), source_pr_id: prId,
        source_approval_event_id: s.approval_event.event_id, source_approval: clone(s.approval_event),
        source_snapshot: { requester_id: s.pr.requester_id, unit_id: s.pr.unit_id, cost_center_id: s.pr.cost_center_id,
          business_reason: s.pr.business_reason, needed_by: s.pr.needed_by, item: clone(s.pr.item) },
        unit_id: s.pr.unit_id, supplier_id: '', unit_price: '', delivery_terms: '', commercial_terms: '',
        status: PO_STATUS.DRAFT, round: 0, finance_required: null, approvals: { procurement: null, finance: null },
        return_reason: null, created_by: runtime.context().user_id, created_at: runtime.context().time,
        issued_at: null, issued_by: null, history: [], attempts: [] };
      documents.push(p); append(p, 'CREATE', { source_pr_id: prId, source_approval_event_id: p.source_approval_event_id });
      return detail(p.po_id);
    },
    save: (id, patch) => write(id, patch, false),
    submit: (id, patch) => write(id, patch, true),
    decide(id, type, { reason } = {}) {
      const p = find(id);
      if (!readable(p) || !step(p) || !source(p) || !['APPROVE', 'RETURN_FOR_EDIT'].includes(type)) return fail('FORBIDDEN_OR_INVALID_PO_DECISION');
      if (type === 'RETURN_FOR_EDIT' && !nonblank(reason)) return fail('RETURN_REASON_REQUIRED');
      runtime.tick();
      const event = append(p, type, { step: p.status, ...(type === 'RETURN_FOR_EDIT' ? { reason: reason.trim() } : {}) });
      if (type === 'RETURN_FOR_EDIT') { p.status = PO_STATUS.RETURNED; p.return_reason = reason.trim(); }
      else {
        const approval = { event_id: event.event_id, round: p.round, actor_id: event.actor_id, occurred_at: event.occurred_at };
        if (p.status === PO_STATUS.PROCUREMENT) {
          p.approvals.procurement = approval; p.status = p.finance_required ? PO_STATUS.FINANCE : PO_STATUS.ELIGIBLE;
        } else { p.approvals.finance = approval; p.status = PO_STATUS.ELIGIBLE; }
      }
      return detail(id);
    },
    issue(id) {
      const result = detail(id);
      if (!result.ok || !result.actions.issue) return fail('PO_NOT_ELIGIBLE_OR_FORBIDDEN');
      const p = find(id); runtime.tick();
      p.status = PO_STATUS.ISSUED; p.issued_at = runtime.context().time; p.issued_by = runtime.context().user_id;
      append(p, 'ISSUE_SIMULATED'); return detail(id);
    }
  });
}
