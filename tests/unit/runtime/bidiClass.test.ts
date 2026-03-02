import { describe, expect, it } from 'vitest'
import {
  BIDI_CLASS_COUNT,
  BIDI_CLASS_MAP,
  BIDI_CLASS_NAMES,
  BidiClass,
  getBidiClassIndex,
  getBidiClassName,
} from '../../../src/types/bidiClass.js'

// Invariants

describe('BidiClass invariants', () => {
  it('class count must match names length', () => {
    expect(BIDI_CLASS_NAMES.length).toBe(BIDI_CLASS_COUNT)
  })

  it('enum values must be contiguous', () => {
    // @ts-ignore
    const values = Object.values(BidiClass).filter((v) => typeof v === 'number') as number[]

    expect(values.length).toBe(BIDI_CLASS_COUNT)

    values.sort((a, b) => a - b)

    values.forEach((v, i) => {
      expect(v).toBe(i)
    })
  })

  it('enum values must stay stable', () => {
    expect(BidiClass.L).toBe(0)
    expect(BidiClass.R).toBe(1)
    expect(BidiClass.AL).toBe(2)
    expect(BidiClass.EN).toBe(3)
    expect(BidiClass.ES).toBe(4)
  })
})

// Immutability

describe('immutability', () => {
  it('names must be frozen', () => {
    expect(Object.isFrozen(BIDI_CLASS_NAMES)).toBe(true)
  })

  it('map must be frozen', () => {
    expect(Object.isFrozen(BIDI_CLASS_MAP)).toBe(true)
  })

  it('names array must not be mutable', () => {
    expect(() => {
      // @ts-ignore
      BIDI_CLASS_NAMES[0] = 'XXX'
    }).toThrow()
  })

  it('map must not be mutable', () => {
    expect(() => {
      // @ts-ignore
      BIDI_CLASS_MAP.L = 999
    }).toThrow()
  })
})

// Name <-> index consistency

describe('name/index consistency', () => {
  it('names must match enum indices', () => {
    BIDI_CLASS_NAMES.forEach((name, i) => {
      expect(getBidiClassIndex(name)).toBe(i)
      expect(getBidiClassName(i)).toBe(name)
    })
  })

  it('roundtrip must work', () => {
    for (const name of BIDI_CLASS_NAMES) {
      const i = getBidiClassIndex(name)!
      const n = getBidiClassName(i)

      expect(n).toBe(name)
    }
  })
})

// API safety

describe('getBidiClassIndex', () => {
  it('returns correct value', () => {
    expect(getBidiClassIndex('L')).toBe(BidiClass.L)
    expect(getBidiClassIndex('R')).toBe(BidiClass.R)
    expect(getBidiClassIndex('AL')).toBe(BidiClass.AL)
  })

  it('returns undefined for invalid', () => {
    expect(getBidiClassIndex('')).toBeUndefined()
    expect(getBidiClassIndex('XXX')).toBeUndefined()
  })
})

describe('getBidiClassName', () => {
  it('returns correct name', () => {
    expect(getBidiClassName(BidiClass.L)).toBe('L')
    expect(getBidiClassName(BidiClass.R)).toBe('R')
    expect(getBidiClassName(BidiClass.AL)).toBe('AL')
  })

  it('returns undefined for invalid', () => {
    expect(getBidiClassName(-1 as any)).toBeUndefined()
    expect(getBidiClassName(999 as any)).toBeUndefined()
  })
})

// Map completeness

describe('map completeness', () => {
  it('map must contain all names', () => {
    for (const name of BIDI_CLASS_NAMES) {
      expect(BIDI_CLASS_MAP[name]).not.toBeUndefined()
    }
  })

  it('map size must match class count', () => {
    expect(Object.keys(BIDI_CLASS_MAP).length).toBe(BIDI_CLASS_COUNT)
  })
})
