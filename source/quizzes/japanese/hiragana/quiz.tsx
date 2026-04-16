import { compare_strictly_equal } from "../../../evaluators/evaluators"
import { QuizBuilder } from "../../../quiz"
import { MoraFetcher } from "../../../response fetchers/user input fetchers.barrel"
import { JapaneseCharacterRenderer } from "../JapaneseCharacterRenderer"
import { HiraganaCharacter, answerKey } from "./answer key"
import { Mora } from "../_mora"
import { DefaultCoordinator } from "../../../TrainingCoordinator"
import { DefaultQuizLayoutBuilder } from "../../../defaultQuizLayout"
import { getRandomPhoto } from "../../../backgrounds"


export const hiragana = new QuizBuilder<HiraganaCharacter, Mora, Mora, string>({
	title: "Hiragana",
	answerKey: answerKey,
	coordinator: new DefaultCoordinator({
		evaluator: compare_strictly_equal<Mora>,
		feedback: {
			correct: () => "Correct!",
			tryAgain: (parameters) => `Hint: ${parameters.answer.consonant.length ? parameters.answer.consonant : parameters.answer.vowel}`,
			fail: (parameters) => `The answer was ${parameters.answer.hiragana}`
		},
	}),
	layout: DefaultQuizLayoutBuilder({
		responseFetcher: MoraFetcher,
		questionRenderer: JapaneseCharacterRenderer,
	}),
})
