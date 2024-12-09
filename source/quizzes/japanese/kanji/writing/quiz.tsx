import { QuizBuilder } from "../../../../quiz";
import { TextRenderer } from "../../../../renderers/TextRenderer";
import { PathCanvas } from '../../../../response fetchers/path canvas';
import { answer_key } from "./answer key";
import { pathsSimilarity } from "./path similarity evaluator";
import { Path } from "../../../../library/path";


export const kanji: QuizBuilder<string, Path[], Path[]> = new QuizBuilder({
	title: "Kanji Writing",
	quiz: answer_key,
	evaluator: pathsSimilarity,
	response_fetcher: PathCanvas,
	renderer: (props) => <TextRenderer {...props} prompt={"Draw the following Kanji:"} />,
});
