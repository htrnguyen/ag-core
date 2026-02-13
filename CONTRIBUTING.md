# Contributing to AG Core

Thank you for your interest in contributing to AG Core! We follow strict enterprise standards to ensure quality and reliability.

## Getting Started

1.  **Fork** the repository.
2.  **Clone** your fork: `git clone ...`
3.  **Install** dependencies: `npm install`

## Development Workflow

We follow the **Antigravity Workflows**:

- **Plan**: Before major changes, create an issue or implementation plan.
- **Code**: Adhere to `antigravity_standards.md`.
- **Test**: Run tests locally before pushing.

### Commands

- `npm test`: Run the test suite.
- `npm run lint`: Check for code style issues.

## Pull Request Process

1.  Create a branch: `git checkout -b feature/your-feature`.
2.  Commit changes using **Conventional Commits**:
    - `feat(...)`: New features
    - `fix(...)`: Bug fixes
    - `docs(...)`: Documentation
    - `refactor(...)`: Code restructuring
3.  Push to your fork and submit a Pull Request.

## Coding Standards

Please review the rules in `.agent/rules/`:

- **JavaScript/Node**: Follow standard ESLint configuration.
- **Python (Templates)**: Follow PEP 8 and definitions in `coding_standards.md`.
- **Documentation**: Maintain professional tone, no emojis in code.

## Reporting Bugs

Please use the GitHub Issues tab to report bugs. Include:

- Steps to reproduce.
- Expected behavior.
- Actual behavior.
- Environment details.
