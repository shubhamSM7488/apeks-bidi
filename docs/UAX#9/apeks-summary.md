# Unicode Bidirectional Algorithm (UAX #9)

---

## 1️⃣ Introduction

### 1.1 Logical Storage Model

Unicode text is stored in **logical (memory) order**, not visual order.

- Characters are stored in the sequence they are typed.
- The algorithm **never reorders memory**.
- It computes a **visual display order** for rendering only.

Example (memory order):

```bash
A B C א ב ג
```

Even if Hebrew is displayed right-to-left, it is still stored left-to-right in memory.

---

### 1.2 Mixed Direction Is Normal

Some scripts are inherently RTL:

- Hebrew
- Arabic
- Syriac
- Thaana
- N’Ko

However:

- European numbers (EN) are LTR.
- Latin words inside Arabic remain LTR.
- Punctuation may attach differently depending on context.

So a single paragraph may contain multiple directional behaviors.

Example:

```bash
שלום 123 ABC
```

Without deterministic rules, rendering becomes ambiguous.

---

### 1.3 What the Algorithm Actually Does

The Unicode Bidirectional Algorithm (UBA):

1. Assigns each character a **Bidi_Class**.
2. Determines the **paragraph base direction**.
3. Computes **embedding levels**.
4. Resolves weak types.
5. Resolves neutral types.
6. Applies implicit level adjustments.
7. Produces visual reordering based on resolved levels.

It guarantees deterministic rendering from logical input.

It does **not**:

- Change stored order
- Change string equality
- Change parsing
- Change semantic meaning

---

### 1.4 Conformance Scope

UBA defines:

- How to compute display order
- Required behavior for conformant implementations
- Interaction rules for formatting controls

It does **not** define:

- Font shaping
- Glyph selection (except mirroring)
- Line breaking
- Text segmentation
- Higher-level editing behavior

Those belong to higher-level protocols.

---

### 1.5 Security Implications

Because visual order can differ from memory order:

- Malicious text may visually mislead users.
- Incorrect implementations may misrender content.
- Consistent conformance is required for interoperability.

UBA must be implemented exactly as specified.

---

## 2️⃣ Directional Formatting Characters

Directional formatting characters are invisible control characters that influence embedding levels.

They exist because implicit resolution is not always sufficient.

They affect **display ordering only**.

They:

- Have no visible glyph.
- Have no semantic meaning.
- Are not lexical tokens.
- Do not affect string comparison.
- Do not affect parsing.
- Are removed or ignored in some processing steps.

---

### 2.1 Two Control Models

There are two distinct mechanisms:

---

### A) Explicit Embeddings and Overrides (Legacy Model)

Characters:

- LRE (Left-to-Right Embedding)
- RLE (Right-to-Left Embedding)
- LRO (Left-to-Right Override)
- RLO (Right-to-Left Override)
- PDF (Pop Directional Formatting)

#### Behavior

They:

- Push a new embedding level onto a stack.
- Modify how following characters are interpreted.
- Continue influencing text until terminated by PDF.

#### Embedding vs Override

Embedding:

- Text keeps intrinsic bidi classes.
- Level increases.

Override:

- Strongly forces character direction.
- Ignores intrinsic bidi class.

#### Properties

- Nestable (stack-based).
- Influence surrounding content.
- Can leak effects beyond intended boundaries.
- Limited maximum depth (implementation must cap levels).

Because of leakage and complexity, these are no longer preferred.

---

### B) Directional Isolates (Unicode 6.3+ Model)

Characters:

- LRI (Left-to-Right Isolate)
- RLI (Right-to-Left Isolate)
- FSI (First Strong Isolate)
- PDI (Pop Directional Isolate)

**Behavior:**

They:

- Create an isolated directional context.
- Prevent inner content from influencing outer context.
- Behave as neutral outside their scope.

Isolation means:

```bash
Outer paragraph direction
   [ Isolate content ]
Outer paragraph continues unaffected
```

#### FSI Special Case

FSI determines direction by scanning forward until:

- First strong character
- Matching PDI
- Paragraph boundary

Then behaves as LRI or RLI accordingly.

---

### 2.2 Why Formatting Characters Exist

Implicit resolution fails in edge cases:

#### Case 1 — Nested Opposite Direction Text

Example:

