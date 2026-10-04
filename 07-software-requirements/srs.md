# Software Requirements Specification

## 1. Purpose, scope, and conventions

This SRS derives system requirements for the Procurement Management System from the BRQ catalog and UC baseline. It covers the P2P boundary from PR creation through Payment Request approval. It excludes bank payment execution and does not assert a solution design, test execution, or stakeholder approval.

`FR-xx` identifies functional requirements, `NFR-xx` non-functional requirements, and `AC-xx` acceptance criteria. Each source reference points to the established business baseline; open decisions remain open.

## 2. Functional requirements

### 2.1 Purchase Requisition field baseline

The following is an illustrative case-study assumption to make PR validation testable. It has not been confirmed by NovaRetail stakeholders and is not a full data dictionary. All listed fields are required at submission; an incomplete PR may be saved as a draft without passing submission validation.

| Field | Level | Required when | Validation assumption | Source assumption |
| --- | --- | --- | --- | --- |
| Requester | Header | Submit | Required; must identify the authenticated requester. | Derived from the signed-in user profile. |
| Requesting store / department | Header | Submit | Required; must be an active unit available to the requester. | Selected from an organizational reference list. |
| Cost center | Header | Submit | Required; must be active and valid for the selected requesting unit. | Selected from a cost-center reference list. |
| Business justification | Header | Submit | Required; non-empty after trimming whitespace. | Entered by the requester. |
| Required date | Header | Submit | Required; must be a valid calendar date. No future-date policy is assumed. | Entered by the requester. |
| Item or service description | Line item | Submit | At least one line is required; each description must be non-empty. | Entered by the requester; a catalog is not assumed. |
| Requested quantity | Line item | Submit | Required for each line; numeric and greater than zero. | Entered by the requester. |
| Estimated unit price | Line item | Submit | Required for each line; numeric and non-negative. | Entered by the requester. |

The reference lists and user-profile data are dependencies assumed to be available to the proposed process. Their ownership, integration, and detailed validation policy remain subject to business and IT confirmation.

### 2.2 Functional requirements

| ID | Functional requirement | Source |
| --- | --- | --- |
| FR-01 | The system shall allow an authorized Requester to create and save a PR draft, validate it against the field baseline in Section 2.1, and submit it only when all required header and line-item information is valid. | BRQ-02; UC-01; BR-01 |
| FR-02 | The system shall request available budget information for a submitted applicable PR and prevent it from reaching business approval when validation is unsuccessful. | BRQ-03; UC-01; BR-02, BR-03 |
| FR-03 | The system shall allow an authorized Store Manager to approve, reject, or return an eligible PR and record the decision. | BRQ-02; UC-02; BR-04, BR-05 |
| FR-04 | The system shall allow an authorized Procurement Officer to create a PO only from an approved PR, retain the source PR reference, and reuse applicable PR data. | BRQ-05, BRQ-06; UC-03; BR-05, BR-07, BR-08 |
| FR-05 | The system shall restrict PO supplier selection to eligible suppliers from the approved Supplier Master. | BRQ-04; UC-03; BR-06 |
| FR-06 | The system shall evaluate configured PO approval criteria, route a submitted PO to the applicable authorized approver(s), and record the route outcome. | BRQ-05; UC-04; BR-09, BR-10 |
| FR-07 | The system shall prevent PO issue until all required approvals are complete; a returned PO shall require correction and resubmission. | BRQ-05; UC-03, UC-04; BR-11, BR-12 |
| FR-08 | The system shall allow authorized Warehouse Staff to record a GR against an approved PO and record the quantity received. | BRQ-01, BRQ-08; UC-05; BR-13, BR-14 |
| FR-09 | The system shall allow an authorized AP Accountant to record a supplier invoice, link it to its PO, and retain its processing status. | BRQ-01, BRQ-08; UC-06; BR-15, BR-25 |
| FR-10 | When PO, GR, and invoice information is available, the system shall compare the predefined matching attributes according to configured policy and identify a successful or failed match. | BRQ-08; UC-06; BR-16–BR-19 |
| FR-11 | The system shall create and retain an exception with owner, status, reason, and resolution history when matching fails, and shall prevent normal payment preparation while it is unresolved. | BRQ-08, BRQ-09; UC-06, UC-07; BR-20, BR-21 |
| FR-12 | The system shall permit an authorized AP Accountant to prepare and submit a Payment Request only for an invoice eligible under BR-22. | BRQ-10; UC-08; BR-19, BR-22 |
| FR-13 | The system shall allow an authorized Finance Manager to approve or return a submitted Payment Request and record the outcome. | BRQ-10, BRQ-09; UC-09; BR-23, BR-26 |
| FR-14 | The system shall display the current permitted P2P status and related transaction references to an authorized user. | BRQ-06, BRQ-07; UC-10; BR-25, BR-27 |
| FR-15 | The system shall retain and display permitted transaction and approval history, including actor, action, timestamp, and affected transaction. | BRQ-09; UC-11; BR-21, BR-26, BR-27 |
| FR-16 | The system shall provide authorized Procurement Manager and Finance Manager users basic operational procurement reports or summaries of the subjects in UC-12. | BRQ-11; UC-12; BR-25, BR-27 |

