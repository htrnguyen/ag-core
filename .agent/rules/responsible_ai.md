---
description: AI Safety and Responsible AI Policy
alwaysApply: true
---

# AI Safety and Responsible AI Policy

All AI-powered features must adhere to these guidelines to ensure safety and reliability.

## Output Safety

- **Validation**: Validate all LLM outputs before returning to the user (e.g., JSON schema validation).
- **System Instructions**: Reject any hallucinated instructions that attempt to override system behavior.
- **Unsafe Content**: Strictly reject unsafe, offensive, or harmful content.
- **Moderation**: Enforce content moderation filters (e.g., Azure Content Safety).

## Prompt Protection

- **Secrecy**: System prompts (intellectual property) MUST NOT be exposed to end-users.
- **Chain-of-Thought**: Internal reasoning steps (CoT) must be stripped from the final response.
- **Sanitization**: Prevent prompt injection attacks by sanitizing user input effectively.

## Hallucination Control

- **Grounding**: Use Retrieval-Augmented Generation (RAG) for factual queries.
- **Citations**: Return source documents/links whenever possible.
- **Uncertainty**: Provide disclaimers or "I don't know" responses if confidence is low.

## Model Limitation Disclosure

Users must be clearly informed:

1.  **Errors**: AI may produce factually incorrect information.
2.  **Disclaimer**: AI output is NOT professional legal, medical, or financial advice.
