import { SmartTrainer } from "../training algorithms/SmartTrainer"
import { BaseTrainingAlgorithm } from "../training algorithms/BaseTrainingAlgorithm"
import {
  state_capital_text_renderer,
  music_notation_renderer,
  empty_renderer,
} from "../renderers/Renderers.barrel"
import {
  compare_music_notation,
  compare_strings
} from "../evaluators/evaluators"
import {
  music_notation,
  US_state_capitals,
  empty
} from "../answer keys/answer_keys.barrel"
import {
  MusicalKeyboard,
  EnumFetcher,
} from "../response fetchers/user input fetchers.barrel"
import { hiragana } from "./japanese/hiragana/quiz"
import { katakana } from "./japanese/katakana/quiz"
import { IQuiz, Quiz, defaultOnResponse } from "../quiz"
import { hebrew } from "./hebrew/quiz"
import { periodic_table } from "./periodic table/quiz"
import { country_flags } from "./country flags/quiz"
import { kanji as kanji_recognition } from "./japanese/kanji/recognition/quiz"
import { kanji as kanji_writing } from "./japanese/kanji/writing/quiz"


export const quizzes: IQuiz<any, any, any>[] = [
  country_flags,
  new Quiz({
    title: "Music notation",
    answer_key: music_notation,
    evaluator: compare_music_notation,
    response_fetcher: MusicalKeyboard,
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
  kanji_recognition,
  kanji_writing,
  hebrew,
  periodic_table
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
