# Architecture

## Documentation Discipline

Documentation must be updated whenever any of the following changes:

- architecture or internal representation changes
- folder structure changes
- specification rules are implemented or modified
- performance decisions are introduced or altered
- public API changes
- generator behavior changes
- bit layout or data representation changes

Rules:

- documentation must remain coherent and internally consistent
- documentation must reflect the current implementation
- small incremental updates are preferred over large rewrites
- undocumented behavior is not allowed
- documentation is part of the codebase and is versioned with it

## Folder Structure

The project is divided into clearly separated layers.

- `scripts/`  
  Handles preprocessing of Unicode data files and generation of
  typed array lookup tables used by the runtime.

  Responsibilities:
  - parse raw Unicode data files
  - normalize parsed data
  - pack semantic information into compact numeric representation
  - generate deterministic tables
  - embed bit-packed flags used by runtime

- `src/`  
  Contains runtime implementation of the Unicode Bidirectional Algorithm.

  Responsibilities:
  - public API
  - UAX #9 rule implementation
  - shared bit layout definitions
  - lookup helpers for generated tables
  - internal runtime utilities

- `tests/`  
  Contains all testing code.

  Responsibilities:
  - unit tests for runtime
  - unit tests for generators
  - integration tests
  - conformance tests using official Unicode data
  - regression tests

- `docs/`  
  Contains all project documentation.

  Responsibilities:
  - architecture decisions
  - specification rules
  - performance notes
  - internal representation
  - testing discipline
  - versioning rules
  - design rationale

Folder layout:

```bash
./
|__ docs/
    |__ decisions/
    |__ notes.md

|__ src/
    |__ data/
    |__ core/
    |__ internal/
    |__ types/
    |__ utils/
    |__ index.ts

|__ scripts/
    |__ data/
    |__ parse/
    |__ normalize/
    |__ pack/
    |__ utils/
    |__ build.ts

|__ tests/
    |__ integration/
        |__ build/
        |__ runtime/
    |__ unit/
        |__ build/
        |__ runtime/
    |__ conformance/
```

## Generated Files Policy

Generated files are part of the runtime and must follow strict rules.

- files inside `src/data/` produced by generators must be committed
- `dist/` must never be committed
- generators must be deterministic
- running the generator twice without changes must produce identical output
- generator output must not depend on system locale or platform
- Unicode version must be explicitly tracked
- generator input files must remain unchanged

## Public API Discipline

Anything exported from `src/index.ts` is public API.

Rules:

- public API must remain stable within a version
- breaking changes require version bump
- internal helpers must not be exported
- API surface must remain minimal
- public API must be stateless
- public API must not expose internal data structures
- pure functions are preferred
- runtime must not require generator to run

## Internal Representation of Bidi Classes

Bidi classes are represented as small integers.

Design goals:

- constant-time comparisons
- zero allocations during runtime
- compatibility with typed arrays
- compatibility with bit-packed storage
- minimal memory usage
- stable numeric mapping

The numeric value of each class is part of the internal ABI.

The enum order is used as index in:

- generated Unicode tables
- runtime lookup tables
- bit-packed storage
- conformance tests

Changing enum order is a breaking change.
