import { Quiz } from "../../../../quiz";
import { CharacterRenderer } from "../../../../renderers/Renderers.barrel";
import { AutofillEnumFetcher } from "../../../../user input fetchers/auto-fill enum fetcher";
import { Kanji, answer_key } from "./answer key";


export const kanji: Quiz<Kanji, string, string> = new Quiz({
	title: "Kanji Recognition",
	answer_key: answer_key,
	response_fetcher: AutofillEnumFetcher,
	renderer: (props) => <CharacterRenderer {...props} prompt={"What is the meaning of:"} />,
});
