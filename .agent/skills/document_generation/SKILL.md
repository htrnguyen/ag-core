---
name: document_generation
description: Generate concise, one-line documentation for code
---

# Document Generation Skill

This skill allows the agent to update and maintain code documentation.

## 🛑 STRICT RULES (Crucial)

1.  **ONE-LINE ONLY**: Docstrings/Comments must be single-line summaries unless absolutely necessary.
2.  **NO SEPARATE FILES**: Do **NOT** create `.md` files to explain code logic. Documentation lives IN the code.
3.  **NO REDUNDANCY**: Do not repeat the function name in the comment.

## 1. Code Documentation (Docstrings/JSDoc)

- **Focus**: "What does this do?" and "Why?".
- **Format**:
    - _Python_: `""" Summarize action in one line. """`
    - _JS/TS_: `/** Summarize action in one line. */`
- **Parameters**: Omit `@param` tags if the variable names are self-explanatory.

## 2. Project Documentation (README)

- Only update `README.md` or `API.md` if the architectural surface area changes (e.g., new API endpoints, new CLI commands).
