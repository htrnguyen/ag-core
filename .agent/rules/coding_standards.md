---
trigger: always_on
description: Enterprise Python Coding Standard
---

# Enterprise Python Coding Standard

You must follow these coding standards STRICTLY.

## Code Style

- **PEP 8, PEP 257, PEP 20**.
- **Indent**: 4 spaces (No tabs).
- **Line Length**: Max 79 chars.
- **File Limits**:
    - File ≤ 170 lines.
    - Function ≤ 50 lines.
    - Class ≤ 100 lines.
- **Complexity**: One top-level concept per file.

### Naming

- `snake_case`: Variables, functions, modules.
- `PascalCase`: Classes.
- `UPPER_CASE`: Constants.

### Imports & Formatting

- **Order**: stdlib -> third-party -> local (separated by blank line).
- **Tools**: Must pass `isort`, `black`, `ruff/flake8`, `mypy`.

## Professional Output Standard

- [PROHIBITED] NO Emojis/Icons in code, comments, logs, or docstrings.
- **Tone**: Strictly professional and neutral.

## Docstring & Comment Policy

- [PROHIBITED] File Header: No file-level docstrings/headers unless legally required.
- **Conciseness**: Keep docstrings ≤ 5 lines when possible.
- **Content**: Describe Input parameters & Return values ONLY.
- 🚫 **Avoid**: Long explanations, usage examples, implementation details.

### Comments

- **Rule**: Comment only non-obvious logic.
- 🚫 **Avoid**: Trivial comments, redundant restatements, commented-out code.
- **Language**: Use ONLY English for all comments and docstrings.
- 🚫 **Multi-Language Comments**: Never mix languages (e.g., Vietnamese + English).
- 🚫 **Placeholder Comments**: Remove all placeholder/TODO-style comments before committing:
    - Examples: `/* ... existing styles ... */`, `// TODO: implement later`, `# FIXME`
    - Exception: Active TODO items tracked in issue tracker are allowed if they include ticket reference.
- **Clarity**: Comments must add value. If code is self-explanatory, no comment needed.

## Logging Policy

- **Log**: Meaningful events (Errors, Retries, Latency, Critical State).
- 🚫 **Avoid**: Trivial execution flow, Sensitive Data, Full Payloads (unless required), Excessive logging in loops.

## Clean Code & OOP Standards

- **Principles**: Follow **SOLID** strictly.
    - **S**: Single Responsibility (Classes/Functions do ONE thing).
    - **O**: Open/Closed (Extend via subclass/composition, don't modify core logic).
    - **L**: Liskov Substitution (Subclasses must behave like parents).
    - **I**: Interface Segregation (Small, specific interfaces).
    - **D**: Dependency Inversion (Depend on abstractions, use Dependency Injection).

- **Structure**:
    - **Composition over Inheritance**: Prefer combining simple objects over deep inheritance hierarchies.
    - **Encapsulation**: Use `_private` methods/attributes for internal logic.

- **Imports Rule**:
    - 🚫 **No Local Imports**: All imports MUST be at the top of the file.
    - Exception: Rare circular dependency resolution (but prefer refactoring).

- **Tactics**:
    - No Magic Numbers (Use Constants/Enums).
    - Max Nesting: 3 levels (Use Early Returns).
    - No TODOs or Debug Prints in final code.
    - Single Abstraction Level per function.

## FastAPI Rules

- **Router**: Use `APIRouter`. NO business logic in routers.
- **Injection**: Use `Depends()`.
- **Validation**: Strict Pydantic models for Request/Response.
- **Docs**: Models must include `Field` descriptions.
- **Async**: Prefer `async def` for I/O. Never block event loop.

## Error Handling

- **Catch**: Specific exceptions only.
- **Custom**: Define custom exceptions (e.g., `InvalidInputError`).
- **Security**: No stack traces exposed.
- **HTTP Codes**:
    - `400`: Bad Request (Validation).
    - `401`: Unauthorized.
    - `403`: Forbidden.
    - `404`: Not Found.
    - `500`: Internal Server Error (Generic).

## Documentation Standard

- **README.md**: Must include Setup, Project Structure, and Run instructions.
- **CONTRIBUTING.md**: Must define Code Style, Testing, and PR rules.
- **Architecture**: `docs/` must contain Architecture Overview and API References.
- 🚫 **No Redundant Docs**: Do NOT create separate `.md` files to explain code. Documentation must live inside the code (docstrings/comments).

## Testing

- **Tool**: `pytest`.
- **Coverage**: ≥ 80%.
- **Scope**: Business logic & Critical paths MUST be tested.
- **Structure**: Tests mirror project structure.