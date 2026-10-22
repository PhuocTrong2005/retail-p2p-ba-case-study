import { timestamp } from './time.mjs';
import { createSessionContext } from './session-context.mjs';
import { validatePR, nonblank } from './validation.mjs';
import { inspectHistory, calculateMetrics, STATUS } from './metrics.mjs';

const clone = value => structuredClone(value);
const fail = code => ({ ok: false, code });
const editable = status => status === STATUS.DRAFT || status === STATUS.RETURNED;
const editableKeys = new Set(['cost_center_id', 'business_reason', 'needed_by', 'item']);

// A small in-memory session, not an audit store. No I/O, DOM, or real clock.
export function createPRSession(seed, sharedContext = null) {
  const initial = clone(seed);
  const runtime = sharedContext ?? createSessionContext(initial);
  const now = () => runtime.context().time;
  const userId = () => runtime.context().user_id;
  let data, forms, explicitDrafts, completeIds, feedback;
  const requesterId = initial.demo_config.initial_user_id;
  const unitId = initial.demo_config.unit_id;
  const managerId = initial.reference_data.units.find(u => u.id === unitId)?.reviewer_id;
  function initialize() {
    data = clone(initial);
    if (!Array.isArray(data.events)) data.events = [];
    if (!Array.isArray(data.historical_checks)) data.historical_checks = [];
    forms = new Map(); explicitDrafts = new Set(); feedback = new Map();
    completeIds = new Set(data.purchase_requisitions.filter(p => {
      const c = p.history_coverage ?? data.metadata?.history_coverage;
      return timestamp(c?.complete_through) >= timestamp(now()) &&
        (p.history_coverage !== undefined || c?.all_seed_prs_included === true);
    }).map(p => p.pr_id));
  }
  initialize();
  const user = () => data.reference_data.users.find(u => u.id === userId());
  const isRequester = () => userId() === requesterId && user()?.role_id === 'REQUESTER' && user()?.unit_id === unitId;
  const isManager = () => userId() === managerId && user()?.role_id === 'STORE_MANAGER' && user()?.unit_id === unitId;
  const owns = p => isRequester() && p.requester_id === userId() && p.unit_id === unitId;
  const purchasingReader = () => ['PROCUREMENT_OFFICER', 'PROCUREMENT_MANAGER', 'FINANCE_MANAGER', 'AP'].includes(runtime.actor()?.role_id) && runtime.actor()?.unit_id === unitId;
  const readable = p => p && (owns(p) || (isManager() && p.unit_id === unitId) ||
    (purchasingReader() && p.unit_id === unitId && analysis(p).status === STATUS.APPROVED));
  const find = id => data.purchase_requisitions.find(p => p.pr_id === id);
  const analysis = p => inspectHistory(data, p, now(), { explicitDrafts: [...explicitDrafts] });
  const statusOf = p => forms.has(p.pr_id) && !find(p.pr_id) ? STATUS.DRAFT : analysis(p).status;
  runtime.onReset(initialize);
  runtime.onTick(time => {
    // Extend completeness only for histories actually known to this session.
    for (const p of data.purchase_requisitions) {
      if (completeIds.has(p.pr_id)) p.history_coverage = { complete_through: time };
    }
  });
  const tick = () => runtime.tick();
  function working(id) {
    const p = forms.get(id) ?? find(id);
    if (!p || !owns(p)) return null;
    return editable(statusOf(p)) ? p : null;
  }
  function persist(p) {
    const existing = find(p.pr_id);
    const saved = clone(p);
    if (completeIds.has(p.pr_id)) saved.history_coverage = { complete_through: now() };
    if (existing) data.purchase_requisitions[data.purchase_requisitions.indexOf(existing)] = saved;
    else data.purchase_requisitions.push(saved);
    forms.delete(p.pr_id);
    return saved;
  }
  function append(p, type, round, extra = {}) {
    let id;
    do { id = runtime.nextId('DEMO-EVENT-'); }
    while (data.events.some(e => e.event_id === id) || data.historical_checks.some(c => c.check_reference === `CHK-${id}`));
    const orders = data.events.filter(e => e.pr_id === p.pr_id).map(e => e.event_order);
    const event = { event_id: id, pr_id: p.pr_id, event_type: type, occurred_at: now(),
      event_order: Math.max(0, ...orders) + 1, review_round: round, actor_id: userId(), ...extra };
    data.events.push(event);
    completeIds.add(p.pr_id); p.history_coverage = { complete_through: now() };
    return event;
  }
  function processHistory(p) {
    return analysis(p).events.map(e => ({ event_id: e.event_id, pr_id: e.pr_id, actor_id: e.actor_id,
      event_type: e.event_type, occurred_at: e.occurred_at, event_order: e.event_order,
      review_round: e.review_round, ...(e.return_reason !== undefined ? { return_reason: e.return_reason } : {}) }));
  }
  function detail(id) {
    const p = find(id);
    if (!readable(p)) return fail('NOT_FOUND_OR_FORBIDDEN');
    const a = analysis(p);
    const age = calculateMetrics(data, now(), { unitId, explicitDrafts: [...explicitDrafts] }).met02.values.find(v => v.pr_id === id);
    const lastReturn = [...a.events].reverse().find(e => e.event_type === 'RETURN_FOR_EDIT');
    return { ok: true, pr: clone(p), status: a.status, round: a.round, wait: clone(age),
      ready_for_purchasing: a.status === STATUS.APPROVED,
      actions: { edit: owns(p) && editable(a.status), submit: owns(p) && editable(a.status),
        decide: isManager() && a.status === STATUS.WAITING },
      next_step: a.status === STATUS.RETURNED ? 'Chỉnh sửa và gửi lại; kiểm tra lại trường bắt buộc và ngân sách.' : null,
      return_reason: lastReturn?.return_reason ?? null,
      feedback: owns(p) ? clone(feedback.get(id) ?? null) : null };
  }
  return Object.freeze({
    context: () => runtime.context(),
    setUser(id) {
      if (![requesterId, managerId].includes(id) || !data.reference_data.users.some(u => u.id === id)) return fail('INVALID_DEMO_USER');
      return runtime.setUser(id);
    },
    setBudget(outcome) {
      if (!['PASS', 'INSUFFICIENT', 'UNAVAILABLE'].includes(outcome)) return fail('INVALID_BUDGET_OUTCOME');
      return runtime.setBudget(outcome);
    },
    beginNew() {
      if (!isRequester()) return fail('FORBIDDEN');
      let id;
      do { id = runtime.nextId('PR-NEW-'); } while (find(id) || forms.has(id) || data.events.some(e => e.pr_id === id));
      const pr = { pr_id: id, requester_id: requesterId, unit_id: unitId, cost_center_id: '', business_reason: '',
        needed_by: '', item: { description: '', quantity: '', estimated_unit_price: '' } };
      forms.set(id, pr); explicitDrafts.add(id); completeIds.add(id);
      return { ok: true, pr: clone(pr) };
    },
    edit(id, patch) {
      const p = working(id);
      if (!p) return fail('NOT_EDITABLE_OR_FORBIDDEN');
      if (!patch || typeof patch !== 'object' || Array.isArray(patch) || Object.keys(patch).some(k => !editableKeys.has(k)) ||
          ('item' in patch && (!patch.item || typeof patch.item !== 'object' || Array.isArray(patch.item) ||
            Object.keys(patch.item).some(k => !['description', 'quantity', 'estimated_unit_price'].includes(k))))) return fail('INVALID_PATCH');
      const updated = { ...clone(p), ...clone(patch), item: { ...p.item, ...clone(patch.item ?? {}) } };
      forms.set(id, updated);
      return { ok: true, pr: clone(updated) };
    },
    openForm(id) {
      const p = working(id);
      return p ? { ok: true, pr: clone(p) } : fail('NOT_EDITABLE_OR_FORBIDDEN');
    },
    save(id) {
      const p = working(id);
      if (!p) return fail('NOT_EDITABLE_OR_FORBIDDEN');
      tick(); const saved = persist(p);
      return { ok: true, time: now(), status: analysis(saved).status };
    },
    submit(id) {
      const p = working(id);
      if (!p) return fail('NOT_EDITABLE_OR_FORBIDDEN');
      const previous = statusOf(p) === STATUS.DRAFT ? null : analysis(p);
      tick(); let saved = persist(p);
      const validation = validatePR(saved, data.reference_data);
      if (!validation.valid) {
        const result = { ok: false, code: 'VALIDATION_FAILED', time: now(), errors: validation.errors, budget_checked: false };
        feedback.set(id, clone(result)); return result;
      }
      const budget = runtime.context().budget_outcome;
      if (budget !== 'PASS') {
        const result = { ok: false, code: budget === 'INSUFFICIENT' ? 'INSUFFICIENT_BUDGET' : 'BUDGET_UNAVAILABLE',
          time: now(), budget_checked: true, budget_outcome: budget };
        feedback.set(id, clone(result)); return result;
      }
      saved = persist(validation.normalized);
      const event = append(saved, previous ? 'VALID_RESUBMIT' : 'FIRST_VALID_SUBMIT', previous ? previous.round + 1 : 1,
        { required_fields_passed: true, budget_check_passed: true });
      event.check_reference = `CHK-${event.event_id}`;
      data.historical_checks.push({ check_reference: event.check_reference, event_id: event.event_id,
        simulated: true, required_fields_passed: true, budget_check_passed: true });
      explicitDrafts.delete(id);
      const result = { ok: true, time: now(), event: clone(event), budget_checked: true, budget_outcome: 'PASS', status: STATUS.WAITING };
      feedback.set(id, clone(result)); return result;
    },
    decide(id, type, { reason, confirmed = false } = {}) {
      const p = find(id);
      if (!isManager() || !readable(p) || !['APPROVE', 'RETURN_FOR_EDIT', 'REJECT'].includes(type)) return fail('FORBIDDEN_OR_INVALID_DECISION');
      const a = analysis(p);
      if (a.status !== STATUS.WAITING) return fail('NOT_WAITING');
      if (type === 'RETURN_FOR_EDIT' && !nonblank(reason)) return { ...fail('RETURN_REASON_REQUIRED'), errors: { return_reason: { field: 'return_reason', code: 'REQUIRED' } } };
      if (type === 'REJECT' && confirmed !== true) return fail('CONFIRMATION_REQUIRED');
      tick(); const event = append(p, type, a.round, type === 'RETURN_FOR_EDIT' ? { return_reason: reason.trim() } : {});
      return { ok: true, time: now(), event: clone(event), status: analysis(p).status, ready_for_purchasing: type === 'APPROVE' };
    },
    detail,
    // Internal link check for downstream domains; exposes no PR data to their UI.
    approvedLink(id, eventId) {
      const matches = data.purchase_requisitions.filter(p => p.pr_id === id && p.unit_id === unitId);
      if (matches.length !== 1) return false;
      const a = analysis(matches[0]), approval = a.events.at(-1);
      return a.status === STATUS.APPROVED && approval?.event_type === 'APPROVE' &&
        approval.actor_id === managerId && nonblank(approval.event_id) && approval.event_id === eventId;
    },
    approvedSource(id) {
      const p = find(id);
      if (!purchasingReader() || !p || p.unit_id !== unitId) return fail('NOT_FOUND_OR_FORBIDDEN');
      const a = analysis(p);
      const approval = a.events.at(-1);
      if (a.status !== STATUS.APPROVED || approval?.event_type !== 'APPROVE' ||
          approval.actor_id !== managerId || !nonblank(approval.event_id)) return fail('PR_NOT_APPROVED');
      return { ok: true, pr: clone(p), approval_event: clone(approval) };
    },
    history(id) {
      const p = find(id);
      return readable(p) ? { ok: true, events: clone(processHistory(p)), document_snapshots_available: false } : fail('NOT_FOUND_OR_FORBIDDEN');
    },
    list() {
      return data.purchase_requisitions.filter(readable).map(p => ({ pr_id: p.pr_id, requester_id: p.requester_id,
        unit_id: p.unit_id, description: p.item?.description, status: analysis(p).status }));
    },
    queue() {
      if (!isManager()) return fail('FORBIDDEN');
      return { ok: true, rows: data.purchase_requisitions.filter(p => readable(p) && analysis(p).status === STATUS.WAITING).map(p => detail(p.pr_id)) };
    },
    metrics() {
      if (!isManager()) return fail('FORBIDDEN');
      return { ok: true, ...clone(calculateMetrics(data, now(), { unitId, explicitDrafts: [...explicitDrafts] })) };
    },
    reset({ confirmed = false } = {}) {
      if (confirmed !== true) return fail('CONFIRMATION_REQUIRED');
      return runtime.reset({ confirmed });
    }
  });
}
