# Architecture

## Folder Structure

There are two separate directories:

- `scripts/`: handles the pre-processing of unicode data files to generate usable typed array maps and tables for ease of access during UBA resolution at runtime. _semantic meanings related to bidi classes will be embedded into the maps with the use of bit packing flags_

- `src/`: handles the runtime public API, implementation of UBA (Unicode Bidirectional Algorithm) and all related rules logic, holds shared bit layout data used by both the runtime and unicode-build generators, lookup functionality for generated data.

- `tests/`: unit and integration testing for both runtime and unicode-build, conformance tests for official BidiTests.txt file from unicode for 100% spec compliant BiDi engine.

- `docs/`: documentation explaining all major decisions such as architecture, disciplines, internals, testing, performance, optimizations, safety measures, public API.

_folder structure:_

```bash
./
|__ docs/
    |__decisions/
    |__notes.md
|__ src/
    |__data/
    |__core/
    |__internal/
    |__types/
    |__utils/
    |__index.ts
|__ scripts/
    |__data/
    |__parse/
    |__normalize/
    |__pack/
    |__utils/
    |__build.ts
|__ tests/
    |__integration/
        |__build/
        |__runtime/
    |__unit/
        |__build/
        |__runtime/
    |__conformance/
```

## Generated Files Policy

- files inside `src/data/` produced by scripts must be committed.
- `dist/` must NOT be committed.
- Generators must be deterministic.
- Running build twice without changes must not modify files.
- Unicode version must be tracked in generator.

## Public API Discipline

Anything exported from _src/index.ts_ is public API.

Rules:

- Do not change public API without version bump
- Do not export internal helpers
- Keep API minimal
- Public API should be statless and predictable
- Pure functions are preferred for public API
- Public API must not expose internal state
