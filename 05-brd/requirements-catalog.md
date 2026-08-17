# Business Requirements Catalog

## 1. Overview

This document defines the consolidated Business Requirements Catalog for the **NovaRetail JSC Procure-to-Pay Process Optimization** project.

The catalog translates the results of the previous Business Analysis activities into a structured set of business-level requirements.

The requirements are derived from:

* business problems and pain points;
* root-cause analysis;
* business objectives;
* agreed project scope;
* To-Be process improvements;
* business rules.

The catalog establishes the initial **Business Requirement baseline** before the requirements are decomposed into Functional Requirements, Use Cases, and Software Requirements.

> **Note:** NovaRetail JSC is a fictional organization created for this Business Analysis portfolio case study. All process volumes, targets, and operational scenarios are simulated.

---

## 2. Requirement Identification Convention

Business Requirements use the following identifier:

```text
BRQ-XX
```

Example:

```text
BRQ-01
BRQ-02
BRQ-03
```

The project uses the following naming convention across its analysis artifacts:

| Prefix | Meaning                    |
| ------ | -------------------------- |
| OBJ    | Business Objective         |
| PP     | Pain Point                 |
| RC     | Root Cause                 |
| BR     | Business Rule              |
| BRQ    | Business Requirement       |
| FR     | Functional Requirement     |
| NFR    | Non-Functional Requirement |
| UC     | Use Case                   |

This convention will later support end-to-end Requirements Traceability.

---

## 3. Priority Definition

Business Requirements are prioritized using three levels.

| Priority   | Definition                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------ |
| **High**   | Required to address a major business problem, critical process control, or core To-Be capability |
| **Medium** | Important to process governance but not a primary transformation driver                          |
| **Low**    | Useful improvement that may be deferred without preventing the core To-Be process from operating |

Priority represents **business importance**, not implementation complexity or development effort.

---

# 4. Business Requirements Summary

| ID     | Business Requirement                                 | Priority | Primary Objective |
| ------ | ---------------------------------------------------- | -------- | ----------------- |
| BRQ-01 | Centralized Procure-to-Pay Transaction Management    | High     | OBJ-03            |
| BRQ-02 | Standardized Purchase Requisition Management         | High     | OBJ-02, OBJ-03    |
| BRQ-03 | Mandatory Budget Control                             | High     | OBJ-04            |
| BRQ-04 | Controlled Supplier Selection                        | Medium   | OBJ-04            |
| BRQ-05 | Standardized Purchase Order Management and Approval  | High     | OBJ-01, OBJ-05    |
| BRQ-06 | Procurement Data Reuse and Transaction Linkage       | High     | OBJ-02, OBJ-03    |
| BRQ-07 | Procurement Status Visibility                        | High     | OBJ-03            |
| BRQ-08 | Controlled Three-Way Matching and Exception Handling | High     | OBJ-04            |
| BRQ-09 | Transaction and Approval Traceability                | High     | OBJ-05            |
| BRQ-10 | Controlled Payment Request Approval                  | High     | OBJ-04            |

---

# 5. Detailed Business Requirements

## BRQ-01 — Centralized Procure-to-Pay Transaction Management

### Requirement

> NovaRetail requires a standardized and connected procurement process covering Purchase Requisition creation through Payment Request approval.

### Business Rationale

The current Procure-to-Pay process is fragmented across several tools and information sources, including:

* Excel;
* email;
* warehouse records;
* accounting software.

A single procurement transaction may therefore be represented differently across multiple departments.

The future process should provide a connected transaction lifecycle covering:

```text
Purchase Requisition
        ↓
Purchase Order
        ↓
Goods Receipt
        ↓
Supplier Invoice
        ↓
Payment Request
```

### Priority

**High**

### Source

* PP-02 — Procurement data is fragmented
* PP-04 — PR/PO status is difficult to track
* RC-02 — Lack of an integrated procurement data flow
* To-Be connected transaction design

### Related Objectives

* OBJ-03 — Improve Procurement Visibility and Data Consistency

### Related Business Rules

