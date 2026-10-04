# NovaRetail JSC — Procure-to-Pay BA Case Study

## Portfolio summary

This repository is a Business Analysis portfolio case study for NovaRetail JSC, a fictional Vietnamese retail company. It examines how a fragmented Procure-to-Pay process could be improved from Purchase Requisition creation through Payment Request approval.

### Business problem

The modeled process depends on spreadsheets, email, accounting software, and separate departmental records. The analysis addresses delayed PO approvals, fragmented transaction data, manual three-way matching, limited status visibility, weak audit history, inconsistent budget checks, and repeated data entry.

### Scope boundary

**In scope:** PR, budget validation, PR approval, approved supplier selection, PO, PO approval, Goods Receipt, invoice processing, three-way matching and exceptions, Payment Request approval, status, audit history, and basic reporting.

**Out of scope:** bank payment execution, supplier onboarding and sourcing, detailed warehouse management, tax processing, full accounting, and full ERP replacement.

### Analysis approach

Business context → stakeholders → As-Is process and pain points → To-Be design and rules → BRD/catalog → system use cases → SRS → traceability and acceptance criteria.

## Deliverables and navigation

| Phase | Purpose | Key entry point |
| --- | --- | --- |
| 01 | Business context, problem, objectives, and scope | [Business Context](./01-business-context/README.md) |
| 02 | Stakeholders, engagement, and preliminary RACI | [Stakeholder Analysis](./02-stakeholder-analysis/stakeholder-analysis.md) |
| 03 | As-Is process, pain points, and root causes | [As-Is Analysis](./03-as-is-analysis/README.md) |
| 04 | To-Be process, comparison, improvement map, and rules | [To-Be Design](./04-to-be-design/README.md) |
| 05 | BRD and business requirements catalog | [Business Requirements](./05-brd/README.md) |
| 06 | System boundary, use cases, and activity diagrams | [System Analysis](./06-system-analysis/README.md) |
| 07 | Functional/non-functional requirements and acceptance criteria | [SRS](./07-software-requirements/README.md) |
| 08 | End-to-end traceability and open decisions | [Traceability](./08-traceability/README.md) |

Diagram exports are in [assets/diagrams/exports](./assets/diagrams/exports/). The repository contains external diagram-editor links in [assets/diagrams/editable-references](./assets/diagrams/editable-references/); it does **not** contain local editable Draw.io source files.

## Status and disclaimer

**Current status:** analysis and requirements baseline complete for portfolio review; no implementation, test execution, stakeholder approval, or benefits realization is claimed.

All company details, volumes, targets, process scenarios, and operational measures are simulated. They do not represent a real organization or real-world performance data.
