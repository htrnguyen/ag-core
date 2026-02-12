---
description: Enterprise Security and Compliance Policy
alwaysApply: true
---

# Enterprise Security and Compliance Policy

Security is MANDATORY, not optional.

## Secrets Management

- **No Hardcoding**: Secrets MUST NEVER be committed or hardcoded.
- **Storage**: Use Environment Variables, Key Vault, or Secret Manager.
- **Rotation**: API keys and secrets must rotate periodically.

## Authentication & Authorization

- **Protocol**: OAuth2 + JWT (or equivalent).
- **Validation**: Expiration and Signature verification REQUIRED.
- **RBAC**: Enforce Role-Based Access Control on all endpoints.

## Input Validation

- **Pydantic**: All inputs MUST parse through strict Pydantic models.
- **Limits**: Enforce max token lengths and payload sizes.
- **Sanitization**: Metadata MUST be sanitized (prevent XSS/Injection).
- **Files**: Validate file uploads strictly (MIME, Magic Bytes).

## Data Protection

- **Encryption**: Encrypt sensitive data At-Rest.
- **Transport**: Use TLS (HTTPS) for ALL communication.
- **Network**: Restrict Database access via private network/allow-listing.

## Logging Policy

**NEVER LOG**:

1.  API Keys / Secrets.
2.  Auth Tokens (Bearer).
3.  PII (Personally Identifiable Information).

## Dependency Security

- **Versioning**: Pin dependency versions (use strict `==` or lockfiles).
- **Scanning**: Run automated security scans (Snyk/Bandit) in CI pipelines.
- **SBOM**: Software Bill of Materials required for audit.
- **CVE**: Monitor and patch Critical/High CVE alerts immediately.

## Compliance

- **Standard**: Follow OWASP Top 10 guidelines.
- **Access**: Apply Least Privilege Principle (only grant necessary permissions).
- **Review**: Access controls must be reviewed periodically.
