import { compare_strings } from "../../evaluators/evaluators";
import { Quiz } from "../../quiz";
import { CharacterRenderer } from "../../renderers/CharacterRenderer";
import { EnumFetcher } from "../../response fetchers/enum fetcher";
import { hebrew as answer_key, HebrewCharacter } from "./answer key";


export const hebrew = new Quiz({
	title: "Hebrew alphabet",
	answer_key: answer_key,
	renderer: (props) =>
		<CharacterRenderer {...props}
			prompt={"Which Hebrew character is this?"}
			style={{
				'font-family': '"Noto Serif Hebrew", serif',
				'font-weight': 'bold',
			}}
		/>,
	evaluator: compare_strings,
	response_fetcher: EnumFetcher<string, HebrewCharacter, string>,
	background_image: "https://source.unsplash.com/1600x900/?hebrew",
});
