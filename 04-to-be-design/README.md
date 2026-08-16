# To-Be Procure-to-Pay Process Design

## Overview

This section presents the proposed future-state Procure-to-Pay process for **NovaRetail JSC**, a fictional retail company used for this Business Analysis case study.

The To-Be process was designed based on the findings from the As-Is analysis, including identified pain points, process bottlenecks, and root causes.

The goal is not to automate every activity. Instead, the proposed process focuses on:

* standardizing procurement workflows;
* reducing unnecessary manual activities;
* improving transaction visibility;
* strengthening budget and approval controls;
* reducing duplicate data entry;
* improving invoice matching;
* maintaining better transaction traceability.

The process remains within the project boundary from **Purchase Requisition creation to Payment Request approval**.

> **Note:** Actual bank payment execution is outside the scope of this case study.

---

## 1. Process Design Objectives

The To-Be process is designed to support the following business goal:

> **Improve the efficiency, transparency, consistency, and control of NovaRetail's Procure-to-Pay process.**

The future-state design supports five project objectives:

| ID     | Business Objective                                  |
| ------ | --------------------------------------------------- |
| OBJ-01 | Shorten the Purchase Order approval cycle           |
| OBJ-02 | Reduce repetitive manual data entry                 |
| OBJ-03 | Improve procurement visibility and data consistency |
| OBJ-04 | Strengthen purchasing and invoice controls          |
| OBJ-05 | Improve transaction traceability                    |

The To-Be process introduces only improvements that can be traced back to identified business problems, root causes, or project objectives.

---

## 2. Design Principles

Five principles were used when designing the future-state process.

### 2.1 Standardize the Workflow

Approval and transaction activities should follow defined workflows instead of depending on individual email communication and manual follow-up.

For example:

```text
As-Is

Create PO
   ↓
Send Approval Email
   ↓
Wait for Manager
   ↓
Manual Follow-up
```

becomes:

```text
To-Be

Submit PO
   ↓
Evaluate Approval Rules
   ↓
Route to Approver
   ↓
Approval Decision
```

The system manages the routing, while authorized business users remain responsible for approval decisions.

---

### 2.2 Reuse Existing Transaction Data

Information already captured during an earlier stage should be reused where appropriate.

For example:

```text
Purchase Requisition
        ↓
Reuse Approved PR Data
        ↓
Purchase Order
```

This reduces unnecessary data entry and lowers the risk of inconsistent values between related documents.

---

### 2.3 Automate Rule-Based Activities

Activities with clear and repeatable rules may be automated.

Examples include:

* mandatory field validation;
* budget validation;
* approval routing;
* transaction status updates;
* three-way matching;
* exception creation.

Activities requiring business judgment remain human responsibilities.

---

### 2.4 Embed Business Controls into the Process

Important controls should be part of the normal procurement workflow rather than optional or manually applied checks.

Key control points include:

```text
Budget Validation
        ↓
PR Approval
        ↓
PO Approval
        ↓
Three-Way Matching
        ↓
Payment Approval
```

---

### 2.5 Improve Visibility and Traceability

The future process should maintain a consistent record of important transaction information.

This may include:

* current transaction status;
* responsible user;
* related PR, PO, GR, and Invoice;
* approval decision;
* action timestamp;
* transaction history.

This improves both operational visibility and auditability.

---

## 3. Process Boundary

### Start Event

The process begins when an authorized Store Employee or requester identifies a purchasing need and creates a Purchase Requisition.

### End Event

The process ends when the related Payment Request has been reviewed and approved.

### High-Level Process

```text
Purchasing Need
      ↓
Create Purchase Requisition
      ↓
System Validation
      ↓
Budget Validation
      ↓
PR Approval
      ↓
Procurement Processing
      ↓
Create Purchase Order
      ↓
PO Approval Routing
      ↓
PO Approval
      ↓
Supplier Fulfillment
      ↓
Goods Receipt + Supplier Invoice
      ↓
Three-Way Matching
      ↓
Exception Resolution
      ↓
Payment Request
      ↓
Payment Approval
```