- RTL paragraph
- Contains English phrase
- That phrase contains RTL acronym

Implicit rules cannot always isolate correctly.

---

#### Case 2 — Programmatic Insertion

If unknown-direction content is inserted into templates:

Instead of pre-analyzing direction:

Wrap with:

```bash
FSI ... PDI
```

Prevents weak/neutral misattachment.

---

#### Case 3 — Neutrals at Boundaries

Example:

```bash
A - ב
```

Hyphen may attach incorrectly without marks.

Directional controls prevent ambiguity.

---

### 2.3 External Behavior

Formatting characters:

- Affect embedding level calculation.
- Are removed during specific algorithm steps.
- Do not appear in final visual output.
- May optionally be retained depending on higher-level protocol.

Higher-level protocols may:

- Insert directional marks (LRM/RLM).
- Strip formatting codes.
- Preserve them for round-trip editing.

UBA defines algorithmic behavior only.
Retention policy is external.

---

### 2.4 Implementation Requirements

A conformant implementation must:

- Recognize all formatting characters.
- Maintain embedding stack with overflow handling.
- Handle isolate stack separately from embedding stack.
- Enforce maximum embedding depth.
- Properly terminate embeddings and isolates.
- Ignore unmatched PDFs beyond stack.
- Ignore unmatched PDIs according to rules.

Failure in stack discipline leads to non-conformance.

---

### 2.5 Design Guidance

Unicode strongly recommends:

- Use isolates instead of embeddings.
- Avoid overrides unless absolutely necessary.
- Prefer semantically correct brackets over visual hacks.
- Avoid constructing visually correct but structurally invalid text.

---

### Core Outcome of Sections 1–2

After these sections, a reader must understand:

- Text is logically stored.
- Visual order must be computed.
- Mixed direction is normal.
- Embedding levels drive reordering.
- Formatting characters manipulate embedding levels.
- Isolates are the modern safe mechanism.
- These controls affect display only.
- Proper stack-based implementation is mandatory.
- Higher-level protocols define retention policy.

---

Understood.
Below continues in the **same structural style**, compact but complete, no loss of technical meaning, and with definitions inserted exactly where they logically belong.

---

## Unicode Bidirectional Algorithm

---

## Bidi Character Types (Required Before the Algorithm)

Every Unicode character has a property called:

> **Bidi_Class**

This property is defined in the Unicode Character Database
(`DerivedBidiClass.txt`).

The algorithm operates entirely on these classes.

---

### 1️⃣ Strong Types

These determine base direction.

- **L** → Left-to-Right letter
- **R** → Right-to-Left letter
- **AL** → Arabic Letter (treated as R in most phases)

These establish directional runs.

---

### 2️⃣ Weak Types

These depend on surrounding context.

- **EN** → European Number (0–9)
- **AN** → Arabic Number
- **ES** → European Separator (+, −)
- **ET** → European Terminator ($, %)
- **CS** → Common Separator (:, /)
- **NSM** → Nonspacing Mark
- **BN** → Boundary Neutral (format controls etc.)

Weak types are resolved during weak resolution phase.

---

### 3️⃣ Neutral Types

Resolved based on surrounding strong types.

- **B** → Paragraph Separator
- **S** → Segment Separator
- **WS** → Whitespace
- **ON** → Other Neutral (punctuation, symbols)

---

### 4️⃣ Explicit Formatting Types

These alter embedding levels.

#### Embeddings / Overrides (legacy model)

- **LRE**
- **RLE**
- **LRO**
- **RLO**
- **PDF**

#### Isolates (Unicode 6.3+)

- **LRI**
- **RLI**
- **FSI**
- **PDI**

#### Directional Marks

- **LRM**
- **RLM**

These are strong characters but invisible.

---

## The Basic Display Algorithm

The algorithm operates per paragraph.

It never changes memory order.
It computes embedding levels and reorders for display.

---

## Step 1 — Paragraph Segmentation (P1–P3)

1. Split text into paragraphs.
2. Paragraph ends at:
   - B (Paragraph Separator)
   - End of text

Each paragraph is processed independently.

---

## Step 2 — Determine Base Level (P2–P3)

Scan paragraph for first strong type:

- First L → base level = 0
- First R or AL → base level = 1
- No strong found → default to 0 (unless higher-level protocol overrides)

