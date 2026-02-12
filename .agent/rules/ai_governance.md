---
description: AI Model and RAG Governance Policy
alwaysApply: true
---

# AI Model and RAG Governance Policy

All AI-related changes must follow strict governance controls.

## Model Registry

Every deployed model MUST be versioned and registered.

- **Metadata**: `model_name`, `version`, `provider`, `temperature`, `max_tokens`, `release_date`.

## Model Change Requirements

Any change affecting:

- LLM Model / Embedding Model
- Hyperparameters (Temperature, Max Tokens)
- Prompt Templates
- Retrieval / Chunking Strategies

**MUST Include Impact Analysis**:

- Reason for change.
- Expected Impact (Accuracy, Latency, Cost).
- Re-indexing Requirement (Yes/No).

## Prompt Governance

- **Version Control**: Prompt templates MUST be versioned (e.g., in Git or Prompt Management System).
- **Storage**: Prompts stored OUTSIDE controller logic (external file or config).
- **No Inline**: NO inline string concatenation for prompts.
- **Versioning**: Breaking prompt changes require a MINOR or MAJOR version bump.

## Embedding Governance

- **Schema**: Embedding schema MUST be versioned.
- **Strategy**: Re-embedding strategy (migration plan) MUST be documented.
- **Specs**: Must specify `dimension`, `model` name, and `normalization` strategy.

## Evaluation (Eval)

Before deploying ANY AI model/prompt change:

1.  **Dataset**: Run evaluation against a Golden Dataset.
2.  **Metrics**: Compare Accuracy, Hallucination Rate, Latency, and Cost against baseline.

## Prohibited Actions

- [PROHIBITED] Silent model/prompt changes without version bump.
- [PROHIBITED] Production model changes without prior evaluation.
