---
description: Context7 Management Policy (No-MCP)
alwaysApply: true
---

# Context7 Management Policy (Manual Context)

Since MCP is not used, strict context management is required to prevent hallucination and ensuring continuity.

## 1. Project Map (`.agent/map.md`)

- **Mandatory**: Every project MUST have a high-level map file.
- **Content**: List key files, architecture diagram (text), and module relationships.
- **Update**: Must be updated manually or via script after every architecture change.

## 2. Memory Files

- **Active Context**: Use `.agent/memory/active_task.md` to track current progress.
- **Decision Log**: Use `.agent/memory/decisions.md` to record architectural decisions (ADR).
- **Tech Debt**: Use `.agent/memory/tech_debt.md` to track skipped items.

## 3. Session Strategy

- **Start**: Agent MUST read `.agent/map.md` and `.agent/memory/active_task.md` at the start of a session.
- **End**: Agent MUST update `.agent/memory/active_task.md` with:
    - Current status.
    - Next steps.
    - Open questions.

## 4. File Reading Limit

- **Rule**: Do not read > 5 files at once unless necessary.
- **summarization**: If a file is > 300 lines, generate a summary before ingesting full content into context.

## 5. Knowledge Retrieval

- **Search First**: usage `grep_search` or `codebase_search` to find relevant files before reading.
- **No Guessing**: Never assume file paths. Verify existence first.