The following activity is intentionally excluded:

```text
Payment Approval
      ↓
Bank Payment Execution   ← Out of Scope
```

---

## 4. Process Participants

The To-Be process includes both human participants and automated system activities.

| Participant                   | Responsibility                                                                                     |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| Store Employee / Requester    | Creates, submits, and revises Purchase Requisitions                                                |
| Procurement Management System | Performs validation, routing, transaction linking, matching, status updates, and workflow controls |
| Store Manager                 | Reviews and approves the business need represented by the PR                                       |
| Procurement Officer           | Reviews approved PRs, selects approved suppliers, creates and maintains Purchase Orders            |
| Procurement Manager           | Reviews Purchase Orders from a procurement-control perspective                                     |
| Warehouse Staff               | Receives goods and records Goods Receipt against the related PO                                    |
| AP Accountant                 | Records invoices, handles matching exceptions, and prepares Payment Requests                       |
| Finance Manager               | Performs required financial approvals and Payment Request approval                                 |
| Supplier                      | Receives approved Purchase Orders, delivers goods, and issues invoices                             |

### External Participant

The **Supplier** remains outside NovaRetail's internal system boundary.

The project does not include a Supplier Portal. Supplier communication is therefore represented as external interaction with the internal procurement process.

---

## 5. To-Be BPMN Model

![NovaRetail Procure-to-Pay To-Be BPMN](./bpmn/p2p-to-be.png)

[Open editable Draw.io source](./bpmn/p2p-to-be.drawio)

The BPMN model distinguishes between:

* human activities;
* automated system activities;
* approval decisions;
* exception paths;
* external supplier interactions.

The **Procurement Management System** is represented separately because several future-state activities are performed automatically rather than by a specific employee.

---

# 6. To-Be Process Walkthrough

## 6.1 Purchase Requisition Creation

The process begins when a Store Employee identifies a purchasing need.

The requester creates a Purchase Requisition directly in the Procurement Management System.

Typical information includes:

* item or service;
* requested quantity;
* estimated price;
* required date;
* purchasing reason;
* store or department;
* cost center.

After completing the required information, the requester submits the PR.

```text
Purchasing Need Identified
        ↓
Create Purchase Requisition
        ↓
Submit PR
```

### Improvement

The procurement transaction is now created within a centralized workflow instead of starting as an Excel file distributed through email.

**Related Pain Points:** PP-02, PP-04, PP-07.

---

## 6.2 Required Information Validation

After submission, the system validates whether the Purchase Requisition contains the required information.

Examples may include:

* mandatory fields;
* valid requester;
* store or department;
* cost center;
* estimated purchase value.

```text
PR Submitted
     ↓
Validate Required Information
```

Incomplete requests are returned to the requester for correction before continuing.

### Improvement

Invalid or incomplete requests can be identified earlier in the process instead of being discovered manually by downstream users.

---

## 6.3 Budget Validation

After the required information has been validated, the system checks the available budget associated with the request.

```text
Validate PR
     ↓
Validate Budget
     ↓
Budget Available?
```

### If budget is available

The request continues to business approval.

### If budget is not available

```text
Budget Not Available
        ↓
Return PR
        ↓
Requester Revises PR
        ↓
Resubmit
```

The project assumes that budget information is available to the procurement process.

The procurement solution does not create or manage NovaRetail's corporate budget.

### Improvement

Budget validation becomes a consistent control point before PR approval.

**Related Pain Point:** PP-06.
**Related Objective:** OBJ-04.

---

## 6.4 Purchase Requisition Approval

After successful validation, the Store Manager reviews the Purchase Requisition.

Relevant information may include:

* requester;
* requested items;
* quantities;
* estimated amount;
* business justification;
* required date;
* budget-validation result.

