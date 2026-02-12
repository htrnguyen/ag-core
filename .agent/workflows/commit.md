---
description: intelligently commit changes with atomic, conventional messages
---

# Git Commit Workflow

Use this workflow to clean up your workspace and commit changes professionally.

## Steps

1.  **Load Skill**:
    - Load `.agent/skills/git_automation` to understand commit standards.

2.  **Analyze State**:
    - Run `git status` to see what is modified/untracked.
    - Run `git diff` (and `git diff --cached` if needed) to understand the context of changes.

3.  **Propose Plan**:
    - Suggest a list of commits to the user.
    - Example:
        > I will make 2 commits:
        >
        > 1. `feat(auth): adding login route` (files: auth.ts, route.ts)
        > 2. `style(ui): formatting login button` (files: button.css)

4.  **Execute (Atomic Loop)**:
    - **Step 4a**: Add files for the first logical group (`git add ...`).
    - **Step 4b**: Commit with message (`git commit -m "..."`).
    - **Step 4c**: Repeat for remaining groups.

5.  **Final Status**:
    - Run `git status` one last time to confirm workspace is clean.
