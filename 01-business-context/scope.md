# Project Scope

## 1. Purpose

The purpose of this section is to define the boundaries of the Procure-to-Pay improvement project for NovaRetail.

A clear project scope helps ensure that the analysis remains focused on the core purchasing process and avoids expanding into unrelated areas such as full ERP replacement, inventory planning, supplier lifecycle management, or banking operations.

The scope is defined based on the business problems and objectives identified in the previous analysis.

---

## 2. Process Boundary

The project covers the Procure-to-Pay process from the point where an internal purchasing need is formally recorded until the related payment request is approved.

### Process Start

The process begins when a Store Employee or authorized internal requester identifies a purchasing need and creates a Purchase Requisition.

Examples of purchasing needs may include:

* goods for resale;
* store operating supplies;
* office supplies;
* equipment;
* maintenance or operating services.

### Process End

The process ends when:

* the supplier invoice has been successfully reviewed;
* the required three-way matching has been completed;
* any relevant exceptions have been resolved;
* the payment request has been approved;
* the procurement transaction is marked as completed.

The actual transfer of funds through banking systems is outside the scope of this project.

### High-Level Process Boundary

```text
Purchase Need
      ↓
Create Purchase Requisition
      ↓
Budget Validation
      ↓
PR Approval
      ↓
Supplier Selection
      ↓
Create Purchase Order
      ↓
PO Approval
      ↓
Goods Receipt
      ↓
Invoice Receipt
      ↓
Three-Way Matching
      ↓
Exception Handling
      ↓
Payment Approval
      ↓
Process Completed
```

---

## 3. In Scope

The following business processes and capabilities are included in the project.

### 3.1 Purchase Requisition Management

The proposed process should support the creation and management of Purchase Requisitions.

The analysis includes:

* creation of a Purchase Requisition;
* entry of requested items or services;
* requested quantity;
* estimated cost;
* required date;
* purchasing reason;
* requesting store or department;
* submission of the PR for review;
* modification of a PR before final approval;
* cancellation of a PR where permitted;
* tracking of PR status.

---

### 3.2 Budget Validation

Purchase Requisitions should be checked against available budget before proceeding through the approval process.

The scope includes:

* identifying the relevant budget or cost center;
* checking whether sufficient budget is available;
* recording the result of the budget validation;
* preventing or holding requests that do not meet defined budget rules.

The project does not include the creation or management of the corporate budgeting process itself.

---

### 3.3 Purchase Requisition Approval

The project includes the approval workflow for Purchase Requisitions.

The process should support:

* identifying the appropriate approver;
* submitting a PR for approval;
* approving a request;
* rejecting a request;
* requesting modifications;
* recording approval decisions;
* tracking the current approval status.

Approval rules will later be defined as business rules.

---

### 3.4 Supplier Selection

The Procurement Officer may select a supplier from NovaRetail's existing list of approved suppliers.

The project includes:

* viewing existing approved suppliers;
* selecting an appropriate supplier for a procurement transaction;
* associating the selected supplier with a Purchase Order.

The scope does not include identifying, qualifying, onboarding, or contracting new suppliers.

---

### 3.5 Purchase Order Management

The project includes the creation and management of Purchase Orders.

The analysis covers:

* creation of a PO from an approved Purchase Requisition;
* reuse of information already available from the PR;
* selection of the approved supplier;
* definition of quantities and prices;
* calculation of the total PO value;
* submission of the PO for approval;
* viewing PO status;
* controlled modification or cancellation of a PO.

---

### 3.6 Purchase Order Approval

The project includes the process for reviewing and approving Purchase Orders.

The future process should support predefined approval rules rather than relying only on manually forwarded emails.

The scope includes:

* determining the required approval level;
* routing a PO for approval;
* approval;
* rejection;
* request for changes;
* recording approval decisions;
* tracking pending approvals.

Detailed approval thresholds will be defined later as business rules.

---

### 3.7 Goods Receipt

The Warehouse department is responsible for recording the receipt of goods related to a Purchase Order.

The project includes:

* identifying the corresponding PO;
* recording quantities received;
* recording the receipt date;
* identifying partial or complete delivery;
* recording relevant discrepancies;
* making receipt information available for invoice matching.

Detailed warehouse operations such as storage optimization, picking, packing, and warehouse layout are not included.

---

### 3.8 Supplier Invoice Processing

The project includes the receipt and processing of supplier invoices related to Purchase Orders.

The analysis covers:

* recording an invoice;
* associating the invoice with the corresponding PO;
* recording invoice number, date, amount, and supplier;
* identifying invoices that require further review;
* tracking invoice processing status.

