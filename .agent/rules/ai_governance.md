---
description: AI Model Governance, Safety, and Responsibility Policy
alwaysApply: true
---

# AI Governance & Responsible AI Policy

All AI-related features must adhere to these guidelines to ensure control, safety, and reliability.

## 1. Governance & Lifecycle

### Model Registry

- **Requirement**: Every deployed model MUST be versioned and registered.
- **Metadata**: `model_name`, `version`, `provider`, `temperature`, `max_tokens`, `release_date`.

### Change Management

Any change affecting Models, Hyperparameters, Prompts, or Retrieval Strategies **MUST Include Impact Analysis**:

- Reason for change.
- Expected Impact (Accuracy, Latency, Cost).
- Re-indexing Requirement (Yes/No).

### Version Control

- **Prompts**: Prompt templates MUST be versioned and stored OUTSIDE logic (external file/config).
- **Embeddings**: Embedding schema and re-indexing strategies MUST be documented.
- **Prohibited**: No inline string concatenation for prompts. No silent model changes.

### Evaluation (Eval)

Before deploying ANY AI model/prompt change:

1.  **Dataset**: Run evaluation against a Golden Dataset.
2.  **Metrics**: Compare Accuracy, Hallucination Rate, Latency, and Cost against baseline.

## 2. Runtime Safety & Responsibility

### Output Safety

- **Validation**: Validate all LLM outputs (e.g., JSON schema) before returning to user.
- **System Instructions**: Reject hallucinated overrides.
- **Content Filters**: Enforce moderation filters (e.g., Azure Content Safety) to reject harmful content.

### Prompt Protection

- **Secrecy**: System prompts (IP) MUST NOT be exposed to end-users.
- **Sanitization**: Prevent prompt injection via input sanitization.
- **Chain-of-Thought**: Strip internal reasoning steps from final responses.

### Hallucination Control

- **Grounding**: Use RAG for factual queries.
- **Citations**: Return source documents/links.
- **Uncertainty**: Provide disclaimers if confidence is low.

### Disclosure

Users must be informed that:

1.  AI may produce errors.
2.  Output is NOT professional advice (Legal/Medical/Financial).
