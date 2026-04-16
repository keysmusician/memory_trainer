import { katakana as answerKey } from "./katakana";
import { compare_strictly_equal } from "../../../evaluators/evaluators";
import { QuizBuilder } from "../../../quiz";
import { MoraFetcher } from "../../../response fetchers/mora fetcher";
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
        fail: () => "Incorrect.",
      },
    }),
    layout: DefaultQuizLayoutBuilder<
      string,
      Mora,
      Mora,
      string
    >({
      responseFetcher: MoraFetcher,
      questionRenderer: JapaneseCharacterRenderer,
      feedbackRenderer: (props) => <div>{props.}</div>,
    }),
  })
