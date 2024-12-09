import { Mora } from "../../../answer keys/answer keys.barrel"
import { compare_strictly_equal } from "../../../evaluators/evaluators"
import { QuizBuilder } from "../../../quiz"
import { SmartTrainer } from "../../../training algorithms/SmartTrainer"
import { mora_fetcher_builder } from "../../../response fetchers/user input fetchers.barrel"
import { JapaneseCharacterRenderer } from "../JapaneseCharacterRenderer"
import { HiraganaCharacter, answer_key } from "./answer key"
import { JapaneseQuizzesLayout } from "../layout"


export const hiragana = new QuizBuilder<HiraganaCharacter, Mora, Mora>({
	title: "Hiragana",
	quiz: answer_key,
	evaluator: compare_strictly_equal<Mora>,
	response_fetcher: mora_fetcher_builder(answer_key),
	renderer: JapaneseCharacterRenderer,
	layout: JapaneseQuizzesLayout,
	trainingAlgorithm: SmartTrainer,
})
