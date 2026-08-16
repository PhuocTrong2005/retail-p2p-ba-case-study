# As-Is vs To-Be Process Comparison

## Overview

This document compares NovaRetail JSC's current Procure-to-Pay process with the proposed future-state process.

The comparison highlights:

* what changes;
* why the change is needed;
* which activities remain human responsibilities;
* which rule-based activities are automated;
* the expected business effect of each improvement.

The purpose is not to demonstrate that every manual activity should disappear.

The To-Be process retains human judgment where it provides business value while reducing unnecessary manual coordination, repetitive data entry, and inconsistent controls.

---

# 1. Executive Summary

The As-Is process can be summarized as:

```text
Manual
+
Fragmented
+
Email-Dependent
+
Limited Visibility
```

The proposed To-Be process moves toward:

```text
Standardized Workflow
+
Connected Transaction Data
+
Rule-Based Automation
+
Controlled Exceptions
+
Improved Traceability
```

The fundamental change is therefore not simply:

```text
Manual → Digital
```

Instead, it is:

```text
Fragmented Process
        ↓
Connected and Controlled Process
```

---

# 2. High-Level Comparison

| Area                 | As-Is                       | To-Be                                         |
| -------------------- | --------------------------- | --------------------------------------------- |
| Purchase Requisition | Created in Excel            | Created in procurement workflow               |
| PR Data Validation   | Mainly manual               | System validates required data                |
| Budget Control       | Manual / inconsistent       | Mandatory budget validation                   |
| PR Approval          | Email-based                 | Workflow-based                                |
| Supplier Selection   | Existing approved suppliers | Existing approved suppliers                   |
| PO Creation          | PR data re-entered          | PR information reused                         |
| PO Approval Routing  | Manual email routing        | Rule-based workflow routing                   |
| Finance Approval     | Manually determined         | Applied according to configured rules         |
| PO Issuance          | Sent after email approval   | Issued only after required workflow approvals |
| Transaction Data     | Distributed across tools    | Related transaction records connected         |
| PR/PO Status         | Manual follow-up            | Central workflow status                       |
| Audit History        | Emails/files                | Central transaction history                   |
| Goods Receipt        | Separate warehouse record   | GR linked to PO                               |
| Supplier Invoice     | Separate accounting record  | Invoice linked to PO                          |
| Three-Way Matching   | Manual                      | Automated for eligible transactions           |
| Matching Exceptions  | Email / phone               | Structured exception workflow                 |
| Payment Request      | Prepared manually           | Prepared after matching eligibility           |
| Payment Approval     | Manual coordination         | Workflow-based approval                       |
| Bank Payment         | Outside scope               | Outside scope                                 |

---

# 3. Purchase Requisition

## As-Is

The requester prepares the Purchase Requisition using Excel.

```text
Purchasing Need
      ↓
Prepare PR in Excel
      ↓
Send by Email
```

Information is stored in a file before Procurement has a centralized transaction record.

### Issues

* fragmented information;
* limited status visibility;
* possible duplicate data entry downstream.

---

## To-Be

The requester creates the PR directly within the procurement workflow.

```text
Purchasing Need
      ↓
Create PR
      ↓
Submit PR
```

### Main Change

The procurement transaction begins inside the controlled process rather than in an external spreadsheet.

### Expected Effect

* earlier transaction visibility;
* standardized PR information;
* reusable downstream data.

---

# 4. PR Validation

## As-Is

PR information is reviewed manually by downstream users.

Missing or incorrect information may be discovered only after the request has already been sent.

---

## To-Be

The system validates required information before the PR continues.

```text
Submit PR
    ↓
Validate Required Information
```

### Expected Effect

Incomplete requests can be identified earlier, reducing unnecessary downstream clarification.

---

# 5. Budget Control

## As-Is

Budget checking is performed manually and may depend on separately available information.

```text
PR
 ↓
Manual Budget Check
```

The control may therefore be applied inconsistently.

---

## To-Be

Every submitted PR passes through a standard budget-validation step.

```text
PR Submitted
     ↓
Validate Budget
     ↓
Budget Available?
```

### If No

```text
Return PR
   ↓
Revise
   ↓
Resubmit
```

### If Yes

The request proceeds to business approval.

---

## Business Impact

The change improves financial control without moving corporate budget management into the project scope.

---

# 6. Purchase Requisition Approval

## As-Is

The Store Manager receives the PR through email and manually reviews the request.

Approval evidence remains within email communication.

---

## To-Be

The Store Manager reviews the PR through the procurement workflow.

Relevant information is available within the same transaction.

