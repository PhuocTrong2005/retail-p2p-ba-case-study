import { readFileSync } from 'node:fs';

export const seedUrl = new URL('../data/seed.json', import.meta.url);
export const loadSeed = () => JSON.parse(readFileSync(seedUrl, 'utf8'));
export const clone = value => structuredClone(value);
export const T0 = '2026-10-10T12:00:00+07:00';
export const validInput = { cost_center_id: 'CC-OPS', business_reason: 'Thay thiết bị hỏng tại quầy.',
  needed_by: '15/10/2026', item: { description: 'Máy quét USB', quantity: '1.5', estimated_unit_price: '0' } };

// Fixtures are isolated copies; never write to seed.json.
export function singlePR() {
  const data = loadSeed();
  data.purchase_requisitions = [data.purchase_requisitions[0]];
  data.events = [data.events[0]];
  data.historical_checks = [data.historical_checks[0]];
  return data;
}

export function addEvent(data, type, at, round, extra = {}) {
  const id = `FIX-${data.events.length + 1}`;
  const event = { event_id: id, pr_id: data.purchase_requisitions[0].pr_id, event_type: type, occurred_at: at,
    event_order: data.events.length + 1, review_round: round,
    actor_id: type.includes('SUBMIT') ? 'REQ-01' : 'MGR-01', ...extra };
  if (type.includes('SUBMIT')) {
    Object.assign(event, { required_fields_passed: true, budget_check_passed: true, check_reference: `CHK-${id}` });
    data.historical_checks.push({ event_id: id, check_reference: event.check_reference, simulated: true,
      required_fields_passed: true, budget_check_passed: true });
  }
  data.events.push(event);
  return event;
}
