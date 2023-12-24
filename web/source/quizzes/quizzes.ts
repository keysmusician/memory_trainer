import { SmartTrainer } from "../training_algorithms/SmartTrainer"
import { BaseTrainingAlgorithm } from "../training_algorithms/BaseTrainingAlgorithm"
import {
  character_renderer,
  image_renderer,
  state_capital_text_renderer,
  music_notation_renderer,
  empty_renderer,
} from "../renderers/Renderers.barrel"
import {
  compare_music_notation,
  compare_strictly_equal,
  compare_strings
} from "../evaluators/evaluators"
import {
  type Mora,
  country_flags,
  katakana,
  music_notation,
  US_state_capitals,
  empty
} from "../answer_keys/answer_keys.barrel"
import {
  mora_fetcher_builder,
  country_fetcher,
  state_capital_fetcher,
  musical_keyboard,
} from "../user_input_fetchers/user_input_fetchers.barrel"
import { hiragana } from "./hiragana/quiz"
import { IQuiz, Quiz, ResponseFetcher, defaultOnResponse } from "../quiz"
import { JapaneseQuizzesLayout } from "./hiragana/layout"


export const quizzes: IQuiz<any, any, any>[] = [
  new Quiz({
    name: "Country flags",
    answer_key: country_flags,
    evaluator: compare_strings,
    response_fetcher: country_fetcher as ResponseFetcher<string>,
    onResponse: defaultOnResponse,
    renderer: image_renderer,
    training_algorithm: SmartTrainer,
  }),
  new Quiz({
    name: "Music notation",
    answer_key: music_notation,
    evaluator: compare_music_notation,
    response_fetcher: musical_keyboard,
    onResponse: defaultOnResponse,
    renderer: music_notation_renderer,
    training_algorithm: SmartTrainer,
  }),
  new Quiz({
    name: "U.S. State capitals",
    answer_key: US_state_capitals,
    evaluator: compare_strings,
    response_fetcher: state_capital_fetcher,
    onResponse: defaultOnResponse,
    renderer: state_capital_text_renderer,
    training_algorithm: SmartTrainer,
  }),
  new Quiz(hiragana),
  new Quiz(
    {
      name: "Katakana",
      answer_key: katakana,
      evaluator: compare_strictly_equal<Mora>,
      response_fetcher: mora_fetcher_builder(katakana),
      onResponse: defaultOnResponse,
      renderer: character_renderer,
      layout: JapaneseQuizzesLayout,
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

export const empty_quiz = new Quiz({
  name: 'Empty',
  answer_key: empty,
  evaluator: () => true,
  response_fetcher: () => '',
  renderer: empty_renderer,
  onResponse: defaultOnResponse,
  training_algorithm: BaseTrainingAlgorithm,
})

export const defaultQuiz = quizzes[0]
