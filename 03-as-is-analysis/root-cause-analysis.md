# Root Cause Analysis

## 1. Purpose

The purpose of the root-cause analysis is to identify the underlying reasons behind the most significant problems found in NovaRetail's current Procure-to-Pay process.

The analysis focuses on three high-impact problem areas:

1. Purchase Order approval delay;
2. fragmented and repeated procurement data;
3. manual three-way matching.

These areas were selected because they directly affect cycle time, operational workload, data quality, and downstream invoice processing.

The objective is to avoid treating only the visible symptoms and instead identify the underlying process, data, and technology weaknesses that should guide the To-Be design.

---

## 2. Analysis Approach

A simplified Five Whys approach is used.

The analysis follows the logic:

```text id="xxrddd"
Observed Problem
      ↓
Why does it happen?
      ↓
Immediate Cause
      ↓
Why does that condition exist?
      ↓
Underlying Cause
      ↓
Root Cause
```

The analysis is based on the As-Is process defined for this case study.

Because NovaRetail is a simulated organization, the identified causes are analytical assumptions derived from the modeled process rather than findings from actual employee interviews or production data.

---

## 3. RC-01 — Purchase Order Approval Delay

### Observed Problem

Purchase Order approval takes longer than expected.

**Related Pain Point:** PP-01.

---

### Five Whys Analysis

**Why 1 — Why does PO approval take a long time?**

Because Purchase Orders may spend significant time waiting for managers to review and respond.

```text id="omav3q"
PO Submitted
     ↓
Waiting
     ↓
Manager Review
```

---

**Why 2 — Why do requests spend time waiting?**

Because approval requests are sent through email and depend on the approver noticing and processing the message.

---

**Why 3 — Why does the process depend on email?**

Because the current procurement process does not have a centralized approval queue or standardized workflow.

---

**Why 4 — Why is there no centralized approval workflow?**

Because Purchase Order preparation and approval activities are managed through disconnected tools and manual communication.

---

### Root Cause

> **Lack of a standardized and centralized Purchase Order approval workflow.**

---

### Contributing Factors

The root cause may be reinforced by:

* manual approval routing;
* no centralized list of pending approvals;
* limited transaction status visibility;
* no defined escalation mechanism;
* approval evidence distributed across email.

---

### Business Consequences

```text id="y9nvxb"
No Standardized Workflow
          ↓
Manual Email Routing
          ↓
Waiting Time
          ↓
Longer PO Approval Cycle
          ↓
Delayed PO Issuance
```

---

### Improvement Direction

The To-Be process should establish a structured approval workflow with defined approval rules and clear transaction status.

This is an improvement direction rather than a final functional requirement.

---

## 4. RC-02 — Fragmented and Repeated Procurement Data

### Observed Problems

Procurement information is distributed across several tools and the same information may need to be entered more than once.

**Related Pain Points:**

* PP-02 — Fragmented procurement data;
* PP-04 — Limited transaction visibility;
* PP-07 — Duplicate data entry.

---

### Five Whys Analysis

**Why 1 — Why is procurement information entered repeatedly?**

Because different process stages use different files, records, or systems.

For example:

```text id="22c81g"
PR Excel
   ↓
PO Record
   ↓
Warehouse Record
   ↓
Accounting Record
```

---

**Why 2 — Why do process stages use separate records?**

Because information is maintained independently by different departments.

---

**Why 3 — Why is transaction information maintained independently?**

Because transaction data is not automatically shared across the P2P lifecycle.

---

**Why 4 — Why is data not automatically shared?**

Because the current tools are not integrated around a common procurement transaction.

---

### Root Cause

> **Lack of an integrated procurement data flow connecting the major stages of the Procure-to-Pay lifecycle.**

---

### Contributing Factors

* spreadsheet-based Purchase Requisitions;
* separate warehouse records;
* accounting software used independently;
* email-based information exchange;
* no common transaction identifier or shared workflow view;
* limited reuse of existing transaction data.

---

### Business Consequences

```text id="pfa81z"
Disconnected Information Sources
            ↓
Manual Data Transfer
            ↓
Duplicate Data Entry
            ↓
Data Inconsistency
            ↓
Limited Transaction Visibility
```

---

### Relationship With Other Pain Points

This root cause contributes to several observable problems.

```text id="1bfrpg"
Integrated Data Flow Missing
           ↓
     ┌─────┼─────┐
     ↓     ↓     ↓
   PP-02 PP-04 PP-07
```

It also contributes indirectly to manual invoice matching because Accounts Payable must collect transaction information from different sources.

