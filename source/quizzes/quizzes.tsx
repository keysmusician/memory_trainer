import { SmartTrainer } from "../training_algorithms/SmartTrainer"
import { BaseTrainingAlgorithm } from "../training_algorithms/BaseTrainingAlgorithm"
import {
  image_renderer,
  state_capital_text_renderer,
  music_notation_renderer,
  empty_renderer,
} from "../renderers/Renderers.barrel"
import {
  compare_music_notation,
  compare_strings
} from "../evaluators/evaluators"
import {
  country_flags,
  music_notation,
  US_state_capitals,
  empty
} from "../answer_keys/answer_keys.barrel"
import {
  country_fetcher,
  musical_keyboard,
  EnumFetcher,
} from "../user_input_fetchers/user_input_fetchers.barrel"
import { hiragana } from "./japanese/hiragana/quiz"
import { katakana } from "./japanese/katakana/quiz"
import { IQuiz, Quiz, ResponseFetcher, defaultOnResponse } from "../quiz"
import { hebrew } from "./hebrew/quiz"


export const quizzes: IQuiz<any, any, any>[] = [
  new Quiz({
    title: "Country flags",
    answer_key: country_flags,
    evaluator: compare_strings,
    response_fetcher: country_fetcher as ResponseFetcher<string>,
    onResponse: defaultOnResponse,
    renderer: image_renderer,
    training_algorithm: SmartTrainer,
  }),
  new Quiz({
    title: "Music notation",
    answer_key: music_notation,
    evaluator: compare_music_notation,
    response_fetcher: musical_keyboard,
    onResponse: defaultOnResponse,
    renderer: music_notation_renderer,
    training_algorithm: SmartTrainer,
  }),
  new Quiz({
    title: "U.S. State capitals",
    answer_key: US_state_capitals,
    evaluator: compare_strings,
    response_fetcher: (props) => <EnumFetcher<string> {...props} sort />,
    onResponse: defaultOnResponse,
    renderer: state_capital_text_renderer,
    training_algorithm: SmartTrainer,
  }),
  hiragana,
  katakana,
  hebrew,
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
  title: 'Empty',
  answer_key: empty,
  evaluator: () => true,
  response_fetcher: () => '',
  renderer: empty_renderer,
  onResponse: defaultOnResponse,
  training_algorithm: BaseTrainingAlgorithm,
})

export const defaultQuiz = quizzes[0]
