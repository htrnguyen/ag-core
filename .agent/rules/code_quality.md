# Universal Code Quality Standards

**Philosophy**: Write clean, maintainable, secure code. Code is read more than written.

---

## 1. Clean Code Principles

### SOLID

- **S**ingle Responsibility: One purpose per class/function
- **O**pen/Closed: Extend, don't modify
- **L**iskov Substitution: Subtypes replace base types
- **I**nterface Segregation: Specific > general interfaces
- **D**ependency Inversion: Depend on abstractions

### DRY (Don't Repeat Yourself)

- Extract duplicates into functions/modules
- Use constants, not magic numbers
- Create reusable utilities

### KISS (Keep It Simple)

- Simple > clever
- Avoid premature optimization
- Write understandable code

### YAGNI (You Aren't Gonna Need It)

- Add features when needed, not "just in case"

---

## 2. File Organization

### Size Limits

- **Files**: 500 lines max
- **Functions**: 50 lines max
- **Classes**: 300 lines max

**Action**: Split large files into modules.

### Naming

- **Files**: Follow language conventions (snake_case.py, kebab-case.js, PascalCase.java)
- **Functions**: camelCase or snake_case (language-specific)
- **Classes**: PascalCase
- **Constants**: UPPER_SNAKE_CASE

---

## 3. Code Structure

### Nesting Depth

- **Max**: 4 levels
- **Fix**: Early returns, extract functions, invert conditions

### Function Complexity

- **Cyclomatic complexity**: < 10
- **Parameters**: < 5 (use objects for more)

### Separation of Concerns

- Business logic ≠ presentation
- Use layers: Controller → Service → Repository

---

## 4. Error Handling

- Always handle errors explicitly
- Fail fast (validate early)
- Provide context in logs
- Show user-friendly messages in production

---

## 5. Security

- **Never commit secrets** (use env vars, secret managers)
- **Validate all inputs** (prevent SQL injection, XSS)
- **Least privilege** (minimal permissions)
- **Update dependencies** regularly

---

## 6. Performance

- Profile before optimizing
- **Database**: Avoid N+1 queries, use indexes
- **Memory**: Release resources, avoid leaks
- **Caching**: Cache expensive ops, invalidate properly

---

## 7. Testing

- **Coverage**: 80% minimum, 100% for critical paths
- **Types**: Unit, integration, E2E
- **Independence**: Tests don't depend on each other
- **Naming**: `test_<function>_<scenario>_<expected>`

---

## 8. Documentation

### Comments

- **English only** (no multi-language)
- **Explain WHY**, not WHAT
- **No placeholders** (TODO/FIXME without tickets)

### APIs

- Document public functions
- Include params, returns, exceptions
- Provide examples

---

## 9. Version Control

### Commits

- Use conventional format: `feat:`, `fix:`, `docs:`, `refactor:`
- Reference issue numbers

### PRs

- Keep small (< 400 lines)
- Descriptive descriptions
- Link related issues

---

## 10. Review Checklist

### Functionality

- [ ] Works as intended
- [ ] Edge cases handled
- [ ] Errors handled

### Quality

- [ ] Follows language conventions
- [ ] DRY applied
- [ ] Nesting < 4 levels
- [ ] Functions < 50 lines
- [ ] Files < 500 lines

### Security

- [ ] No secrets
- [ ] Input validated
- [ ] SQL injection prevented
- [ ] XSS prevented

### Performance

- [ ] No obvious bottlenecks
- [ ] Efficient algorithms
- [ ] Resources released

### Testing

- [ ] Tests included
- [ ] Tests pass
- [ ] Coverage adequate

### Documentation

- [ ] English-only comments
- [ ] No placeholders
- [ ] APIs documented

---

## 11. Language-Specific

### Python

- PEP 8, type hints, Black, Flake8

### JavaScript/TypeScript

- ESLint + Prettier, `const` > `let`, async/await, strict mode

### Java

- Google Style, meaningful names, composition > inheritance

### Go

- gofmt, explicit errors, small interfaces

---

## Enforcement

1. **Automated**: Linters, formatters, static analysis
2. **Review**: `/review` workflow, peer reviews
3. **CI/CD**: Pre-commit hooks, tests, coverage, security scans
4. **Audits**: Quarterly reviews, technical debt tracking

---

## Summary

**Good code**: Clean, tested, secure, performant, maintainable, documented  
**Bad code**: Duplicated, nested, untested, insecure, undocumented

**Remember**: Continuous improvement > perfection. Refactor regularly.
