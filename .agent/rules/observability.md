---
description: Enterprise Observability and SLO Policy
alwaysApply: true
---

# Enterprise Observability and SLO Policy

Observability is **MANDATORY** for all production services.

## Logging

- **Format**: Structured JSON logging.
- **Standard Fields**: `trace_id`, `request_id`, `timestamp`, `service_name`, `environment`.
- **Latency Logs**:
    - LLM response latency.
    - Vector search (Retrieval) latency.
    - Database query latency.

## Metrics

Track the following key metrics at minimum:

- Request Rate (RPS).
- Error Rate.
- P95 / P99 Latency.
- LLM Cost per Request.
- Embedding Throughput.
- Retrieval Latency.

## Tracing

- **Distributed Tracing**: MUST be enabled across all microservices (e.g., OpenTelemetry).
- **Coverage**: Trace individual DB queries and Vector Search operations.

## SLO Requirements

Define and monitor Service Level Objectives:

1.  **Availability**: ≥ 99.9%
2.  **Latency**: P95 ≤ [Defined Threshold]
3.  **Error Rate**: ≤ 1%

## Alerting

Configure automated alerts for:

- Error rate spikes.
- Latency spikes (P95 breach).
- LLM failure rate increase.
- Vector DB unavailability.
- DB connection pool exhaustion.

## Incident Response (SRE)

Every **Sev1** incident requires a full Postmortem:

1.  Root cause documented.
2.  Mitigation documented.
3.  Preventive action defined.
