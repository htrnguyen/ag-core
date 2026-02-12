---
description: Multi Environment Isolation Policy
alwaysApply: true
---

# Multi Environment Isolation Policy

Environments MUST be strictly isolated to prevent data leakage and operational risks.

## Environments

1.  **Local**
2.  **Development (Dev)**
3.  **Staging**
4.  **Production**

## Isolation Rules

- **Databases**: NO shared databases/clusters between environments.
- **Vector DB**: NO shared Milvus collections or indices.
- **Redis/Queue**: NO shared Redis or message queues.
- **Secrets**: NO shared secrets or API keys.

Each environment MUST have:

- Separate OpenAI API Keys.
- Separate Postgres Database.
- Separate Milvus Collection.
- Separate Storage Bucket.

## Configuration

- **Env Vars**: All configurations must be environment-variable based.
- **Defaults**: NO hardcoded production fallbacks in the code.
- **Scope**: Production configs MUST NOT be usable in local/dev environments.

## Data Safety

- **No Copy**: Production data MUST NEVER be copied to development environments without full anonymization.
- **Testing**: Use generated or anonymized datasets for testing purposes.
