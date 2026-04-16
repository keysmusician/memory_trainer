import { QuizBuilder } from "../../../../quiz";
import { TextRenderer } from "../../../../renderers/TextRenderer";
import { PathCanvas } from '../../../../response fetchers/path canvas';
import { answer_key } from "./answer key";
import { pathsSimilarity } from "./path similarity evaluator";
import { Path } from "../../../../library/path";
import { DefaultCoordinator } from "../../../../TrainingCoordinator";


export const kanji: QuizBuilder<string, Path[], Path[]> = new QuizBuilder({
	title: "Kanji Writing",
	answerKey: answer_key,
	coordinator: new DefaultCoordinator({
		evaluator: pathsSimilarity,
		feedback: {
			correct: () => "Correct!",
			tryAgain: () => "Try again.",
			fail: () => "Incorrect.",
		},
	}),
	response_fetcher: PathCanvas,
	renderer: (props) => <TextRenderer {...props} prompt={"Draw the following Kanji:"} />,
});
