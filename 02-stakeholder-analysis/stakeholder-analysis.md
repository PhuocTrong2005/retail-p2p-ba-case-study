# Stakeholder Analysis

## 1. Purpose

The purpose of the stakeholder analysis is to identify the individuals and business roles that participate in, influence, control, or are affected by NovaRetail's Procure-to-Pay process.

The analysis is used to:

* identify key sources of business requirements;
* understand stakeholder needs and concerns;
* determine decision-making and approval authority;
* define appropriate stakeholder engagement approaches;
* support BPMN process modeling;
* identify system actors for later Use Case analysis;
* clarify responsibilities across the Procure-to-Pay process.

The analysis covers the process from Purchase Requisition creation through Payment Approval.

---

## 2. Stakeholder Classification

For this project, stakeholders are divided into four groups:

### Executive and Governance Stakeholders

Stakeholders responsible for business sponsorship, financial governance, and compliance.

* CFO
* Internal Audit

### Process Owners and Decision Makers

Stakeholders with authority over major Procure-to-Pay activities.

* Procurement Manager
* Finance Manager
* Store Manager

### Operational Stakeholders

Stakeholders who perform day-to-day Procure-to-Pay activities.

* Store Employee / Requester
* Procurement Officer
* Warehouse Staff
* Accounts Payable Accountant

### Supporting and External Stakeholders

Stakeholders that support the process or interact with NovaRetail from outside the organization.

* IT Team
* Supplier

---

# 3. Stakeholder Register

| ID     | Stakeholder                | Role in P2P                          | Main Responsibilities                                                                 | Main Needs / Expectations                                             | Influence | Interest |
| ------ | -------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --------- | -------- |
| STK-01 | Store Employee / Requester | Purchase requester                   | Identify purchasing needs, create and submit PR                                       | Simple PR creation, clear status tracking, fewer manual steps         | Low       | High     |
| STK-02 | Store Manager              | Business approver / Cost owner       | Review business need and approve or reject PR                                         | Clear request information, budget visibility, fast approval process   | Medium    | High     |
| STK-03 | Procurement Officer        | Buyer / Operational procurement user | Review approved PR, select approved supplier, create and manage PO                    | Centralized information, reduced duplicate entry, clear workflow      | Medium    | High     |
| STK-04 | Procurement Manager        | Procurement Process Owner            | Oversee procurement activities, enforce procurement rules, participate in PO approval | Process control, approval visibility, procurement KPIs                | High      | High     |
| STK-05 | Warehouse Staff            | Goods receiver                       | Receive goods and record Goods Receipt                                                | Clear PO reference, simple receipt recording, discrepancy capture     | Low       | High     |
| STK-06 | AP Accountant              | Invoice processing user              | Record supplier invoices, perform 3-way matching, investigate mismatches              | Accurate PO/GR data, automated matching, clear exception workflow     | Medium    | High     |
| STK-07 | Finance Manager            | Financial Control Owner              | Oversee budget control, financial approval and payment approval                       | Budget compliance, financial visibility, transaction traceability     | High      | High     |
| STK-08 | CFO                        | Executive Sponsor                    | Provide sponsorship and oversee financial governance                                  | Cost control, process performance, compliance and reliable reporting  | High      | Medium   |
| STK-09 | Internal Audit             | Governance stakeholder               | Review process controls and transaction history                                       | Complete audit trail, segregation of duties and evidence of approval  | Medium    | Medium   |
| STK-10 | IT Team                    | Supporting stakeholder               | Support system implementation, access control and integration                         | Stable requirements, clear integration boundaries and maintainability | Medium    | Medium   |
| STK-11 | Supplier                   | External business stakeholder        | Receive PO, deliver goods and provide supplier invoice                                | Accurate PO information, clear communication and timely processing    | Low       | Medium   |

---

# 4. Key Stakeholder Roles

## 4.1 Executive Sponsor — CFO

The CFO is considered the executive sponsor of the proposed improvement initiative because the Procure-to-Pay process directly affects purchasing expenditure, financial control, auditability, and payment governance.

The CFO is not expected to participate in day-to-day procurement activities.

Key interests include:

* procurement spend visibility;
* budget control;
* financial governance;
* auditability;
* reduction of processing inefficiencies;
* achievement of the expected business outcomes.

