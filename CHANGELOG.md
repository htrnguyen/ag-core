# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **CLI Enhancements**: `--dry-run` and `--verbose` flags for safer operations.
- **Developer Experience**: Pre-commit hooks template and structured `logger.py`.
- **CI/CD**: `publish.yml` configuration (Scoped package support).
- **Rules**: Consolidate Security and AI Governance rules.

## [26.3.3] - 2026-02-14

### Fixed

- **Release**: Version bump to resolve npm registry conflict.

## [26.3.2] - 2026-02-14

### Changed

- **Refactor**: Optimized `bin/cli.js` using `fs.cpSync` for better performance and cleaner code.
- **Chore**: Updated `.gitignore` with comprehensive standard patterns.

## [26.3.1] - 2026-02-14

### Added

- **Skill**: `dependency_management` for safe package operations.
- **Rules**: Enterprise standards for Security (OWASP), Database Migrations (Alembic), and Observability.
- **Workflow**: Enhanced `/plan` and `/review` with context-awareness steps.
- **CI/CD**: GitHub Actions for testing and publishing.
- **Docs**: Comprehensive `CHANGELOG.md`.

## [26.3.0] - 2026-02-14

### Added

- Initial release of `ag-core`.
- Core Skills: `basic_code_modification`, `git_automation`, `test_generation`, `document_generation`.
- Core Workflows: `/fix`, `/plan`, `/review`, `/help`.
- CLI tool for interactive initialization.