The project does not cover tax accounting or legal validation of electronic invoices in detail.

---

### 3.9 Three-Way Matching

The project includes the comparison of:

```text
Purchase Order
      +
Goods Receipt
      +
Supplier Invoice
```

The matching process should compare relevant information such as:

* supplier;
* item;
* quantity;
* unit price;
* total amount.

Transactions that meet the defined matching rules may proceed automatically.

Transactions containing discrepancies should be marked for manual review.

---

### 3.10 Exception Handling

The project includes basic handling of procurement exceptions.

Examples include:

* invoice quantity greater than quantity received;
* invoice price different from PO price;
* goods received in partial quantities;
* missing Goods Receipt;
* insufficient budget;
* rejected PR or PO.

The project will define how these exceptions are identified, assigned, and resolved at a business-process level.

Complex dispute management and supplier claims management are outside the scope.

---

### 3.11 Payment Approval

After invoice validation and matching are completed, the project includes the process for approving a payment request.

The scope includes:

* creating or generating a payment request;
* reviewing the supporting transaction information;
* approving or rejecting the request;
* recording the approval decision;
* updating the procurement transaction status.

Actual payment execution through a bank is not included.

---

### 3.12 Status Tracking and Process Visibility

The project includes status tracking throughout the Procure-to-Pay process.

Relevant users should be able to identify the status of a procurement transaction, for example:

```text
Draft
Submitted
Pending Approval
Approved
Rejected
PO Created
Ordered
Partially Received
Received
Invoice Received
Matching
Exception
Ready for Payment
Payment Approved
Completed
```

The final status model will be refined during system analysis.

---

### 3.13 Audit Trail

The project includes recording key actions performed throughout the procurement process.

Important actions may include:

* create;
* submit;
* update;
* approve;
* reject;
* cancel;
* receive goods;
* perform invoice matching;
* resolve exceptions;
* approve payment.

For each relevant action, the system should eventually be able to identify:

* who performed the action;
* what action was performed;
* when the action occurred;
* the affected transaction.

---

### 3.14 Procurement Reporting

The project includes basic operational reporting required to evaluate the redesigned process.

Potential measures include:

* average PR approval time;
* average PO approval time;
* PR-to-PO cycle time;
* automated matching rate;
* invoice mismatch rate;
* purchasing amount by store;
* purchasing amount by supplier;
* purchasing amount by category;
* number of pending approvals.

Advanced Business Intelligence and enterprise-wide analytics are outside the scope.

---

## 4. Out of Scope

The following areas are explicitly excluded from the project.

### 4.1 Supplier Onboarding

The project assumes that NovaRetail already maintains a list of approved suppliers.

Activities such as:

* supplier registration;
* identity verification;
* legal document validation;
* qualification;
* compliance checks;

are outside the scope.

---

### 4.2 Supplier Contract Management

Negotiation, drafting, renewal, and management of supplier contracts are not included.

---

### 4.3 Strategic Sourcing

The project does not include a complete strategic sourcing process such as:

* Request for Information (RFI);
* Request for Quotation (RFQ);
* Request for Proposal (RFP);
* competitive bidding;
* tender management;
* supplier scorecards.

Supplier selection within this project is limited to selecting an existing approved supplier for a procurement transaction.

---

### 4.4 Demand and Inventory Forecasting

The project does not determine when NovaRetail should purchase products based on future demand.

The following are outside the scope:

* demand forecasting;
* replenishment optimization;
* safety stock calculation;
* inventory forecasting.

The purchasing need is assumed to already exist when the P2P process begins.

---

### 4.5 Detailed Warehouse Management

The project only covers the recording of Goods Receipt.

It does not include:

* warehouse layout;
* stock placement;
* picking;
* packing;
* internal warehouse transfers;
* route optimization.

---

### 4.6 Full Accounting Management

NovaRetail's existing accounting software is assumed to remain in operation.

The project does not replace or redesign:

* General Ledger;
* Accounts Receivable;
* financial statements;
* depreciation;
* payroll accounting;
* tax reporting.

Only accounting activities required to support the P2P process are considered.

---

### 4.7 Tax Calculation

Detailed tax calculation and tax compliance rules are not analyzed as part of this project.

Taxes may appear as transaction data, but the project does not implement or validate Vietnamese tax regulations.

---

### 4.8 Bank Payment Execution

The process ends after payment approval.

The project does not include:

* bank API integration;
* payment file generation;
* electronic fund transfer;
* bank reconciliation.

---

### 4.9 Sales and Customer Order Management

Customer-facing processes belong to the Order-to-Cash domain and are outside the Procure-to-Pay scope.

This includes:

