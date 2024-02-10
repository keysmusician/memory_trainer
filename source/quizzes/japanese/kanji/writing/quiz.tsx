import { Quiz } from "../../../../quiz";
import { TextRenderer } from "../../../../renderers/TextRenderer";
import { Canvas } from "../../../../user input fetchers/simple raster drawing fetcher";
import { answer_key } from "./answer key";
import { binaryGridSimilarity } from "./drawing similarity evaluator";


export const kanji: Quiz<string, Uint8ClampedArray, Uint8ClampedArray> = new Quiz({
	title: "Kanji Writing",
	answer_key: answer_key,
	evaluator: binaryGridSimilarity,
	response_fetcher: Canvas,
	renderer: (props) => <TextRenderer {...props} prompt={"Draw the following Kanji:"} />,
});
