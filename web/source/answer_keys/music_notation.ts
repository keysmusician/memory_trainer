type Accidental = '' | 'b' | '#'

type Pitch = (
  'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' |
  'Ab' | 'Bb' | 'Cb' | 'Db' | 'Eb' | 'Fb' | 'Gb' |
  'A#' | 'B#' | 'C#' | 'D#' | 'E#' | 'F#' | 'G#'
)

type PitchTuple = [number, Pitch]

export type VexNotation = [string, string, Accidental]

/**
 * Music notation.
 */
export const music_notation: Map<VexNotation, PitchTuple> = new Map([
    [['treble', 'C/4', ''], [60, 'C']],
    [['treble', 'B/3', ''], [59, 'B']],
    [['treble', 'B/3', 'b'], [58, 'Bb']],
    [['treble', 'A/3', '#'], [58, 'A#']],
    [['treble', 'A/3', ''], [57, 'A']],
    [['bass', 'B/3', ''], [59, 'B']],
    [['bass', 'B/3', 'b'], [58, 'Bb']],
    [['bass', 'A/3', '#'], [58, 'A#']],
    [['bass', 'A/3', ''], [57, 'A']],
  ]);
