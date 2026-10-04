# Requirements Traceability Matrix

## Purpose and status

This compact matrix traces the modeled business problem through objectives, business requirements, functional requirements, use cases, and acceptance criteria. Acceptance criteria are future verification conditions only; no test has been executed and no stakeholder approval is claimed.

| Pain point | Objective | BRQ | FR(s) | Use case(s) | Acceptance criterion(s) |
| --- | --- | --- | --- | --- | --- |
| PP-01 PO approval delay | OBJ-01 | BRQ-05 | FR-06, FR-07 | UC-03, UC-04 | AC-07–AC-09 |
| PP-02 Fragmented data | OBJ-03 | BRQ-01, BRQ-06 | FR-04, FR-08, FR-09, FR-14 | UC-03, UC-05, UC-06, UC-10 | AC-07, AC-10, AC-12, AC-21 |
| PP-03 Manual three-way matching | OBJ-04 | BRQ-08 | FR-09–FR-11 | UC-06, UC-07 | AC-12–AC-15 |
| PP-04 Limited PR/PO status | OBJ-03 | BRQ-07 | FR-14 | UC-10 | AC-21 |
| PP-05 Limited audit trail | OBJ-05 | BRQ-09 | FR-15; NFR-02 | UC-01–UC-09, UC-11 | AC-04–AC-06, AC-09, AC-14, AC-17, AC-18, AC-22 |
| PP-06 Inconsistent budget control | OBJ-04 | BRQ-03 | FR-02 | UC-01, UC-02 | AC-02, AC-03 |
| PP-07 Repeated data entry | OBJ-02 | BRQ-02, BRQ-06 | FR-01, FR-04 | UC-01, UC-03 | AC-01, AC-07 |
| In-scope reporting need | OBJ-01, OBJ-03, OBJ-04, OBJ-05 | BRQ-11 | FR-16 | UC-12 | AC-23, AC-24 |

Cross-cutting verification criteria: AC-19 covers supplier eligibility; AC-20 covers access control under configured permissions.
## Additional AC-to-requirement coverage

| Requirement | Acceptance criterion(s) | Coverage |
| --- | --- | --- |
| FR-05 | AC-19 | Rejects suppliers that are inactive or ineligible in the approved Supplier Master. |
| NFR-01 | AC-20, AC-23, AC-24 | Enforces configured access restrictions for transactions and reports. |
| FR-14 | AC-21 | Verifies current permitted status and available linked transaction references. |
| FR-15; NFR-02 | AC-22 | Verifies audit history identifies the transaction, actor, action, and timestamp. |
| FR-16 | AC-23, AC-24 | Verifies filtered report results and the no-data outcome. |

## BRQ coverage check

| BRQ | FR coverage | UC coverage |
| --- | --- | --- |
| BRQ-01 Connected transaction management | FR-08, FR-09; NFR-03 | UC-03, UC-05, UC-06 |
| BRQ-02 PR management | FR-01, FR-03 | UC-01, UC-02 |
| BRQ-03 Budget control | FR-02 | UC-01, UC-02 |
| BRQ-04 Supplier selection | FR-05 | UC-03 |
| BRQ-05 PO management and approval | FR-04, FR-06, FR-07 | UC-03, UC-04 |
| BRQ-06 Data reuse and linkage | FR-04, FR-08, FR-09, FR-14; NFR-03 | UC-03, UC-05, UC-06, UC-10 |
| BRQ-07 Status visibility | FR-14 | UC-10 |
| BRQ-08 Matching and exceptions | FR-08–FR-11 | UC-05–UC-07 |
| BRQ-09 Traceability | FR-11, FR-13, FR-15; NFR-01, NFR-02 | UC-01–UC-11 |
| BRQ-10 Payment Request approval | FR-12, FR-13 | UC-08, UC-09 |
| BRQ-11 Basic procurement reporting | FR-16 | UC-12 |

## Open decisions

| ID | Unresolved business decision | Why it remains open |
| --- | --- | --- |
| OD-01 | PO approval monetary thresholds | Requires approved Procurement/Finance policy. |
| OD-02 | Criteria for additional Finance approval | Requires Finance policy. |
| OD-03 | Detailed budget-validation policy | The baseline requires validation, not its calculation or source policy. |
| OD-04 | Matching tolerance policy and values | No tolerance is assumed without approved policy. |
| OD-05 | Matching-exception escalation rules | Ownership/escalation design needs business confirmation. |
| OD-06 | Final transaction status model | Illustrative statuses are not a frozen state model. |
| OD-07 | Detailed role permissions | Role-based control is required; specific permissions need validation. |
| OD-08 | Partial Goods Receipt policy | The process can record actual quantity; policy treatment remains unresolved. |

## Handoff notes

1. Validate assumptions and open decisions with the relevant business owners before design work.
2. Convert each acceptance criterion into executable tests only after the solution and policy decisions are known.
3. Record test evidence and approval status separately; this portfolio repository contains neither.