* BR-07 — PR-to-PO Traceability
* BR-13 — PO Reference Required for Goods Receipt
* BR-15 — Invoice-to-PO Relationship
* BR-25 — Transaction Status
* BR-26 — Audit History

### Business Success Direction

Relevant users should be able to follow an in-scope procurement transaction from PR creation through Payment Request approval without manually reconstructing its lifecycle from unrelated files and emails.

---

## BRQ-02 — Standardized Purchase Requisition Management

### Requirement

> NovaRetail requires Purchase Requisitions to be created, submitted, validated, approved, rejected or returned, and tracked through a standardized procurement workflow.

### Business Rationale

The As-Is Purchase Requisition process starts with an Excel file and depends heavily on email communication.

This creates:

* inconsistent request handling;
* fragmented information;
* limited status visibility;
* additional downstream data-entry effort.

The future PR lifecycle should follow a controlled process:

```text
Create
  ↓
Submit
  ↓
Validate
  ↓
Approve / Reject / Return
  ↓
Track
```

### Priority

**High**

### Source

* PP-02 — Procurement data is fragmented
* PP-04 — PR/PO status is difficult to track
* PP-07 — Procurement data is entered repeatedly
* To-Be Purchase Requisition process

### Related Objectives

* OBJ-02 — Reduce Repetitive Manual Data Entry
* OBJ-03 — Improve Procurement Visibility and Data Consistency

### Related Business Rules

* BR-01 — Mandatory Purchase Requisition Information
* BR-04 — Purchase Requisition Approval
* BR-05 — Approved PR Required for Procurement
* BR-25 — Transaction Status

### Business Success Direction

Purchase Requisitions should follow a consistent process rather than relying on individual spreadsheet and email practices.

---

## BRQ-03 — Mandatory Budget Control

### Requirement

> NovaRetail requires every applicable Purchase Requisition to pass budget validation before proceeding to business approval.

### Business Rationale

Budget checking in the As-Is process is performed manually and may not be applied consistently.

The To-Be process establishes budget validation as a mandatory control before Store Manager approval.

```text
PR Submitted
     ↓
Budget Validation
     ↓
Budget Available?
   /            \
 Yes             No
  ↓               ↓
PR Approval    Return PR
```

Budget validation and business approval represent different business decisions:

```text
Budget Validation
= Is sufficient budget available?

Business Approval
= Should this purchase be made?
```

### Priority

**High**

### Source

* PP-06 — Budget control is inconsistent
* Process control gap identified during As-Is analysis
* To-Be mandatory budget-validation process

### Related Objectives

* OBJ-04 — Strengthen Purchasing and Invoice Controls

### Related Business Rules

* BR-02 — Budget Validation Before PR Approval
* BR-03 — Insufficient Budget

### Business Success Direction

Applicable Purchase Requisitions should not proceed to business approval without a successful budget-validation result.

### Scope Boundary

The procurement process consumes available budget information.

The following remain outside scope:

* budget creation;
* budget allocation;
* financial planning;
* budget forecasting.

---

## BRQ-04 — Controlled Supplier Selection

### Requirement

> NovaRetail requires Purchase Orders to use eligible suppliers from the existing approved Supplier Master.

### Business Rationale

Only suppliers that have already been approved by NovaRetail should be eligible for use within the in-scope procurement process.

This requirement provides a purchasing-control mechanism without extending the project into supplier sourcing or onboarding.

### Priority

**Medium**

### Source

* Project Scope
* Approved Supplier Master assumption
* To-Be Procurement Processing

### Related Objectives

* OBJ-04 — Strengthen Purchasing and Invoice Controls

### Related Business Rules

* BR-06 — Approved Supplier Requirement

### Business Success Direction

Purchase Orders within the defined P2P process should not be issued to suppliers that are not eligible according to the approved Supplier Master.

### Scope Boundary

The requirement does not include:

* supplier onboarding;
* supplier qualification;
* RFQ;
* RFP;
* tender management;
* supplier scoring;
* contract negotiation.

---

## BRQ-05 — Standardized Purchase Order Management and Approval

### Requirement

> NovaRetail requires Purchase Orders to be created from approved procurement requests and processed through a standardized approval workflow before being issued to suppliers.

### Business Rationale

