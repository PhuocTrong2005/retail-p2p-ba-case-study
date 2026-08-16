# Pain Point Analysis

## 1. Purpose

This document provides a detailed analysis of the key pain points identified in NovaRetail's current Procure-to-Pay process.

The purpose is to connect each business problem to:

* the process area where it occurs;
* the current-state observation;
* the likely business impact;
* the stakeholders affected;
* the expected improvement direction.

The analysis is based on the As-Is BPMN and the current process walkthrough.

---

## 2. Pain Point Summary

Seven primary pain points were identified.

| ID    | Pain Point                               | Category             | Primary Process Area            |
| ----- | ---------------------------------------- | -------------------- | ------------------------------- |
| PP-01 | Purchase Order approval takes too long   | Process Efficiency   | PO Approval                     |
| PP-02 | Procurement data is fragmented           | Data & Visibility    | End-to-End P2P                  |
| PP-03 | Three-way matching is performed manually | Process Efficiency   | Invoice Processing              |
| PP-04 | PR and PO status is difficult to track   | Data & Visibility    | PR / PO Lifecycle               |
| PP-05 | Audit trail is limited                   | Control & Governance | Approval / Transaction History  |
| PP-06 | Budget control is inconsistent           | Control & Governance | PR Approval                     |
| PP-07 | Procurement data is entered repeatedly   | Process Efficiency   | PR → PO → Downstream Processing |

---

## 3. Detailed Pain Point Analysis

### PP-01 — Purchase Order Approval Takes Too Long

**Process Area:**
Purchase Order Approval.

**Current Observation:**
Purchase Orders are submitted for approval through email. The Procurement Officer depends on the approver to notice the email, review the attached PO, and respond manually.

There is no centralized approval queue, automatic routing, or clear mechanism for identifying pending approvals.

**Primary Cause:**
The approval process depends on manual email communication.

**Business Impact:**

* longer PO approval lead time;
* delayed PO issuance;
* suppliers may receive confirmed orders later;
* purchasing activities may be delayed;
* Procurement Officers may need to perform manual follow-up.

**Affected Stakeholders:**

* Procurement Officer;
* Procurement Manager;
* Finance Manager;
* Supplier;
* Requester.

**Related Objective:**
OBJ-01 — Shorten the Purchase Order approval cycle.

**Improvement Direction:**
Standardize the approval workflow and reduce unnecessary waiting and manual routing.

---

### PP-02 — Procurement Data Is Fragmented

**Process Area:**
End-to-End Procure-to-Pay data flow.

**Current Observation:**
Procurement information is maintained across multiple sources, including:

* Excel files;
* email;
* procurement documents;
* warehouse records;
* accounting software.

Different departments may maintain different versions or parts of the same procurement transaction.

**Primary Cause:**
There is no centralized transaction record connecting PR, PO, Goods Receipt, Invoice, and approval information.

**Business Impact:**

* difficult cross-department coordination;
* inconsistent information;
* increased document search time;
* limited transaction visibility;
* higher risk of using outdated or incomplete information.

**Affected Stakeholders:**

* Procurement Officer;
* Warehouse Staff;
* AP Accountant;
* Procurement Manager;
* Finance Manager.

**Related Objectives:**

* OBJ-02 — Reduce repetitive manual data entry.
* OBJ-03 — Improve procurement visibility and data consistency.

**Improvement Direction:**
Create a more integrated procurement data flow and ensure that relevant transaction information can be accessed consistently across process stages.

---

### PP-03 — Three-Way Matching Is Performed Manually

**Process Area:**
Invoice Processing.

**Current Observation:**
The AP Accountant manually collects and compares:

```text id="hi47xt"
Purchase Order
      +
Goods Receipt
      +
Supplier Invoice
```

The accountant verifies items such as:

* supplier;
* quantity;
* unit price;
* total amount.

If discrepancies are found, the AP Accountant must investigate them manually.

**Primary Cause:**
PO, Goods Receipt, and Invoice information are stored separately and are not automatically related or matched.

**Business Impact:**

* longer invoice processing time;
* increased workload for Accounts Payable;
* risk of missed discrepancies;
* payment may be delayed;
* exception investigation requires additional coordination.

**Affected Stakeholders:**

* AP Accountant;
* Procurement Officer;
* Warehouse Staff;
* Finance Manager;
* Supplier.

**Related Objective:**
OBJ-04 — Strengthen purchasing and invoice controls.

**Improvement Direction:**
Support automated three-way matching for eligible invoices and route mismatches for manual review.

---

### PP-04 — PR and PO Status Is Difficult to Track

**Process Area:**
Purchase Requisition and Purchase Order lifecycle.

**Current Observation:**
The current process does not provide a centralized transaction status.

Users may need to:

* search email;
* check spreadsheets;
* contact Procurement;
* contact managers;

to determine where a request is currently waiting.

**Primary Cause:**
Status information is not maintained through a shared workflow.

**Business Impact:**

* limited visibility;
* increased manual follow-up;
* difficulty identifying responsible parties;
* difficult detection of delayed transactions;
* lower user confidence in the procurement process.

**Affected Stakeholders:**

* Requester;
* Store Manager;
* Procurement Officer;
* Procurement Manager.

**Related Objective:**
OBJ-03 — Improve procurement visibility and data consistency.

