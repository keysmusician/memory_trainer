import { GradingInfo } from "./MemoryTrainer"
import { country_flags } from "./answer_keys/country_flags"
import { SmartTrainer } from "./training_algorithms/SmartTrainer"
import { image_renderer } from "./renderers/ImageRenderer"
import { compare_music_notation, compare_strictly_equal, compare_strings } from "./evaluators/evaluators"
import { Renderer } from "./renderers/Renderer"
import { BaseTrainingAlgorithm } from "./training_algorithms/BaseTrainingAlgorithm"
import { music_notation } from "./answer_keys/music_notation"
import { music_notation_renderer } from "./renderers/MusicNotationRenderer"
import { US_state_capitals } from "./answer_keys/state_capitals"
import { state_capital_text_renderer } from "./renderers/StateCapitalTextRenderer"
import { Mora, hiragana } from "./answer_keys/hiragana"
import { string_fetcher } from "./user_input_fetchers/string_fetcher"
import { mora_fetcher } from "./user_input_fetchers/mora_fetcher"
import { hiragana_renderer } from "./renderers/HiraganaRenderer"
import { empty } from "./answer_keys/empty"
import { Component, Setter } from "solid-js"


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

export interface ResponseFetcherProps<ResponseType=unknown> {
  set_response: Setter<ResponseType>
}

export type ResponseFetcher<ResponseType=unknown> =
  Component<ResponseFetcherProps<ResponseType>>

export interface Quiz<
  QuestionType=unknown,
  AnswerType=unknown,
  ResponseType=unknown
> {
  answer_key: Map<QuestionType, AnswerType>
  evaluate: (response: ResponseType, answer: AnswerType) => any
  response_fetcher: ResponseFetcher<ResponseType>
  name: string
  renderer: Renderer<QuestionType>
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
  response_fetcher: string_fetcher,
  on_grade: build_on_grade,
  renderer: image_renderer,
  training_algorithm: SmartTrainer,
})

export const quizzes: Quiz<any, any, any>[] = [
  validateQuizType({
    name: "Country flags",
    answer_key: country_flags,
    evaluate: compare_strings,
    response_fetcher: string_fetcher,
    on_grade: build_on_grade,
    renderer: image_renderer,
    training_algorithm: SmartTrainer,
  }),
  validateQuizType({
    name: "Music notation",
    answer_key: music_notation,
    evaluate: compare_music_notation,
    response_fetcher: string_fetcher,
    on_grade: build_on_grade,
    renderer: music_notation_renderer,
    training_algorithm: SmartTrainer,
  }),
  validateQuizType({
    name: "U.S. State capitals",
    answer_key: US_state_capitals,
    evaluate: compare_strings,
    response_fetcher: string_fetcher,
    on_grade: build_on_grade,
    renderer: state_capital_text_renderer,
    training_algorithm: SmartTrainer,
  }),
  validateQuizType(
    {
    name: "Hiragana",
    answer_key: hiragana,
    evaluate: compare_strictly_equal<Mora>,
    response_fetcher: mora_fetcher,
    on_grade: build_on_grade,
    renderer: hiragana_renderer,
    training_algorithm: SmartTrainer,
  }),
  // {
  //   name: 'Empty',
  //   answer_key: empty,
  //   evaluate: () => true,
  //   fetch_response: build_fetch_string,
  //   renderer: Renderer,
  //   training_algorithm: BaseTrainingAlgorithm,
  // }
]

export const defaultQuiz = quizzes[0]