The Store Manager decides whether the purchase should proceed.

```text
Budget Validated
       ↓
Review PR
       ↓
PR Approved?
```

### Approved

The PR is routed to Procurement.

### Rejected

The PR is rejected or returned according to the applicable workflow.

Budget validation and business approval are treated as separate controls:

```text
Budget Validation
= Can the organization financially support the request?

Business Approval
= Should this purchase be made?
```

---

## 6.5 Procurement Processing

The Procurement Officer receives the approved PR and reviews the purchasing requirement.

The officer then selects a supplier from the existing approved Supplier Master.

```text
Approved PR
     ↓
Review PR
     ↓
Select Existing Approved Supplier
```

Supplier onboarding and supplier qualification are not included in this process.

---

## 6.6 Purchase Order Creation

The Procurement Officer creates the Purchase Order using information already available in the approved PR.

```text
Approved PR
     ↓
Create PO from PR
```

Reusable information may include:

* item;
* quantity;
* requesting store;
* required date;
* PR reference.

The Procurement Officer adds PO-specific information such as:

* supplier;
* final price;
* delivery information;
* commercial terms.

### Improvement

The future process reduces the need to manually re-enter information that already exists.

```text
As-Is

PR Data
  ↓
Manual Re-entry
  ↓
PO


To-Be

PR Data
  ↓
Reuse
  ↓
PO
```

**Related Pain Point:** PP-07.
**Related Objective:** OBJ-02.

---

## 6.7 Purchase Order Approval Routing

After the PO is submitted, the Procurement Management System evaluates the applicable approval rules.

The approval route may depend on criteria such as:

* purchase value;
* purchasing category;
* department;
* cost center;
* financial approval requirements.

```text
Submit PO
    ↓
Evaluate Approval Rules
    ↓
Route PO to Approver
```

The BPMN model does not define specific monetary approval thresholds.

Detailed approval criteria are maintained separately in:

[`business-rules.md`](./business-rules.md)

---

## 6.8 Procurement Approval

The Procurement Manager reviews the Purchase Order from a procurement-control perspective.

The review may include:

* approved PR reference;
* supplier;
* items;
* quantities;
* price;
* total value;
* commercial terms.

```text
Review PO
    ↓
PO Approved?
```

### If changes are required

```text
Request Changes
      ↓
Procurement Officer
Corrects PO
      ↓
Resubmit PO
```

The corrected transaction re-enters the approval workflow.

### If approved

The process determines whether additional financial approval is required.

---

## 6.9 Conditional Financial Approval

Additional financial approval is applied only when the applicable business rules require it.

```text
Procurement Approval
        ↓
Additional Financial Approval Required?
          /                      \
        No                       Yes
        ↓                         ↓
     Continue             Finance Manager Review
                                  ↓
                             Approved?
```

If the Finance Manager requests changes, the PO is returned for correction and resubmission.

Once all required approvals have been completed, the Purchase Order becomes fully approved.

### Design Decision

Exact monetary thresholds are intentionally not defined in the BPMN model.

This keeps the process model stable while allowing approval thresholds to be maintained as configurable business rules.

---

## 6.10 Purchase Order Issuance

After all required approvals are completed, the Purchase Order is finalized and issued to the Supplier.

```text
Final Approval
      ↓
Finalize PO
      ↓
Send Approved PO
      ↓
Supplier
```

The transaction status and approval history are maintained by the system.

---

## 6.11 Supplier Fulfillment

The Supplier receives the approved Purchase Order.

The Supplier then:

1. prepares the requested goods;
2. delivers the goods to NovaRetail;
3. issues the corresponding Supplier Invoice.

Because the Supplier is external to NovaRetail, communication between the Supplier and NovaRetail is represented using BPMN Message Flows.

---

## 6.12 Goods Receipt

Warehouse Staff receive the delivered goods and verify the shipment.

The warehouse checks information such as:

* item;
* quantity;
* physical condition;
* related Purchase Order.