---

### Improvement Direction

The To-Be process should establish a connected transaction flow in which existing procurement information can be reused and accessed across relevant process stages.

---

## 5. RC-03 — Manual Three-Way Matching

### Observed Problem

Three-way matching between the Purchase Order, Goods Receipt, and Supplier Invoice is performed manually by Accounts Payable.

**Related Pain Point:** PP-03.

---

### Five Whys Analysis

**Why 1 — Why does AP perform three-way matching manually?**

Because the accountant must manually compare the Purchase Order, Goods Receipt, and Supplier Invoice.

---

**Why 2 — Why must the documents be manually compared?**

Because the related transaction information is retrieved from separate sources.

```text id="5jp1be"
PO
   \
    \
     → AP Accountant → Manual Comparison
    /
GR /
   \
    Invoice
```

---

**Why 3 — Why are the documents retrieved separately?**

Because PO, Goods Receipt, and Invoice information are not automatically connected through a single transaction flow.

---

**Why 4 — Why are they not automatically connected?**

Because the current process lacks integrated document data and matching capability.

---

### Root Cause

> **Lack of integrated PO, Goods Receipt, and Invoice data with an automated matching mechanism.**

---

### Contributing Factors

* fragmented transaction records;
* manual document retrieval;
* no automated comparison rules;
* exception handling through email or phone;
* limited visibility of document status.

---

### Business Consequences

```text id="1qrko2"
Separate PO / GR / Invoice
          ↓
Manual Document Collection
          ↓
Manual Comparison
          ↓
Higher AP Workload
          ↓
Longer Invoice Processing
          ↓
Potential Payment Delay
```

---

### Improvement Direction

The To-Be process should support automated matching for eligible invoices while allowing transactions with discrepancies to be routed for controlled manual review.

Automation should not be assumed to eliminate all manual matching because exception cases may still require investigation.

---

## 6. Cross-Cutting Root Causes

The analysis indicates that the three major problems are not independent.

They share several broader underlying weaknesses.

### 6.1 Lack of Process Standardization

Several activities depend on individual communication and manual coordination rather than a defined workflow.

Examples include:

* PO approval;
* budget checking;
* exception handling.

---

### 6.2 Lack of Integrated Data Flow

Information is stored and transferred independently across different process stages.

This contributes to:

* fragmented data;
* duplicate data entry;
* limited visibility;
* manual document collection.

---

### 6.3 Heavy Dependence on Manual Controls

Important control activities rely on employees manually checking and coordinating information.

Examples include:

* budget validation;
* approval tracking;
* three-way matching;
* discrepancy resolution.

---

## 7. Root Cause Summary

| Root Cause ID | Root Cause                                                         | Primary Pain Points Affected |
| ------------- | ------------------------------------------------------------------ | ---------------------------- |
| RC-01         | Lack of a standardized PO approval workflow                        | PP-01, PP-04, PP-05          |
| RC-02         | Lack of an integrated procurement data flow                        | PP-02, PP-04, PP-07          |
| RC-03         | Lack of integrated document data and automated matching capability | PP-03, indirectly PP-02      |

The analysis suggests that several visible pain points can be addressed through a smaller number of underlying process improvements.

---

## 8. From Root Cause to Improvement Direction

The root causes provide the bridge between the As-Is analysis and the To-Be process.

```text id="jbk56e"
Root Cause
     ↓
Improvement Principle
     ↓
To-Be Process
     ↓
Business Requirement
     ↓
Functional Requirement
```

Examples:

```text id="0yi9u3"
RC-01
No standardized approval workflow
        ↓
Standardize approval routing
        ↓
To-Be PO Approval Process
```

```text id="npn2g0"
RC-02
No integrated procurement data flow
        ↓
Reuse and centralize transaction data
        ↓
Connected PR → PO → GR → Invoice flow
```

```text id="gn7y49"
RC-03
No matching capability
        ↓
Automate eligible matching
        ↓
To-Be Three-Way Matching Process
```

Detailed system functionality will be defined later during requirements analysis.

---

## 9. Conclusion

The root-cause analysis shows that NovaRetail's current Procure-to-Pay problems are largely driven by three structural weaknesses:

1. approval activities are not managed through a standardized workflow;
2. procurement information does not flow consistently across process stages;
3. invoice matching depends on manually collected transaction data.

These findings provide the analytical basis for the To-Be process design.

The future-state process should therefore focus on improving process standardization, data integration, control visibility, and selective automation rather than simply digitizing the existing manual steps.
