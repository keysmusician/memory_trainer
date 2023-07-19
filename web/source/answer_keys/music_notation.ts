type Accidental = '' | 'b' | '#'

export const pitch_classes = [
  'A#' , 'B#' , 'C#' , 'D#' , 'E#' , 'F#' , 'G#' ,
  'A'  , 'B'  , 'C'  , 'D'  , 'E'  , 'F'  , 'G'  ,
  'Ab' , 'Bb' , 'Cb' , 'Db' , 'Eb' , 'Fb' , 'Gb' ,
] as const

type PitchClass = typeof pitch_classes[number]

// MIDI note 60 = middle C
type MIDINoteNumber = (
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
  17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 |
  32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 |
  47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 |
  62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 |
  77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 |
  92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 |
  106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 |
  119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127
)

type PitchTuple = [number, PitchClass]

export type VexNotation = [string, string, Accidental]

/**
 * Music notation.
 */
export const music_notation: Map<VexNotation, PitchClass> = new Map(
  pitch_classes.flatMap(
    (pitch_class) => {
      const treble_clef = 'treble'
      const bass_clef = 'bass'
      const accidental: Accidental = pitch_class[1] as Accidental || ''

      return [
        [[treble_clef, `${pitch_class}/5`, accidental], pitch_class],
        [[treble_clef, `${pitch_class}/4`, accidental], pitch_class],
        [[bass_clef, `${pitch_class}/3`, accidental], pitch_class],
        [[bass_clef, `${pitch_class}/2`, accidental], pitch_class],
      ]
    }
  ).concat([
    [['bass', 'C/4', '#'], 'C#'],
    [['bass', 'C/4', ''], 'C'],
    [['bass', 'C/4', 'b'], 'Cb'],
  ]) as [VexNotation, PitchClass][]
);
