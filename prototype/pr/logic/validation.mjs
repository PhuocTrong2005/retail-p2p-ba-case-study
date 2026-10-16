import { calendarDate } from './time.mjs';

export const nonblank = value => typeof value === 'string' && value.trim().length > 0;

export function parseNumber(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string' || !/^[+-]?[0-9]+(?:\.[0-9]+)?$/.test(value.trim())) return null;
  const result = Number(value.trim());
  return Number.isFinite(result) ? result : null;
}

export function parseDate(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const iso = match ? `${match[3]}-${match[2]}-${match[1]}` : trimmed;
  return calendarDate(iso) ? iso : null;
}

export function validatePR(pr, reference) {
  const errors = {};
  const add = (field, code) => { errors[field] = { code, field }; };
  const unit = reference.units.find(u => u.id === pr.unit_id && u.active === true);
  const user = reference.users.find(u => u.id === pr.requester_id && u.role_id === 'REQUESTER');
  if (!user || user.unit_id !== pr.unit_id) add('requester_id', 'INVALID_REQUESTER');
  if (!unit) add('unit_id', 'INVALID_UNIT');
  if (!reference.cost_centers.some(c => c.id === pr.cost_center_id && c.unit_id === pr.unit_id && c.active === true)) add('cost_center_id', 'INVALID_COST_CENTER');
  if (!nonblank(pr.business_reason)) add('business_reason', 'REQUIRED');
  const neededBy = parseDate(pr.needed_by);
  if (!neededBy) add('needed_by', 'INVALID_DATE');
  if (!nonblank(pr.item?.description)) add('item.description', 'REQUIRED');
  const quantity = parseNumber(pr.item?.quantity);
  const price = parseNumber(pr.item?.estimated_unit_price);
  if (quantity === null || quantity <= 0) add('item.quantity', 'POSITIVE_NUMBER_REQUIRED');
  if (price === null || price < 0) add('item.estimated_unit_price', 'NONNEGATIVE_NUMBER_REQUIRED');
  return {
    valid: Object.keys(errors).length === 0, errors,
    normalized: { ...pr, needed_by: neededBy, item: { ...pr.item, quantity, estimated_unit_price: price } }
  };
}
