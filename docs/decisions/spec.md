# Specification

## Discipline

Implementation of the Unicode Bidirectional Algorithm must follow
Unicode Standard Annex #9 (UAX #9) exactly.

Rules:

- Every implemented rule must reference the corresponding rule in UAX #9.
- Runtime behavior must match the official conformance tests
  (BidiTest.txt, BidiCharacterTest.txt).
- No behavioral change is allowed without a specification reference.
- Deviations from the specification are not permitted unless explicitly documented.

The specification is the single source of truth for algorithm behavior.

## Bidi Class Representation

The Unicode Bidirectional Algorithm defines a fixed and finite set of
bidirectional character classes.

The engine represents bidi classes using a numeric enumeration instead of
string identifiers.

Rationale:

- allows constant-time comparisons
- enables compact storage in typed arrays
- allows direct indexing into lookup tables
- ensures compatibility with generated Unicode data
- supports bit-packed runtime representation

Each bidi class is assigned a stable integer identifier.

These identifiers are used by:

- runtime algorithm implementation
- generated Unicode data tables
- conformance test execution
- internal bit-packed storage

The numeric mapping of bidi classes is part of the public internal
representation and must remain stable once released.

Changing enum values is a breaking change.
