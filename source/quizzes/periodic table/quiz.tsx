import { getRandomPhoto } from "../../backgrounds";
import { QuizBuilder } from "../../quiz";
import { TextRenderer } from "../../renderers/TextRenderer";
import { AutofillEnumFetcher } from "../../response fetchers/autofill enum fetcher";
import { DefaultCoordinator } from "../../TrainingCoordinator";
import { PeriodicTable } from "./answer key";
import { PeriodicTableQuizLayout } from "./layout";


export const periodic_table = new QuizBuilder<
	number,
	PeriodicTable.Element,
	string,
	string
>({
	title: "Periodic table",
	answerKey: PeriodicTable.answerKey,
	coordinator: new DefaultCoordinator({
		evaluator: (response, element) => response === element.name ? 1 : 0,
		feedback: {
			correct: () => "Correct!",
			tryAgain: () => "Try again.",
			fail: () => "Incorrect."
		}
	}),
	renderer: (props) =>
		<TextRenderer
			question={props.question.toString()}
			prompt="Which element has atomic number:"
		/>,
	response_fetcher: (props) =>
		<AutofillEnumFetcher<number>
			{...props}
			possibleResponses={
				new Set(Array.from(PeriodicTable.answerKey.values()).map(element => element.name))
			}
		/>,
	layout: PeriodicTableQuizLayout,
});
