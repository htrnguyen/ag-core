---
name: dependency_management
description: Manage Python dependencies with security auditing and strict version pinning.
---

# Dependency Management Skill

Use this skill when adding, removing, or updating Python packages to ensure supply chain security.

## Prerequisites

- `pip-audit` installed.
- `safety` installed (optional but recommended).

## Steps

1.  **Vulnerability Scan (Pre-check)**:
    - Run: `pip-audit -r requirements.txt`
    - If vulnerabilities found, **STOP** and report to user unless the task is to fix them.

2.  **Modification**:
    - **Add**: `pip install package_name==version` (Always specify version if known, or latest stable).
    - **Remove**: `pip uninstall package_name`

3.  **Pinning**:
    - Run: `pip freeze > requirements.txt`
    - **Strict Rule**: Ensure all packages have pinned versions (e.g., `==1.2.3`, not `>=1.2.3`).

4.  **Verification**:
    - Run: `pip-audit -r requirements.txt` again to ensure no NEW vulnerabilities were introduced.
    - Check `requirements.txt` for suspicious packages (typosquatting check - manual/visual).

5.  **Commit**:
    - Message format: `build(deps): add/update package_name to x.y.z`

## Emergency Bypass

If a vulnerability exists but cannot be fixed (no patch available), verify with user and document exclusion in `pyproject.toml` or `requirements.txt` comments explicitly.
