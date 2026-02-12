---
description: Enterprise Git Commit Governance
alwaysApply: true
---

# Enterprise Git Commit Governance

All commits must follow Conventional Commits and enterprise traceability standards.

## Commit Format

`<type>(<scope>): <short summary>`

### Footer Requirement

`Refs: <TICKET-ID>` (Required for traceability)

## General Rules

- **English only**: Imperative mood ("Add" not "Added").
- **Length**: Max 72 chars for subject line.
- **Logical**: One logical change per commit.
- **Prohibited**: No WIP commits. No unrelated scope combinations.

## Allowed Types

- `feat` (New feature)
- `fix` (Bug fix)
- `refactor` (Code change that neither fixes a bug nor adds a feature)
- `perf` (Performance improvement)
- `docs` (Documentation only)
- `test` (Adding missing tests or correcting existing tests)
- `build` (Changes that affect the build system or external dependencies)
- `ci` (Changes to our CI configuration files and scripts)
- `chore` (Other changes that don't modify src or test files)
- `revert` (Reverts a previous commit)
- `security` (Security fix or enhancement)

## Enterprise Scopes

`api`, `rag`, `embedding`, `retrieval`, `llm`, `prompt`, `worker`, `milvus`, `postgres`, `migration`, `docker`, `compose`, `infra`, `auth`, `security`, `config`, `observability`, `monitoring`, `logging`, `cache`, `queue`.

## Domain-Specific Requirements

### LLM / RAG Changes

Must explicitly state in the body:

- Model / Prompt / Embedding change?
- Retrieval strategy change?
- **Re-embedding required?** (Yes/No)
- Latency/Accuracy impact?

### Database Changes

- **Scope**: `migration`
- Mention: Table name & Backward compatibility.

### Security Changes

- **Type**: `security`
- Includes: Auth logic, Token handling, Encryption, Key management, Rate limiting.

## Forbidden Examples

- [FORBIDDEN] `update`
- [FORBIDDEN] `fix bug`
- [FORBIDDEN] `improve logic`
- [FORBIDDEN] Missing ticket reference (`Refs: ...`)