```text
Validated PR
     ↓
Store Manager Review
     ↓
Approved?
```

---

## Main Change

The **decision remains human**, but the workflow around the decision becomes structured.

This distinction is important:

```text
Automation
≠
Automatically approving the purchase
```

The system supports the process. The Store Manager remains responsible for the business decision.

---

# 7. Supplier Selection

## As-Is

Procurement selects an existing supplier.

## To-Be

Procurement continues to select a supplier from the approved Supplier Master.

---

## What Does Not Change

This is intentionally not replaced by:

* automatic sourcing;
* RFQ;
* supplier bidding;
* supplier onboarding.

The improvement project does not need to change every existing activity.

Supplier Selection remains a human Procurement responsibility because full strategic sourcing is outside scope.

---

# 8. Purchase Order Creation

## As-Is

The Procurement Officer creates the PO and may manually re-enter information from the Purchase Requisition.

```text
PR
 ↓
Read Data
 ↓
Re-enter
 ↓
PO
```

---

## To-Be

The Procurement Officer creates the PO using information from the approved PR.

```text
Approved PR
     ↓
Reuse Data
     ↓
Create PO
```

The Procurement Officer adds or updates PO-specific information such as:

* supplier;
* purchasing price;
* delivery terms;
* commercial information.

---

## Expected Effect

* fewer manual-entry touchpoints;
* lower error risk;
* improved PR-to-PO consistency.

---

# 9. Purchase Order Approval Routing

## As-Is

The Procurement Officer manually sends the PO through email.

```text
Create PO
    ↓
Send Email
    ↓
Wait
```

The officer may need to follow up manually.

---

## To-Be

The system evaluates the applicable approval rules and routes the PO.

```text
Submit PO
    ↓
Evaluate Rules
    ↓
Route Approval
```

---

## Main Change

The responsibility for **routing** changes:

```text
As-Is:
Procurement Officer → Manual Routing

To-Be:
System → Rule-Based Routing
```

The responsibility for **approval** does not change:

```text
Procurement Manager / Finance Manager
→ Human Decision
```

---

# 10. Procurement Approval

## As-Is

The Procurement Manager receives the PO through email and approves or returns it.

A returned PO requires manual communication and follow-up.

---

## To-Be

The Procurement Manager reviews the PO through the workflow.

```text
Review PO
   ↓
Approved?
├── Yes → Continue
└── No  → Return for Correction
```

A corrected PO is resubmitted through the controlled process.

---

## Expected Effect

* clearer transaction ownership;
* consistent return/resubmit path;
* improved approval history.

---

# 11. Conditional Financial Approval

## As-Is

Additional financial approval may be required, but routing depends on manual handling.

---

## To-Be

The system evaluates whether additional financial approval is required.

```text
Procurement Approved
        ↓
Finance Approval Required?
       /                  \
     No                    Yes
     ↓                      ↓
Continue             Finance Review
```

---

## Design Improvement

The BPMN does not hardcode a specific monetary threshold.

Instead:

> Approval criteria are maintained as configurable Business Rules.

This keeps the process design stable if NovaRetail later changes financial approval policy.

---

# 12. Purchase Order Issuance

## As-Is

Procurement sends the approved PO to the Supplier after confirming the required email approvals.

---

## To-Be

The PO can be issued only after the workflow confirms that all required approvals are complete.

```text
Required Approvals Complete?
       ↓
      Yes
       ↓
Issue PO
```

---

## Expected Effect

The process reduces the risk of sending a PO before required approval conditions have been satisfied.

---

# 13. Supplier Interaction

## As-Is

Supplier:

```text
Receive PO
   ↓
Prepare Goods
   ↓
Deliver Goods
   ↓
Send Invoice
```

## To-Be

The external business interaction remains fundamentally the same.

---

## What Does Not Change

The project does not introduce a Supplier Portal.

The Supplier remains an external participant and continues to:

* receive the PO;
* deliver goods;
* provide an invoice.

This avoids unnecessary scope expansion.

---

# 14. Goods Receipt

## As-Is

Warehouse Staff record Goods Receipt in a separate warehouse file or system.

The information may not be immediately connected to the procurement transaction.

---

## To-Be

Warehouse Staff record Goods Receipt against the related Purchase Order.

```text
PO-001
  │
  └── GR-001
```

---

## Main Change

The physical receiving activity remains human.

The improvement concerns the **transaction relationship**, not replacing Warehouse Staff.

---

## Expected Effect

* easier identification of related PO;
* better receiving traceability;
* direct input for three-way matching.

---

# 15. Supplier Invoice

## As-Is

