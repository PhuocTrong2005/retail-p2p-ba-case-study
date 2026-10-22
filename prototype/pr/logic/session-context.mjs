import { timestamp, atDemoOffset } from './time.mjs';

// One owner for actor, clock, configuration, IDs and reset in a browser session.
export function createSessionContext(seed, additionalUsers = []) {
  const users = structuredClone([...seed.reference_data.users, ...additionalUsers]);
  const ticks = new Set(), resets = new Set();
  let now, actor, budget, finance, counters, generation = 0;
  function initialize() {
    now = seed.demo_config.initial_time;
    actor = seed.demo_config.initial_user_id;
    budget = 'PASS'; finance = false; counters = new Map();
  }
  initialize();
  return Object.freeze({
    context: () => ({ time: now, user_id: actor, budget_outcome: budget,
      unit_id: seed.demo_config.unit_id, data_label: seed.metadata.data_label }),
    generation: () => generation,
    finance: () => finance,
    actor: () => structuredClone(users.find(u => u.id === actor)),
    users: () => structuredClone(users),
    nextId(prefix) {
      const next = (counters.get(prefix) ?? 0) + 1;
      counters.set(prefix, next); return `${prefix}${next}`;
    },
    setUser(id) {
      if (!users.some(u => u.id === id && u.unit_id === seed.demo_config.unit_id)) return { ok: false, code: 'INVALID_DEMO_USER' };
      actor = id; return { ok: true };
    },
    setBudget(value) {
      if (!['PASS', 'INSUFFICIENT', 'UNAVAILABLE'].includes(value)) return { ok: false, code: 'INVALID_BUDGET_OUTCOME' };
      budget = value; return { ok: true };
    },
    setFinance(value) {
      if (typeof value !== 'boolean') return { ok: false, code: 'INVALID_FINANCE_ROUTE' };
      finance = value; return { ok: true };
    },
    tick() {
      now = atDemoOffset(timestamp(now) + 3600000);
      for (const listener of ticks) listener(now);
      return now;
    },
    onTick(listener) { ticks.add(listener); },
    onReset(listener) { resets.add(listener); },
    reset({ confirmed = false } = {}) {
      if (confirmed !== true) return { ok: false, code: 'CONFIRMATION_REQUIRED' };
      generation++; initialize();
      for (const listener of resets) listener();
      return { ok: true, time: now };
    }
  });
}
