# Business Rules

## Overview

This document defines the key business rules governing NovaRetail JSC's proposed Procure-to-Pay process.

Business rules specify the conditions and constraints that the future process must follow. They are separated from the BPMN model so that operational policies can be changed without redesigning the entire process flow.

The rules in this document are derived from:

* the identified As-Is pain points;
* root-cause analysis;
* project objectives;
* the To-Be process design;
* the agreed project scope and assumptions.

> **Note:** NovaRetail JSC is a fictional company used for this Business Analysis case study. Rules that normally require management policy decisions, such as approval thresholds and matching tolerances, are intentionally kept configurable rather than assigned arbitrary values.

---

# 1. Rule Categories

The business rules are grouped into the following areas:

| Category             | Description                                                       |
| -------------------- | ----------------------------------------------------------------- |
| Purchase Requisition | Rules governing PR creation, submission, validation, and approval |
| Budget Control       | Rules governing budget validation before purchasing approval      |
| Supplier Selection   | Rules governing supplier eligibility                              |
| Purchase Order       | Rules governing PO creation, approval, and issuance               |
| Goods Receipt        | Rules governing receipt of purchased goods                        |
| Supplier Invoice     | Rules governing invoice registration and transaction linkage      |
| Three-Way Matching   | Rules governing PO, GR, and Invoice comparison                    |
| Exception Handling   | Rules governing mismatched transactions                           |
| Payment Approval     | Rules governing readiness and approval for payment                |
| Status & Audit       | Rules governing visibility and transaction history                |
| Access & Control     | Rules governing authorized user actions                           |

---

# 2. Business Rule Summary

| Rule ID | Business Rule                                                                                                | Area                 |
| ------- | ------------------------------------------------------------------------------------------------------------ | -------------------- |
| BR-01   | A Purchase Requisition must contain required information before submission                                   | Purchase Requisition |
| BR-02   | Every submitted PR must pass budget validation before business approval                                      | Budget Control       |
| BR-03   | A PR that fails budget validation must not proceed to approval                                               | Budget Control       |
| BR-04   | A PR must be approved by an authorized business approver                                                     | Purchase Requisition |
| BR-05   | Only an approved PR may proceed to procurement processing                                                    | Purchase Requisition |
| BR-06   | Only an active approved supplier may be selected for a PO                                                    | Supplier Selection   |
| BR-07   | A PO created from a PR must retain the source PR reference                                                   | Purchase Order       |
| BR-08   | Existing PR data should be reused when creating the PO where applicable                                      | Purchase Order       |
| BR-09   | Every submitted PO must follow the applicable approval route                                                 | Purchase Order       |
| BR-10   | Additional financial approval must be applied when configured criteria are met                               | Purchase Order       |
| BR-11   | A PO must not be issued to a supplier until all required approvals are completed                             | Purchase Order       |
| BR-12   | A returned PO must be corrected and resubmitted through the approval workflow                                | Purchase Order       |
| BR-13   | A Goods Receipt must reference an approved PO                                                                | Goods Receipt        |
| BR-14   | Partial Goods Receipt may be recorded where the delivered quantity is lower than the outstanding PO quantity | Goods Receipt        |
| BR-15   | A supplier invoice used in the P2P process must reference the related PO                                     | Supplier Invoice     |
| BR-16   | Three-way matching may begin only when the required PO, GR, and Invoice information is available             | Three-Way Matching   |
| BR-17   | Matching must compare predefined transaction attributes                                                      | Three-Way Matching   |
| BR-18   | Matching tolerances must be configurable according to approved business policy                               | Three-Way Matching   |
| BR-19   | A successfully matched invoice may proceed to payment preparation                                            | Three-Way Matching   |
| BR-20   | A mismatched transaction must enter exception handling before payment preparation                            | Exception Handling   |
| BR-21   | Matching exceptions must maintain an owner, status, reason, and resolution history                           | Exception Handling   |
| BR-22   | A Payment Request may be prepared only for an eligible invoice                                               | Payment Approval     |
| BR-23   | A Payment Request must be approved by an authorized financial approver                                       | Payment Approval     |
| BR-24   | Bank payment execution is outside the procurement workflow defined by this project                           | Payment Approval     |
| BR-25   | Key procurement transactions must maintain a current process status                                          | Status & Audit       |
| BR-26   | Key actions and approval decisions must be recorded in the transaction history                               | Status & Audit       |
| BR-27   | Users may perform only actions permitted by their assigned business role                                     | Access & Control     |

