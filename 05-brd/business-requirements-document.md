# Business Requirements Document

## NovaRetail JSC — Procure-to-Pay Process Optimization

---

## 1. Document Overview

### 1.1 Purpose

This Business Requirements Document (BRD) defines the business needs and high-level requirements for improving NovaRetail JSC's Procure-to-Pay process.

The document consolidates the results of the previous business analysis activities, including:

- business context analysis;
- problem definition;
- project objectives;
- project scope;
- stakeholder analysis;
- As-Is process analysis;
- pain-point analysis;
- root-cause analysis;
- To-Be process design;
- business-rule definition.

The purpose of the BRD is to establish a clear business-level requirement baseline before detailed system analysis and Software Requirements Specification activities begin.

The BRD focuses on **what NovaRetail needs from the future procurement process**, rather than defining detailed user-interface, database, API, or technical implementation specifications.

---

### 1.2 Project Name

**Retail Procure-to-Pay Process Optimization**

---

### 1.3 Organization

**NovaRetail JSC**

NovaRetail JSC is a fictional Vietnamese retail company created for this Business Analysis portfolio case study.

The organization is assumed to operate approximately:

- 35 retail stores;
- 2 central warehouses;
- 650 employees;
- more than 120 suppliers;
- approximately 1,200 Purchase Orders per month.

All business volumes and quantitative targets used in this project are synthetic assumptions and do not represent data from a real organization.

---

### 1.4 Document Scope

This document covers business requirements for the Procure-to-Pay lifecycle from:

> **Purchasing need identification and Purchase Requisition creation**

through:

> **Payment Request approval**

The document does not define requirements for actual bank payment execution.

---

## 2. Business Background

NovaRetail's purchasing activities involve several business functions, including:

- Store Operations;
- Procurement;
- Warehouse;
- Finance & Accounting.

The current procurement process relies primarily on:

- Excel;
- email;
- accounting software;
- separate departmental records.

These tools support individual activities but do not provide a fully connected Procure-to-Pay workflow.

As a result, the purchasing transaction is fragmented across multiple departments and information sources.

The organization requires a more standardized and controlled process capable of supporting procurement growth while maintaining visibility, financial control, and transaction traceability.

---

## 3. Business Problem

### 3.1 Core Problem Statement

NovaRetail's current Procure-to-Pay process is fragmented, highly dependent on manual activities, and lacks a centralized procurement management platform.

This creates inefficiencies across the procurement lifecycle from Purchase Requisition creation through Payment Request approval.

---

### 3.2 Identified Pain Points

The As-Is analysis identified seven primary pain points.

| ID | Pain Point |
|---|---|
| PP-01 | Purchase Order approval takes too long |
| PP-02 | Procurement data is fragmented |
| PP-03 | Three-way matching is performed manually |
| PP-04 | Purchase Requisition and Purchase Order status is difficult to track |
| PP-05 | Audit trail is limited |
| PP-06 | Budget control is inconsistent |
| PP-07 | Procurement data is entered repeatedly |

---

### 3.3 Pain Point Categories

The pain points can be grouped into three broader categories.

#### Process Efficiency

- PP-01 — PO approval delay
- PP-03 — Manual three-way matching
- PP-07 — Duplicate manual data entry

#### Data and Visibility

- PP-02 — Fragmented procurement data
- PP-04 — Limited PR/PO status visibility

#### Control and Governance

- PP-05 — Limited audit trail
- PP-06 — Inconsistent budget control

---

## 4. Root Cause Summary

Three primary structural root causes were identified during the As-Is analysis.

### RC-01 — Lack of a Standardized Purchase Order Approval Workflow

Purchase Order approvals depend heavily on email communication and manual follow-up.

The current process does not provide a consistent approval queue, routing mechanism, or centralized approval history.

---

### RC-02 — Lack of an Integrated Procurement Data Flow

Procurement information is maintained independently across different files, departments, and tools.

This contributes to:

- fragmented information;
- duplicate data entry;
- limited transaction visibility;
- manual document retrieval.

---

### RC-03 — Lack of Integrated Document Data and Matching Capability

Purchase Order, Goods Receipt, and Supplier Invoice information are maintained separately.

Accounts Payable must therefore manually retrieve and compare the documents during three-way matching.

---

### Additional Control Gap

Budget validation is not consistently embedded as a mandatory step in the current procurement workflow.

This is treated as a significant process-control weakness even though it was not assigned a separate formal root-cause identifier.

---

## 5. Business Objectives

The project defines five business objectives.

| ID | Business Objective |
|---|---|
| OBJ-01 | Shorten the Purchase Order Approval Cycle |
| OBJ-02 | Reduce Repetitive Manual Data Entry |
| OBJ-03 | Improve Procurement Visibility and Data Consistency |
| OBJ-04 | Strengthen Purchasing and Invoice Controls |
| OBJ-05 | Improve Transaction Traceability |

---

### 5.1 OBJ-01 — Shorten the Purchase Order Approval Cycle

The future process should reduce approval waiting time by replacing manual email-based routing with a standardized approval workflow.

**Target direction:**

- reduce PO approval cycle from the assumed current level of approximately 2 business days;
- target approval cycle of less than 1 business day for standard transactions.

---

### 5.2 OBJ-02 — Reduce Repetitive Manual Data Entry

Information already captured in upstream procurement activities should be reused where appropriate.

**Target direction:**

- reduce repeated manual entry of the same procurement information;
- aim for no more than one primary manual data-entry point for reusable transaction information.

---

### 5.3 OBJ-03 — Improve Procurement Visibility and Data Consistency

Users should be able to understand the status and relationship of relevant procurement transactions without reconstructing information from separate files and emails.

**Target direction:**

- 100% of in-scope procurement transactions should have visible process status;
- at least 95% of relevant procurement transaction information should be accessible through a centralized or connected transaction view.

---

### 5.4 OBJ-04 — Strengthen Purchasing and Invoice Controls

The future process should apply budget control and invoice-matching controls consistently.

**Target direction:**

- 100% of applicable Purchase Requisitions should pass budget validation before business approval;
- at least 80% of eligible supplier invoices should be automatically matched under standard matching conditions.

---

### 5.5 OBJ-05 — Improve Transaction Traceability

Key procurement actions and decisions should maintain sufficient history for operational review and audit purposes.

**Target direction:**

- 100% of identified key procurement actions should maintain appropriate audit-history information.

---

### 5.6 Target Disclaimer

The quantitative values above are hypothetical targets defined for this case study.

They are used to make the business objectives measurable and would require validation against actual operational data in a real project.

---

## 6. Project Scope

### 6.1 Process Boundary

The in-scope process begins when an authorized Requester or Store Employee identifies a purchasing need and creates a Purchase Requisition.

The process ends after:

1. the supplier invoice has been reviewed;
2. three-way matching has been completed;
3. applicable matching exceptions have been resolved;
4. the Payment Request has been approved.

```text
START
Purchasing Need Identified
        ↓
Create Purchase Requisition

...

Payment Request Approved
        ↓
END
