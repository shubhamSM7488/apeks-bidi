# Git

**Rules:**

- One logical change = one commit.
- Do not mix multiple changes, feature + refactor + tooling.
- Do not commit broken build
- Always run lint + test before commit

## Branching Strategy

`main`: always stable, buildable
`feature`: new work (runtime/generator)
`fix`: bug fixes (runtime/generator)
`docs`: docs only
`refactor`: internal changes without logic change
`unicode`: unicode data updates
`release`: optional later
`experiment`: optional later

Examples:

```bash
feature/generator-parser
feature/bidi-core
feature/isolates
fix/w1-rule
docs/readme-update
refactor/bitflags-layout
unicode/15.1-update
```

## Commit Structure

```bash
type(scope): commit summary

details

footer (optional)
```

### Allowed Types

- `chore`: tooling/config
- `build`: build system

- `test`: tests
- `docs`: documentation
- `feat`: new feature
- `util`: new utility
- `fix`: bug fix

- `perf`: performance
- `style`: formatting only
- `ci`: CI/CD configurations

### Allowed Scopes

- `project`: project architecture/readme/license/changelog
- `structure`: folders
- `generator`: data parsing/generating/packaging
- `unicode`: unicode raw data
- `data`: generated data
- `bits`: bit layout and flags
- `runtime`: runtime engine
- `config`: ts/eslint/vitest/prettier
- `type`: ts
- `lint`: eslint
- `format`: prettier
- `test`: vitest
- `spec`: UAX9 rules/specifications
- `api`: public api

## Pre-commit Discipline

- lint must pass
- tests must pass
- build must pass
- diff must be reviewed
- commit must always be atomic

## Branch Discipline

- branch per logical change
- branch deleted after merge

## Main Discipline

- main always stable
- main always buildable
- main always tested

## Docs Discipline

- if architecture chaneges -> update docs
- if specs rule implemented -> update docs
- explain performance perpective to decisions if any
- always keep trimming and organizing docs as project grows
