import { timestamp, formatWait, formatRatioHalfUp } from './time.mjs';
import { nonblank } from './validation.mjs';

export const STATUS = Object.freeze({ DRAFT: 'Nháp', WAITING: 'Chờ xem xét', RETURNED: 'Chờ chỉnh sửa', APPROVED: 'Đã duyệt', REJECTED: 'Đã từ chối', UNKNOWN: 'Không xác định' });
const submitTypes = new Set(['FIRST_VALID_SUBMIT', 'VALID_RESUBMIT']);
const decisions = { RETURN_FOR_EDIT: STATUS.RETURNED, APPROVE: STATUS.APPROVED, REJECT: STATUS.REJECTED };
const positiveInteger = n => Number.isInteger(n) && n > 0;
const same = (a, b) => {
  const canonical = x => Array.isArray(x) ? x.map(canonical) : x && typeof x === 'object'
    ? Object.fromEntries(Object.keys(x).sort().map(k => [k, canonical(x[k])])) : x;
  return JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));
};

// Inspect only workflow evidence; current document text is never a historic snapshot.
export function inspectHistory(data, pr, T, { explicitDrafts = [] } = {}) {
  data = { ...data, events: Array.isArray(data.events) ? data.events : [],
    historical_checks: Array.isArray(data.historical_checks) ? data.historical_checks : [] };
  const t = timestamp(T);
  if (!Number.isFinite(t)) throw new RangeError('T must be an offset timestamp');
  const reasons = [];
  const issue = (kind, event, message) => reasons.push({ kind, event_id: event?.event_id ?? null, message });
  if (!nonblank(pr.pr_id) || data.purchase_requisitions.filter(p => p.pr_id === pr.pr_id).length !== 1) {
    issue('invalid', null, 'Missing or ambiguous PR identity');
  }
  const related = data.events.filter(e => e.pr_id === pr.pr_id);
  const included = related.filter(e => !Number.isFinite(timestamp(e.occurred_at)) || timestamp(e.occurred_at) <= t);
  const byId = new Map(), conflictIds = new Set();
  for (const e of included) {
    if (!nonblank(e.event_id)) { issue('missing', e, 'Missing event_id'); continue; }
    // An ID reused by another PR is also a conflict, even outside this PR's group.
    const copies = data.events.filter(x => x.event_id === e.event_id &&
      (!Number.isFinite(timestamp(x.occurred_at)) || timestamp(x.occurred_at) <= t));
    if (copies.some(x => !same(x, e))) conflictIds.add(e.event_id);
    if (!byId.has(e.event_id)) byId.set(e.event_id, e);
  }
  const ordered = [...byId.values()].sort((a, b) => timestamp(a.occurred_at) - timestamp(b.occurred_at) || a.event_order - b.event_order);
  let state = null, round = 0, lastOrder = 0, opened = null, first = null, everReturned = false;
  let broken = reasons.length > 0, firstAmbiguous = false;
  const candidates = ordered.filter(e => e.event_type === 'FIRST_VALID_SUBMIT');
  if (candidates.length > 1 || candidates.some(e => conflictIds.has(e.event_id))) firstAmbiguous = true;
  for (const e of ordered) {
    const before = reasons.length;
    if (conflictIds.has(e.event_id)) issue('invalid', e, 'Conflicting event_id');
    if (!Number.isFinite(timestamp(e.occurred_at))) issue(nonblank(e.occurred_at) ? 'invalid' : 'missing', e, 'Missing or invalid offset timestamp');
    if (!positiveInteger(e.event_order) || e.event_order <= lastOrder) issue(e.event_order == null ? 'missing' : 'invalid', e, 'Missing or contradictory event_order');
    if (!positiveInteger(e.review_round)) issue(e.review_round == null ? 'missing' : 'invalid', e, 'Missing or invalid review_round');
    if (e.event_type === 'RETURN_FOR_EDIT' && !nonblank(e.return_reason)) issue('missing', e, 'Missing recorded return reason');
    if (positiveInteger(e.event_order)) lastOrder = e.event_order;
    const isSubmit = submitTypes.has(e.event_type);
    if (isSubmit) {
      const checks = data.historical_checks.filter(c => c.check_reference === e.check_reference);
      if (e.required_fields_passed !== true || e.budget_check_passed !== true || !nonblank(e.check_reference) ||
          checks.length !== 1 || checks[0].event_id !== e.event_id || checks[0].required_fields_passed !== true || checks[0].budget_check_passed !== true) {
        const contradictory = e.required_fields_passed === false || e.budget_check_passed === false ||
          checks.some(c => c.event_id !== e.event_id || c.required_fields_passed === false || c.budget_check_passed === false);
        issue(contradictory ? 'invalid' : 'missing', e, 'Missing or contradictory valid-submit evidence');
      }
    }
    if (reasons.length !== before) broken = true;
    if (broken) continue; // Preserve trustworthy prefix evidence for each metric separately.
    if (e.event_type === 'FIRST_VALID_SUBMIT' && state === null && e.review_round === 1) {
      first = e; opened = e; state = STATUS.WAITING; round = 1;
    } else if (e.event_type === 'VALID_RESUBMIT' && state === STATUS.RETURNED && e.review_round === round + 1) {
      opened = e; state = STATUS.WAITING; round++;
    } else if (decisions[e.event_type] && state === STATUS.WAITING && e.review_round === round) {
      state = decisions[e.event_type];
      if (e.event_type === 'RETURN_FOR_EDIT') everReturned = true;
    } else {
      issue('invalid', e, 'Invalid opening/closing sequence'); broken = true;
    }
  }
  const coverage = pr.history_coverage ?? data.metadata?.history_coverage;
  const complete = Number.isFinite(timestamp(coverage?.complete_through)) && timestamp(coverage.complete_through) >= t &&
    (pr.history_coverage !== undefined || coverage.all_seed_prs_included === true);
  const explicitDraft = explicitDrafts.includes(pr.pr_id) && included.length === 0 && related.length === 0;
  const terminal = state === STATUS.APPROVED || state === STATUS.REJECTED;
  if (!complete && !terminal && !explicitDraft) issue('missing', null, 'History not confirmed complete through T');
  if (!first && !explicitDraft) issue('missing', null, 'No proven first valid submission; not evidence of a draft');
  const currentKnown = !broken && (explicitDraft || (first && (complete || terminal)));
  const currentStatus = explicitDraft ? STATUS.DRAFT : currentKnown ? state : STATUS.UNKNOWN;
  return {
    pr_id: pr.pr_id, status: currentStatus, round, opened,
    first: firstAmbiguous ? null : first, everReturned,
    returnKnown: !firstAmbiguous && Boolean(first) && (everReturned || (!broken && (complete || terminal))),
    currentKnown: Boolean(currentKnown), explicitDraft, reasons,
    unknown_label: reasons.some(r => r.kind === 'invalid') ? 'Không xác định do dữ liệu không hợp lệ' : 'Không xác định do thiếu dữ liệu',
    events: ordered
  };
}

