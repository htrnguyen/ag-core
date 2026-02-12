---
description: Enterprise Architecture and Tech Stack Enforcement
alwaysApply: true
---

# Enterprise Architecture and Tech Stack Enforcement

You are building a production-grade AI backend platform. Adherence to this stack is **MANDATORY**.

## Tech Stack

- **Language**: Python 3.11+
- **Framework**: FastAPI (Async-First)
- **Database**: PostgreSQL (SQLAlchemy 2.0 / AsyncPG)
- **Vector DB**: Milvus (pymilvus async)
- **LLM**: OpenAI API (Async Client)
- **Container**: Docker (Multi-stage), Docker Compose
- **Tasks**: Celery / Message Broker (for background jobs)

## Architecture Principles

- **Design**: Clean Architecture, Microservice-oriented, Stateless.
- **Layers**:
    - **API**: Thin layer (Validation & Routing only).
    - **Service**: Business Logic.
    - **Repository**: Database Access (No raw SQL in services).
- **Rule**: NO Monolithic files. Separate concerns.

## Project Structure

```text
app/
  api/          # Routers and controllers
  services/     # Business logic
  repositories/ # Database interactions
  models/       # DB Models (SQLAlchemy)
  schemas/      # Pydantic Schemas/DTOs
  core/         # Config, Security, Utils
  workers/      # Background tasks (Celery)
```

## RAG Pipeline Structure

Standard Pipeline:

1.  **Ingestion** -> 2. **Chunking** -> 3. **Embedding** -> 4. **Vector Storage**
2.  **Retrieval** -> 6. **Prompt Construction** -> 7. **LLM Call** -> 8. **Post-processing**

### RAG Rules

- **Async**: No heavy embedding generation in the request thread.
- **Versioning**: Embeddings must be versioned. Metadata stored with vectors.
- **Isolation**: Prompt templates separated from logic. No inline concatenation.
- **Filtering**: Retrieval must support metadata filtering.

## Infrastructure Rules

### Milvus (Vector DB)

- **Schema**: Explicit definition required.
- **Metadata**: Store source/context fields.
- **Partitioning**: Use Partitions (not separate collections) for Multi-tenancy.
- [PROHIBITED] No dynamic collection creation per request.

### PostgreSQL

- **Migrations**: Use Alembic.
- **Transactions**: Explicit transaction management.
- **Performance**: Proper Indexing required.
- [PROHIBITED] No raw SQL in business logic areas.

### OpenAI (LLM)

- **Security**: No hardcoded keys (Env Vars only).
- **Resilience**: Implement Retry (Exponential Backoff) & Timeout.
- **Reliability**: Validate Structured Output (Pydantic).
- **Logging**: Log Token Usage & Latency.

### Docker

- **Build**: Multi-stage builds. Slim base images.
- **Security**: Run as non-root user.
- **Config**: Explicit `WORKDIR`. `.dockerignore` required.
- **Health**: `HEALTHCHECK` required.

## Observability

- **Logs**: Structured JSON. Include `trace_id`.
- **Metrics**: Log LLM Latency & Vector Search Latency.
- **Privacy**: NO sensitive data in logs.