AP receives the supplier invoice and records it in the accounting tool.

The accountant may need to manually determine the related PO and Goods Receipt.

---

## To-Be

The Supplier Invoice is recorded against the related Purchase Order.

```text
PO-001
  │
  └── INV-001
```

This creates the structure:

```text
PR-001
   │
   └── PO-001
         ├── GR-001
         └── INV-001
```

---

## Expected Effect

The related transaction data can be retrieved more consistently for matching and review.

---

# 16. Three-Way Matching

## As-Is

AP performs matching manually.

```text
Find PO
+
Find GR
+
Invoice
   ↓
Manual Comparison
```

---

## To-Be

The system performs matching according to predefined rules.

```text
PO
+
GR
+
Invoice
   ↓
Automated Matching
```

Typical comparison attributes include:

* supplier;
* item;
* quantity;
* unit price;
* total amount.

---

## Main Change

Standard transactions move from:

```text
Human compares every transaction
```

to:

```text
System checks standard transactions
Human focuses on exceptions
```

---

## Expected Effect

* reduced repetitive AP work;
* faster standard invoice processing;
* more consistent control execution.

---

# 17. Matching Exception Handling

## As-Is

Mismatch investigation may involve:

```text
Email Procurement
       ↓
Call Warehouse
       ↓
Contact Supplier
       ↓
Wait
       ↓
Re-check
```

Exception history may be difficult to reconstruct.

---

## To-Be

A structured exception is created.

```text
Mismatch
   ↓
Exception Created
   ↓
Assigned for Review
   ↓
Investigate
   ↓
Resolve
   ↓
Re-run Matching
```

The exception maintains:

* type;
* related transaction;
* owner;
* status;
* reason;
* resolution history.

---

## Important Design Decision

Exception handling is **not eliminated**.

Automation is applied to the standard path, while complex cases continue to require human judgment.

This prevents the To-Be design from assuming unrealistic 100% straight-through processing.

---

# 18. Transaction Status

## As-Is

Users determine PR/PO status through:

* email;
* spreadsheet;
* contacting Procurement;
* contacting approvers.

---

## To-Be

Transactions maintain an explicit current status.

```text
Submitted
↓
Pending Approval
↓
Approved
↓
Ordered
↓
Received
↓
Matching
↓
Matched
↓
Payment Approved
```

---

## Expected Effect

* reduced status inquiries;
* easier identification of pending work;
* improved operational visibility.

---

# 19. Audit History

## As-Is

Approval and transaction evidence is distributed across email and files.

---

## To-Be

Important actions are stored as part of transaction history.

Example:

| Transaction | Action    | User                | Time  |
| ----------- | --------- | ------------------- | ----- |
| PO-001      | Created   | Procurement Officer | 09:05 |
| PO-001      | Submitted | Procurement Officer | 09:20 |
| PO-001      | Approved  | Procurement Manager | 10:10 |

---

## Expected Effect

The organization can more easily answer:

```text
Who performed the action?
When?
What changed?
Which transaction was affected?
```

---

# 20. Payment Request

## As-Is

After manual matching, AP prepares supporting information for payment approval.

---

## To-Be

A Payment Request may be prepared after the invoice satisfies payment-readiness rules.

```text
Invoice Matched
      ↓
Prepare Payment Request
```

---

## Expected Effect

Payment preparation occurs only after the required procurement controls are completed.

---

# 21. Payment Approval

## As-Is

Finance reviews the Payment Request and supporting documents.

## To-Be

Finance continues to make the final payment-approval decision, but the request is routed and tracked through the workflow.

```text
Payment Request
      ↓
Finance Review
      ↓
Approved?
```

---

## What Does Not Change

The Finance Manager remains responsible for the approval decision.

Actual bank payment execution is outside scope in both models.

---

# 22. Manual vs Automated Responsibility

The To-Be process does not attempt to remove humans from all process stages.

| Activity                    | As-Is                     | To-Be                          |
| --------------------------- | ------------------------- | ------------------------------ |
| Identify purchasing need    | Human                     | Human                          |
| Create PR                   | Human                     | Human using centralized system |
| Validate required PR fields | Human / downstream review | Automated                      |
| Validate budget             | Manual                    | Automated rule-based check     |
| Approve PR                  | Human                     | Human                          |
| Select Supplier             | Human                     | Human                          |
| Create PO                   | Human                     | Human with data reuse          |
| Route PO approval           | Human                     | Automated                      |
| Approve PO                  | Human                     | Human                          |
| Receive goods               | Human                     | Human                          |
| Inspect goods               | Human                     | Human                          |
| Record GR                   | Human                     | Human using linked transaction |
| Record invoice              | Human                     | Human using linked transaction |
| Standard 3-way matching     | Human                     | Automated                      |
| Resolve mismatch            | Human                     | Human with structured workflow |
| Prepare Payment Request     | Human                     | Human                          |
| Route Payment Request       | Manual                    | Automated                      |
| Approve Payment Request     | Human                     | Human                          |

