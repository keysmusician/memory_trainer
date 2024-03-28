import { Quiz } from "../../quiz";
import { TextRenderer } from "../../renderers/TextRenderer";
import { AutofillEnumFetcher } from "../../response fetchers/autofill enum fetcher";
import { PeriodicTable } from "./answer key";
import { PeriodicTableQuizLayout } from "./layout";


export const periodic_table = new Quiz<number, PeriodicTable.Element, string>({
	title: "Periodic table",
	answer_key: PeriodicTable.answerKey,
	renderer: (props) =>
		<TextRenderer
			question={props.question.toString()}
			prompt="Which element has atomic number:"
		/>,
	evaluator: (response, element) => response === element.name ? 1 : 0,
	response_fetcher: (props) =>
		<AutofillEnumFetcher<number>
			{...props}
			responses={
				new Set(Array.from(PeriodicTable.answerKey.values()).map(element => element.name))
			}
		/>,
	layout: PeriodicTableQuizLayout,
	background_image: `https://source.unsplash.com/1600x900/?chemistry`
});
