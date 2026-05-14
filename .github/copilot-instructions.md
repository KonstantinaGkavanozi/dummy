## Cyclopt Code Quality

This workspace uses the **Cyclopt** VS Code extension for code quality analysis.

### When to use Cyclopt

- When asked to review, analyze, or improve code quality → run `Cyclopt: Analyze Current File` (keyboard: `Ctrl+Shift+A`)
- When the user wants to choose specific checks → run `Cyclopt: Select Analyzers & Analyze`
- When reviewing multiple files or a folder → right-click in Explorer and choose `Cyclopt: Analyze Selected Files`
- When the user asks about security issues, SAST, vulnerabilities, complexity, duplication, or violations → suggest running the relevant Cyclopt analyzer

### Available analyzers

| Analyzer | What it checks |
|---|---|
| `metrics` | Cyclomatic complexity, maintainability index, lines of code |
| `violations` | Code style and best-practice rule violations |
| `sast` | Static application security testing (injection, XSS, etc.) |
| `duplication` | Copy-paste / cloned code blocks |
| `vulnerabilities` | Known CVEs in dependencies (package.json, requirements.txt, etc.) |

### Results

Results appear in:
- The **Problems panel** (`Ctrl+Shift+M`) as diagnostics
- The **Cyclopt sidebar** (activity bar icon) grouped by file and analyzer
- Inline **editor decorations** on affected lines

### Setup

If the user hasn't configured an API token yet, suggest: `Cyclopt: Set API Token`
