# REFACTOR SKILL - Clean Architecture Stabilization Mode

## RULE 0 - No Complete Rewrite

- Do not rewrite the entire system if it is currently running.
- Do not change behavior without fully understanding it.
- Refactor ≠ Redesign logic.

**Goal**: Preserve logic - change structure.

## RULE 1 - Freeze Behavior First

Before modifying:

- Identify the main system flow.
- List the APIs actually in use.
- Manually test key use cases.

If possible:

- Write tests for the most critical flow.

Only proceed with moving code once behavior is clearly defined.

## RULE 2 - Understand System Flow, Not Just Files

Do not read files from top to bottom.

Instead:

1.  Find entry points (API, controller, job, cron...).
2.  Trace data flow.
3.  Draw a diagram:
    - Input
    - Process
    - Output
    - Side effects

**Mindset**: Follow the data flow, not the old folder structure.

## RULE 3 - Classify Code Before Touching

Categorize code into 4 layers:

1.  **Interface layer**: controller, router
2.  **Application layer**: orchestration
3.  **Domain layer**: business logic
4.  **Infrastructure layer**: db, external API

Do not fix logic first. Just classify it correctly.

## RULE 4 - Isolate Before Cleaning

If logic is tightly coupled:

- Create adapters.
- Create wrappers.
- Create intermediate services.

Do not extract directly if dependencies are not yet separated.

**Principle**: Make it stand alone before making it beautiful.

## RULE 5 - Refactor by Vertical Slice

Do not refactor the entire system at once.

Process:

- Select 1 use case.
- Clean from Entry → Domain → Infra.
- Verify it works.
- Commit.
- Repeat.

Each commit must reduce entropy.

## RULE 6 - No Premature Optimization

In the refactor phase:

**NO**:

- Optimizing performance.
- Changing algorithms.
- Adding new features.

**ONLY**:

- Standardizing structure.
- Standardizing naming.
- Removing duplication.

## RULE 7 - Standardize Naming by Domain

After isolation:

- Name according to business domain.
- Avoid generic technical names like:
    - `handleData`
    - `processStuff`
    - `utilsCommon`

Names must reflect the domain.

## RULE 8 - Reduce Cross-Dependencies

Each module must:

- Have one-way dependency direction.
- No circular imports.
- No dependency on Infra from Domain.

If circular dependency exists → Extract abstraction.

## RULE 9 - Controlled Dead Code Removal

Only delete when:

- Certain it's unused.
- Searched the entire project.
- Retested the main flow.

Do not delete based on "feeling".

## RULE 10 - Every Commit Must Clarify the System

After each refactor, ask:

- Is it easier to read?
- Is functionality less coupled?
- Is the flow clearer?
- Would a new person understand it faster?

If the answer is **no**, you are refactoring in the wrong direction.

# Core Mindset

1.  Stabilize first - Beautify second.
2.  Structure first - Optimize second.
3.  Isolate first - Refine second.
4.  Reduce entropy with every touch.
