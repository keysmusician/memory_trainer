import { GradingInfo } from "./MemoryTrainer"
import { country_flags } from "./answer_keys/country_flags"
import { SmartTrainer } from "./training_algorithms/SmartTrainer"
import {
  type Renderer,
  image_renderer,
  state_capital_text_renderer,
  music_notation_renderer,
  empty_renderer,
} from "./renderers/Renderers.barrel"
import { compare_music_notation, compare_strictly_equal, compare_strings } from "./evaluators/evaluators"
import { BaseTrainingAlgorithm } from "./training_algorithms/BaseTrainingAlgorithm"
import {
  type Mora,
  hiragana,
  katakana,
  music_notation,
  US_state_capitals,
} from "./answer_keys/answer_keys.barrel"
import { string_fetcher } from "./user_input_fetchers/string_fetcher"
import { mora_fetcher } from "./user_input_fetchers/mora_fetcher"
import { empty } from "./answer_keys/empty"
import { Component, Setter } from "solid-js"
import { country_fetcher } from "./user_input_fetchers/country_fetcher"
import { state_capital_fetcher } from "./user_input_fetchers/state_capital_fetcher"
import { musical_keyboard } from "./user_input_fetchers/musical_keyboard"
import { character_renderer } from "./renderers/CharacterRenderer"


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

export interface ResponseFetcherProps<ResponseType = unknown> {
  set_response: Setter<ResponseType>
  quiz?: Quiz
}

export type ResponseFetcher<ResponseType = unknown> =
  Component<ResponseFetcherProps<ResponseType>>

export interface Quiz<
  QuestionType = unknown,
  AnswerType = unknown,
  ResponseType = unknown
> {
  answer_key: Map<QuestionType, AnswerType>
  evaluator: (response: ResponseType, answer: AnswerType) => any
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
    Parameters<Q['evaluator']>[0]
  >
>(obj: Q) { return obj }

export const quizzes: Quiz<any, any, any>[] = [
  validateQuizType({
    name: "Country flags",
    answer_key: country_flags,
    evaluator: compare_strings,
    response_fetcher: country_fetcher,
    on_grade: build_on_grade,
    renderer: image_renderer,
    training_algorithm: SmartTrainer,
  }),
  validateQuizType({
    name: "Music notation",
    answer_key: music_notation,
    evaluator: compare_music_notation,
    response_fetcher: musical_keyboard,
    on_grade: build_on_grade,
    renderer: music_notation_renderer,
    training_algorithm: SmartTrainer,
  }),
  validateQuizType({
    name: "U.S. State capitals",
    answer_key: US_state_capitals,
    evaluator: compare_strings,
    response_fetcher: state_capital_fetcher,
    on_grade: build_on_grade,
    renderer: state_capital_text_renderer,
    training_algorithm: SmartTrainer,
  }),
  validateQuizType(
    {
      name: "Hiragana",
      answer_key: hiragana,
      evaluator: compare_strictly_equal<Mora>,
      response_fetcher: mora_fetcher,
      on_grade: build_on_grade,
      renderer: character_renderer,
      training_algorithm: SmartTrainer,
    }),
  validateQuizType(
    {
      name: "Katakana",
      answer_key: katakana,
      evaluator: compare_strictly_equal<Mora>,
      response_fetcher: mora_fetcher,
      on_grade: build_on_grade,
      renderer: character_renderer,
      training_algorithm: SmartTrainer,
    }),
  // {
  //   name: 'Empty',
  //   answer_key: empty,
  //   evaluator: () => true,
  //   fetch_response: build_fetch_string,
  //   renderer: Renderer,
  //   training_algorithm: BaseTrainingAlgorithm,
  // }
]

export const empty_quiz: Quiz = {
  name: 'Empty',
  answer_key: empty,
  evaluator: () => true,
  response_fetcher: () => '',
  renderer: empty_renderer,
  training_algorithm: BaseTrainingAlgorithm,
}

export const defaultQuiz = quizzes[0]