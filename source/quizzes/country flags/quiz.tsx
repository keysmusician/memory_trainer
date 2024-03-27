import { compare_strings } from "../../evaluators/evaluators"
import { Quiz, defaultOnResponse } from "../../quiz"
import { image_renderer } from "../../renderers/ImageRenderer"
import { AutofillEnumFetcher } from "../../response fetchers/autofill enum fetcher"
import { country_flags as answer_key } from "./country_flags"


export const country_flags = new Quiz({
	title: "Country flags",
	answer_key: answer_key,
	evaluator: compare_strings,
	response_fetcher: (props) =>
		<AutofillEnumFetcher
			{...props}
			responses={
				Array.from(props.quiz.answer_key.values())
			}
		/>,
	onResponse: defaultOnResponse,
	renderer: image_renderer,
})
