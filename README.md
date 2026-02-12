# AG Core

> **The Core of Antigravity** - A lightweight, extensible AI Agent framework.
>
> _Forked from [vudovn/antigravity-kit](https://github.com/vudovn/antigravity-kit) by [htrnguyen](https://github.com/htrnguyen)_

AG Core (Advanced Generator Core) provides the essential kernel for building your own AI agent system. Unlike bloated kits, this package focuses on the fundamental **Orchestrator** and core workflows, giving you a clean slate to build upon.

## 🚀 Quick Install

```bash
npx @htrnguyen/ag-core
```

This command will interactively guide you through the setup.

### Other Commands

```bash
# Update existing .agent folder
npx @htrnguyen/ag-core update

# Remove .agent folder
npx @htrnguyen/ag-core remove
```

This commands installs the `.agent` folder containing the core templates into your project.

### ⚠️ Important: IDE Configuration

If you use **Cursor** or **Windsurf**:

1.  **Do NOT** add `.agent/` to your `.gitignore`.
2.  Instead, add `.agent/` to `.git/info/exclude`.
3.  This ensures the AI can index the context while keeping your repo clean.

## 📦 What's Included?

| Component                       | Description                                                                        |
| :------------------------------ | :--------------------------------------------------------------------------------- |
| **🤖 Antigravity Orchestrator** | The central "Senior Architect" persona that governs code generation.               |
| **🛠️ Basic Skills**             | Essential capabilities like `basic_code_modification` with built-in safety checks. |
| **⚡ Core Workflows**           | `/fix`, `/plan`, `/review`, `/help` to cover the software development lifecycle.   |

## 📊 Core Architecture

### Flow Diagram

```mermaid
graph TD
    UserRequest[USER REQUEST] --> Classification[REQUEST CLASSIFICATION]

    subgraph Core System
        Classification -->|Slash Command| Workflow[WORKFLOW EXECUTION]
        Classification -->|General Request| Orchestrator[ANTIGRAVITY ORCHESTRATOR]
    end

    Workflow -->|/fix, /plan...| AgentInit
    Orchestrator --> AgentInit

    AgentInit[AGENT INITIALIZATION] --> SkillLoading[SKILL LOADING PROTOCOL]

    subgraph Execution
        SkillLoading --> TaskExec[TASK EXECUTION]
        TaskExec --> Validation[RULE ENFORCEMENT]
    end

    Validation --> Result[RESULT DELIVERY]
```

## 🛠️ Usage

### 🌟 Activation

To activate the Antigravity Orchestrator and ensure all rules are loaded, **ALWAYS** start your new chat session with:

> **"Xin chào ag-core"**

(or simply _"Hello ag-core"_).

This phrase signals the AI to:

1.  Load the **Antigravity Orchestrator** persona.
2.  Scan `.agent/rules/` for strict coding standards.
3.  Prepare the `.agent/skills/` for execution.

### The Orchestrator

The **Antigravity Orchestrator** is your default agent. It enforces:

- **Professionalism**: Clear, concise communication.
- **Standards**: Strict adherence to linting and style rules.
- **Security**: Proactive checks for secrets and vulnerabilities.

### Slash Commands

| Command   | Action         | Description                                        |
| :-------- | :------------- | :------------------------------------------------- |
| `/plan`   | Create Plan    | Generates a detailed implementation plan           |
| `/fix`    | Fix Code       | Analyzes and fixes code issues against standards   |
| `/commit` | Commit Code    | Intelligently commits changes with atomic messages |
| `/test`   | Generate Tests | Creates unit tests for selected code               |
| `/doc`    | Document Code  | Generates concise one-line docstrings              |
| `/review` | Code Review    | Reviews code for architectural compliance          |
| `/help`   | Help           | Shows system usage and capabilities                |

### Skill System

Skills are modular capabilities that the agent can load on demand.

**Current Core Skills:**

- **basic_code_modification**: The fundamental ability to modify code safely.
    - **Context Check**: Reads standards and related files.
    - **Safety Check**: Verifies no secrets, no rule violations.
    - **Implementation**: Applies changes with explanatory comments.
    - **Verification**: Suggests linting and testing commands.

- **git_automation**: The ability to manage git operations.
    - **Atomic Commits**: Groups changes by logical unit.
    - **Conventional Messages**: Formats commit messages (feat, fix, etc.).
    - **Status Check**: Analyzes git status and diffs.

- **test_generation**: Creates robust unit tests.
    - **Analysis**: Understands logic and edge cases.
    - **Frameworks**: Supports pytest, jest, etc.

- **document_generation**: Maintains concise documentation.
    - **One-Line Rule**: Enforces simple summary descriptions.
    - **No Redundancy**: Prevents duplicate explanations.

### Rule Enforcement

The system is built on a "Compliance First" architecture. Before generating code, the agent **MUST** reference:

- `.agent/rules/antigravity_standards.md`

## 🚀 Extensibility

AG Core is designed to be the _kernel_ of your AI system. You can expand it by:

1.  **Adding Agents**: Create new `.md` files in `.agent/agents/`.
2.  **Adding Skills**: Create new folders in `.agent/skills/`.
3.  **Adding Workflows**: Define new slash commands in `.agent/workflows/`.

## 🔧 CLI Reference

| `npx @htrnguyen/ag-core` | Interactive install/init |
| `npx @htrnguyen/ag-core update` | Update .agent rules and skills |
| `npx @htrnguyen/ag-core remove` | Remove .agent folder from project |

## 💖 Support This Project

If AG-Core has improved your development workflow, consider supporting its continued development:

- 🚀 **Faster feature releases**
- 🛠️ **Priority bug fixes**
- 📚 **Enhanced documentation**
- 💡 **Community-driven improvements**

**Donate via MoMo**: Scan the QR code on the [landing page](https://htrnguyen.github.io/ag-core) or in `public/images/momo.jpg`

Your support helps keep this project active and growing! 🙏

## 📄 License

MIT © [htrnguyen](https://github.com/htrnguyen)
Based on work by [vudovn](https://github.com/vudovn).