The current PO approval process depends on email communication and manual follow-up.

This contributes directly to:

* approval waiting time;
* delayed PO issuance;
* limited approval visibility;
* weak approval traceability.

The future process should follow a controlled sequence:

```text
Approved PR
     ↓
Create PO
     ↓
Submit PO
     ↓
Determine Approval Route
     ↓
Procurement Approval
     ↓
Additional Financial Approval
(if required)
     ↓
PO Fully Approved
     ↓
Issue PO
```

### Priority

**High**

### Source

* PP-01 — PO approval takes too long
* PP-05 — Audit trail is limited
* RC-01 — Lack of standardized PO approval workflow
* To-Be PO approval process

### Related Objectives

* OBJ-01 — Shorten the Purchase Order Approval Cycle
* OBJ-05 — Improve Transaction Traceability

### Related Business Rules

* BR-07 — PR-to-PO Traceability
* BR-08 — Reuse of Purchase Requisition Data
* BR-09 — Purchase Order Approval Routing
* BR-10 — Additional Financial Approval
* BR-11 — PO Issuance
* BR-12 — Returned Purchase Order

### Business Success Direction

Every Purchase Order should follow the applicable approval route and complete all required approvals before being issued to the Supplier.

### Policy Note

Exact approval thresholds are intentionally not defined in the current baseline.

Approval criteria should remain configurable according to validated Procurement and Finance policies.

---

## BRQ-06 — Procurement Data Reuse and Transaction Linkage

### Requirement

> NovaRetail requires related procurement records to reuse available transaction information and maintain traceable relationships throughout the Procure-to-Pay lifecycle.

### Business Rationale

The As-Is process requires information to be manually entered and retrieved across several process stages.

The future process should support direct transaction relationships such as:

```text
PR-001
   │
   └── PO-001
         ├── GR-001
         └── INV-001
```

Information already captured upstream should be reused where appropriate.

### Priority

**High**

### Source

* PP-02 — Procurement data is fragmented
* PP-03 — Three-way matching is manual
* PP-07 — Procurement data is entered repeatedly
* RC-02 — Lack of an integrated procurement data flow

### Related Objectives

* OBJ-02 — Reduce Repetitive Manual Data Entry
* OBJ-03 — Improve Procurement Visibility and Data Consistency

### Related Business Rules

* BR-07 — PR-to-PO Traceability
* BR-08 — Reuse of Purchase Requisition Data
* BR-13 — PO Reference Required for Goods Receipt
* BR-15 — Invoice-to-PO Relationship

### Business Success Direction

Existing procurement information should be reused across downstream activities where appropriate, while related documents remain identifiable as part of the same procurement transaction.

---

## BRQ-07 — Procurement Status Visibility

### Requirement

> NovaRetail requires authorized users to have visibility into the current status of relevant Purchase Requisitions, Purchase Orders, Goods Receipts, Supplier Invoices, exceptions, and approval activities.

### Business Rationale

Users currently depend on:

* email;
* spreadsheets;
* Procurement follow-up;
* manager follow-up;

to determine the status of procurement transactions.

The future process should provide consistent workflow status information.

Relevant users should be able to determine:

```text
What is the current status?

Has the transaction been approved?

Has it been returned?

Is an action pending?

Which process stage currently owns the transaction?
```

### Priority

**High**

### Source

* PP-04 — PR/PO status is difficult to track
* PP-02 — Procurement data is fragmented
* RC-02 — Lack of an integrated procurement data flow

### Related Objectives

* OBJ-03 — Improve Procurement Visibility and Data Consistency

### Related Business Rules

* BR-25 — Transaction Status
* BR-26 — Audit History

### Business Success Direction

Authorized users should be able to determine the current status of relevant procurement transactions without relying primarily on manual email follow-up.

---

## BRQ-08 — Controlled Three-Way Matching and Exception Handling

### Requirement

> NovaRetail requires Supplier Invoices to be validated against related Purchase Orders and Goods Receipts before proceeding to payment preparation, with structured handling for mismatched transactions.

### Business Rationale

In the As-Is process, the AP Accountant manually identifies and compares:

