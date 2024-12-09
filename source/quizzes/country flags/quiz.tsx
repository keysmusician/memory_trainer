import { compare_strings } from "../../evaluators/evaluators"
import { QuizBuilder } from "../../quiz"
import { image_renderer } from "../../renderers/ImageRenderer"
import { AutofillEnumFetcher } from "../../response fetchers/autofill enum fetcher"
import { country_flags as answer_key } from "./country_flags"


export const country_flags = new QuizBuilder({
	title: "Country flags",
	quiz: answer_key,
	evaluator: compare_strings,
	response_fetcher: (props) => <AutofillEnumFetcher {...props} />,
	renderer: image_renderer,
	backgroundImage: "https://images.unsplash.com/photo-1534201041980-ab6cb6c36cc3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&q=80&w=1600"
})
