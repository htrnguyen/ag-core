## Security Standard

### Authentication & Authorization

- **Auth**: OAuth2/JWT via `Depends()`.
- **Azure**: Use Managed Identity for Azure services.
- **RBAC**: Implement Role-based Access Control.

### Secrets Management

- **Storage**: Azure Key Vault or Secret Manager.
- **Code**: NO hardcoded keys/secrets/tokens.
- **Rotation**: Support periodic rotation of keys.

### Web/API Protections

- **HTTPS**: TLS 1.2+ required.
- **CORS**: Restricted to trusted domains only.
- **Headers**: HSTS, CSP, X-Content-Type-Options, X-Frame-Options.
- **Input**: Sanitize all inputs. No raw SQL strings.

### Operations

- **Logs**: Sanitize PII (No Emails/Phones/SSNs).
- **Audit**: Log sensitive actions (Access, Modification, Deletion).
- **Scanning**: SAST (Bandit/Snyk) in CI pipeline.
- **Errors**: No stack traces in responses.
