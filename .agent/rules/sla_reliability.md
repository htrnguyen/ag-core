---
description: External SLA and Reliability Policy
alwaysApply: true
---

# External SLA and Reliability Policy

Any external-facing platform must define and adhere to an SLA.

## Availability

- **Target**: ≥ 99.9% monthly uptime.

## Latency

- **P95**: Response latency target MUST be defined.
- **P99**: Latency MUST be monitored.

## Error Rate

- **Threshold**: Error rate < 1% (excluding 4xx due to client error).

## Rate Limiting

- **Strategy**: Per-tenant rate limits.
- **Goal**: Protect against abuse and noisy neighbors.

## Capacity & Monitoring

Must monitor the following key metrics:

1.  **AI Services**: Embedding throughput, OpenAI token usage.
2.  **Database**: DB connection pool utilization.
3.  **Vector DB**: Memory usage/shard distribution.
