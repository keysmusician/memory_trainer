/**
 * Input evaluator.
 *
 * Determines whether an answer was correct or incorrect.
 *
 * Note: This could later be extended to give a degree of correctness in the
 * range 0–1.
 */

/**
 * Compares two normalized strings.
 */
export function compare_strings(response: string, answer: string): boolean {
    const normalize = (text: string) => text.toLowerCase().replaceAll(' ', '')

    return normalize(response) === normalize(answer)
  }

/**
 * Compares a musical pitch string.
 */
export function compare_music_notation(
  response: string, answer: string
): boolean {
    const normalize = (text: string) => text.toLowerCase().replaceAll(' ', '')

    return normalize(response) === normalize(answer[1])
  }