```text
Purchase Order
      +
Goods Receipt
      +
Supplier Invoice
```

The future process should support rule-based matching for eligible transactions.

```text
PO + GR + Invoice
        ↓
Three-Way Matching
        ↓
Documents Match?
     /          \
   Yes           No
    ↓             ↓
Continue       Exception
                  ↓
               Resolve
                  ↓
               Re-match
```

Automation should support standard transactions while mismatches remain subject to controlled human investigation.

### Priority

**High**

### Source

* PP-03 — Three-way matching is manual
* RC-03 — Lack of integrated document data and matching capability
* To-Be Three-Way Matching process

### Related Objectives

* OBJ-04 — Strengthen Purchasing and Invoice Controls

### Related Business Rules

* BR-16 — Matching Preconditions
* BR-17 — Matching Attributes
* BR-18 — Matching Tolerance
* BR-19 — Successful Matching
* BR-20 — Mismatch Requires Exception Handling
* BR-21 — Exception Traceability

### Business Success Direction

Eligible transactions should pass through a consistent three-way matching control, while mismatched invoices should not proceed directly to Payment Request preparation until the exception has been resolved.

---

## BRQ-09 — Transaction and Approval Traceability

### Requirement

> NovaRetail requires key procurement activities, transaction changes, matching exceptions, and approval decisions to maintain sufficient history for operational review and audit purposes.

### Business Rationale

The current process stores transaction evidence across:

* email;
* Excel files;
* departmental records;
* separate systems.

The future process should allow NovaRetail to determine:

```text
Who performed the action?
What action was performed?
When did it occur?
Which transaction was affected?
What approval decision was made?
What status changed?
```

### Priority

**High**

### Source

* PP-05 — Audit trail is limited
* RC-01 — Lack of standardized approval workflow
* RC-02 — Lack of integrated procurement data flow
* To-Be audit-history design

### Related Objectives

* OBJ-05 — Improve Transaction Traceability

### Related Business Rules

* BR-12 — Returned Purchase Order
* BR-21 — Exception Traceability
* BR-26 — Audit History
* BR-27 — Role-Based Actions

### Business Success Direction

Key procurement activities should be reconstructable from transaction history without depending on scattered email or spreadsheet evidence.

---

## BRQ-10 — Controlled Payment Request Approval

### Requirement

> NovaRetail requires Payment Requests to proceed to financial approval only after the applicable procurement and invoice controls have been completed.

### Business Rationale

Receiving a Supplier Invoice alone should not make a transaction eligible for Payment Request approval.

The relevant procurement controls must first be completed.

```text
Supplier Invoice
       ↓
Three-Way Matching
       ↓
Matched / Exception Resolved
       ↓
Prepare Payment Request
       ↓
Finance Manager Review
       ↓
Payment Request Approved
```

### Priority

**High**

### Source

* To-Be Payment Approval process
* Payment-control requirements
* Project scope boundary

### Related Objectives

* OBJ-04 — Strengthen Purchasing and Invoice Controls

### Related Business Rules

* BR-19 — Successful Matching
* BR-20 — Mismatch Requires Exception Handling
* BR-22 — Payment Request Eligibility
* BR-23 — Payment Approval
* BR-24 — Payment Execution Boundary

### Business Success Direction

Payment Requests should reach Finance approval only after all applicable procurement and invoice controls have been successfully completed.

### Scope Boundary

```text
Payment Request Approved
          ↓
     END OF SCOPE
```

The following remain outside scope:

* bank transfer;
* payment API execution;
* payment settlement;
* bank reconciliation.

---

# 6. Requirement-to-Objective Matrix

| Business Requirement | OBJ-01 | OBJ-02 | OBJ-03 | OBJ-04 | OBJ-05 |
| -------------------- | :----: | :----: | :----: | :----: | :----: |
| BRQ-01               |        |        |    ✓   |        |        |
| BRQ-02               |        |    ✓   |    ✓   |        |        |
| BRQ-03               |        |        |        |    ✓   |        |
| BRQ-04               |        |        |        |    ✓   |        |
| BRQ-05               |    ✓   |        |        |        |    ✓   |
| BRQ-06               |        |    ✓   |    ✓   |        |        |
| BRQ-07               |        |        |    ✓   |        |        |
| BRQ-08               |        |        |        |    ✓   |        |
| BRQ-09               |        |        |        |        |    ✓   |
| BRQ-10               |        |        |        |    ✓   |        |

