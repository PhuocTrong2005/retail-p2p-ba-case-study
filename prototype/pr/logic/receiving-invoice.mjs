import { parseNumber, parseDate, nonblank } from './validation.mjs';

const copy = value => structuredClone(value);
const fail = code => ({ ok: false, code });
const invoiceFields = ['number', 'invoice_on', 'supplier_id', 'description', 'quantity', 'unit_price', 'amount'];
const invoiceKeys = [...invoiceFields, 'note'];
const readers = ['PROCUREMENT_OFFICER', 'PROCUREMENT_MANAGER', 'FINANCE_MANAGER', 'AP'];

// Owns receipt/invoice records and input revisions, never assessments or payment.
export function createReceivingInvoiceDomain(runtime, po, { invoiceLocked = () => false } = {}) {
  let receipts, invoices, revisions, changes, attempts;
  function initialize() { receipts = []; invoices = []; revisions = new Map(); changes = []; attempts = []; }
  initialize(); runtime.onReset(initialize);
  const actor = () => runtime.actor();
  const inUnit = () => actor()?.unit_id === runtime.context().unit_id;
  const is = role => inUnit() && actor()?.role_id === role;
  const mayInvoice = () => inUnit() && readers.includes(actor()?.role_id);
  const mayGR = () => mayInvoice() || is('WAREHOUSE');
  const getPO = id => po.detail(id);
  const receiptOf = id => receipts.find(g => g.po_id === id);
  const invoiceOf = id => invoices.find(i => i.po_id === id);
  const revision = id => revisions.get(id) ?? 0;
  function bump(poId, type, documentId) {
    const before = revision(poId); revisions.set(poId, before + 1);
    changes.push({ po_id: poId, document_id: documentId, action: type, before, after: before + 1,
      actor_id: actor().id, occurred_at: runtime.context().time });
  }
  function event(doc, type, before, after) {
    doc.history.push({ event_id: runtime.nextId('DOCUMENT-EVENT-'), document_id: doc.gr_id ?? doc.invoice_id,
      po_id: doc.po_id, action: type, actor_id: actor().id, occurred_at: runtime.context().time,
      before: copy(before), after: copy(after), input_revision: revision(doc.po_id),
      ...(doc.invoice_id ? { invoice_revision: doc.invoice_revision } : {}) });
  }
  function acceptPatch(patch, keys) {
    return patch && typeof patch === 'object' && !Array.isArray(patch) &&
      Object.keys(patch).every(k => keys.includes(k)) &&
      Object.entries(patch).every(([k,v]) => ['quantity','unit_price','amount'].includes(k) ?
        ['string','number'].includes(typeof v) : typeof v === 'string');
  }
  function validateInvoice(values) {
    const errors = {}, normalized = { ...values };
    for (const key of ['number','description']) {
      if (!nonblank(values[key])) errors[key] = 'Nhập nội dung không trống.';
      else normalized[key] = values[key].trim();
    }
    normalized.note = (values.note ?? '').trim();
    normalized.invoice_on = parseDate(values.invoice_on);
    if (!normalized.invoice_on) errors.invoice_on = 'Nhập ngày hóa đơn hợp lệ: DD/MM/YYYY hoặc YYYY-MM-DD.';
    if (!po.suppliers().some(s => s.id === values.supplier_id)) errors.supplier_id = 'Chọn nhà cung cấp có trong danh mục mẫu.';
    for (const key of ['quantity','unit_price','amount']) {
      const value = parseNumber(values[key]); normalized[key] = value;
      if (value === null || (key === 'quantity' ? value <= 0 : value < 0)) errors[key] =
        key === 'quantity' ? 'Nhập số lượng hữu hạn lớn hơn 0.' : 'Nhập số hữu hạn không âm; cho phép 0.';
    }
    return { errors, normalized };
  }
  function attempted(poId, action, errors) {
    attempts.push({ attempt_id: runtime.nextId('DOCUMENT-ATTEMPT-'), po_id: poId, action,
      actor_id: actor().id, occurred_at: runtime.context().time, errors: copy(errors) });
    return { ...fail('DOCUMENT_VALIDATION_FAILED'), errors, time: runtime.context().time };
  }
  function gr(poId, grId) {
    const source = getPO(poId), record = receiptOf(poId);
    if (!mayGR() || !source.ok || !record || (grId !== undefined && record.gr_id !== grId)) return fail('NOT_FOUND_OR_FORBIDDEN');
    return { ok: true, gr: copy(record) };
  }
  function invoice(poId, invoiceId) {
    const source = getPO(poId), record = invoiceOf(poId);
    if (!mayInvoice() || !source.ok || !record || (invoiceId !== undefined && record.invoice_id !== invoiceId)) return fail('NOT_FOUND_OR_FORBIDDEN');
    return { ok: true, invoice: copy(record), readiness: readiness(poId) };
  }
  function readiness(poId) {
    const source = getPO(poId);
    if (!mayInvoice() || !source.ok) return fail('NOT_FOUND_OR_FORBIDDEN');
    const p = source.po, g = receiptOf(poId), i = invoiceOf(poId), missing = [];
    if (!po.suppliers().some(s => s.id === p.supplier_id)) missing.push('Nhà cung cấp PO');
    if (parseNumber(p.unit_price) === null || parseNumber(p.unit_price) < 0) missing.push('Giá mua PO');
    if (!nonblank(p.source_snapshot.item.description) || !(parseNumber(p.source_snapshot.item.quantity) > 0)) missing.push('Dòng hàng PO');
    if (!g) missing.push('Phiếu nhận hàng');
    if (!i) missing.push('Hóa đơn');
    else if (Object.keys(validateInvoice(i).errors).length) missing.push('Trường hóa đơn bắt buộc');
    return { ok: true, missing, input_revision: revision(poId),
      label: !g && i ? 'Chờ phiếu nhận hàng' : missing.length ? 'Chờ dữ liệu' : 'Đủ dữ liệu tối thiểu — chưa đối chiếu' };
  }
  return Object.freeze({
    gr, invoice, readiness,
    // Internal snapshot for P4; uses the existing validators and live records.
    assessmentInput(poId) {
      const r=readiness(poId);
      if(!r.ok) return r;
      const p=getPO(poId).po,g=receiptOf(poId),i=invoiceOf(poId),missing=[...r.missing];
      if(g && (!po.approved(poId)||!parseDate(g.received_on)||!(parseNumber(g.quantity)>0))) missing.push('GR hợp lệ theo PO đã duyệt');
      return {ok:true,po:copy(p),gr:copy(g ?? null),invoice:copy(i ?? null),input_revision:revision(poId),missing};
    },
    summary(poId) {
      const source = getPO(poId);
      if (!mayGR() || !source.ok) return fail('NOT_FOUND_OR_FORBIDDEN');
      return { ok: true, po_id: poId, gr_id: receiptOf(poId)?.gr_id ?? null,
        invoice_id: mayInvoice() ? invoiceOf(poId)?.invoice_id ?? null : null,
        input_revision: mayInvoice() ? revision(poId) : null,
        readiness: mayInvoice() ? readiness(poId) : null,
        actions: { record_gr: is('WAREHOUSE') && po.approved(poId) && !receiptOf(poId),
          record_invoice: is('AP') && !invoiceOf(poId), edit_invoice: is('AP') && Boolean(invoiceOf(poId)) && !invoiceLocked(poId) } };
    },
    revisionHistory(poId) {
      if (!mayInvoice() || !getPO(poId).ok) return fail('NOT_FOUND_OR_FORBIDDEN');
      return { ok: true, changes: copy(changes.filter(c => c.po_id === poId)), attempts: copy(attempts.filter(a => a.po_id === poId)) };
    },
    recordGR(poId, patch) {
      if (!is('WAREHOUSE') || !getPO(poId).ok || !po.approved(poId)) return fail('PO_NOT_APPROVED_OR_FORBIDDEN');
      const old = receiptOf(poId);
      if (old) return { ...gr(poId), existing: true };
      if (!acceptPatch(patch, ['received_on','quantity'])) return fail('INVALID_PATCH');
      runtime.tick();
      const received_on = parseDate(patch.received_on), quantity = parseNumber(patch.quantity), errors = {};
      if (!received_on) errors.received_on = 'Nhập ngày nhận hợp lệ: DD/MM/YYYY hoặc YYYY-MM-DD.';
      if (quantity === null || quantity <= 0) errors.quantity = 'Nhập số lượng hữu hạn lớn hơn 0.';
      else if (quantity !== getPO(poId).po.source_snapshot.item.quantity) errors.quantity = 'Ngoài phạm vi demo: chỉ nhận đủ một lần, lượng thực nhận phải bằng lượng PO. Phần nhập được giữ để sửa.';
      if (Object.keys(errors).length) return attempted(poId, 'RECORD_GR', errors);
      const source = getPO(poId).po;
      const record = { gr_id: runtime.nextId('GR-DEMO-'), po_id: poId, source_pr_id: source.source_pr_id,
        unit_id: source.unit_id, received_on, quantity, recorded_by: actor().id, recorded_at: runtime.context().time, history: [] };
      receipts.push(record); bump(poId, 'RECORD_GR', record.gr_id);
      event(record, 'RECORD_GR', null, { received_on, quantity });
      return gr(poId);
    },
    recordInvoice(poId, patch) {
      if (!is('AP') || !getPO(poId).ok) return fail('NOT_FOUND_OR_FORBIDDEN');
      const old = invoiceOf(poId);
      if (old) return { ...invoice(poId), existing: true };
      if (!acceptPatch(patch, invoiceKeys)) return fail('INVALID_PATCH');
      runtime.tick();
      const { errors, normalized } = validateInvoice(patch);
      if (Object.keys(errors).length) return attempted(poId, 'RECORD_INVOICE', errors);
      const source = getPO(poId).po;
      const record = { ...normalized, invoice_id: runtime.nextId('INV-DEMO-'), po_id: poId, source_pr_id: source.source_pr_id,
        unit_id: source.unit_id, invoice_revision: 1, recorded_by: actor().id, recorded_at: runtime.context().time,
        updated_by: actor().id, updated_at: runtime.context().time, history: [] };
      invoices.push(record); bump(poId, 'RECORD_INVOICE', record.invoice_id);
      event(record, 'RECORD_INVOICE', null, normalized);
      return invoice(poId);
    },
    saveInvoice(poId, invoiceId, patch) {
      if (!is('AP') || !invoice(poId, invoiceId).ok) return fail('NOT_FOUND_OR_FORBIDDEN');
      if (invoiceLocked(poId)) return fail('TRANSACTION_LOCKED');
      if (!acceptPatch(patch, invoiceKeys)) return fail('INVALID_PATCH');
      const record = invoiceOf(poId), before = Object.fromEntries(invoiceKeys.map(k => [k, record[k]]));
      runtime.tick();
      const { errors, normalized } = validateInvoice({ ...before, ...patch });
      if (Object.keys(errors).length) return attempted(poId, 'SAVE_INVOICE', errors);
      const changed = invoiceFields.some(k => before[k] !== normalized[k]);
      if (changed) { record.invoice_revision++; bump(poId, 'SAVE_INVOICE', invoiceId); }
      Object.assign(record, normalized, { updated_by: actor().id, updated_at: runtime.context().time });
      event(record, 'SAVE_INVOICE', before, normalized);
      return invoice(poId);
    }
  });
}