## 3. Non-functional requirements

| ID | Non-functional requirement | Source |
| --- | --- | --- |
| NFR-01 | The system shall enforce role-based access so users can perform only actions and view only information permitted by their assigned role. | BRQ-09; UC-10, UC-11, UC-12; BR-27; OD-07 |
| NFR-02 | For key in-scope actions and decisions, the system shall preserve audit history sufficient to identify the action, actor, timestamp, and affected transaction. | BRQ-09; UC-01–UC-09; BR-26 |
| NFR-03 | The system shall preserve referential integrity for applicable PR-to-PO, PO-to-GR, and PO-to-invoice relationships. | BRQ-01, BRQ-06; UC-03, UC-05, UC-06; BR-07, BR-13, BR-15 |
| NFR-04 | The system shall present validation failures, returned decisions, matching outcomes, and current status in a form understandable to the responsible user. | BRQ-02, BRQ-07, BRQ-08; UC-01–UC-10 |

No numeric performance, availability, retention, or security-control targets are specified because the baseline does not provide approved values.

## 4. Critical-workflow acceptance criteria

All criteria are **defined for future verification; not executed**.

### PR validation and budget check

| ID | Acceptance criterion | FR |
| --- | --- | --- |
| AC-01 | Given a PR missing or failing validation for a field in the Section 2.1 baseline, when the Requester submits it, then the system identifies the field-level issue and blocks submission. The incomplete PR may remain saved as a draft. | FR-01 |
| AC-02 | Given a complete applicable PR, when it is submitted, then the system requests budget validation before making the PR available for Store Manager review. | FR-02 |
| AC-03 | Given budget validation is unsuccessful, when the result is returned, then the system prevents the PR from proceeding to business approval and retains the validation outcome. | FR-02 |

### PR approval

| ID | Acceptance criterion | FR |
| --- | --- | --- |
| AC-04 | Given a complete PR with successful applicable budget validation, when an authorized Store Manager approves it, then the PR becomes available for procurement processing and the decision is recorded. | FR-03 |
| AC-05 | Given an eligible PR, when the Store Manager rejects it, then the system records the rejection decision, sets the PR to a rejected state, and prevents it from proceeding to Procurement. Reopening is not part of this baseline and requires a separately approved policy. | FR-03 |
| AC-06 | Given an eligible PR, when the Store Manager returns it for revision, then the system records the return reason, allows the Requester to revise it, and on resubmission repeats required-field and applicable budget validation before routing it for approval. | FR-02, FR-03 |

### PO routing and approval

