---
name: git_automation
description: Automates git operations with atomic commits and conventional messages.
---

# Git Automation Skill

This skill allows the agent to intelligently manage git operations, focusing on creating clean, atomic commit histories.

## Core Capabilities

1.  **Status Check**: Analyze `git status` to understand pending changes.
2.  **Diff Analysis**: Read `git diff` to understand _what_ changed.
3.  **Atomic Grouping**: Logic to group related files together.
4.  **Conventional Commits**: Generate commit messages following Conventional Commits specification.

## Usage Rules

### 1. Atomic Commits

- **Do NOT** `git add .` blindly.
- Group changes by feature or logical unit.
- **Example**:
    - _Bad_: Commit UI changes and Backend API changes together.
    - _Good_: Commit 1: `feat(api): add updates user endpoint`. Commit 2: `feat(ui): update user profile form`.

### 2. Message Format

Follow the syntax: `<type>(<scope>): <subject>`

- **Types**:
    - `feat`: A new feature
    - `fix`: A bug fix
    - `docs`: Documentation only changes
    - `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
    - `refactor`: A code change that neither fixes a bug nor adds a feature
    - `perf`: A code change that improves performance
    - `test`: Adding missing tests or correcting existing tests
    - `chore`: Changes to the build process or auxiliary tools and libraries

### 3. Workflow Steps

1.  **Analyze**: Run `git status` and `git diff`.
2.  **Plan**: Decide how many commits are needed.
3.  **Execute Loop**:
    - `git add <specific_files>`
    - `git commit -m "<message>"`
    - Repeat until status is clean.