* customer orders;
* sales invoices;
* customer payment;
* customer relationship management.

---

### 4.10 Full ERP Replacement

The proposed Procurement Management System is not intended to replace all existing systems used by NovaRetail.

The project focuses only on improving the Procure-to-Pay process and defining the required procurement capabilities.

---

## 5. Key Assumptions

The case study is based on the following assumptions.

### A-01 — Existing Supplier Master

NovaRetail already maintains a list of suppliers that have been approved for purchasing activities.

---

### A-02 — Identifiable Requesting Unit

Each Purchase Requisition can be associated with a specific store, department, or cost center.

---

### A-03 — Budget Information Is Available

Relevant budget information can be made available to the procurement process for budget validation.

The project does not define how the annual or departmental budget is created.

---

### A-04 — Existing Accounting System Remains Available

NovaRetail continues to use its existing accounting software for core financial accounting activities.

---

### A-05 — Warehouse Records Goods Receipt

Warehouse Staff are responsible for confirming and recording goods received from suppliers.

---

### A-06 — Purchase Orders Are Required for Covered Purchases

Purchasing transactions included in this project are assumed to follow a Purchase Order-based process.

Non-PO purchases are not analyzed in detail.

---

### A-07 — Approval Rules Can Be Defined

NovaRetail can define approval rules based on factors such as:

* Purchase Order amount;
* department;
* store;
* cost center;
* purchasing category.

The actual rules will be specified later.

---

### A-08 — Procurement Users Have Defined Roles

Users participating in the process are assumed to have identifiable business roles such as:

* Store Employee;
* Store Manager;
* Procurement Officer;
* Procurement Manager;
* Warehouse Staff;
* Accountant;
* Finance Manager.

---

### A-09 — Case Study Data Is Synthetic

All volumes, baseline performance values, transaction data, and improvement targets used in this project are hypothetical and created for portfolio and analytical purposes.

They do not represent actual NovaRetail operational data.

---

## 6. Project Constraints

### C-01 — Personal BA Case Study

This project is a Business Analysis portfolio case study and does not involve implementation of a production procurement system.

---

### C-02 — No Access to Real Business Data

The analysis does not use confidential or operational data from an actual retail company.

All process data and transaction examples are simulated.

---

### C-03 — Limited Technical Implementation

The project focuses primarily on:

* business analysis;
* requirements analysis;
* process modeling;
* system specification;
* wireframing;
* data analysis.

Detailed software development is outside the primary scope.

---

### C-04 — Integration Is Specified at a High Level

Potential integration with accounting, budget, or other enterprise systems may be represented in the requirements and architecture.

However, detailed API design, middleware configuration, and production integration are not included.

---

### C-05 — Security Is Defined at Requirement Level

Security-related requirements such as role-based access, authorization, and auditability may be specified.

Detailed penetration testing, security architecture, and infrastructure implementation are outside the scope of this BA project.

---

### C-06 — Wireframes Cover Key Workflows Only

Wireframes will focus on major user interactions rather than providing a complete production UI.

Priority screens may include:

* Procurement Dashboard;
* Purchase Requisition List;
* Purchase Requisition Detail;
* Purchase Order List;
* Purchase Order Approval;
* Invoice Matching.

---

### C-07 — Reporting Uses Simulated Data

Any Excel, SQL, or Power BI analysis created for this project will use synthetic procurement data.

---

## 7. Scope Summary

### In Scope

```text
Purchase Requisition
Budget Validation
PR Approval
Approved Supplier Selection
Purchase Order
PO Approval
Goods Receipt
Supplier Invoice
Three-Way Matching
Basic Exception Handling
Payment Approval
PR/PO Status Tracking
Audit Trail
Basic Procurement Reporting
```

### Out of Scope

```text
Supplier Onboarding
Contract Management
Strategic Sourcing / Tendering
Demand Forecasting
Inventory Optimization
Detailed Warehouse Management
Full Accounting
Tax Management
Bank Payment Execution
Customer Sales
Full ERP Replacement
```

---

## 8. Scope Rationale

The project intentionally limits its scope to transactional Procure-to-Pay activities.

Although supplier lifecycle management, inventory planning, accounting, and banking operations are related to procurement, including all of these areas would significantly increase the complexity of the project and reduce the depth of the core P2P analysis.

The selected scope is sufficient to analyze the main business problems identified at NovaRetail, including:

* approval delays;
* fragmented procurement data;
* manual three-way matching;
* limited transaction visibility;
* weak auditability;
* inconsistent budget control;
* duplicate manual data entry.

This boundary allows the project to remain focused while still covering the major interactions between Store Operations, Procurement, Warehouse, and Finance & Accounting.
