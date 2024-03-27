import { katakana as answerKey } from "./katakana";
import { compare_strictly_equal } from "../../../evaluators/evaluators";
import { Quiz, defaultOnResponse } from "../../../quiz";
import { SmartTrainer } from "../../../training algorithms/SmartTrainer";
import { mora_fetcher_builder } from "../../../response fetchers/mora fetcher";
import { JapaneseCharacterRenderer } from "../JapaneseCharacterRenderer";
import { JapaneseQuizzesLayout } from "../layout";
import { Mora } from "../_mora";


export const katakana = new Quiz<string, Mora, Mora>(
  {
    title: "Katakana",
    answer_key: answerKey,
    renderer: JapaneseCharacterRenderer,
    response_fetcher: mora_fetcher_builder(answerKey),
    evaluator: compare_strictly_equal<Mora>,
    onResponse: defaultOnResponse,
    layout: JapaneseQuizzesLayout,
    training_algorithm: SmartTrainer,
  })