---

# 7. Requirement-to-Pain-Point Matrix

| Requirement | PP-01 | PP-02 | PP-03 | PP-04 | PP-05 | PP-06 | PP-07 |
| ----------- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| BRQ-01      |       |   ✓   |       |   ✓   |       |       |       |
| BRQ-02      |       |   ✓   |       |   ✓   |       |       |   ✓   |
| BRQ-03      |       |       |       |       |       |   ✓   |       |
| BRQ-04      |       |       |       |       |       |       |       |
| BRQ-05      |   ✓   |       |       |       |   ✓   |       |       |
| BRQ-06      |       |   ✓   |   ✓   |       |       |       |   ✓   |
| BRQ-07      |       |   ✓   |       |   ✓   |       |       |       |
| BRQ-08      |       |       |   ✓   |       |       |       |       |
| BRQ-09      |       |       |       |   ✓   |   ✓   |       |       |
| BRQ-10      |       |       |   ✓   |       |       |       |       |

BRQ-04 is primarily derived from the agreed purchasing-control scope rather than from one of the seven identified As-Is pain points.

---

# 8. Requirement-to-Root-Cause Mapping

| Requirement | Root Cause / Control Source                                         |
| ----------- | ------------------------------------------------------------------- |
| BRQ-01      | RC-02 — Lack of integrated procurement data flow                    |
| BRQ-02      | RC-02 and fragmented manual PR handling                             |
| BRQ-03      | Budget-control gap                                                  |
| BRQ-04      | Approved-supplier purchasing control                                |
| BRQ-05      | RC-01 — Lack of standardized PO approval workflow                   |
| BRQ-06      | RC-02 — Lack of integrated procurement data flow                    |
| BRQ-07      | RC-02 — Lack of integrated procurement data flow                    |
| BRQ-08      | RC-03 — Lack of integrated document data and matching capability    |
| BRQ-09      | RC-01 and RC-02                                                     |
| BRQ-10      | Payment-control requirement dependent on completed invoice controls |

---

# 9. Requirement Dependencies

The Business Requirements are related rather than completely independent.

## 9.1 Transaction Foundation

BRQ-01 provides the overall process foundation.

```text
BRQ-01
Centralized P2P Transaction Management
        │
        ├── BRQ-02
        │   PR Management
        │
        ├── BRQ-05
        │   PO Management
        │
        └── BRQ-06
            Transaction Linkage
```

---

## 9.2 Data-Driven Dependencies

BRQ-06 supports several downstream capabilities.

```text
BRQ-06
Data Reuse and Transaction Linkage
        │
        ├── BRQ-07
        │   Status Visibility
        │
        ├── BRQ-08
        │   Three-Way Matching
        │
        └── BRQ-09
            Traceability
```

---

## 9.3 Invoice-to-Payment Dependency

```text
BRQ-08
Three-Way Matching
        ↓
Invoice Eligibility
        ↓
BRQ-10
Payment Request Approval
```

A controlled Payment Request process depends on successful matching or resolved exceptions.

---

# 10. Requirements Outside the Current Scope

The Business Requirement baseline intentionally excludes:

* supplier onboarding;
* supplier qualification;
* RFQ / RFP;
* tender management;
* strategic sourcing;
* contract lifecycle management;
* supplier performance management;
* inventory forecasting;
* demand planning;
* full Warehouse Management System functionality;
* corporate budget creation and planning;
* General Ledger accounting;
* Accounts Receivable;
* payroll;
* detailed tax processing;
* bank payment execution;
* bank API integration;
* bank reconciliation;
* Supplier Portal;
* full ERP replacement.

Any future request for these capabilities should be evaluated as a potential scope change.

---

# 11. Requirements Requiring Further Decomposition

The Business Requirements describe **what NovaRetail needs**.

Detailed system behavior will be defined in later analysis stages.

