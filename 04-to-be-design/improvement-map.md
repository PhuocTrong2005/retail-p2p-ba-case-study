# Improvement Map

## Overview

This document maps the problems identified in NovaRetail's As-Is Procure-to-Pay process to their corresponding root causes, business objectives, and To-Be process improvements.

The purpose is to demonstrate that the proposed future process is not based on an arbitrary feature list.

Each major improvement should answer the question:

> **What identified business problem does this change solve?**

The mapping follows the analysis chain:

```text
Pain Point
    ↓
Root Cause
    ↓
Improvement Decision
    ↓
Business Objective
    ↓
To-Be Process
    ↓
Future Requirement
```

---

# 1. Summary Improvement Map

| Pain Point                                     | Root Cause / Control Gap                                         | To-Be Improvement                                         | Objective |
| ---------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------- | --------- |
| PP-01 — PO approval takes too long             | RC-01 — Lack of standardized PO approval workflow                | Workflow-based approval routing                           | OBJ-01    |
| PP-02 — Procurement data is fragmented         | RC-02 — Lack of integrated procurement data flow                 | Connected PR → PO → GR → Invoice transaction relationship | OBJ-03    |
| PP-03 — Three-way matching is manual           | RC-03 — Lack of integrated document data and matching capability | Automated three-way matching with exception handling      | OBJ-04    |
| PP-04 — PR/PO status is difficult to track     | Primarily RC-02                                                  | Centralized workflow status                               | OBJ-03    |
| PP-05 — Audit trail is limited                 | RC-01 and RC-02 contribute                                       | Central transaction and approval history                  | OBJ-05    |
| PP-06 — Budget control is inconsistent         | Process control gap                                              | Mandatory budget validation before PR approval            | OBJ-04    |
| PP-07 — Procurement data is repeatedly entered | RC-02                                                            | Reuse of upstream transaction information                 | OBJ-02    |

---

# 2. PP-01 — Purchase Order Approval Delay

## As-Is Problem

Purchase Order approval is performed through email and depends on manual follow-up.

```text
Create PO
   ↓
Send Approval Email
   ↓
Wait for Approver
   ↓
Review
   ↓
Reply
```

A significant portion of approval cycle time may therefore consist of waiting rather than actual review time.

---

## Root Cause

**RC-01 — Lack of a standardized and centralized Purchase Order approval workflow.**

The current process does not provide:

* structured approval routing;
* centralized pending approval visibility;
* consistent workflow status;
* clear electronic approval history.

---

## To-Be Improvement

### Workflow-Based PO Approval

```text
Submit PO
    ↓
Evaluate Approval Rules
    ↓
Route to Required Approver
    ↓
Review
    ↓
Approve / Return
```

The system controls the routing while Procurement and Finance remain responsible for business decisions.

---

## Expected Effect

* reduced manual routing;
* reduced manual follow-up;
* improved visibility of pending approvals;
* more consistent approval handling;
* improved approval traceability.

---

## Business Objective

**OBJ-01 — Shorten the Purchase Order approval cycle.**

---

## Related Business Rules

* BR-09 — PO Approval Routing
* BR-10 — Additional Financial Approval
* BR-11 — PO Issuance
* BR-12 — Returned Purchase Order
* BR-26 — Audit History

---

# 3. PP-02 — Fragmented Procurement Data

## As-Is Problem

Procurement information is maintained across multiple sources.

```text
PR Excel
   ↓
PO File / Tool

Warehouse Record
   ↓
Goods Receipt

Accounting Software
   ↓
Invoice

Email
   ↓
Approval Evidence
```

Users may need to search different systems or files to reconstruct a single procurement transaction.

---

## Root Cause

**RC-02 — Lack of an integrated procurement data flow connecting the main stages of the P2P lifecycle.**

---

## To-Be Improvement

### Connected Transaction Relationship

```text
PR-001
   │
   └── PO-001
         ├── GR-001
         └── INV-001
```

The related procurement records are connected through common transaction references.

The design does not require every application to be replaced by one physical database. The business requirement is that the relevant transaction information can be consistently linked and retrieved.

---

## Expected Effect

* improved data consistency;
* reduced document searching;
* easier cross-department coordination;
* improved transaction visibility;
* better support for matching and audit history.

---

## Business Objective

**OBJ-03 — Improve procurement visibility and data consistency.**

---

## Related Business Rules

* BR-07 — PR-to-PO Traceability
* BR-13 — PO Reference Required for Goods Receipt
* BR-15 — Invoice-to-PO Relationship
* BR-25 — Transaction Status
* BR-26 — Audit History

---

# 4. PP-03 — Manual Three-Way Matching

## As-Is Problem

AP manually finds and compares three transaction records.

```text
Find PO
   +
Find GR
   +
Review Invoice
      ↓
Manual Comparison
```

