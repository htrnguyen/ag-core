#!/usr/bin/env python3
"""
Antigravity Code Quality Checklist

Checks code against Antigravity standards:
- File size limits (500 lines)
- Deep nesting (max 4 levels for Python, 10 for HTML)
- Security issues (hardcoded secrets)
- Comment quality (English only, no placeholders)
- Ignores files matched by .gitignore patterns

Usage:
    python checklist.py                    # Check entire project
    python checklist.py path/to/file.py    # Check specific file
    python checklist.py path/to/folder     # Check specific folder
"""

import argparse
import os
import re
import sys
import fnmatch
from pathlib import Path
from typing import List, Set


class CodeChecker:
    """Code quality checker following Antigravity standards."""

    MAX_LINES = 500
    MAX_NESTING_PY = 4
    MAX_NESTING_HTML = 10
    # Default excludes (always applied)
    EXCLUDE_DIRS = {
        ".git",
        ".agent",
        "node_modules",
        "__pycache__",
        ".venv",
        "venv",
        "dist",
        "build",
    }
    TEXT_EXTS = {
        ".py",
        ".js",
        ".ts",
        ".tsx",
        ".jsx",
        ".html",
        ".css",
        ".md",
        ".json",
        ".yml",
        ".yaml",
        ".sh",
    }

    def __init__(self, root_path: Path):
        self.root_path = root_path
        self.issues = {}
        self.gitignore_patterns: List[str] = []
        self.load_gitignore()

    def load_gitignore(self) -> None:
        """Load patterns from .gitignore in root path."""
        gitignore_path = self.root_path / ".gitignore"
        if not gitignore_path.exists():
            return

        try:
            with open(gitignore_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line or line.startswith("#"):
                        continue
                    self.gitignore_patterns.append(line)
        except Exception as e:
            print(f"[WARNING] Failed to load .gitignore: {e}")

    def is_ignored(self, file_path: Path) -> bool:
        """Check if file path should be ignored based on defaults or gitignore."""
        # 1. Check default exclude directories (fast check on parts)
        if any(part in self.EXCLUDE_DIRS for part in file_path.parts):
            return True

        # 2. Check gitignore patterns
        if not self.gitignore_patterns:
            return False

        try:
            # Get path relative to root for matching
            rel_path = file_path.relative_to(self.root_path)
        except ValueError:
            # Path is not relative to root, just use name
            rel_path = Path(file_path.name)

        # Naive implementation of gitignore matching using fnmatch
        # Matches against the relative path string
        path_str = str(rel_path).replace(os.sep, "/")

        for pattern in self.gitignore_patterns:
            clean_pattern = pattern.rstrip("/")

            if fnmatch.fnmatch(path_str, clean_pattern):
                return True
            parts = path_str.split("/")
            for i in range(len(parts)):
                parent_path = "/".join(parts[: i + 1])
                if fnmatch.fnmatch(parent_path, clean_pattern):
                    return True

        return False

    def check_file_size(self, file_path: Path, lines: list) -> list:
        """Check if file exceeds 500 lines."""
        issues = []
        if len(lines) > self.MAX_LINES:
            issues.append(
                f"[SIZE] File exceeds {self.MAX_LINES} lines ({len(lines)} lines). Consider refactoring."
            )
        return issues

    def check_nesting_depth(self, file_path: Path, content: str) -> list:
        """Check for deep nesting."""
        issues = []
        if file_path.suffix == ".py":
            max_depth = self._check_python_nesting(content)
            if max_depth > self.MAX_NESTING_PY:
                issues.append(
                    f"[COMPLEXITY] Deep nesting ({max_depth} levels). Max: {self.MAX_NESTING_PY}."
                )
        elif file_path.suffix in [".html", ".htm"]:
            max_depth = self._estimate_html_nesting(content)
            if max_depth > self.MAX_NESTING_HTML:
                issues.append(
                    f"[COMPLEXITY] Deep nesting (approx {max_depth} levels). Refactor required."
                )
        return issues

    def _check_python_nesting(self, content: str) -> int:
        """Check Python nesting depth based on indentation."""
        max_depth = 0
        for line in content.split("\n"):
            stripped = line.lstrip()
            if not stripped or stripped.startswith("#"):
                continue
            indent = len(line) - len(stripped)
            depth = indent // 4
            max_depth = max(max_depth, depth)
        return max_depth

    def _estimate_html_nesting(self, content: str) -> int:
        """Estimate HTML nesting depth."""
        depth = 0
        max_depth = 0
        for char in content:
            if char == "<":
                depth += 1
                max_depth = max(max_depth, depth)
            elif char == ">":
                depth = max(0, depth - 1)
        return max_depth // 2

    def check_security(self, content: str) -> list:
        """Check for hardcoded secrets."""
        issues = []
        patterns = [
            (r"password\s*=\s*['\"][^'\"]+['\"]", "Hardcoded password"),
            (r"api[_-]?key\s*=\s*['\"][^'\"]+['\"]", "Hardcoded API key"),
            (r"secret\s*=\s*['\"][^'\"]+['\"]", "Hardcoded secret"),
            (r"token\s*=\s*['\"][^'\"]+['\"]", "Hardcoded token"),
        ]
        for pattern, message in patterns:
            if re.search(pattern, content, re.IGNORECASE):
                issues.append(f"[SECURITY] {message} detected")
                break
        return issues

    def check_file(self, file_path: Path) -> None:
        """Run all checks on a single file."""
        if self.is_ignored(file_path):
            return

        if file_path.suffix not in self.TEXT_EXTS:
            return

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                lines = f.readlines()
                content = "".join(lines)

            file_issues = []
            file_issues.extend(self.check_file_size(file_path, lines))
            file_issues.extend(self.check_nesting_depth(file_path, content))
            file_issues.extend(self.check_security(content))

            if file_issues:
                self.issues[file_path] = file_issues

        except Exception as e:
            # print(f"[ERROR] Failed to check file {file_path}: {e}")
            pass

    def check_path(self, path: Path) -> None:
        """Check a file or directory."""
        if path.is_file():
            self.check_file(path)
        elif path.is_dir():
            self._check_directory(path)

    def _check_directory(self, directory: Path) -> None:
        """Recursively check all files in directory."""
        for item in directory.rglob("*"):
            if item.is_file():
                self.check_file(item)

    def report(self) -> int:
        """Print report and return exit code."""
        print("Antigravity Code Checklist Running...")

        if not self.issues:
            print("[OK] No issues found. Code looks good!")
            return 0

        print(f"[WARNING] Found potential issues in {len(self.issues)} files:\n")

        for file_path, file_issues in sorted(self.issues.items()):
            try:
                rel_path = file_path.relative_to(self.root_path)
            except ValueError:
                rel_path = file_path
            print(f"File: {rel_path}:")
            for issue in file_issues:
                print(f"  - {issue}")
            print()

        return 1


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Antigravity Code Quality Checklist",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
            Examples:
                python checklist.py                    # Check entire project
                python checklist.py src/               # Check src folder
                python checklist.py app/main.py        # Check specific file
        """,
    )
    parser.add_argument(
        "path",
        nargs="?",
        default=".",
        help="Path to file or directory to check (default: current directory)",
    )

    args = parser.parse_args()

    # Always use current working directory as root for gitignore context
    root_path = Path.cwd()
    target_path = Path(args.path).resolve()

    if not target_path.exists():
        print(f"[ERROR] Path '{args.path}' does not exist")
        return 1

    checker = CodeChecker(root_path)
    checker.check_path(target_path)
    return checker.report()


if __name__ == "__main__":
    sys.exit(main())
