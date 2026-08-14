# Project Objectives

## 1. Purpose

After reviewing the current Procure-to-Pay process, the project identified several recurring issues related to approval delays, fragmented data, manual processing, limited visibility, weak auditability, and inconsistent financial controls.

Instead of treating each pain point as a separate objective, the project groups related issues into five broader improvement areas.

The objectives below define what the redesigned Procure-to-Pay process is expected to achieve.

> **Assumption:** The quantitative values used in this case study are hypothetical and are included only to establish measurable targets for the proposed process.

---

## 2. Business Goal

The overall goal of the project is to improve the efficiency, transparency, consistency, and control of NovaRetail's Procure-to-Pay process.

The project focuses on:

* reducing unnecessary waiting time;
* reducing repetitive manual work;
* improving access to consistent procurement information;
* strengthening purchasing and payment controls;
* improving transaction traceability.

---

## 3. Business Objectives

### OBJ-01 — Shorten the Purchase Order Approval Cycle

The current Purchase Order approval process depends heavily on email communication. Approval requests may remain pending until the appropriate manager reviews and responds to them.

The project aims to reduce unnecessary waiting time and shorten the PO approval cycle.

**Related Pain Point:**
PP-01 — Purchase Order approval takes too long.

**Measure:**
Average time between PO submission and final approval.

**Current Assumption:**
Approximately 2 business days.

**Target:**
Less than 1 business day.

---

### OBJ-02 — Reduce Repetitive Manual Data Entry

Procurement information is currently entered and transferred between several files and systems. Similar information may need to be entered again when creating a Purchase Order, recording goods receipt, or processing an invoice.

The objective is to reduce repeated data entry and allow transaction information to be reused throughout the Procure-to-Pay process where possible.

**Related Pain Points:**

* PP-02 — Procurement data is fragmented.
* PP-07 — Data is manually re-entered across multiple process stages.

**Measure:**
Average number of manual data-entry touchpoints per procurement transaction.

**Current Assumption:**
Approximately 4 manual data-entry touchpoints.

**Target:**
No more than 1 primary manual data-entry point, with downstream data reused where possible.

---

### OBJ-03 — Improve Procurement Visibility and Data Consistency

Procurement information is currently distributed across email, spreadsheets, and accounting software. As a result, users may have difficulty identifying the current status of a Purchase Requisition or Purchase Order and may need to search across multiple sources for related information.

The redesigned process should provide a more consistent view of procurement transactions and allow relevant users to identify the current status and responsible party more easily.

**Related Pain Points:**

* PP-02 — Procurement data is fragmented.
* PP-04 — PR and PO status is difficult to track.

**Measures:**

* Percentage of PR and PO transactions with an available processing status.
* Percentage of procurement transactions managed through the centralized process.

**Targets:**

* 100% of PR and PO transactions should have a visible processing status.
* At least 95% of procurement transactions should be managed through the centralized process.

---

### OBJ-04 — Strengthen Purchasing and Invoice Controls

The current process has two significant control weaknesses: budget checking is not consistently performed before purchasing, and three-way matching is handled manually.

The project aims to improve these control points before purchase and payment decisions are completed.

Purchase Requisitions should be checked against available budget before approval. Supplier invoices should also be compared against Purchase Orders and Goods Receipts before payment processing.

**Related Pain Points:**

* PP-03 — Three-way matching is performed manually.
* PP-06 — Budget control is inconsistent.

**Measures:**

* Percentage of Purchase Requisitions checked against available budget before approval.
* Percentage of eligible invoices processed through automated three-way matching.

**Targets:**

* 100% of Purchase Requisitions should receive a budget check before approval.
* At least 80% of eligible invoices should be processed through automated three-way matching.

Invoices with quantity, price, or receipt discrepancies may still require manual review.

---

### OBJ-05 — Improve Transaction Traceability

Approval decisions and transaction changes are currently distributed across emails and separate files. This makes it difficult to review historical activities and determine who performed a specific action.

The future process should provide sufficient transaction history to support operational review and internal audit activities.

**Related Pain Point:**
PP-05 — Procurement audit trails are limited.

**Measure:**
Percentage of key procurement transactions with a complete audit history.

**Target:**
100% of key actions performed through the proposed procurement process should be recorded.

Key actions include:

* Create
* Submit
* Approve
* Reject
* Update
* Cancel
* Record Goods Receipt
* Perform Invoice Matching
* Approve Payment

---

## 4. Objective Summary

| ID     | Objective                                           | Main Measure                                           | Target                                       |
| ------ | --------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------- |
| OBJ-01 | Shorten PO approval cycle                           | Average PO approval time                               | < 1 business day                             |
| OBJ-02 | Reduce repetitive manual data entry                 | Manual data-entry touchpoints                          | ≤ 1 primary entry point                      |
| OBJ-03 | Improve procurement visibility and data consistency | PR/PO status coverage and centralized transaction rate | 100% status visibility; ≥ 95% centralized    |
| OBJ-04 | Strengthen purchasing and invoice controls          | Budget check rate and automated matching rate          | 100% budget checks; ≥ 80% automated matching |
| OBJ-05 | Improve transaction traceability                    | Transactions with complete audit history               | 100%                                         |

---

## 5. Relationship Between Problems and Objectives

```text
PP-01 Approval Delay
        ↓
OBJ-01 Shorten PO Approval Cycle


PP-02 Fragmented Data
PP-07 Duplicate Data Entry
        ↓
OBJ-02 Reduce Repetitive Manual Data Entry


PP-02 Fragmented Data
PP-04 Limited Status Visibility
        ↓
OBJ-03 Improve Procurement Visibility and Data Consistency


PP-03 Manual Three-Way Matching
PP-06 Inconsistent Budget Control
        ↓
OBJ-04 Strengthen Purchasing and Invoice Controls


PP-05 Limited Audit Trail
        ↓
OBJ-05 Improve Transaction Traceability
```

---

## 6. From Objective to Solution

The objectives describe the business outcomes expected from the project. They do not define specific system functions yet.

For example:

```text
Business Problem
PO approval takes too long

        ↓

Business Objective
Shorten the PO approval cycle

        ↓

To-Be Process
Reduce manual routing and unnecessary waiting

        ↓

Business Requirement
The approval process must follow predefined approval rules

        ↓

Functional Requirement
The system shall route a submitted Purchase Order
to the appropriate approver based on defined approval rules
```

The detailed solution will be defined later during the To-Be process design and requirements analysis.