Higher-level protocols may explicitly set paragraph level.

---

## Step 3 — Explicit Level Processing (X1–X9)

Process characters sequentially.

Maintain:

- Embedding stack
- Isolate stack
- Overflow counters

---

### When encountering

#### LRE / RLE

- Compute next embedding level
- Push onto stack
- Set override = neutral

#### LRO / RLO

- Compute next embedding level
- Push onto stack
- Set override = forced L or R

#### PDF

- Pop embedding (not isolate)
- Ignore if none

---

#### LRI / RLI / FSI

- Push isolate
- Determine direction:
  - LRI → L
  - RLI → R
  - FSI → first-strong heuristic

- Set isolate level accordingly

---

#### PDI

- Close most recent isolate
- Pop isolate stack

---

#### BN

Ignored in later phases.

---

#### Important Constraints

- Maximum embedding depth = 125
- Overflow embeddings tracked
- Overflow isolates tracked
- PDF does not close isolate
- PDI does not close embedding

---

## Step 4 — Remove Formatting Codes (X9)

Remove:

- LRE, RLE, LRO, RLO, PDF
- BN

But:

They still affected levels earlier.

Isolates remain because they participate in later rules.

---

## Step 5 — Resolve Weak Types (W1–W7)

### W1

NSM inherits type of previous character.

---

### W2

EN becomes AN if preceded by AL.

---

### W3

AL becomes R.

---

### W4

Separators between same-type numbers adopt that type.

---

### W5

ET adjacent to EN becomes EN.

---

### W6

Remaining ES, ET, CS become ON.

---

### W7

EN becomes L if previous strong is L.

---

## Step 6 — Resolve Neutral Types (N0–N2)

---

### N0 — Bracket Pair Algorithm (Unicode 6.3+)

1. Identify matching bracket pairs.
2. If enclosed strong type found:
   - Assign bracket direction accordingly.

3. If conflicting → use embedding direction.

Prevents visually misleading bracket ordering.

---

### N1

Neutral between same strong types → adopt that type.

---

### N2

Otherwise neutral adopts embedding direction.

---

## Step 7 — Resolve Implicit Levels (I1–I2)

Based on final types:

For even levels:

- R → +1
- AN, EN → +2

For odd levels:

- L → +1
- AN, EN → +2

---

## Step 8 — Reordering (L1–L4)

---

### L1

Reset trailing whitespace and separators to paragraph level.

---

### L2

Reverse sequences by descending level.

Higher levels reverse first.

---

### L3

Combine marks stay attached to base character.

---

### L4 — Mirroring

If:

- Character has Bidi_Mirrored property
- Resolved direction is RTL

Then substitute mirrored glyph.

Example:

- "(" ↔ ")"
- "<" ↔ ">"

Glyph substitution only, not character replacement.

---

## Higher-Level Protocol Notes

UBA assumes plain text.

Higher-level systems may:

- Set paragraph direction explicitly
- Use markup (`dir="rtl"`)
- Preserve program semantics
- Insert formatting characters when converting to plain text

When converting from styled systems to plain text:

- Insert formatting characters
- Preserve visual result

---

## Joiners

ZWJ and ZWNJ:

- Affect shaping
- Do not affect bidi ordering
- Must preserve adjacency in memory

---

## Vertical Text

UBA may still compute levels.

Reordering may not be applied.

Higher-level protocol defines glyph rotation.

---

## Security Considerations

Because memory ≠ display:

- Visual spoofing possible
- Bracket rule N0 added to reduce abuse
- Conformance required for safe rendering

---

## Migration Notes

Unicode 6.3 introduced:

- Isolates
- Bracket pair resolution

Older systems may display differently.

To ensure compatibility:

- Add LRM/RLM around brackets if needed
- Explicitly embed number + "/" + number cases

---

## Core Principle

The algorithm:

1. Determines base direction
2. Computes embedding levels
3. Resolves weak and neutral types
4. Adjusts levels implicitly
5. Reorders visually
6. Applies mirroring

It never changes memory order.

It produces deterministic visual order from logical Unicode text.

---

If you want next refinement phase, we can now:

- Convert this into strict pseudocode
- Or convert into spec-grade numbered formal steps
- Or compress further while preserving full correctness