---

## 4.2 Procurement Process Owner — Procurement Manager

The Procurement Manager is considered the primary business process owner for the procurement portion of P2P.

Responsibilities include:

* defining procurement policies;
* supervising Procurement Officers;
* ensuring compliance with purchasing rules;
* overseeing PO processing;
* defining procurement approval requirements;
* monitoring procurement performance;
* providing business requirements for the future procurement process.

The Procurement Manager is one of the most important stakeholders for requirement elicitation.

---

## 4.3 Financial Control Owner — Finance Manager

The Finance Manager represents the financial-control side of the P2P process.

Key responsibilities include:

* defining budget control requirements;
* defining financial approval requirements;
* overseeing payment approval;
* ensuring that financial controls are applied before payment;
* supporting exception and escalation rules.

The Finance Manager and Procurement Manager therefore represent two different control perspectives:

```text
Procurement Manager
        ↓
Purchasing Policy & Procurement Control

Finance Manager
        ↓
Budget & Financial Control
```

---

# 5. Stakeholder Needs and Pain Points

## Store Employee / Requester

### Current concerns

* Purchase Requisitions are created manually.
* Status is difficult to track.
* Requesters may need to contact other departments for updates.

### Expected improvements

* standardized PR creation;
* visible processing status;
* fewer repeated data-entry activities.

---

## Store Manager

### Current concerns

* approval requests may be distributed through email;
* supporting information may not be immediately available;
* budget information may require separate verification.

### Expected improvements

* clear approval information;
* easier access to budget status;
* faster approval decisions;
* visible approval history.

---

## Procurement Officer

### Current concerns

* procurement information is fragmented;
* PR information may need to be re-entered when creating a PO;
* manual coordination is required between departments;
* PO status may be difficult to monitor.

### Expected improvements

* centralized procurement information;
* reuse of approved PR data;
* structured PO workflow;
* reduced manual coordination;
* clear exception status.

---

## Procurement Manager

### Current concerns

* limited visibility into outstanding approvals;
* limited procurement performance information;
* manual approval routing;
* inconsistent process control.

### Expected improvements

* controlled approval workflow;
* procurement dashboard;
* better process monitoring;
* clear purchasing rules and audit history.

---

## Warehouse Staff

### Current concerns

* purchase information may not always be immediately available;
* receipt information may be maintained separately;
* discrepancies may require manual communication.

### Expected improvements

* direct reference to approved PO;
* standardized Goods Receipt recording;
* clear handling of partial or incorrect deliveries.

---

## AP Accountant

### Current concerns

* PO, Goods Receipt, and Invoice information may come from separate sources;
* three-way matching is manual;
* mismatch investigation requires coordination across departments.

### Expected improvements

* access to consistent PO and GR information;
* automated matching for eligible invoices;
* clearly identified mismatches;
* structured exception handling.

---

## Finance Manager

### Current concerns

* budget checks may not be consistently performed;
* financial approvals depend on information from different sources;
* auditability is limited.

### Expected improvements

* consistent budget validation;
* controlled financial approval;
* complete transaction history;
* reliable information before payment approval.

---

## CFO

### Current concerns

* limited consolidated procurement visibility;
* risk of uncontrolled expenditure;
* weak traceability.

### Expected improvements

* procurement KPI reporting;
* stronger purchasing controls;
* reliable auditability;
* improved financial governance.

---

## Internal Audit

### Current concerns

* approval evidence may exist across multiple emails and files;
* transaction changes may be difficult to reconstruct.

### Expected improvements

* complete audit trail;
* identifiable users and timestamps;
* traceable approval history;
* evidence of key control activities.

---

## IT Team

### Current concerns

* business information exists across disconnected tools;
* unclear system boundaries may create difficult integration requirements.

### Expected improvements

* clearly defined functional requirements;
* clearly identified system boundaries;
* defined user roles;
* high-level integration requirements.

---

## Supplier

### Current concerns

* delayed PO issuance may delay order confirmation;
* invoice discrepancies may delay payment.

### Expected improvements

* accurate Purchase Orders;
* clearer transaction processing;
* fewer avoidable payment delays.

> Supplier is considered an external stakeholder but not necessarily a direct system user. A supplier portal is outside the current project scope.

