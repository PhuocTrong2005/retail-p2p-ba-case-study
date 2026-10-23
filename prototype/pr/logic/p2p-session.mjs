import { createSessionContext } from './session-context.mjs';
import { createPRSession } from './pr-session.mjs';
import { createPODomain } from './po-session.mjs';
import { createReceivingInvoiceDomain } from './receiving-invoice.mjs';
import { createMatchingPaymentDomain } from './matching-payment.mjs';

// Runtime has exactly one PR domain and one PO domain, sharing this context.
export function createP2PSession(seed, catalog, matchingConfig = null) {
  const runtime = createSessionContext(seed, catalog.additional_users);
  const pr = createPRSession(seed, runtime);
  const po = createPODomain(runtime, pr, seed, catalog);
  let controls;
  const documents = createReceivingInvoiceDomain(runtime, po, {invoiceLocked:id=>controls?.locked(id) ?? false});
  controls = createMatchingPaymentDomain(runtime, po, documents, matchingConfig);
  let used = new Set();
  runtime.onReset(() => { used = new Set(); });
  function execute(command, action) {
    if (!command || command.generation !== runtime.generation()) return { ok: false, code: 'STALE_SESSION' };
    if (command.actor_id !== runtime.context().user_id || typeof command.command_id !== 'string') return { ok: false, code: 'INVALID_COMMAND_CONTEXT' };
    if (used.has(command.command_id)) return { ok: false, code: 'DUPLICATE_COMMAND' };
    used.add(command.command_id); return action();
  }
  const poAPI = Object.freeze({
    detail: po.detail, list: po.list, sources: po.sources, suppliers: po.suppliers,
    create: (prId, command) => execute(command, () => po.create(prId)),
    save: (id, patch, command) => execute(command, () => po.save(id, patch)),
    submit: (id, patch, command) => execute(command, () => po.submit(id, patch)),
    decide: (id, type, options, command) => execute(command, () => po.decide(id, type, options)),
    issue: (id, command) => execute(command, () => po.issue(id))
  });
  return Object.freeze({
    context: runtime.context, generation: runtime.generation, actor: runtime.actor, users: runtime.users,
    financeRequired: runtime.finance,
    // Capture this generation when rendering a form/button, not when replaying it.
    command: generation => ({ generation, actor_id: runtime.context().user_id, command_id: runtime.nextId('COMMAND-') }),
    setUser: (id, command) => execute(command, () => runtime.setUser(id)),
    setBudget: (value, command) => execute(command, () => runtime.setBudget(value)),
    setFinance: (value, command) => execute(command, () => runtime.setFinance(value)),
    beginNew: command => execute(command, () => pr.beginNew()),
    edit: (id, patch, command) => execute(command, () => pr.edit(id, patch)),
    save: (id, command) => execute(command, () => pr.save(id)),
    submit: (id, command) => execute(command, () => pr.submit(id)),
    decide: (id, type, options, command) => execute(command, () => pr.decide(id, type, options)),
    reset: (options, command) => execute(command, () => runtime.reset(options)),
    detail: pr.detail, openForm: pr.openForm, history: pr.history, list: pr.list, queue: pr.queue, metrics: pr.metrics,
    po: poAPI,
    matching: Object.freeze({
      summary:controls.summary, scenarios:controls.scenarios,
      select:(id,scenario,version,command)=>execute(command,()=>controls.select(id,scenario,version)),
      run:(id,command)=>execute(command,()=>controls.run(id)),
      note:(id,text,command)=>execute(command,()=>controls.note(id,text))
    }),
    payment: Object.freeze({
      detail:controls.detail,review:controls.review,queue:controls.queue,
      prepare:(id,command)=>execute(command,()=>controls.prepare(id)),
      save:(id,requestId,patch,command)=>execute(command,()=>controls.save(id,requestId,patch)),
      send:(id,requestId,patch,view,command)=>execute(command,()=>controls.send(id,requestId,patch,view)),
      decide:(id,requestId,type,options,command)=>execute(command,()=>controls.decide(id,requestId,type,options))
    }),
    documents: Object.freeze({
      gr: documents.gr, invoice: documents.invoice, summary: documents.summary,
      readiness: documents.readiness, revisionHistory: documents.revisionHistory,
      recordGR: (poId, patch, command) => execute(command, () => documents.recordGR(poId, patch)),
      recordInvoice: (poId, patch, command) => execute(command, () => documents.recordInvoice(poId, patch)),
      saveInvoice: (poId, invoiceId, patch, command) => execute(command, () => documents.saveInvoice(poId, invoiceId, patch))
    })
  });
}
