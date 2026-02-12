---
description: Generate unit tests for the selected code
---

# Test Workflow

1.  **Analyze Context**
    - Read the selected file(s).
    - Identify imports and structural dependencies.

2.  **Generate Tests**
    - Load `test_generation` skill.
    - Create a corresponding test file (e.g., `tests/test_feature.py`).
    - Write test cases for Happy Path and Edge Cases.

3.  **Verify (Optional)**
    - If environment allows, run the tests:
        ```bash
        pytest tests/test_feature.py
        # or
        npm test
        ```
