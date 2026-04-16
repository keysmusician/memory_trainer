import { QuizBuilder } from "../../../../quiz";
import { CharacterRenderer } from "../../../../renderers/renderers.barrel";
import { AutofillEnumFetcher } from "../../../../response fetchers/autofill enum fetcher";
import { DefaultCoordinator } from "../../../../TrainingCoordinator";
import { answer_key } from "./answer key";


export const kanji: QuizBuilder<string, string, string> = new QuizBuilder({
	// title: "Kanji Recognition",
	title: "Kanji",
	answerKey: answer_key,
	coordinator: new DefaultCoordinator({
		evaluator: (response: string, answer: string) => response === answer ? 1 : 0,
		feedback: {
			correct: () => "Correct!",
			tryAgain: () => "Try again.",
			fail: () => "Incorrect.",
		},
	}),
	response_fetcher: AutofillEnumFetcher,
	renderer: (props) => <CharacterRenderer {...props} prompt={"What is the meaning of:"} />,
});