export function calculateMetrics(data, T, { unitId = data.demo_config.unit_id, explicitDrafts = [] } = {}) {
  data = { ...data, events: Array.isArray(data.events) ? data.events : [],
    historical_checks: Array.isArray(data.historical_checks) ? data.historical_checks : [] };
  const t = timestamp(T), s = timestamp(data.demo_config.cohort.start_inclusive), e = timestamp(data.demo_config.cohort.end_exclusive);
  if (![t, s, e].every(Number.isFinite) || !(s < e && e <= t)) throw new RangeError('Require S < E <= T with offset timestamps');
  const scope = data.purchase_requisitions.filter(p => p.unit_id === unitId);
  const idCounts = new Map();
  for (const p of scope) idCounts.set(p.pr_id, (idCounts.get(p.pr_id) ?? 0) + 1);
  const sourceIds = new Set(data.purchase_requisitions.map(p => p.pr_id).filter(nonblank));
  const unlinked = data.events.filter(ev => (!Number.isFinite(timestamp(ev.occurred_at)) || timestamp(ev.occurred_at) <= t) &&
    (!nonblank(ev.pr_id) || !sourceIds.has(ev.pr_id))).length + scope.filter(p => !nonblank(p.pr_id)).length;
  const analyses = [];
  for (const p of scope) {
    if (!nonblank(p.pr_id) || analyses.some(a => a.pr_id === p.pr_id)) continue;
    const a = inspectHistory(data, p, T, { explicitDrafts });
    if (idCounts.get(p.pr_id) > 1) {
      a.status = STATUS.UNKNOWN; a.currentKnown = false; a.first = null; a.returnKnown = false;
      a.reasons.push({ kind: 'invalid', event_id: null, message: 'Duplicate PR identity' });
      a.unknown_label = 'Không xác định do dữ liệu không hợp lệ';
    }
    analyses.push(a);
  }
  const unknownCurrent = analyses.filter(a => !a.currentKnown);
  const waiting = analyses.filter(a => a.status === STATUS.WAITING);
  const ages = analyses.map(a => {
    if (!a.currentKnown) return { pr_id: a.pr_id, label: a.unknown_label, hours: null, reasons: a.reasons };
    if (a.status !== STATUS.WAITING) return { pr_id: a.pr_id, label: 'Không áp dụng', hours: null };
    const milliseconds = t - timestamp(a.opened.occurred_at);
    return { pr_id: a.pr_id, label: `${formatWait(milliseconds)} giờ`, hours: milliseconds / 3600000, milliseconds, opened_at: a.opened.occurred_at };
  });
  const unknownCohort = analyses.filter(a => !a.first && !a.explicitDraft);
  const cohort = analyses.filter(a => a.first && s <= timestamp(a.first.occurred_at) && timestamp(a.first.occurred_at) < e);
  const unknownReturns = cohort.filter(a => !a.returnKnown);
  const counted = cohort.filter(a => a.returnKnown);
  const numerator = counted.filter(a => a.everReturned).length;
  const denominator = counted.length;
  const count = rows => unlinked ? 'Không xác định đầy đủ' : rows.length;
  return {
    data_label: data.metadata?.data_label, T, unit_id: unitId,
    met01: { count: waiting.length, pr_ids: waiting.map(a => a.pr_id), unknown_count: count(unknownCurrent), unknown: unknownCurrent },
    met02: { values: ages, unknown_count: count(unknownCurrent), unknown_status_count: unknownCurrent.length, unknown_duration_count: 0 },
    met03: {
      cohort_ids: cohort.map(a => a.pr_id), counted_ids: counted.map(a => a.pr_id), numerator, denominator,
      percent: denominator ? 100 * numerator / denominator : null,
      label: denominator ? `${formatRatioHalfUp(numerator * 100, denominator).replace('.', ',')}%` : 'Không có dữ liệu',
      unknown_count: unlinked ? 'Không xác định đầy đủ' : unknownCohort.length + unknownReturns.length,
      unknown_cohort: unknownCohort, unknown_return_history: unknownReturns,
      context: {
        waiting: cohort.filter(a => a.status === STATUS.WAITING).length,
        awaiting_edit: cohort.filter(a => a.status === STATUS.RETURNED).length,
        unknown_count: cohort.filter(a => !a.currentKnown).length
      }
    },
    quality: { unlinked_records: unlinked, source_coverage_confirmed: data.metadata?.history_coverage?.all_seed_prs_included === true,
      partial: Boolean(unlinked || unknownCurrent.length || unknownCohort.length || unknownReturns.length) }
  };
}
