---
description: Review code with automated checks and specialized analysis
---

# Review Workflow

1.  **Automated Sanity Check**
    - Run the checklist script to catch low-hanging fruit:

    ```bash
    python .agent/scripts/checklist.py
    ```

    - Resolve any `[SECURITY]` or `[SIZE]` warnings immediately.

2.  **Load Standards**
    - Read `.agent/rules/antigravity_standards.md`.
    - Check specific domain rules if applicable (e.g., `fastapi.md`, `testing.md`).

3.  **Human/AI Audit**
    - Analyze the target code for:
        - **Logic Errors**: Edge cases, race conditions.
        - **Performance**: N+1 queries, unoptimized loops.
        - **Maintainability**: Variable naming, code duplication (DRY).
        - **Architecture**: Dependency injection, separation of concerns.
        - **Comment Quality**:
            - [NO] Multi-language comments (e.g., Vietnamese + English mixed)
            - [NO] Placeholder comments (e.g., `/* ... existing styles ... */`, `// TODO`, `# FIXME`)
            - [NO] Redundant comments that restate obvious code
            - [REQUIRED] All comments must be in English only
        - **Accessibility** (HTML/CSS/JS):
            - [REQUIRED] Semantic HTML (`<button>` not `<div onclick>`)
            - [REQUIRED] ARIA labels on interactive elements
            - [REQUIRED] Keyboard navigation support
            - [REQUIRED] Focus indicators visible
            - [REQUIRED] Color contrast WCAG AA (4.5:1)
        - **Performance**:
            - [REQUIRED] Images optimized (WebP, proper sizing, lazy loading)
            - [REQUIRED] CSS gradients limited (max 3 layers)
            - [REQUIRED] Minimal use of `backdrop-filter`, `will-change`
            - [REQUIRED] Font loading optimized (`font-display: swap`)
        - **SEO** (HTML):
            - [REQUIRED] Meta tags (title, description, viewport)
            - [REQUIRED] Structured data (JSON-LD)
            - [REQUIRED] Semantic HTML hierarchy
            - [REQUIRED] Open Graph tags
        - **Security**:
            - [REQUIRED] No secrets in code
            - [REQUIRED] Input validation/sanitization
            - [REQUIRED] SRI hashes on CDN resources
            - [REQUIRED] CSP headers (production)
        - **Code Structure**:
            - [REQUIRED] Nesting depth < 5 levels
            - [REQUIRED] No magic numbers (use constants/variables)
            - [REQUIRED] DRY principle followed
        - **Error Handling**:
            - [REQUIRED] Try/catch blocks present
            - [REQUIRED] Fallbacks for browser APIs
            - [REQUIRED] User-friendly error messages
        - **Browser Compatibility**:
            - [REQUIRED] Feature detection (@supports, if checks)
            - [REQUIRED] Fallbacks for modern features

4.  **Report**
    - List all findings prioritized by severity.
    - Provide specific recommendations for each finding.
    - **For each issue, include**:
        - File path (absolute or relative)
        - Line number(s)
        - Specific violation description
        - Recommended fix
    - **Example format**:
        ```
        [COMMENT] Multi-language comment detected
        File: public/css/style.css
        Line: 154
        Issue: Placeholder comment "/* ... existing hero styles ... */"
        Fix: Remove placeholder comment or replace with meaningful description
        ```