**Improvement Direction:**
Provide consistent status information throughout the PR and PO lifecycle.

---

### PP-05 — Audit Trail Is Limited

**Process Area:**
Approval activities and transaction history.

**Current Observation:**
Approval decisions and transaction changes may be distributed across:

* email messages;
* Excel files;
* separate departmental records.

There is no single source containing the complete history of important procurement actions.

**Primary Cause:**
The current process does not centrally record transaction activities and approval decisions.

**Business Impact:**

* difficult historical review;
* difficult identification of who performed an action;
* limited evidence for internal audit;
* difficult reconstruction of procurement decisions;
* weaker process accountability.

**Affected Stakeholders:**

* Procurement Manager;
* Finance Manager;
* CFO;
* Internal Audit.

**Related Objective:**
OBJ-05 — Improve transaction traceability.

**Improvement Direction:**
Record key procurement events, users, timestamps, and approval decisions in a consistent audit history.

---

### PP-06 — Budget Control Is Inconsistent

**Process Area:**
Purchase Requisition approval.

**Current Observation:**
Budget information may need to be checked manually before a Purchase Requisition is approved.

Because budget information is not directly connected to the procurement workflow, the check may depend on available files, communication, or manual verification.

**Primary Cause:**
Budget validation is not embedded as a standard control step in the current process.

**Business Impact:**

* requests may proceed without reliable budget verification;
* additional manual checking effort;
* risk of exceeding available budget;
* delayed approval when budget information must be collected separately.

**Affected Stakeholders:**

* Store Manager;
* Finance Manager;
* Procurement Manager;
* Requester.

**Related Objective:**
OBJ-04 — Strengthen purchasing and invoice controls.

**Improvement Direction:**
Establish a consistent budget-validation control before approval.

---

### PP-07 — Procurement Data Is Entered Repeatedly

**Process Area:**
Purchase Requisition to Purchase Order and downstream processing.

**Current Observation:**
Information that already exists in a Purchase Requisition may need to be manually entered again when the Procurement Officer prepares the Purchase Order.

Additional transaction data may also be entered again in warehouse or accounting records.

**Primary Cause:**
The current tools do not automatically reuse transaction data across process stages.

**Business Impact:**

* additional operational workload;
* longer processing time;
* increased risk of typing errors;
* inconsistent values across documents;
* reduced productivity.

**Affected Stakeholders:**

* Procurement Officer;
* Warehouse Staff;
* AP Accountant.

**Related Objective:**
OBJ-02 — Reduce repetitive manual data entry.

**Improvement Direction:**
Capture transaction information once where possible and reuse it throughout downstream process stages.

---

## 4. Pain Point Relationships

The seven pain points are not completely independent.

Several problems reinforce each other.

### Data Fragmentation Drives Manual Work

```text id="1pqs9h"
PP-02 Fragmented Data
        ↓
PP-07 Duplicate Data Entry
        ↓
More Manual Processing
        ↓
Higher Error Risk
```

---

### Fragmented Data Reduces Visibility

```text id="tayu3c"
PP-02 Fragmented Data
        ↓
No Shared Transaction View
        ↓
PP-04 Limited PR/PO Visibility
```

---

### Fragmented Data Increases Invoice Processing Effort

```text id="d85ug1"
PP-02 Fragmented Data
        ↓
PO / GR / Invoice Stored Separately
        ↓
PP-03 Manual Three-Way Matching
```

---

### Manual Approval Weakens Both Speed and Auditability

```text id="m59lg8"
Email-Based Approval
       ↓
       ├── PP-01 Approval Delay
       │
       └── PP-05 Limited Audit Trail
```

These relationships indicate that improving one underlying process area may address multiple pain points.

---

## 5. Pain Point Prioritization

For the purpose of this case study, the pain points are prioritized based on operational impact, control impact, and influence on the overall P2P cycle.

| Priority | Pain Point                          | Rationale                                              |
| -------- | ----------------------------------- | ------------------------------------------------------ |
| High     | PP-01 — PO Approval Delay           | Directly increases procurement cycle time              |
| High     | PP-02 — Fragmented Data             | Contributes to multiple downstream problems            |
| High     | PP-03 — Manual Three-Way Matching   | Creates significant AP workload and payment delay risk |
| High     | PP-06 — Inconsistent Budget Control | Represents an important financial control weakness     |
| Medium   | PP-04 — Limited Status Visibility   | Increases follow-up effort and reduces transparency    |
| Medium   | PP-05 — Limited Audit Trail         | Important for governance and accountability            |
| Medium   | PP-07 — Duplicate Data Entry        | Increases workload and error risk                      |

The prioritization is qualitative because the project does not use actual NovaRetail operational data.

---

## 6. Analysis Conclusion

The pain-point analysis shows that NovaRetail's current P2P issues are primarily driven by three broader weaknesses:

### 1. Manual Workflow

Critical activities such as approval, document handling, and invoice matching depend heavily on manual work.

### 2. Fragmented Information

Transaction data is distributed across departments and tools without a single connected procurement record.

### 3. Limited Process Controls

Budget validation, transaction tracking, and audit evidence are not consistently embedded within the current workflow.

These findings will be further analyzed through root-cause analysis and then used as inputs for the future-state process design.