---

# 6. Power–Interest Analysis

The Power–Interest Matrix is used to determine the level of stakeholder management required during the project.

It does not define business responsibility within the process. Business responsibilities are addressed separately through RACI.

## Manage Closely

**High influence / High interest**

* Procurement Manager
* Finance Manager

These stakeholders have significant decision-making authority and are directly involved in the design of the future process.

They should participate actively in:

* requirement workshops;
* To-Be process validation;
* business rule definition;
* requirement prioritization;
* solution acceptance.

---

## Keep Satisfied

**High influence / Lower operational interest**

* CFO

The CFO has high decision-making authority but is not involved in daily P2P operations.

Engagement should focus on:

* business outcomes;
* financial controls;
* major risks;
* project progress;
* KPI and benefit realization.

---

## Keep Informed

**Lower or medium influence / High interest**

* Store Employee / Requester
* Store Manager
* Procurement Officer
* Warehouse Staff
* AP Accountant

These stakeholders interact directly with the process and provide detailed operational requirements.

They should be involved through:

* interviews;
* process walkthroughs;
* workshops;
* prototype reviews;
* User Acceptance Testing scenarios.

Although Procurement Officers and AP Accountants may not have the highest organizational authority, their operational knowledge makes them critical requirement sources.

---

## Monitor

**Lower direct influence / Moderate interest**

* Supplier

Communication should focus on changes that affect PO receipt, delivery information, or invoice processing.

Because Supplier Portal functionality is outside the project scope, supplier involvement in system design is limited.

---

## Special Consultative Stakeholders

The following stakeholders should not be treated purely based on their Power–Interest quadrant because they provide specialist input.

### Internal Audit

Should be consulted when defining:

* audit trail requirements;
* approval evidence;
* segregation of duties;
* control requirements.

### IT Team

Should be consulted when defining:

* system boundaries;
* integration requirements;
* role-based access;
* technical feasibility;
* non-functional requirements.

---

# 7. Stakeholder Engagement Approach

| Stakeholder         | Engagement Method                                   | Frequency / Stage                      | Main Purpose                                 |
| ------------------- | --------------------------------------------------- | -------------------------------------- | -------------------------------------------- |
| Procurement Manager | Workshops, interviews, requirement reviews          | Throughout analysis                    | Process ownership and requirement validation |
| Finance Manager     | Workshops, rule-definition sessions                 | Throughout analysis                    | Financial controls and approvals             |
| Procurement Officer | Interviews, process walkthroughs, prototype reviews | As-Is and To-Be analysis               | Operational procurement requirements         |
| AP Accountant       | Interviews, process walkthroughs                    | As-Is, To-Be and SRS                   | Invoice and matching requirements            |
| Store Manager       | Interviews and workflow review                      | PR and approval analysis               | Approval requirements                        |
| Store Employee      | Interview / usability review                        | PR and UI analysis                     | Requester requirements                       |
| Warehouse Staff     | Process walkthrough                                 | Goods Receipt analysis                 | Receiving requirements                       |
| CFO                 | Management review                                   | Major milestones                       | Business outcome and governance validation   |
| Internal Audit      | Control review                                      | Requirement validation                 | Audit and control requirements               |
| IT Team             | Technical consultation                              | SRS and integration analysis           | Feasibility and integration                  |
| Supplier            | Limited consultation                                | Where external interaction is affected | PO and invoice interaction                   |

---

# 8. Preliminary RACI Matrix

The RACI matrix below provides a high-level view of business responsibility.

It is preliminary because detailed approval authority will later depend on business rules and approval thresholds.

**R — Responsible:** performs the activity
**A — Accountable:** ultimately owns the outcome
**C — Consulted:** provides input
**I — Informed:** receives information

