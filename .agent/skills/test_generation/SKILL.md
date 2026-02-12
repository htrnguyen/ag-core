---
name: test_generation
description: Generate unit and integration tests for code
---

# Test Generation Skill

This skill is responsible for creating robust test suites for existing code.

## 1. Context Analysis

- **Analyze** the target file(s) to understand:
    - Key logic and business rules.
    - Edge cases and failure modes.
    - External dependencies (database, APIs) that need mocking.

## 2. Framework Selection

- **Python**: Use `pytest`.
- **JavaScript/TypeScript**: Use `jest` or `vitest`.
- **Go**: Use `testing` package.

## 3. Test Strategy

- **Happy Path**: Verify expected behavior.
- **Edge Cases**: Null inputs, empty lists, boundary values.
- **Error Handling**: Verify correct exceptions are raised.
- **Mocking**:
    - NEVER call real external APIs during unit tests.
    - Mock database sessions and network calls.

## 4. Implementation Rules

- **Naming**: `test_<filename>.py` or `<filename>.test.js`.
- **Coverage**: Aim for reasonably high coverage of logic branches.
- **Cleanliness**: No debug prints in tests.