| BRQ    | Further Analysis Required                                      |
| ------ | -------------------------------------------------------------- |
| BRQ-01 | Transaction model and lifecycle relationships                  |
| BRQ-02 | PR fields, validation, statuses, user actions                  |
| BRQ-03 | Budget-validation behavior and failure scenarios               |
| BRQ-04 | Supplier eligibility validation                                |
| BRQ-05 | PO workflow, approval routing, return/resubmit scenarios       |
| BRQ-06 | Document relationships and reusable transaction data           |
| BRQ-07 | Detailed status model and visibility rules                     |
| BRQ-08 | Matching rules, tolerance, exception types and resolution flow |
| BRQ-09 | Audit events, history fields and access rules                  |
| BRQ-10 | Payment Request data and approval behavior                     |

These areas will later be decomposed into Functional Requirements and Use Cases.

---

# 12. Open Business Decisions

Some business policies remain intentionally unresolved.

| ID    | Open Decision                                    | Expected Owner                        |
| ----- | ------------------------------------------------ | ------------------------------------- |
| OD-01 | Exact PO approval monetary thresholds            | Procurement Manager / Finance Manager |
| OD-02 | Criteria requiring additional financial approval | Finance Manager                       |
| OD-03 | Detailed budget-validation policy                | Finance Manager                       |
| OD-04 | Three-way matching tolerance values              | Finance Manager / AP Accountant       |
| OD-05 | Matching-exception escalation rules              | Procurement Manager / Finance Manager |
| OD-06 | Final procurement transaction statuses           | Process Owners                        |
| OD-07 | Detailed role permissions                        | Business Owners / IT                  |
| OD-08 | Detailed partial Goods Receipt policy            | Procurement / Warehouse               |

These decisions should be validated rather than invented solely to complete documentation.

---

# 13. Business Requirement Baseline

The initial BRD requirement baseline contains:

```text
10 Business Requirements

9 High Priority
1 Medium Priority
0 Low Priority
```

The baseline covers the agreed process boundary:

```text
Purchase Requisition Creation
            ↓
Payment Request Approval
```

---

# 14. Future Requirement Decomposition

Business Requirements will later be decomposed into more detailed requirements.

Example:

```text
BRQ-05
Standardized PO Management and Approval
        ↓
Functional Requirements
        ↓
Create PO from Approved PR
Determine Approval Route
Route PO to Approver
Approve / Return PO
Resubmit Corrected PO
        ↓
Use Cases
        ↓
Acceptance Criteria
```

Another example:

```text
BRQ-08
Controlled Three-Way Matching
        ↓
Functional Requirements
        ↓
Retrieve PO / GR / Invoice
Evaluate Matching Rules
Identify Mismatch
Create Exception
Resolve Exception
Re-run Matching
```

Functional Requirement IDs will be formally assigned during the detailed requirements stage.

---

# 15. Traceability Direction

The project will maintain the following traceability model:

```text
Business Problem
       ↓
Pain Point
       ↓
Root Cause
       ↓
Business Objective
       ↓
Business Requirement
       ↓
Business Rule
       ↓
Functional Requirement
       ↓
Use Case
       ↓
Acceptance Criteria / Test
```

The Business Requirements Catalog establishes the `BRQ` layer of this model.

---

# 16. Catalog Status

| Item                             | Status          |
| -------------------------------- | --------------- |
| BRQ-01 to BRQ-10 identified      | Complete        |
| Business priorities assigned     | Complete        |
| Business-objective mapping       | Complete        |
| Pain-point mapping               | Complete        |
| Root-cause/control mapping       | Complete        |
| Business-rule references         | Complete        |
| Detailed Functional Requirements | Not yet defined |
| Detailed Use Cases               | Not yet defined |
| Acceptance Criteria              | Not yet defined |
| Final RTM                        | Future stage    |

---

## Case Study Disclaimer

NovaRetail JSC is a fictional organization created solely for this Business Analysis portfolio project.

The requirements in this catalog are based on the simulated business context, agreed project scope, As-Is process analysis, pain-point analysis, root-cause analysis, and proposed To-Be process.

Any quantitative targets, approval policies, matching tolerances, or operational assumptions require validation in a real implementation.