---

# 3. Purchase Requisition Rules

## BR-01 — Mandatory Purchase Requisition Information

A Purchase Requisition must contain all required information before it can be submitted.

Required information may include:

* requester;
* requesting store or department;
* cost center;
* item or service description;
* requested quantity;
* estimated price;
* required date;
* business justification.

### Rationale

Incomplete requests create unnecessary clarification and processing delays downstream.

### Expected System Behavior

```text
Create PR
   ↓
Submit
   ↓
Validate Required Information
   ↓
Complete?
├── Yes → Continue
└── No  → Return Validation Error
```

---

## BR-02 — Budget Validation Before PR Approval

Every submitted Purchase Requisition must pass budget validation before being routed for business approval.

### Rule

> A PR shall not proceed to Store Manager approval until the applicable budget check has been completed successfully.

### Rationale

Budget validation should operate as a consistent financial control rather than an optional manual activity.

**Related Pain Point:** PP-06
**Related Objective:** OBJ-04

---

## BR-03 — Insufficient Budget

If sufficient budget is not available, the Purchase Requisition must not proceed to approval.

The request must instead be returned for revision or handled according to the applicable budget policy.

```text
Budget Validation
       ↓
Budget Available?
     /          \
   Yes           No
    ↓             ↓
PR Approval    Return PR
```

The procurement solution consumes available budget information but does not manage corporate budget planning or allocation.

---

## BR-04 — Purchase Requisition Approval

A Purchase Requisition must be approved by an authorized business approver before Procurement may process it.

For the current process design, the Store Manager represents the business approver.

The approver evaluates whether the purchasing need is justified.

### Control Distinction

Budget validation and business approval represent different decisions.

```text
Budget Validation
= Is sufficient budget available?

PR Approval
= Should this purchase be made?
```

---

## BR-05 — Approved PR Required for Procurement

Procurement processing may begin only after the Purchase Requisition has reached an approved status.

A draft, rejected, returned, or budget-failed PR must not be converted into an active Purchase Order.

---

# 4. Supplier Selection Rules

## BR-06 — Approved Supplier Requirement

A Purchase Order may only be created for a supplier that exists in the approved Supplier Master and is eligible for use.

```text
Supplier Selected
      ↓
Approved / Active?
     /          \
   Yes           No
    ↓             ↓
Continue       Block Selection
```

### Scope Note

This rule does not include:

* supplier onboarding;
* supplier qualification;
* RFQ/RFP;
* tendering;
* contract negotiation.

Those processes are outside the project scope.

---

# 5. Purchase Order Rules

## BR-07 — PR-to-PO Traceability

A Purchase Order created from an approved Purchase Requisition must retain a reference to its source PR.

Example:

```text
PR-2026-001
      ↓
PO-2026-001
```

This relationship must remain available for downstream transaction tracking.

---

## BR-08 — Reuse of Purchase Requisition Data

Where applicable, information from the approved PR should be reused when creating the Purchase Order.

Reusable information may include:

* item;
* quantity;
* requester;
* requesting unit;
* required date;
* PR reference.

PO-specific information may be added by Procurement, including:

* supplier;
* final purchasing price;
* delivery terms;
* commercial information.

### Rationale

This rule reduces repetitive manual data entry without preventing Procurement from maintaining PO-specific information.

**Related Pain Point:** PP-07
**Related Objective:** OBJ-02

---

## BR-09 — Purchase Order Approval Routing

Every submitted Purchase Order must follow the applicable approval route before it can be issued.

Approval routing may depend on business criteria such as:

* PO amount;
* purchasing category;
* department;
* cost center;
* financial control requirements.

The system should evaluate the applicable rules and route the PO accordingly.

---

## BR-10 — Additional Financial Approval

Additional Finance approval must be required when predefined approval criteria are met.

```text
Procurement Approval
        ↓
Additional Financial Approval Required?
        /                           \
      No                             Yes
      ↓                               ↓
Continue                    Finance Manager Review
```