The Goods Receipt is recorded against the corresponding PO.

```text
PO-001
   │
   └── GR-001
```

### Improvement

The Goods Receipt becomes directly associated with the purchasing transaction rather than existing only as an independent warehouse record.

---

## 6.13 Supplier Invoice Processing

The AP Accountant receives and records the Supplier Invoice.

Typical information may include:

* invoice number;
* supplier;
* PO reference;
* invoice date;
* invoice amount.

The invoice is linked to the corresponding Purchase Order.

```text
PR-001
   │
   └── PO-001
         ├── GR-001
         └── INV-001
```

### Improvement

Related procurement documents can be retrieved through the same transaction relationship.

**Related Pain Point:** PP-02.
**Related Objective:** OBJ-03.

---

# 7. Automated Three-Way Matching

Once the required documents are available, the system performs three-way matching between:

```text
Purchase Order
      +
Goods Receipt
      +
Supplier Invoice
```

The matching process may compare:

* supplier;
* item;
* quantity;
* unit price;
* total amount.

```text
PO + GR + Invoice
        ↓
Automated 3-Way Matching
        ↓
Documents Match?
```

---

## 7.1 Successful Match

If the documents satisfy the applicable matching rules:

```text
Match
  ↓
Mark Invoice as Matched
  ↓
Ready for Payment Processing
```

The AP Accountant can then prepare the Payment Request.

### Improvement

Eligible transactions no longer require AP staff to manually compare every PO, Goods Receipt, and Invoice.

**Related Pain Point:** PP-03.
**Related Objective:** OBJ-04.

---

## 7.2 Matching Exception

If the documents do not satisfy the matching rules:

```text
Mismatch
   ↓
Create Matching Exception
```

The transaction is routed to structured exception handling rather than being handled only through unstructured email or phone communication.

---

# 8. Exception Handling

Matching exceptions may include:

* quantity mismatch;
* price mismatch;
* incomplete Goods Receipt;
* incorrect invoice information.

The AP Accountant reviews the exception and coordinates with the relevant party when necessary.

```text
Exception Created
       ↓
Review Exception
       ↓
Investigate Cause
       ↓
Resolve / Correct Information
       ↓
Re-run Matching
```

Depending on the exception, the AP Accountant may need input from:

* Procurement Officer;
* Warehouse Staff;
* Supplier.

After the issue is resolved, the matching process is executed again.

### Improvement

The future-state process converts exception handling from informal coordination into a traceable workflow.

---

# 9. Payment Request

After the invoice has been successfully matched, the AP Accountant prepares a Payment Request.

```text
Invoice Matched
      ↓
Prepare Payment Request
      ↓
Submit
```

The Payment Request references the related procurement documents so Finance can review the transaction consistently.

---

# 10. Payment Approval

The system routes the Payment Request to the Finance Manager.

```text
Submit Payment Request
        ↓
Route for Approval
        ↓
Finance Manager Review
        ↓
Payment Approved?
```

### If changes are required

```text
Return Request
      ↓
AP Revises
      ↓
Resubmit
```

### If approved

```text
Payment Request Approved
```

This is the **end event** for the Procure-to-Pay process analyzed in this project.

Actual payment execution through a bank is outside the project scope.

---

# 11. Transaction Status and Audit History

Status tracking and audit history are treated as system-wide behaviors rather than separate BPMN tasks after every activity.

For key transactions, the system should maintain information such as:

```text
Transaction
Action
User
Timestamp
Status
Approval Decision
Related Document
```

Example:

```text
PO-001

Created
Procurement Officer
09:10

Submitted
Procurement Officer
09:25

Procurement Approved
Procurement Manager
10:05

Financial Approved
Finance Manager
10:40
```

This supports both operational visibility and auditability.

**Related Pain Points:** PP-04 and PP-05.
**Related Objectives:** OBJ-03 and OBJ-05.

---

# 12. Key Process Improvements

