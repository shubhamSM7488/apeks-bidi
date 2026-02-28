# @apeks/bidi

Fast, memory-efficient, spec-compliant JavaScript implementation of the
Unicode Bidirectional Algorithm (UAX #9).

This package is a standalone module extracted from the **Apeks** editor engine.
It provides the bidirectional text resolution logic used internally by the
engine, published separately as a reusable low-level library.

The goal of this package is to provide deterministic, high-performance BiDi
processing suitable for editor engines, layout systems, and other environments
that require precise Unicode text handling.

---

## Background

**Apeks** is a modular editor engine under development.
The engine is composed of multiple independent subsystems such as:

- node system
- style system
- command system
- history manager
- layout system (text-measurement/shaping: adapters)
- rendering pipeline (adapters)

The bidirectional algorithm implementation is developed as an isolated module
so that it can be tested, verified, and used independently of the editor engine.

This repository contains only the BiDi subsystem.

---

## Goals

- Full compliance with Unicode UAX #9
- Deterministic output
- Minimal allocations
- Suitable for editor engines
- Works in Node and browser
- No runtime dependencies
- Stable generated lookup tables

- Incremental (in-thought)
- Visual-to-Logical and vice-versa (in-thought)

---

## Status

Work in progress.

Current focus:

- Unicode data generator
- Bit-packed lookup tables
- Core algorithm implementation
- Conformance testing

---

## Installation

```bash
pnpm add @apeks/bidi
```

---

## Usage

```ts
import { resolveBiDi } from '@apkes/bidi'

const result = resolveBidi('abc אבג')
```

API is not stable yet

---

## Project Structure

```bash
src/
  core/        algorithm implementation
  data/        generated lookup tables
  internal/    flags, constants, helpers
  types/       shared types

scripts/
  parse/       unicode parsing
  normalize/   data normalization
  pack/        bit packing
  data/        intermediate tables
  build.ts     generator entry

tests/
  unit/
  integration/
  conformance/

docs/
  decisions/
  notes.md
```

## Unicode Version

The generator uses a fixed Unicode version.
Generated tables mus be deterministic.

```bash
UNICODE_VERSION = TBD
```

## Development

Intall dependencies:

```bash
pnpm install
```

Build runtime:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

Run unicode data generator:

```bash
pnpm generate
```

Lint:

```bash
pnpm lint
```

Format:

```bash
pnpm format
```

## Testing

Tests are divided into

- unit tests
- integration tests
- conformance tests

Conformance tests will use official Unicode test data.

## License

`MIT`

## Next Step

> generator pipeline implementation starts