| ID | Acceptance criterion | FR |
| --- | --- | --- |
| AC-07 | Given an approved PR and an eligible selected supplier, when Procurement submits a PO, then the system retains the PR reference, reuses applicable PR data, and evaluates the configured approval route. | FR-04–FR-06 |
| AC-08 | Given a submitted PO with required approvals incomplete, when a user attempts to issue it, then the system prevents issuance. | FR-07 |
| AC-09 | Given a PO returned by an authorized approver, when Procurement corrects it, then the system requires resubmission through the applicable route and retains the return history. | FR-06, FR-07 |

### Goods Receipt

| ID | Acceptance criterion | FR |
| --- | --- | --- |
| AC-10 | Given an approved PO, when authorized Warehouse Staff record a GR with the actual received quantity, then the GR is linked to that PO and becomes available to matching. | FR-08 |
| AC-11 | Given a GR not linked to an approved PO, when submission is attempted, then the system does not finalize the GR. | FR-08 |

### Invoice matching and exceptions

| ID | Acceptance criterion | FR |
| --- | --- | --- |
| AC-12 | Given a supplier invoice linked to a PO and the required PO, GR, and invoice data, when matching is initiated, then the system compares the predefined attributes using the configured policy and records the outcome. | FR-09, FR-10 |
| AC-13 | Given the required matching data is incomplete, when matching is attempted, then the system does not mark the invoice successfully matched and identifies that required information is pending. | FR-10 |
| AC-14 | Given a failed match, when the outcome is recorded, then the system creates an exception with owner, status, reason, and history and prevents normal payment preparation while unresolved. | FR-11 |
| AC-15 | Given an exception is resolved through the applicable business process, when matching is re-run, then the system records the re-evaluation outcome and permits the next step only if the controls are satisfied. | FR-10, FR-11 |

### Payment Request approval

| ID | Acceptance criterion | FR |
| --- | --- | --- |
| AC-16 | Given an invoice is not eligible under BR-22, when AP attempts to submit a Payment Request, then the system prevents submission. | FR-12 |
| AC-17 | Given an eligible invoice and a submitted Payment Request, when an authorized Finance Manager approves it, then the system records the approver and outcome and marks the modeled P2P process complete. | FR-13 |
| AC-18 | Given a submitted Payment Request, when the Finance Manager returns it, then the system records the return and makes it available to AP for correction and resubmission. | FR-13 |

### Supplier eligibility, access, visibility, history, and reporting

| ID | Acceptance criterion | FR / NFR |
| --- | --- | --- |
| AC-19 | Given a supplier is inactive or not eligible under the approved Supplier Master, when a Procurement Officer attempts to select it for a PO, then the system blocks selection and does not allow the PO to be submitted with that supplier. | FR-05 |
| AC-20 | Given a user lacks permission under the configured access policy, when they attempt to view restricted transaction data or perform a restricted action, then the system denies access or the action and does not disclose restricted data. | NFR-01 |
| AC-21 | Given an authorized user opens a PR or PO with linked transaction records, when the status view is displayed, then it shows the current permitted status and the correct available related transaction references. | FR-14 |
| AC-22 | Given a key in-scope action or decision occurs, when its history is reviewed, then the record identifies the affected transaction, actor, action, and timestamp. | FR-15, NFR-02 |
| AC-23 | Given an authorized manager selects report filters, when matching transaction data exists, then the report contains only accessible records that satisfy the selected filters. | FR-16, NFR-01 |
| AC-24 | Given no accessible transaction data satisfies the selected report filters, when the report is requested, then the system displays an empty state without exposing inaccessible records. | FR-16, NFR-01 |

## 5. Open decisions and verification boundary

OD-01 through OD-08 remain unresolved. In particular, FR-06 uses configured criteria without inventing thresholds, and FR-10 uses configured policy without inventing matching tolerance. Detailed access permissions, status names, partial-GR policy, and integration behavior require business validation before design or execution.

See [Phase 08](../08-traceability/requirements-traceability-matrix.md) for end-to-end traceability and the decision register.
