import { compare_strings } from "../../evaluators/evaluators";
import { Quiz } from "../../quiz";
import { CharacterRenderer } from "../../renderers/CharacterRenderer";
import { EnumFetcher } from "../../response fetchers/enum fetcher";
import { hebrew as answer_key } from "./answer key";


export const hebrew = new Quiz({
	title: "Hebrew",
	answer_key: answer_key,
	renderer: (props) =>
		<CharacterRenderer {...props}
			prompt={"Which Hebrew character is this?"}
		/>,
	evaluator: compare_strings,
	response_fetcher: EnumFetcher<string>,
});
