import { getRandomPhoto } from "../../backgrounds";
import { compare_strings } from "../../evaluators/evaluators";
import { QuizBuilder } from "../../quiz";
import { CharacterRenderer } from "../../renderers/CharacterRenderer";
import { EnumFetcher } from "../../response fetchers/enum fetcher";
import { DefaultCoordinator } from "../../TrainingCoordinator";
import { hebrew as answer_key, HebrewCharacter } from "./answer key";


export const hebrew = new QuizBuilder({
	title: "Hebrew alphabet",
	answerKey: answer_key,
	coordinator: new DefaultCoordinator({
		evaluator: compare_strings,
		feedback: {
			correct: () => "Correct!",
			tryAgain: () => "Try again.",
			fail: () => "Incorrect.",
		},
	}),
	renderer: (props) =>
		<CharacterRenderer {...props}
			prompt={"Which Hebrew character is this?"}
			style={{
				'font-family': '"Noto Serif Hebrew", serif',
				'font-weight': 'bold',
			}}
		/>,
	response_fetcher: EnumFetcher<string, HebrewCharacter, string>,
});
