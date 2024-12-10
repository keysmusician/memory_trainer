/**
 * Response evaluator.
 *
 * Determines whether an answer was correct or incorrect.
 *
 * Note: This could later be extended to give a degree of correctness in the
 * range 0–1.
 */

import { Evaluator, NonNegativeNumber } from "../quiz"


/**
 * Compares two normalized strings.
 */
export const compare_strings: Evaluator<string, string> = function (
  response, answer
) {
  const normalize = (text: string) => text.toLowerCase().replaceAll(' ', '')

  return normalize(response) === normalize(answer) ? 1 : 0
}

/**
 * Compares a musical pitch string.
 */
export const compare_music_notation: Evaluator = (response, answer) =>
  compare_strings(response, answer)

/**
 * Compares two objects for strict equality.
 **/
export function compare_strictly_equal<T>(
  response: T, answer: T
) {
  return response === answer ? 1 : 0
}
compare_strictly_equal satisfies Evaluator<unknown, unknown>

/**
 * Compares two objects for strict equality and compares response time with a
 * time limit.
 **/
export interface TimedResponse<T> {
  response: T
  responseTimeSeconds: NonNegativeNumber
}
export interface TimedAnswer<T> {
  answer: T
  timeLimitSeconds: NonNegativeNumber
}
export function boolTimedCompareStrictlyEqual<T>(
  { response, responseTimeSeconds }: TimedResponse<T>,
  { answer, timeLimitSeconds }: TimedAnswer<T>
) {
  return (response === answer) && (responseTimeSeconds < timeLimitSeconds) ? 1 : 0
}
compare_strictly_equal satisfies Evaluator<unknown, unknown>

// export function floatTimedCompareStrictlyEqual<T>(
//   { response, responseTimeSeconds }: TimedResponse<T>,
//   { answer, timeLimitSeconds }: TimedAnswer<T>
// ) {
//   if (response !== answer) {
//     return 0
//   } else {
//     const secondsPastLimit = responseTimeSeconds.subtract(timeLimitSeconds)
//     return (
//       secondsPastLimit < 0 ?
//         1 :
//         1 / (1 + Math.exp(secondsPastLimit - 5)) // Sigmoid function
//     )
//   }
// }
// compare_strictly_equal satisfies Evaluator<unknown, unknown>

export function floatTimedCompareStrictlyEqual<T>(
  { answer: response, timeLimitSeconds: responseTimeSeconds }: TimedAnswer<T>,
  { answer, timeLimitSeconds }: TimedAnswer<T>
) {
  if (response !== answer) {
    return 0
  } else {
    const secondsPastLimit = responseTimeSeconds.subtract(timeLimitSeconds)
    return (
      secondsPastLimit < 0 ?
        1 :
        1 / (1 + Math.exp(secondsPastLimit - 5)) // Sigmoid function
    )
  }
}
compare_strictly_equal satisfies Evaluator<unknown, unknown>
