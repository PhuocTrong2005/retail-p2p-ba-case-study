# Business Requirements Document

## NovaRetail JSC — Procure-to-Pay Process Optimization

## 1. Purpose and baseline

This BRD states the business-level needs for NovaRetail's proposed Procure-to-Pay (P2P) process. It is the business baseline for the detailed catalog in [requirements-catalog.md](./requirements-catalog.md), the system interactions in [Phase 06](../06-system-analysis/README.md), and the SRS in [Phase 07](../07-software-requirements/README.md).

The project is a fictional Vietnamese retail case study. All volumes, baseline figures, targets, and scenarios are simulated. This document records no implementation, testing, or stakeholder approval.

### Scope boundary

The process begins when an authorized requester creates a Purchase Requisition (PR) and ends when a Payment Request is approved. It includes PR and PO processing, budget validation, approved supplier selection, Goods Receipt (GR), supplier invoice processing, three-way matching, matching exceptions, transaction visibility, audit history, and basic operational reporting. Bank payment execution, supplier onboarding, strategic sourcing, detailed warehouse management, tax processing, and full ERP replacement are outside scope.

## 2. Business context and problem

NovaRetail's modeled P2P process uses spreadsheets, email, accounting software, and separate departmental records. This fragmented flow creates approval waiting time, repeated data entry, limited status visibility, manual matching, inconsistent budget checks, and incomplete transaction history.

| ID | Pain point |
| --- | --- |
| PP-01 | PO approval takes too long. |
| PP-02 | Procurement data is fragmented. |
| PP-03 | Three-way matching is manual. |
| PP-04 | PR and PO status is difficult to track. |
| PP-05 | Audit trail is limited. |
| PP-06 | Budget control is inconsistent. |
| PP-07 | Procurement data is entered repeatedly. |

The primary analysis sources are RC-01 (no standardized PO approval workflow), RC-02 (no integrated procurement data flow), RC-03 (no integrated document data or matching capability), and the budget-control gap. Full analysis is available in [Phase 03](../03-as-is-analysis/README.md).

## 3. Objectives and measures

| ID | Objective | Measure and target |
| --- | --- | --- |
| OBJ-01 | Shorten PO approval cycle. | Average time from PO submission to final approval: less than 1 business day (simulated target). |
| OBJ-02 | Reduce repetitive manual data entry. | No more than one primary entry point for reusable transaction information. |
| OBJ-03 | Improve visibility and data consistency. | 100% of in-scope PR and PO transactions have a visible processing status; at least 95% of in-scope P2P transactions are managed through the centralized process. |
| OBJ-04 | Strengthen purchasing and invoice controls. | 100% of applicable PRs receive a budget check before business approval; at least 80% of eligible invoices are automatically matched. |
| OBJ-05 | Improve traceability. | 100% of key actions performed through the proposed process are recorded. |

**OBJ-03 definition.** The 95% measure is the percentage of in-scope P2P transactions managed through the centralized process. It is not a measure of information accessibility. The target is retained from the project-objectives baseline; the wording is aligned here and in the catalog to remove the earlier ambiguity.

## 4. Stakeholders and process roles

The process involves Requester, Store Manager, Procurement Officer, Procurement Manager, Warehouse Staff, AP Accountant, Finance Manager, and the external Supplier. CFO is the executive sponsor; Internal Audit and IT Team are specialist consultative stakeholders. Internal Audit reviews controls and history, while IT advises on feasibility, boundaries, access, and integration. Neither specialist role is assigned an operational approval responsibility by this BRD.

Detailed stakeholder analysis, the register, and preliminary RACI are in [Phase 02](../02-stakeholder-analysis/stakeholder-analysis.md).

## 5. Business requirements

The requirements catalog is the authoritative detailed baseline. This BRD summarizes its approved-for-analysis structure without duplicating every rationale.

| ID | Business requirement | Priority | Related objective(s) |
| --- | --- | --- | --- |
| BRQ-01 | Connected P2P transaction management | High | OBJ-03 |
| BRQ-02 | Standardized PR management | High | OBJ-02, OBJ-03 |
| BRQ-03 | Mandatory budget control | High | OBJ-04 |
| BRQ-04 | Controlled supplier selection | Medium | OBJ-04 |
| BRQ-05 | Standardized PO management and approval | High | OBJ-01, OBJ-05 |
| BRQ-06 | Procurement data reuse and transaction linkage | High | OBJ-02, OBJ-03 |
| BRQ-07 | Procurement status visibility | High | OBJ-03 |
| BRQ-08 | Controlled three-way matching and exception handling | High | OBJ-04 |
| BRQ-09 | Transaction and approval traceability | High | OBJ-05 |
| BRQ-10 | Controlled Payment Request approval | High | OBJ-04 |
| BRQ-11 | Basic procurement reporting | Medium | OBJ-01, OBJ-03, OBJ-04, OBJ-05 |

### Requirement coverage

1. The process shall maintain linked PR, PO, GR, invoice, exception, and Payment Request information as applicable.
2. PRs shall be complete, budget-validated, and business-approved before procurement processing.
3. POs shall originate from approved PRs, use eligible suppliers, and complete applicable approval routing before issue.
4. GRs and invoices shall reference the related PO; three-way matching shall either establish eligibility or create a controlled exception.
5. Payment Requests shall be prepared only for eligible invoices and approved by an authorized financial approver.
6. Authorized users shall be able to view relevant status, history, and basic operational reports.

## 6. Business rules and controls

The detailed [business-rule baseline](../04-to-be-design/business-rules.md) remains authoritative. It establishes mandatory PR information (BR-01), budget validation before PR approval (BR-02/03), approved-supplier selection (BR-06), PR-to-PO linkage and reuse (BR-07/08), PO routing and issuance controls (BR-09–12), PO references for GR and invoice (BR-13/15), matching and exception controls (BR-16–21), payment eligibility/approval (BR-22–24), and status, audit, and role controls (BR-25–27).

## 7. Assumptions, open decisions, and exclusions

### Baseline assumptions

This analysis assumes an existing approved Supplier Master, identifiable requesting unit/cost center, available budget information, an existing accounting system, warehouse recording of GR, PO-based covered purchases, defined user roles, and synthetic case-study data. These are assumptions, not confirmed operating facts.

### Open business decisions

The following remain unresolved and are not implemented as fixed policy: OD-01 PO approval thresholds; OD-02 additional Finance-approval criteria; OD-03 budget-validation policy; OD-04 matching tolerance policy/values; OD-05 matching-exception escalation; OD-06 final transaction statuses; OD-07 detailed role permissions; and OD-08 partial-GR policy. See the consolidated register in [Phase 08](../08-traceability/requirements-traceability-matrix.md#open-decisions).

### Explicit exclusions

No approval threshold, matching tolerance, exception escalation rule, stakeholder sign-off, production integration design, test result, implementation result, or actual performance result is asserted by this case study.

## 8. Traceability and next steps

The catalog maps BRQs to objectives, pain points, root causes, and business rules. [Phase 06](../06-system-analysis/README.md) maps the BRQs to UC-01 through UC-12. [Phase 07](../07-software-requirements/srs.md) derives FRs, NFRs, and acceptance criteria; [Phase 08](../08-traceability/requirements-traceability-matrix.md) provides the compact end-to-end matrix.

**Document status:** complete business-analysis baseline for portfolio purposes; pending real-world stakeholder validation if used on an actual project.
