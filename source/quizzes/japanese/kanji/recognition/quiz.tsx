import { QuizBuilder } from "../../../../quiz";
import { CharacterRenderer } from "../../../../renderers/renderers.barrel";
import { AutofillEnumFetcher } from "../../../../response fetchers/autofill enum fetcher";
import { answer_key } from "./answer key";


export const kanji: QuizBuilder<string, string, string> = new QuizBuilder({
	// title: "Kanji Recognition",
	evaluator: (response: string, answer: string) => response === answer ? 1 : 0,
	title: "Kanji",
	quiz: answer_key,
	response_fetcher: AutofillEnumFetcher,
	renderer: (props) => <CharacterRenderer {...props} prompt={"What is the meaning of:"} />,
});
