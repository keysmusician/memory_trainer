/**
 * Response evaluator.
 *
 * Determines whether an answer was correct or incorrect.
 *
 * Note: This could later be extended to give a degree of correctness in the
 * range 0–1.
 */

import { Evaluator } from "../quiz"


/**
 * Compares two normalized strings.
 */
export const compare_strings: Evaluator = function (
  response: string, answer: string
) {
  const normalize = (text: string) => text.toLowerCase().replaceAll(' ', '')

  return normalize(response) === normalize(answer) ? 1 : 0
}

/**
 * Compares a musical pitch string.
 */
export const compare_music_notation: Evaluator = function (
  response: string, answer: string
) {
  return compare_strings(response, answer)
}

/**
 * Compares two objects for strict equality.
 **/
export function compare_strictly_equal<T = unknown>(
  response: T, answer: T
) {
  return response === answer ? 1 : 0
}
compare_strictly_equal satisfies Evaluator
