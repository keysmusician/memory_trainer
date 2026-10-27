import { katakana as answerKey } from "./katakana";
import { compare_strictly_equal } from "../../../evaluators/evaluators";
import { QuizBuilder } from "../../../quiz";
import { RadialMoraFetcher } from "../../../response fetchers/radial mora fetcher";
import { JapaneseCharacterRenderer } from "../JapaneseCharacterRenderer";
import { Mora } from "../_mora";
import { DefaultCoordinator } from "../../../TrainingCoordinator";
import { DefaultQuizLayoutBuilder } from "../../../defaultQuizLayout";


export const katakana = new QuizBuilder<
  string,
  Mora,
  Mora,
  string
>(
  {
    title: "Katakana",
    answerKey: answerKey,
    coordinator: new DefaultCoordinator({
      evaluator: compare_strictly_equal<Mora>,
      feedback: {
        correct: () => "Correct!",
        tryAgain: () => "Try again.",
        fail: (parameters) => `Incorrect. The correct answer was ${parameters.answer.romanization}.`,
      },
    }),
    layout: DefaultQuizLayoutBuilder<
      string,
      Mora,
      Mora,
      string
    >({
      questionRenderer: JapaneseCharacterRenderer,
      responseFetcher: RadialMoraFetcher,
      feedbackRenderer: (props) => <div>{props.feedback}</div>,
    }),
  })
