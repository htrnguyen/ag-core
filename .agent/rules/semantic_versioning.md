---
description: Enterprise Release and Semantic Versioning Policy
alwaysApply: true
---

# Enterprise Release and Semantic Versioning Policy

Strict adherence to Semantic Versioning (SemVer) is mandatory.

## Version Format

`MAJOR.MINOR.PATCH`

## Version Bump Rules

1.  **MAJOR**:
    - Breaking API Change.
    - Contract/Interface Change.
    - Embedding Schema Change (Requiring Re-Index).
    - LLM Behavior Change (Affecting Output Structure).
2.  **MINOR**:
    - New Backward-Compatible Feature.
    - New Endpoint.
    - New Retrieval Strategy (Non-Breaking).
3.  **PATCH**:
    - Bug Fix.
    - Performance Improvement.
    - Internal Refactoring.

## Tagging

- **Format**: `vX.Y.Z` (e.g., `v2.3.1`).

## Release Requirements

- **Tests**: All tests pass.
- **Coverage**: ≥ 80%.
- **Migrations**: Database/Vector migrations validated.
- **Documentation**: Prompt versions, Embedding versions documented.
- **Changelog**: Must be updated.

## Changelog Format (Keep a KDL/Markdown file)

Sections:

- Added
- Changed
- Fixed
- Removed
- Security

## Rollback Policy

- **Reversible**: Every release MUST be reversible.
- **Database**: Migrations must support `down` (rollback) scripts.
- **Embeddings**: Embedding changes must document the re-index/restore procedure.
