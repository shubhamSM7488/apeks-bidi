export const enum BidiClass {
  L = 0,
  R,
  AL,
  EN,
  ES,
  ET,
  AN,
  CS,
  NSM,
  BN,
  B,
  S,
  WS,
  ON,
  LRE,
  LRO,
  RLE,
  RLO,
  PDF,
  LRI,
  RLI,
  FSI,
  PDI,
}

export const BIDI_CLASS_COUNT = 23
export const BIDI_CLASS_NAMES = Object.freeze([
  'L',
  'R',
  'AL',
  'EN',
  'ES',
  'ET',
  'AN',
  'CS',
  'NSM',
  'BN',
  'B',
  'S',
  'WS',
  'ON',
  'LRE',
  'LRO',
  'RLE',
  'RLO',
  'PDF',
  'LRI',
  'RLI',
  'FSI',
  'PDI',
] as const)

export const BIDI_CLASS_MAP: Record<string, BidiClass> = Object.freeze({
  L: BidiClass.L,
  R: BidiClass.R,
  AL: BidiClass.AL,
  EN: BidiClass.EN,
  ES: BidiClass.ES,
  ET: BidiClass.ET,
  AN: BidiClass.AN,
  CS: BidiClass.CS,
  NSM: BidiClass.NSM,
  BN: BidiClass.BN,
  B: BidiClass.B,
  S: BidiClass.S,
  WS: BidiClass.WS,
  ON: BidiClass.ON,
  LRE: BidiClass.LRE,
  LRO: BidiClass.LRO,
  RLE: BidiClass.RLE,
  RLO: BidiClass.RLO,
  PDF: BidiClass.PDF,
  LRI: BidiClass.LRI,
  RLI: BidiClass.RLI,
  FSI: BidiClass.FSI,
  PDI: BidiClass.PDI,
} as const)

export function getBidiClassIndex(name: string): BidiClass | undefined {
  return BIDI_CLASS_MAP[name]
}

export function getBidiClassName(cls: BidiClass): string {
  return BIDI_CLASS_NAMES[cls]
}
