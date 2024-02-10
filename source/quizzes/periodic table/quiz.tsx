import { Quiz } from "../../quiz";
import { TextRenderer } from "../../renderers/TextRenderer";
import { AutofillEnumFetcher } from "../../user input fetchers/auto-fill enum fetcher";
import { PeriodicTable } from "./answer key";
import { PeriodicTableQuizLayout } from "./quizLayout";


export const periodic_table = new Quiz<number, PeriodicTable.Element, string>({
	title: "Periodic table",
	answer_key: PeriodicTable.answerKey,
	renderer: (props) =>
		<TextRenderer
			question={props.question.toString()}
			prompt="Which element has atomic number:"
		/>,
	evaluator: (response, element) => response === element.name,
	response_fetcher: (props) =>
		<AutofillEnumFetcher
			{...props}
			responses={
				Array.from(PeriodicTable.answerKey.values()).map(element => element.name)
			}
		/>,
	layout: PeriodicTableQuizLayout
});
