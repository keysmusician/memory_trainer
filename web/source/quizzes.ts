import { GradingInfo } from "./MemoryTrainer"
import { country_flags } from "./answer_keys/country_flags"
import { SmartTrainer } from "./training_algorithms/SmartTrainer"
import { ImageRenderer } from "./renderers/ImageRenderer"
import { compare_music_notation, compare_strictly_equal, compare_strings } from "./evaluators/evaluators"
import { BaseRenderer } from "./renderers/BaseRenderer"
import { BaseTrainingAlgorithm } from "./training_algorithms/BaseTrainingAlgorithm"
import { music_notation } from "./answer_keys/music_notation"
import { MusicNotationRenderer } from "./renderers/MusicNotationRenderer"
import { US_state_capitals } from "./answer_keys/state_capitals"
import { StateCapitalTextRenderer } from "./renderers/StateCapitalTextRenderer"
import { Mora, hiragana } from "./answer_keys/hiragana"
import { build_fetch_string } from "./user_input_fetchers/string_fetcher"
import { build_fetch_mora } from "./user_input_fetchers/mora_fetcher"
import { HiraganaRenderer } from "./renderers/HiraganaRenderer"


function build_on_grade(verdict_render_area: HTMLElement) {

  return function on_grade(
    { grade, regrades, answer }: GradingInfo
  ): boolean {
    if (grade) {
      verdict_render_area.innerText = 'Correct!'

      return false
    }
    else {
      switch (regrades) {
        case 0: {
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

export interface Quiz<QuestionType=any, AnswerType=any, ResponseType=any> {
  answer_key: Map<QuestionType, AnswerType>
  evaluate: (response: ResponseType, answer: AnswerType) => any
  fetch_response: (
    answer_submit_button: HTMLButtonElement,
    user_input_element: HTMLInputElement
  ) => (() => Promise<ResponseType>)
  name: string
  renderer: typeof BaseRenderer<QuestionType>
  on_grade?: (verdict_render_area: HTMLElement) => (
    (gradingInfo: GradingInfo<QuestionType, AnswerType>) => boolean
  )
  training_algorithm: typeof BaseTrainingAlgorithm
}

type MapKeyType<T> = T extends Map<infer K, any> ? K : never

type MapValueType<T> = T extends Map<any, infer V> ? V : never

function validateQuizType<
  Q extends Quiz<
    MapKeyType<Q['answer_key']>,
    MapValueType<Q['answer_key']>,
    Parameters<Q['evaluate']>[0]
  >
>(obj: Q) {return obj}

const obj: Quiz = validateQuizType({
  name: "Country flags",
  answer_key: country_flags,
  evaluate: compare_strings,
  fetch_response: build_fetch_string,
  on_grade: build_on_grade,
  renderer: ImageRenderer,
  training_algorithm: SmartTrainer,
})

export const quizzes: Quiz[] = [
  validateQuizType({
    name: "Country flags",
    answer_key: country_flags,
    evaluate: compare_strings,
    fetch_response: build_fetch_string,
    on_grade: build_on_grade,
    renderer: ImageRenderer,
    training_algorithm: SmartTrainer,
  }),
  validateQuizType({
    name: "Music notation",
    answer_key: music_notation,
    evaluate: compare_music_notation,
    fetch_response: build_fetch_string,
    on_grade: build_on_grade,
    renderer: MusicNotationRenderer,
    training_algorithm: SmartTrainer,
  }),
  validateQuizType({
    name: "U.S. State capitals",
    answer_key: US_state_capitals,
    evaluate: compare_strings,
    fetch_response: build_fetch_string,
    on_grade: build_on_grade,
    renderer: StateCapitalTextRenderer,
    training_algorithm: SmartTrainer,
  }),
  validateQuizType({
    name: "Hiragana",
    answer_key: hiragana,
    evaluate: compare_strictly_equal<Mora>,
    fetch_response: build_fetch_mora,
    on_grade: build_on_grade,
    renderer: HiraganaRenderer,
    training_algorithm: SmartTrainer,
  }),
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
