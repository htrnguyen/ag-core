---
trigger: always_on
description: Enterprise Security, Compliance & OWASP Standards
---

# Enterprise Security Standards

## 1. Authentication & Authorization

- **Protocol**: OAuth2 + JWT (or equivalent).
- **Validation**: Expiration and Signature verification REQUIRED.
- **RBAC**: Enforce Role-Based Access Control on all endpoints.
- **Least Privilege**: Grant only necessary permissions. Review periodically.

## 2. Input Validation (Zero Trust)

- **Mandatory**: All external input (API, CLI, File) MUST be validated.
- **Tool**: Use `Pydantic` for strict schema validation.
- **Limits**: Enforce max token lengths and payload sizes.
- **Files**: Validate file uploads strictly (MIME, Magic Bytes).
- **Sanitization**: Strip reckless whitespace, validate regex for strings.
- **Prohibited**: Never use `eval()`, `exec()`, or `pickle.load()`.

## 3. Secrets Management

- **Strict Rule**: NO hardcoded secrets. Never commit secrets to git.
- **Mechanism**: Use `os.environ`, `pydantic-settings`, Key Vault, or Secret Manager.
- **Formatting**: Env vars must be `UPPER_CASE`.
- **Rotation**: API keys and secrets must rotate periodically.

## 4. Data Protection

- **Encryption**: Encrypt sensitive data At-Rest.
- **Transport**: Use TLS (HTTPS) for ALL communication.
- **Network**: Restrict Database access via private network/allow-listing.

## 5. OWASP Top 10 Mitigations (Application Security)

### Injection

- **SQL**: Use ORM (SQLAlchemy) or parameterized queries. NEVER string concatenation.
- **Command**: Avoid `subprocess.run(shell=True)`. Use list arguments.

### Broken Authentication

- **Rules**: Never log session tokens/JWTs. Use Bcrypt/Argon2 for hashing.

### Logging Security

- **Clean Logs**: Ensure no PII (Emails, Phones, CCs) enters logs.
- **Traceability**: Log `user_id` context where available.

### Output Encoding

- **XSS Prevention**: Ensure HTML/XML entities are escaped when returning content.

## 6. Dependency Safety & Compliance

- **Versioning**: Pin dependency versions (strict `==` or lockfiles).
- **Scanning**: Regular scans with `pip-audit` or `Snyk` in CI/CD.
- **SBOM**: Software Bill of Materials required for audit.
- **Policy**: No abandoned packages (< 1 year updates) without architect approval.