When a mismatch occurs, additional manual investigation is required.

---

## Root Cause

**RC-03 — Lack of integrated PO, Goods Receipt, and Invoice data with automated matching capability.**

---

## To-Be Improvement

### Automated Three-Way Matching

```text
PO
+
GR
+
Invoice
   ↓
Matching Rules
   ↓
Documents Match?
```

If matching succeeds:

```text
Matched
   ↓
Payment Preparation
```

If matching fails:

```text
Mismatch
   ↓
Create Exception
   ↓
Resolve
   ↓
Re-run Matching
```

---

## Expected Effect

* reduced AP workload for standard transactions;
* faster invoice processing;
* consistent matching control;
* improved identification of discrepancies;
* AP can focus more effort on exception cases.

---

## Business Objective

**OBJ-04 — Strengthen purchasing and invoice controls.**

---

## Related Business Rules

* BR-16 — Matching Preconditions
* BR-17 — Matching Attributes
* BR-18 — Matching Tolerance
* BR-19 — Successful Matching
* BR-20 — Mismatch Requires Exception Handling
* BR-21 — Exception Traceability

---

# 5. PP-04 — Limited PR and PO Status Visibility

## As-Is Problem

Users cannot consistently determine where a PR or PO is currently waiting.

They may need to:

* search email;
* review spreadsheets;
* contact Procurement;
* contact approvers.

---

## Contributing Root Cause

This issue is primarily related to **RC-02 — fragmented procurement data flow**.

The current process does not maintain a shared workflow state across departments.

---

## To-Be Improvement

### Centralized Transaction Status

Transactions maintain a current workflow status such as:

```text
Draft
Submitted
Pending Approval
Approved
Returned
Ordered
Received
Invoice Received
Matching
Exception
Matched
Payment Approved
```

Exact states will be refined during requirements analysis.

---

## Expected Effect

Users can identify:

* current transaction status;
* whether an action is pending;
* who owns the next step;
* whether the transaction has been returned or approved.

This reduces manual status inquiries.

---

## Business Objective

**OBJ-03 — Improve procurement visibility and data consistency.**

---

## Related Business Rules

* BR-25 — Transaction Status
* BR-26 — Audit History

---

# 6. PP-05 — Limited Audit Trail

## As-Is Problem

Approval evidence and transaction history are distributed across:

* email;
* spreadsheets;
* departmental records;
* separate systems.

It may be difficult to determine:

```text
Who?
Did What?
When?
To Which Transaction?
```

---

## Contributing Root Causes

The problem is influenced by both:

* **RC-01 — lack of standardized approval workflow;**
* **RC-02 — lack of connected procurement data flow.**

---

## To-Be Improvement

### Central Transaction History

For key procurement actions, the system maintains information such as:

```text
Transaction: PO-001
Action: Approved
User: Procurement Manager
Time: 10:25
Previous Status: Pending Approval
New Status: Approved
```

Audit history is treated as a system-wide behavior rather than a separate task after every BPMN activity.

---

## Expected Effect

* better transaction reconstruction;
* clearer accountability;
* stronger evidence for internal review;
* improved approval traceability.

---

## Business Objective

**OBJ-05 — Improve transaction traceability.**

---

## Related Business Rules

* BR-12 — Returned PO
* BR-21 — Exception Traceability
* BR-26 — Audit History
* BR-27 — Role-Based Actions

---

# 7. PP-06 — Inconsistent Budget Control

## As-Is Problem

Budget checking is performed manually and may depend on separate information or communication.

```text
PR
 ↓
Manual Budget Check
 ↓
Approval
```

The control may therefore be inconsistently applied.

---

## Root Cause / Control Gap

The As-Is analysis did not define this as one of the three formal Five Whys root causes.

Instead, the issue represents an important **process control gap**:

> Budget validation is not embedded as a mandatory step in the procurement workflow.

This distinction avoids inventing an additional root-cause ID solely to make the traceability table symmetrical.

---

## To-Be Improvement

### Mandatory Budget Validation

```text
Submit PR
    ↓
Validate Required Data
    ↓
Validate Available Budget
    ↓
Budget Available?
```

If validation fails:

```text
Return PR
   ↓
Requester Revision
```

If validation succeeds:

```text
Continue to Business Approval
```

---

## Expected Effect

* more consistent purchasing control;
* earlier identification of insufficient budget;
* reduced manual budget-check coordination;
* lower risk of approving requests without reliable budget validation.

---

## Business Objective

**OBJ-04 — Strengthen purchasing and invoice controls.**

---

## Related Business Rules

* BR-02 — Budget Validation Before PR Approval
* BR-03 — Insufficient Budget

---

# 8. PP-07 — Duplicate Manual Data Entry

