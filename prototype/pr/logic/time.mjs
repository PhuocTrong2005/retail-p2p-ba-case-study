// No system clock: all dates come from explicit inputs.
export function calendarDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const leap = y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
  return y >= 1 && m >= 1 && m <= 12 && d >= 1 &&
    d <= [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
}

export function timestamp(value) {
  if (typeof value !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(value) ||
      !calendarDate(value.slice(0, 10))) return NaN;
  const [, h, m, s, oh = '00', om = '00'] = value.match(/T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-](\d{2}):(\d{2}))$/);
  if (+h > 23 || +m > 59 || +s > 59 || +oh > 23 || +om > 59) return NaN;
  return Date.parse(value);
}

export function atDemoOffset(ms) {
  return new Date(ms + 7 * 3600000).toISOString().replace('Z', '+07:00').replace('.000', '');
}

// Exact integer ratio rounding, avoiding binary floating-point ties (e.g. 1.005).
export function formatRatioHalfUp(numerator, denominator, digits = 2) {
  const n = BigInt(numerator), d = BigInt(denominator);
  if (n < 0n || d <= 0n || !Number.isInteger(digits) || digits < 0 || digits > 10) throw new RangeError('Invalid ratio');
  const scale = 10n ** BigInt(digits);
  const rounded = (2n * n * scale + d) / (2n * d);
  if (!digits) return String(rounded);
  return `${rounded / scale}.${String(rounded % scale).padStart(digits, '0')}`;
}

export const formatWait = milliseconds => formatRatioHalfUp(milliseconds, 3600000).replace('.', ',');
