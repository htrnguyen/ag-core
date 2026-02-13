## Testing Standard

- **Framework**: `pytest` + `coverage`.
- **Metric**: Min 80% coverage.
- **Scope**: Unit tests for Services. Integration tests for Routers.

### Performance Testing

- **Tool**: `locust` or `k6`.
- **Requirement**: Critical endpoints must have load tests (P95 < 200ms at 100 RPS).

### Security Testing

- **SAST**: `bandit` must run on CI.
- **Dependency**: `pip-audit` must run on build.
