---
description: Data Retention and Privacy Policy
alwaysApply: true
---

# Data Retention and Privacy Policy

Data handling must follow strict privacy-first principles.

## Data Classification

Classify all data into the following levels:

1.  **Public**
2.  **Internal**
3.  **Confidential**
4.  **Sensitive (PII)**

## PII Handling

- **Logging**: PII MUST NOT be written to logs.
- **LLM Processing**: PII should NOT be sent to external LLMs/Models unless strictly necessary and compliant (e.g., Azure PII detection).
- **Masking**: Mask all sensitive fields (e.g., SSN, Email, Phone) BEFORE embedding or storing.

## Retention Policy

Define retention periods for:

- **Embeddings**
- **Chat Logs / Conversations**
- **Audit Logs**

Requirements:

- Support GDPR/CCPA **deletion requests**.
- Support full **Tenant-Level Data Deletion**.

## Tenant Isolation

Multi-tenant systems MUST strictly isolate data across all layers:

1.  **Vector Store**: Use separate partitions or metadata filters per Tenant.
2.  **Database**: Row-Level Security (RLS) or separate schemas.
3.  **Cache**: Use distinct namespaces (prefixes) for each Tenant.