## As-Is Problem

Information already captured in the PR may need to be entered again during PO preparation.

Additional data may also be independently recorded downstream.

```text
PR
 ↓
Manual Re-entry
 ↓
PO
```

---

## Root Cause

**RC-02 — Lack of integrated procurement data flow.**

---

## To-Be Improvement

### Capture and Reuse Transaction Data

```text
Approved PR
      ↓
Reuse Existing Data
      ↓
Create PO
```

Downstream records reference the related transaction rather than recreating unrelated information.

```text
PO
├── GR
└── Invoice
```

---

## Expected Effect

* fewer manual entry touchpoints;
* lower administrative workload;
* reduced typing-error risk;
* improved consistency between related documents.

---

## Business Objective

**OBJ-02 — Reduce repetitive manual data entry.**

---

## Related Business Rules

* BR-07 — PR-to-PO Traceability
* BR-08 — Reuse of PR Data
* BR-13 — Goods Receipt PO Reference
* BR-15 — Invoice PO Reference

---

# 9. Cross-Pain-Point Improvement Relationships

One To-Be improvement may address more than one As-Is problem.

For example:

```text
Connected Transaction Data
          │
          ├── reduces PP-02 Fragmentation
          │
          ├── improves PP-04 Visibility
          │
          ├── reduces PP-07 Re-entry
          │
          └── supports PP-03 Matching
```

Similarly:

```text
Workflow-Based Approval
          │
          ├── reduces PP-01 Waiting
          │
          ├── improves PP-04 Status
          │
          └── improves PP-05 Auditability
```

This is important because process improvement should address underlying structural weaknesses rather than create one isolated feature for every pain point.

---

# 10. Improvement Priorities

The proposed improvements can be grouped into four broad areas.

## Priority Area 1 — Workflow Standardization

Includes:

* PR workflow;
* PO approval routing;
* payment approval routing;
* correction and resubmission paths.

Primarily addresses:

* PP-01;
* PP-04;
* PP-05.

---

## Priority Area 2 — Connected Procurement Data

Includes:

```text
PR
↓
PO
↓
GR / Invoice
```

Primarily addresses:

* PP-02;
* PP-04;
* PP-07.

It also enables automated matching.

---

## Priority Area 3 — Automated Controls

Includes:

* PR validation;
* budget validation;
* approval-rule evaluation;
* three-way matching.

Primarily addresses:

* PP-03;
* PP-06.

---

## Priority Area 4 — Exception and Audit Control

Includes:

* structured matching exceptions;
* status management;
* transaction history;
* approval history.

Primarily addresses:

* PP-03;
* PP-04;
* PP-05.

---

# 11. End-to-End Traceability Matrix

| Pain Point | Root Cause / Gap    | Objective | To-Be Improvement                        | Key Business Rules         |
| ---------- | ------------------- | --------- | ---------------------------------------- | -------------------------- |
| PP-01      | RC-01               | OBJ-01    | Workflow-based PO approval               | BR-09, BR-10, BR-11, BR-12 |
| PP-02      | RC-02               | OBJ-03    | Connected procurement transaction data   | BR-07, BR-13, BR-15        |
| PP-03      | RC-03               | OBJ-04    | Automated 3-way matching                 | BR-16 to BR-21             |
| PP-04      | RC-02               | OBJ-03    | Central workflow status                  | BR-25                      |
| PP-05      | RC-01 / RC-02       | OBJ-05    | Central transaction and approval history | BR-26, BR-27               |
| PP-06      | Process control gap | OBJ-04    | Mandatory budget validation              | BR-02, BR-03               |
| PP-07      | RC-02               | OBJ-02    | Reuse PR data and transaction references | BR-07, BR-08               |

---

# 12. Future Requirements Traceability

The next project stages will extend this mapping into formal requirements.

```text
PP-01
 ↓
RC-01
 ↓
Workflow Approval
 ↓
BR-09
 ↓
Future BRD Requirement
 ↓
Future Functional Requirement
 ↓
Use Case
 ↓
Acceptance Criteria
```

A later Requirements Traceability Matrix will connect:

```text
Business Objective
↕
Pain Point
↕
Business Requirement
↕
Functional Requirement
↕
Use Case
↕
Test / Acceptance Criteria
```

Requirement IDs are therefore intentionally not invented at this stage.

---

# 13. Conclusion

The Improvement Map demonstrates that the proposed To-Be process is based on identifiable business needs rather than a generic procurement-system feature list.

The most important design logic is:

```text
Standardize Workflow
        +
Connect Transaction Data
        +
Automate Rule-Based Controls
        +
Structure Exception Handling
        ↓
Improved P2P Process
```

These improvement decisions provide the bridge between the As-Is analysis and the formal requirements that will be developed in later project stages.
