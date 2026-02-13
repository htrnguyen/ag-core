---
trigger: always_on
description: Enterprise Security & OWASP Standards
---

# Enterprise Security Standards

## 1. Input Validation (Zero Trust)

- **Mandatory**: All external input (API, CLI, File) MUST be validated.
- **Tool**: Use `Pydantic` for strict schema validation.
- **Sanitization**: Strip reckless whitespace, validate regex for strings (emails, UUIDs).
- **Prohibited**: Never use `eval()`, `exec()`, or `pickle.load()` on untrusted data.

## 2. Secrets Management

- **Strict Rule**: NO hardcoded secrets (API Keys, Passwords, Tokens) in code or comments.
- **Mechanism**: Use `os.environ` or `pydantic-settings`.
- **Formatting**: Env vars must be `UPPER_CASE`.

## 3. OWASP Top 10 Mitigations

### Injection

- **SQL**: Use ORM (SQLAlchemy) or parameterized queries. NEVER string concatenation.
- **Command**: Avoid `subprocess.run(shell=True)`. Use list arguments: `["ls", "-l"]`.

### Broken Authentication

- **Rules**:
    - Never log session tokens / JWTs.
    - Use established libraries (Passlib, Bcrypt) for hashing.

### Logging

- **Clean Logs**: Ensure no PII (Emails, Phones, CCs) enters logs.
- **Traceability**: Log `user_id` context where available (but not auth tokens).

## 4. Output Encoding

- When returning HTML/XML, ensure entities are escaped (FastAPI/Jinja2 does this by default, but be careful with `MarkupSafe`).

## 5. Dependency Safety

- Regular scans with `pip-audit`.
- No abandoned packages (< 1 year updates) without architect approval.