| Process Area         | As-Is                              | To-Be                                       |
| -------------------- | ---------------------------------- | ------------------------------------------- |
| Purchase Requisition | Created in Excel                   | Created within procurement workflow         |
| Budget Control       | Manual and inconsistent            | Mandatory validation before approval        |
| PR Approval          | Email-based                        | Workflow-based approval                     |
| PO Creation          | PR information manually re-entered | PR data reused when creating PO             |
| PO Approval          | Email and manual follow-up         | Rule-based routing                          |
| Transaction Status   | Users manually request updates     | Status maintained centrally                 |
| Audit Trail          | Distributed across email/files     | Key actions recorded in transaction history |
| Goods Receipt        | Maintained separately              | Linked to related PO                        |
| Supplier Invoice     | Separate accounting record         | Linked to related PO                        |
| Three-Way Matching   | Manual                             | Automated for eligible transactions         |
| Matching Exception   | Email / phone coordination         | Structured exception workflow               |
| Payment Approval     | Manual document coordination       | Workflow-based approval                     |

A more detailed comparison is documented in:

[`as-is-to-be-comparison.md`](./as-is-to-be-comparison.md)

---

# 13. Pain Point Coverage

The future-state process is designed to directly address the seven identified As-Is pain points.

| Pain Point                                     | To-Be Improvement                                 | Related Objective |
| ---------------------------------------------- | ------------------------------------------------- | ----------------- |
| PP-01 — PO approval takes too long             | Workflow-based approval routing                   | OBJ-01            |
| PP-02 — Procurement data is fragmented         | Connected PR → PO → GR → Invoice transaction flow | OBJ-03            |
| PP-03 — Three-way matching is manual           | Automated matching with exception handling        | OBJ-04            |
| PP-04 — PR/PO status is difficult to track     | Centralized transaction status                    | OBJ-03            |
| PP-05 — Audit trail is limited                 | Centralized action and approval history           | OBJ-05            |
| PP-06 — Budget control is inconsistent         | Mandatory budget validation before PR approval    | OBJ-04            |
| PP-07 — Procurement data is repeatedly entered | Reuse of upstream transaction information         | OBJ-02            |

Detailed traceability is documented in:

[`improvement-map.md`](./improvement-map.md)

---

# 14. As-Is to To-Be Transformation

The major transformation can be summarized as:

```text
Fragmented Manual Process
          ↓
Standardized Workflow
          ↓
Connected Procurement Data
          ↓
Rule-Based Automation
          ↓
Controlled Exception Handling
          ↓
Improved Visibility and Traceability
```

The intention is not simply to digitize existing manual steps.

The future-state design also changes how information and control points move through the process.

---

# 15. Expected Business Outcomes

The proposed To-Be process is expected to support the following outcomes.

## Faster Approval Processing

Workflow routing reduces unnecessary waiting and manual follow-up during Purchase Order approval.

---

## Reduced Manual Data Entry

Existing information can be reused across related procurement documents instead of repeatedly entering the same data.

---

## Improved Procurement Visibility

Users can identify the status of PRs and POs through the procurement workflow rather than relying on email inquiries.

---

## Improved Data Consistency

PRs, POs, Goods Receipts, and Supplier Invoices are linked through related procurement transactions.

---

## Stronger Purchasing Controls

Budget validation and approval requirements are embedded in the standard purchasing process.

---

## More Efficient Invoice Processing

Eligible transactions can be automatically matched, allowing AP staff to focus on exceptions.

---

## Improved Auditability

Important transaction events and approval decisions can be reconstructed using centralized transaction history.

---

# 16. Scope Protection

The To-Be design intentionally excludes functionality that is not required to address the project's defined business problems.

The following remain outside scope:

