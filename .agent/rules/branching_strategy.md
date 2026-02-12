---
description: Enterprise Git Branching Strategy
alwaysApply: true
---

# Enterprise Git Branching Strategy

Follow strict branch governance to ensure code quality and traceability.

## Branch Types

1.  `main`: **Production-Ready** code ONLY. Stable releases.
2.  `develop`: Integration branch (Pre-prod).
3.  `feature/*`: New features (e.g., `feature/AI-231-hybrid-retrieval`).
4.  `fix/*`: Bug fixes for `develop` (e.g., `fix/JIRA-123-ui-crash`).
5.  `hotfix/*`: Urgent fixes for `main` (e.g., `hotfix/OPS-998-timeout`).
6.  `release/*`: Release preparation (e.g., `release/v2.1.0`).

## Rules

- **Protection**: `main` and `develop` branches are **PROTECTED**. Direct push FORBIDDEN.
- **Workflow**: All changes MUST go through a Pull Request (PR).
- **PR Requirements**:
    - CI Pipeline: Passing (Lint, Test, Sec Scan).
    - Review: At least 1 Approval.
    - Checks: No unresolved comments.

## Naming Convention

- `feature/<ticket-id>-short-description`
- `fix/<ticket-id>-short-description`
- `hotfix/<ticket-id>-short-description`
- `release/vX.Y.Z`

_Example_: `feature/AI-231-add-hybrid-retrieval`

## Hotfix Policy

- **Source**: Must branch from `main`.
- **Scope**: Must be minimal change scope.
- **Reference**: Must include Incident ID or Ticket ID.
- **Sync**: Must be merged back to `develop` after `main`.

## Rebase Policy

- **Strategy**: Use `git rebase` for feature branches to keep history linear.
- **Merges**: Avoid merge commits (`Merge branch 'main' into feature`) in feature branches.
- **History**: Squash irrelevant commits before merging PR if needed.
