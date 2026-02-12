---
name: basic_code_modification
description: Standard workflow for modifying code with safety checks.
---

# Basic Code Modification Skill

Use this skill when modifying existing code to ensure safety and standards.

## Steps

1.  **Context Check**:
    - Read `.agent/rules/antigravity_standards.md`.
    - Read target file(s).
    - Check for related tests.

2.  **Safety Check**:
    - Verify no secrets are hardcoded.
    - Verify logic does not break existing `antigravity_standards`.
    - Verify Pydantic models are used for I/O.

3.  **Implementation**:
    - Apply changes using `replace_file_content` or `multi_replace_file_content`.
    - Ensure comments explain _why_, not _what_.

4.  **Verification**:
    - Run linting: `ruff check .`
    - Run tests: `pytest path/to/tests`

5.  **Documentation**:
    - Update docstrings if signatures change.
    - Update `.agent/memory/active_task.md` with progress.
