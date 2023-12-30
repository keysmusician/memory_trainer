import { Mora } from "../../../answer_keys/_mora";
import { katakana as answerKey } from "../../../answer_keys/katakana";
import { compare_strictly_equal } from "../../../evaluators/evaluators";
import { Quiz, defaultOnResponse } from "../../../quiz";
import { SmartTrainer } from "../../../training_algorithms/SmartTrainer";
import { mora_fetcher_builder } from "../../../user_input_fetchers/mora_fetcher";
import { JapaneseCharacterRenderer } from "../JapaneseCharacterRenderer";
import { JapaneseQuizzesLayout } from "../hiragana/layout";


export const katakana = new Quiz(
  {
    title: "Katakana",
    answer_key: answerKey,
    evaluator: compare_strictly_equal<Mora>,
    response_fetcher: mora_fetcher_builder(answerKey),
    onResponse: defaultOnResponse,
    renderer: JapaneseCharacterRenderer,
    layout: JapaneseQuizzesLayout,
    training_algorithm: SmartTrainer,
  })
