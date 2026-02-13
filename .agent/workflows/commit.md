---
description: intelligently commit changes with atomic, conventional messages
---

# Git Commit Workflow

Use this workflow to clean up your workspace and commit changes professionally.

## Steps

1.  **Load Skill**:
    - Load `.agent/skills/git_automation` to understand commit standards.

2.  **Context & History Analysis**:
    - **Read Files**: Use `view_file` to read the _current_ state of modified files. Do not rely on memory.
    - **Check History**: specific user instructions or reasoning from the recent chat history to explain _why_ changes were made.
    - **Identify Logical Units**: Group changes into atomic units (e.g., "Refactor Auth" vs "Fix Typo").

3.  **Visual Diff Check**:
    - Run `git diff` to see the exact lines changed.
    - Ensure no debug prints or commented-out code are included.

4.  **Propose Atomic Plan**:
    - Suggest a list of commits. Each must be:
        - **Atomic**: One logical change per commit.
        - **Concise**: Message < 50 chars for summary.
        - **Conventional**: `type(scope): message`.
    - Example:
        > I will make 2 commits:
        >
        > 1. `feat(auth): add login route` (logic: adds endpoint)
        > 2. `fix(ui): align login button` (logic: css check)

5.  **Execute (Atomic Loop)**:
    - **Step 5a**: Add files for the group (`git add ...`).
    - **Step 5b**: Commit with **concise** message (`git commit -m "..."`).
    - **Step 5c**: Repeat.

6.  **Final Status**:
    - Run `git status` one last time to confirm workspace is clean.
