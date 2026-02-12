---
description: Generate concise documentation for code
---

# Documentation Workflow

1.  **Scan Code**
    - Identify functions/classes missing docstrings.
    - Check for outdated comments.

2.  **Generate Docs**
    - Load `document_generation` skill.
    - **Apply One-Line Rule**: Write concise 1-line summary for each missing docstring.
    - Remove redundant verbose comments.

3.  **Commit**
    - Use `/commit` flow to save changes.
