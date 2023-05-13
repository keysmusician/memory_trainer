import { GradingInfo } from "./MemoryTrainer"
import { country_flags } from "./answer_keys/country_flags"
import { SmartTrainer } from "./training_algorithms/SmartTrainer"
import { ImageRenderer } from "./renderers/ImageRenderer"
import { compare_music_notation, compare_strings } from "./evaluators/evaluators"
import { BaseRenderer } from "./renderers/BaseRenderer"
import { BaseTrainingAlgorithm } from "./training_algorithms/BaseTrainingAlgorithm"
import { music_notation } from "./answer_keys/music_notation"
import { MusicNotationRenderer } from "./renderers/MusicNotationRenderer"
import { US_state_capitals } from "./answer_keys/state_capitals"
import { TextRenderer } from "./renderers/TextRenderer"


function build_on_grade(verdict_render_area: HTMLElement) {

  return function on_grade(
    { grade, regrades, answer }: GradingInfo
  ): boolean {
    if (grade) {
      verdict_render_area.innerText = 'Correct!'

      setTimeout(() => verdict_render_area.innerText = '', 1000)

      return false
    }
    else {
      switch (regrades) {
        case 0: {
          verdict_render_area.innerText = 'Try again'
          return true
        }
        case 1: {
          verdict_render_area.innerText = `Hint: ${answer[0]}`
          return true
        }
        default: {
          verdict_render_area.innerText = `The correct answer was: ` +
            `${answer}`

          return false
        }
      }
    }
  }
}

/**
 * String input interpreter.
 */
function build_fetch_response(
  answer_submit_button: HTMLButtonElement,
  user_input_element: HTMLInputElement
) {
  return function fetch_response(): Promise<string> {
    return new Promise((resolve) => {

      const listener = () => {
        answer_submit_button.removeEventListener('click', listener)
        resolve(user_input_element.value.trim())
        user_input_element.value = ''
      }

      answer_submit_button.addEventListener('click', listener)
    })
  }
}

export type Quiz = {
  answer_key: Map<any, any>
  evaluate: (response: any, answer: any) => any
  fetch_response: (
    answer_submit_button: HTMLButtonElement,
    user_input_element: HTMLInputElement
  ) => (() => Promise<any>)
  name: string
  renderer: typeof BaseRenderer<any>
  on_grade?: (verdict_render_area: HTMLElement) => (
    (gradingInfo: GradingInfo) => boolean
  )
  training_algorithm: typeof BaseTrainingAlgorithm
}

export const quizzes: Quiz[] = [
  {
    name: "Country flags",
    answer_key: country_flags,
    evaluate: compare_strings,
    fetch_response: build_fetch_response,
    on_grade: build_on_grade,
    renderer: ImageRenderer,
    training_algorithm: SmartTrainer,
  },
  {
    name: "Music notation",
    answer_key: music_notation,
    evaluate: compare_music_notation,
    fetch_response: build_fetch_response,
    on_grade: build_on_grade,
    renderer: MusicNotationRenderer,
    training_algorithm: SmartTrainer,
  },
  {
    name: "U.S. State capitals",
    answer_key: US_state_capitals,
    evaluate: compare_strings,
    fetch_response: build_fetch_response,
    on_grade: build_on_grade,
    renderer: TextRenderer,
    training_algorithm: SmartTrainer,
  },
  // {
  //   name: 'Empty',
  //   answer_key: empty,
  //   evaluate: () => true,
  //   fetch_response: build_fetch_response,
  //   renderer: BaseRenderer,
  //   training_algorithm: BaseTrainingAlgorithm,
  // }
]

export const defaultQuiz = quizzes[0]