### Rule Configuration

Exact monetary thresholds or other routing criteria are intentionally not defined in this case study.

They should be maintained as configurable business rules based on approved NovaRetail policy.

---

## BR-11 — PO Issuance

A Purchase Order must not be issued to the Supplier until all required approvals have been completed.

```text
PO Created
    ↓
Required Approvals
    ↓
Fully Approved?
├── No  → Do Not Issue
└── Yes → Issue PO
```

---

## BR-12 — Returned Purchase Order

If an approver requests changes, the PO must be returned to Procurement for correction.

After correction, the PO must be resubmitted through the applicable approval workflow.

Previous approval and return actions should remain in the transaction history.

---

# 6. Goods Receipt Rules

## BR-13 — PO Reference Required for Goods Receipt

Every Goods Receipt within the project scope must reference the related approved Purchase Order.

```text
PO-2026-001
     │
     └── GR-2026-001
```

This enables downstream three-way matching.

---

## BR-14 — Partial Goods Receipt

The process may support partial receipt when the delivered quantity is lower than the outstanding PO quantity.

Example:

```text
PO Quantity: 100

First Delivery:
GR-001 = 60

Remaining:
40
```

The Goods Receipt must accurately record the quantity actually received.

A partial receipt must not automatically be treated as a complete delivery.

---

# 7. Supplier Invoice Rules

## BR-15 — Invoice-to-PO Relationship

Supplier invoices processed through the defined P2P workflow must reference the related Purchase Order.

Example:

```text
PR-001
  │
  └── PO-001
        ├── GR-001
        └── INV-001
```

The PO reference allows the system to retrieve the related purchasing and receiving information.

---

# 8. Three-Way Matching Rules

## BR-16 — Matching Preconditions

Three-way matching may be performed only when the required transaction information is available.

The minimum document relationship is:

```text
Purchase Order
      +
Goods Receipt
      +
Supplier Invoice
```

If one of the required records is unavailable, the transaction must not be considered successfully matched.

---

## BR-17 — Matching Attributes

Three-way matching must compare predefined transaction attributes.

These may include:

* supplier;
* item;
* quantity ordered;
* quantity received;
* quantity invoiced;
* PO unit price;
* invoice unit price;
* total amount.

Example:

| Attribute  |     PO |     GR | Invoice |
| ---------- | -----: | -----: | ------: |
| Item       | ITEM-A | ITEM-A |  ITEM-A |
| Quantity   |    100 |    100 |     100 |
| Unit Price | 50,000 |      — |  50,000 |

If the required values satisfy the approved matching rules, the invoice may be marked as matched.

---

## BR-18 — Matching Tolerance

Where NovaRetail policy permits tolerances, matching tolerance values must be configurable.

Possible examples could include:

* quantity tolerance;
* price tolerance;
* amount tolerance.

No specific tolerance percentage or amount is assigned in this case study because these values require an approved Finance/Procurement policy.

---

## BR-19 — Successful Matching

A supplier invoice that successfully passes the applicable three-way matching rules may proceed to payment preparation.

```text
3-Way Match
     ↓
Successful
     ↓
Invoice Matched
     ↓
Payment Preparation
```

---

# 9. Exception Handling Rules

## BR-20 — Mismatch Requires Exception Handling

If a transaction does not satisfy the matching rules, the invoice must not proceed directly to payment preparation.

Instead:

```text
Mismatch
   ↓
Create Exception
   ↓
Review / Resolve
   ↓
Re-run Matching
```

---

## BR-21 — Exception Traceability

Every matching exception should maintain at least:

* related transaction;
* exception type;
* description;
* assigned owner;
* current status;
* creation timestamp;
* resolution information;
* resolution timestamp.

Possible exception types include:

* quantity mismatch;
* price mismatch;
* incomplete receipt;
* incorrect invoice information.

The AP Accountant coordinates exception resolution with Procurement, Warehouse, or the Supplier when required.

---

# 10. Payment Rules

## BR-22 — Payment Request Eligibility

A Payment Request may be prepared only when the related supplier invoice is eligible for payment processing.

For the current To-Be design, eligibility requires either:

1. successful three-way matching; or
2. an exception that has been resolved according to the applicable business control.

