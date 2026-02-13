---
trigger: always_on
description: Enterprise Database Migration Standards
---

# Database Migration Rules (Alembic)

## RULE 1 - Migration Reviews

- **Mandatory**: Every migration file must be reviewed.
- **Check**: Ensure `upgrade()` and `downgrade()` functions correspond exactly.

## RULE 2 - No Destructive Changes without Approval

- **Prohibited**: `op.drop_table()`, `op.drop_column()` in automated flows without backup justification.
- **Process**: If dropping data is required, create a separate task to backup first.

## RULE 3 - Data vs Schema

- **Guideline**: Do NOT mix schema changes (DDL) and data changes (DML) in the same migration file if possible.
- **Reason**: Schema changes locks tables; data changes might take time. Mixing them risks long locks.

## RULE 4 - Idempotency

- Migrations should ideally be idempotent (safe to run twice), though Alembic handles versioning to prevent this usually.

## RULE 5 - Naming

- naming format: `YYYYMMDD_HHMM_description_slug.py` (Alembic default often suffices, but ensure description is meaningful).
