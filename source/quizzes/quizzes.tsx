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
} from "../answer keys/answer keys.barrel"
import {
  MusicalKeyboard,
  EnumFetcher,
} from "../response fetchers/user input fetchers.barrel"
import { hiragana } from "./japanese/hiragana/quiz"
import { katakana } from "./japanese/katakana/quiz"
import { IQuizBuilder, Quiz, QuizBuilder } from "../quiz"
import { hebrew } from "./hebrew/quiz"
import { periodic_table } from "./periodic table/quiz"
import { country_flags } from "./country flags/quiz"
import { kanji as kanji_recognition } from "./japanese/kanji/recognition/quiz"
import { japanese_vocabulary, english_to_japanese_vocabulary } from "./japanese/vocabulary/quiz"
import { DefaultCoordinator } from "../TrainingCoordinator"


export const quizzes: IQuizBuilder<any, any, any, any>[] = [
  // country_flags,
  // new QuizBuilder({
  //   title: "Music notation",
  //   quiz: music_notation,
  //   evaluator: compare_music_notation,
  //   response_fetcher: MusicalKeyboard,
  //   onResponse: defaultOnResponse,
  //   renderer: music_notation_renderer,
  //   trainingAlgorithm: SmartTrainer,
  // }),
  // new QuizBuilder({
  //   title: "U.S. state capitals",
  //   quiz: US_state_capitals,
  //   evaluator: compare_strings,
  //   response_fetcher: (props) => <EnumFetcher<string, string, string> {...props} sort />,
  //   onResponse: defaultOnResponse,
  //   renderer: state_capital_text_renderer,
  //   trainingAlgorithm: SmartTrainer,
  // }),
  hiragana,
  // katakana,
  // kanji_recognition,
  // // kanji_writing,
  japanese_vocabulary,
  english_to_japanese_vocabulary,
  // hebrew,
  // periodic_table,
  // empty_quiz = new QuizBuilder({
  //   title: 'Empty',
  //   answer_key: empty,
  //   evaluator: () => 1,
  //   response_fetcher: () => '',
  //   renderer: empty_renderer,
  //   training_algorithm: BaseTrainingAlgorithm,
  // })
]

export const empty_quiz = new QuizBuilder({
  title: 'Empty',
  quiz: new Quiz({ answerKey: empty }),
  coordinator: new DefaultCoordinator({
    evaluator: () => 1,
    feedback: {
      correct: () => '',
      tryAgain: () => '',
      fail: () => '',
    },
    TrainingAlgorithmType: BaseTrainingAlgorithm,
  }),
  layout: () => <>Empty</>,
})

export const defaultQuiz = quizzes[0]
