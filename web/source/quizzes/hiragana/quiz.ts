import { Mora } from "../../answer_keys/answer_keys.barrel"
import { compare_strictly_equal } from "../../evaluators/evaluators"
import { Quiz } from "../../quiz"
import { character_renderer } from "../../renderers/Renderers.barrel"
import { SmartTrainer } from "../../training_algorithms/SmartTrainer"
import { mora_fetcher_builder } from "../../user_input_fetchers/user_input_fetchers.barrel"
import { HiraganaCharacter, answer_key } from "./answer key"
import { JapaneseQuizzesLayout } from "./layout"


export const hiragana = new Quiz<HiraganaCharacter, Mora, Mora>({
	name: "Hiragana",
	answer_key: answer_key,
	evaluator: compare_strictly_equal<Mora>,
	response_fetcher: mora_fetcher_builder(answer_key),
	renderer: character_renderer,
	layout: JapaneseQuizzesLayout,
	training_algorithm: SmartTrainer,
})