This distinction reflects the design principle:

> **Automate repeatable rules; retain human judgment where business decisions are required.**

---

# 23. Pain Point Improvement Summary

| Pain Point | As-Is Condition                         | To-Be Response                  |
| ---------- | --------------------------------------- | ------------------------------- |
| PP-01      | Email approval creates waiting time     | Workflow-based PO approval      |
| PP-02      | Data exists in separate sources         | Connected procurement records   |
| PP-03      | AP manually matches every invoice       | Automated matching + exceptions |
| PP-04      | Users manually ask for status           | Workflow status                 |
| PP-05      | Audit evidence distributed across files | Transaction history             |
| PP-06      | Budget check manual/inconsistent        | Mandatory budget validation     |
| PP-07      | PR information entered again            | Reuse approved PR data          |

---

# 24. Expected Business Impact

## Process Efficiency

The To-Be process reduces:

* approval routing effort;
* repeated data entry;
* manual document retrieval;
* manual matching for standard transactions.

---

## Data and Visibility

The To-Be process improves:

* PR-to-PO traceability;
* PO-to-GR traceability;
* PO-to-Invoice traceability;
* transaction status visibility.

---

## Control and Governance

The To-Be process strengthens:

* budget control;
* approval control;
* invoice matching control;
* exception traceability;
* audit history.

---

# 25. What Intentionally Remains Manual

Several activities remain manual because they require business judgment or physical action.

These include:

* identifying purchasing needs;
* business approval;
* supplier selection;
* procurement approval;
* physical goods inspection;
* complex exception investigation;
* Payment Request preparation;
* final payment approval.

This is intentional.

A well-designed To-Be process does not assume that all manual activity is inefficient.

---

# 26. Dependencies of the To-Be Process

The proposed future process depends on several conditions.

### Reliable Supplier Master

Supplier eligibility depends on accurate approved-supplier information.

### Available Budget Information

Automated budget validation requires accessible and sufficiently current budget data.

### Defined Approval Rules

Approval routing requires business owners to define and maintain approval criteria.

### Transaction Data Quality

Automated matching depends on consistent PO, GR, and Invoice data.

### User Adoption

The process improves only if users conduct procurement activities through the defined workflow rather than continuing to rely on parallel spreadsheets and email processes.

---

# 27. Remaining Design Decisions

Some values cannot be responsibly finalized at this stage.

They include:

* approval monetary thresholds;
* matching tolerance values;
* detailed budget-validation policy;
* exception escalation rules;
* detailed system statuses;
* detailed role permissions.

These will require business-owner validation or further requirements analysis.

---

# 28. Scope Consistency

The To-Be process does not add the following capabilities:

```text
Supplier Onboarding
RFQ / RFP
Tender Management
Contract Management
Supplier Scoring
Demand Forecasting
Full Warehouse Management
General Ledger Accounting
Tax Engine
Bank Payment Execution
Supplier Portal
Full ERP Replacement
```

Supplier Selection continues to use the existing approved Supplier Master.

Bank transfer remains beyond the endpoint of the project.

---

# 29. Transformation Summary

The overall transformation can be represented as:

```text
AS-IS
────────────────────────────────

Excel / Email
      ↓
Manual Handoffs
      ↓
Fragmented Data
      ↓
Manual Matching
      ↓
Limited Visibility


TO-BE
────────────────────────────────

Central Procurement Workflow
      ↓
Connected Transaction Data
      ↓
Rule-Based Routing and Controls
      ↓
Automated Standard Matching
      ↓
Structured Exceptions
      ↓
Status + Audit History
```

The proposed design therefore improves the process without unnecessarily expanding the project into a full enterprise procurement or ERP implementation.

---

# 30. Conclusion

The To-Be process addresses the major structural weaknesses identified during the As-Is analysis while preserving necessary human decision-making.

The core transformation is:

```text
Manual Coordination
      ↓
Structured Workflow

Fragmented Records
      ↓
Connected Transactions

Manual Standard Checks
      ↓
Rule-Based Automation

Unstructured Exceptions
      ↓
Controlled Exception Workflow
```

These changes form the business-process foundation for the BRD, system analysis, SRS, and later requirements traceability activities.