An unresolved mismatch must not proceed directly to payment approval.

---

## BR-23 — Payment Approval

A Payment Request must be reviewed and approved by an authorized financial approver.

For the current process model, the Finance Manager performs this role.

If changes are required, the Payment Request is returned to AP for correction and resubmission.

---

## BR-24 — Payment Execution Boundary

Approval of a Payment Request represents the end of the process defined by this project.

The following activities are outside scope:

* bank transfer initiation;
* payment gateway integration;
* bank API execution;
* bank reconciliation.

```text
Payment Request Approved
          ↓
     END OF SCOPE

Bank Payment
→ Outside Scope
```

---

# 11. Status and Audit Rules

## BR-25 — Transaction Status

Key procurement transactions must maintain a current process status.

Potential states may include:

```text
Draft
Submitted
Pending Validation
Pending Approval
Approved
Returned
Rejected
PO Created
PO Approved
Ordered
Partially Received
Received
Invoice Received
Matching
Exception
Matched
Pending Payment Approval
Payment Approved
```

The exact status model will be refined during system requirements analysis.

### Purpose

Status information should allow users to understand:

* where the transaction currently is;
* whether action is required;
* who is responsible for the next step.

**Related Pain Point:** PP-04
**Related Objective:** OBJ-03

---

## BR-26 — Audit History

Key procurement actions must be recorded in the transaction history.

The audit record should capture information such as:

| Field           | Example             |
| --------------- | ------------------- |
| Transaction     | PO-2026-001         |
| Action          | Approved            |
| User            | Procurement Manager |
| Timestamp       | 2026-08-16 10:25    |
| Previous Status | Pending Approval    |
| New Status      | Approved            |

Important events include:

* transaction creation;
* submission;
* approval;
* rejection;
* return for correction;
* major changes;
* matching result;
* exception creation;
* exception resolution;
* Payment Request approval.

**Related Pain Point:** PP-05
**Related Objective:** OBJ-05

---

# 12. Access and Authorization Rules

## BR-27 — Role-Based Actions

Users may perform only actions permitted by their assigned role.

Examples:

| Role                | Typical Authorized Actions                                           |
| ------------------- | -------------------------------------------------------------------- |
| Store Employee      | Create and submit PR                                                 |
| Store Manager       | Review PR                                                            |
| Procurement Officer | Process PR and create PO                                             |
| Procurement Manager | Review PO                                                            |
| Warehouse Staff     | Record Goods Receipt                                                 |
| AP Accountant       | Record Invoice, resolve matching exceptions, prepare Payment Request |
| Finance Manager     | Perform financial approval and approve Payment Request               |

Detailed permissions will be defined later during system requirements analysis.

---

# 13. Rules Requiring Business Validation

The following items should not be finalized without confirmation from the relevant business owner:

| Item                                           | Proposed Owner                        |
| ---------------------------------------------- | ------------------------------------- |
| PO approval monetary thresholds                | Procurement Manager / Finance Manager |
| Criteria requiring additional Finance approval | Finance Manager                       |
| Budget validation policy                       | Finance Manager                       |
| Matching tolerances                            | Finance Manager / AP                  |
| Exception approval rules                       | Finance Manager / Procurement Manager |
| Detailed transaction statuses                  | Process Owners                        |
| Detailed role permissions                      | Business Owners / IT                  |
| Partial receipt policies                       | Procurement / Warehouse               |

These items represent configurable business policy rather than assumptions that should be invented by the project.

---

# 14. Relationship to Requirements

The Business Rules provide constraints that future requirements must respect.

```text
Business Rule
      ↓
Business Requirement
      ↓
Functional Requirement
      ↓
Use Case / System Behavior
      ↓
Acceptance Criteria
```

For example:

```text
BR-02
Every PR must pass budget validation
        ↓
Business Requirement
The purchasing process shall enforce budget control
        ↓
Functional Requirement
The system shall validate available budget
before routing the PR for approval
```

Formal requirement IDs will be assigned during the BRD and SRS stages.

---

## Case Study Note

NovaRetail JSC is a fictional company created for this Business Analysis portfolio project.

Approval criteria, tolerance values, process volumes, and operational policies used in later examples are simulated unless explicitly marked as confirmed business rules.