| Activity                           | Requester | Store Manager | Procurement Officer | Procurement Manager | Warehouse Staff | AP Accountant | Finance Manager |
| ---------------------------------- | --------- | ------------- | ------------------- | ------------------- | --------------- | ------------- | --------------- |
| Create and Submit PR               | R/A       | I             | I                   | I                   | -               | -             | -               |
| Approve Business Need / PR         | I         | R/A           | C                   | I                   | -               | -             | C*              |
| Validate Budget                    | I         | C             | I                   | I                   | -               | -             | A               |
| Select Approved Supplier           | -         | -             | R                   | A                   | -               | -             | -               |
| Create Purchase Order              | -         | -             | R                   | A                   | -               | -             | I               |
| Approve Purchase Order             | I         | I             | C                   | R/A*                | -               | C             | R/A*            |
| Record Goods Receipt               | -         | -             | I                   | I                   | R/A             | I             | -               |
| Record / Validate Supplier Invoice | -         | -             | I                   | -                   | C               | R/A           | I               |
| Perform Three-Way Matching         | -         | -             | C                   | I                   | C               | R             | A               |
| Resolve Matching Exception         | -         | -             | R/C                 | C                   | R/C             | R             | A               |
| Approve Payment Request            | -         | -             | I                   | I                   | -               | C             | R/A             |
| Review Audit Evidence              | -         | -             | I                   | C                   | I               | C             | C               |

`*` Approval responsibility may change depending on approval thresholds and business rules.

For example, PO approval may be assigned to:

```text
Lower-value PO
→ Procurement Manager

Higher-value PO
→ Finance Manager

High-value / exceptional PO
→ CFO
```

The exact thresholds are intentionally not finalized in the stakeholder analysis. They will be defined later in the Business Rules and To-Be process.

---

# 9. Important RACI Limitation

The RACI matrix should not be used as a replacement for the BPMN process model.

RACI identifies responsibility:

```text
Who is responsible?
Who is accountable?
Who must be consulted?
Who must be informed?
```

BPMN will later describe:

```text
When does the activity occur?
What happens before and after it?
What decisions are made?
How does information move?
What exceptions exist?
```

The two artifacts therefore serve different purposes.

---

# 10. Requirement Elicitation Priorities

Not all stakeholders provide the same type of information.

For detailed requirement elicitation, the project should prioritize the following roles.

### Priority 1 — Operational and Process Knowledge

**Procurement Officer**

Primary source for:

* PR processing;
* supplier selection;
* PO creation;
* procurement exceptions;
* operational pain points.

**AP Accountant**

Primary source for:

* supplier invoice processing;
* three-way matching;
* invoice exceptions.

### Priority 2 — Business Rules and Control

**Procurement Manager**

Primary source for:

* procurement policies;
* PO rules;
* procurement approval requirements.

**Finance Manager**

Primary source for:

* budget control;
* payment control;
* financial approval requirements.

### Priority 3 — Supporting Process Requirements

**Store Manager / Requester**

Provide requirements related to:

* purchase request creation;
* PR approval;
* status visibility.

**Warehouse Staff**

Provides requirements related to:

* Goods Receipt;
* quantity discrepancies;
* partial delivery.

### Specialist Validation

**Internal Audit**

Validates:

* auditability;
* control requirements;
* segregation of duties.

**IT Team**

Validates:

* technical feasibility;
* system boundaries;
* integration assumptions.

---

# 11. Stakeholder vs. System Actor

A stakeholder is not automatically a system actor.

For example:

```text
CFO
→ Stakeholder
→ May primarily consume reports
→ Does not necessarily perform daily transactions
```

```text
Supplier
→ External stakeholder
→ Interacts with the P2P process
→ Supplier Portal is outside current scope
→ Therefore may not be a direct system actor
```

The final set of system actors will be determined later during Use Case modeling.

Likely operational system actors include:

* Requester;
* Store Manager;
* Procurement Officer;
* Procurement Manager;
* Warehouse Staff;
* AP Accountant;
* Finance Manager.

---

# 12. Analysis Summary

The stakeholder analysis identifies three stakeholder groups that will have the greatest influence on the proposed solution.

### Operational Users

```text
Requester
Procurement Officer
Warehouse Staff
AP Accountant
```

They provide detailed requirements about how the process is actually performed.

### Business and Control Owners

```text
Store Manager
Procurement Manager
Finance Manager
```

They define approval, purchasing, budget, and control requirements.

### Governance and Supporting Roles

```text
CFO
Internal Audit
IT Team
Supplier
```

They provide sponsorship, governance, specialist input, or external process interaction.

The stakeholder model established in this analysis will be used as an input for the As-Is BPMN process, To-Be process, Business Requirements, Use Cases, and system access-control requirements.