* Supplier onboarding;
* Supplier qualification;
* supplier performance management;
* strategic sourcing;
* RFI / RFQ / RFP;
* tender management;
* supplier contract management;
* demand forecasting;
* full inventory management;
* detailed warehouse management;
* general ledger accounting;
* Accounts Receivable;
* payroll;
* detailed tax processing;
* bank payment execution;
* bank reconciliation;
* customer sales processes;
* Supplier Portal;
* full ERP replacement.

### Supplier Selection

Supplier Selection in this project means:

> Selecting a supplier from an existing approved Supplier Master.

It does not include supplier onboarding or full sourcing activities.

### Budget Management

The procurement process consumes available budget information.

Creation, allocation, forecasting, and management of the corporate budget remain outside scope.

---

# 17. Key Assumptions

The To-Be design is based on the following assumptions:

1. NovaRetail maintains an existing approved Supplier Master.
2. Each Purchase Requisition is associated with a valid store, department, or cost center.
3. Budget information is available to the procurement process.
4. The existing accounting system remains in use.
5. Warehouse Staff are responsible for recording Goods Receipt.
6. Purchases included in this project follow a PO-based process.
7. Approval rules can be configured based on predefined business criteria.
8. Users have defined roles and permissions.
9. The case study uses synthetic information rather than real NovaRetail production data.

---

# 18. Business Rules

The BPMN model describes the workflow, but detailed business decisions are maintained separately.

The Business Rules artifact defines rules related to:

* PR validation;
* budget control;
* approved supplier selection;
* PO approval;
* additional financial approval;
* Goods Receipt;
* three-way matching;
* matching exceptions;
* payment readiness;
* transaction status.

See:

[`business-rules.md`](./business-rules.md)

Keeping these rules outside the BPMN prevents the process diagram from becoming dependent on values that may change later, such as approval thresholds.

---

# 19. Improvement Traceability

The To-Be design maintains traceability between business problems and proposed improvements.

```text
Pain Point
    ↓
Root Cause
    ↓
Improvement
    ↓
Business Objective
    ↓
To-Be Process
```

Example:

```text
PP-01
PO Approval Delay
       ↓
RC-01
No Standardized Approval Workflow
       ↓
Automated Approval Routing
       ↓
OBJ-01
Shorten PO Approval Cycle
       ↓
To-Be PO Approval Workflow
```

This mapping is documented in detail in:

[`improvement-map.md`](./improvement-map.md)

---

# 20. Supporting Artifacts

The To-Be design is supported by the following artifacts.

| Artifact                                                   | Description                                             |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| [`bpmn/p2p-to-be.png`](./bpmn/p2p-to-be.png)               | To-Be BPMN diagram for GitHub viewing                   |
| [`bpmn/p2p-to-be.drawio`](./bpmn/p2p-to-be.drawio)         | Editable BPMN source                                    |
| [`improvement-map.md`](./improvement-map.md)               | Traceability from As-Is problems to To-Be improvements  |
| [`business-rules.md`](./business-rules.md)                 | Business rules controlling the future process           |
| [`as-is-to-be-comparison.md`](./as-is-to-be-comparison.md) | Summary comparison between current and future processes |

---

# 21. Relationship to Requirements Analysis

The To-Be process defines **how the future business process should operate**.

It does not yet represent the full functional specification of the system.

The next analysis stages will translate the To-Be process into formal requirements.

```text
Business Context
      ↓
Problem Statement
      ↓
Business Objectives
      ↓
As-Is Process Analysis
      ↓
Pain Points
      ↓
Root Causes
      ↓
To-Be Process Design
      ↓
Business Requirements
      ↓
Functional Requirements
      ↓
Use Cases
      ↓
System Requirements Specification
      ↓
Traceability
```

This approach helps ensure that future system requirements originate from identified business needs rather than from unsupported feature ideas.

---

---

## Case Study Note

NovaRetail JSC is a fictional company created for this Business Analysis portfolio project.

The process volumes, targets, rules, and business scenarios used in this repository are simulated for analysis and demonstration purposes and do not represent operational data from a real organization.
