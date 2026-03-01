# Git

This document defines the required workflow rules for this repository.  
All commits, branches, and documentation updates must follow these rules.

These rules exist to keep the codebase stable, traceable, and production-grade.

---

## Core Rules

- One logical change = one commit
- Do not mix unrelated changes in a single commit
- Never commit broken build
- Always run lint, tests, and build before committing
- Commit history must stay readable and meaningful

---

## Branching

### Strategy

Branches are created per logical change.

Allowed branch types:

- main → always stable, always buildable
- feature → new functionality (runtime / generator)
- fix → bug fixes
- docs → documentation only
- refactor → internal change without behavior change
- unicode → unicode data updates
- release → release preparation (optional)
- experiment → temporary research work (optional)

_Examples:_

```bash
feature/generator-parser
feature/bidi-core
feature/isolates

fix/w1-rule

docs/readme-update

refactor/bitflags-layout

unicode/18.0-update
```

### Rules

- Never work directly on `main`
- `main` must never contain unfinished work
- Keep branches small, one branch per logical change
- Merge only when stable
- Branch must be deleted after merge

main must always be:

- stable
- buildable
- tested
- lint-clean

main must never contain:

- experiments
- partial features
- broken tests
- debug code

---

## Commits

### Format

All commits must follow:

```bash
type(scope): summary

details

footer (optional)
```

Summary rules:

- imperative mood
- short and precise
- describe what changed, not why you felt like doing it

_Example:_

```bash
docs(chore): add git documentation and rule definitions

- add git documentation to docs/decisions
- define git core rules
- define branching strategy with examples
- define commit format with example
- define allowed types and scopes for git commits
- define pre-commit discipline
```

---

### Allowed Types

- chore → tooling / config / maintenance
- build → build system
- feat → new feature
- fix → bug fix
- util → new utility
- docs → documentation
- test → tests
- perf → performance change
- style → formatting only
- ci → CI / automation

---

### Allowed Scopes

- project → readme / license / changelog / architecture / policies
- structure → folder layout
- generator → unicode parsing / normalize / pack
- unicode → raw unicode data
- data → generated tables / maps
- bits → bit layout / flags
- runtime → bidi engine runtime
- api → public api

- config → ts / eslint / vitest / prettier
- type → typescript types
- lint → eslint
- format → prettier
- test → vitest

- spec → UAX9 rules / spec logic

---

### Pre-commit Discipline

Before every commit:

- lint must pass
- tests must pass
- build must pass
- diff must be reviewed
- commit must be atomic

Command checklist (recommended):

```bash
pnpm lint
pnpm test
pnpm build
git diff
```

---

## Philosophy

This repository follows strict discipline because it targets:

- spec compliance
- deterministic behavior
- high performance
- long-term maintainability
- production-grade quality

History clarity is considered part of code quality.
