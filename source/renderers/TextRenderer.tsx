import { style } from "../Style"
import { Renderer, RendererProps } from "./Renderer"

interface TextRendererProps extends RendererProps<string> {
	prompt: string;
}

/**
 * Renders text questions.
 **/
export const TextRenderer: Renderer<string> = (props: TextRendererProps) => {
	return (
		<div>
			<p style={style.group.baseText}>{props.prompt}</p>
			<h2 style={style.group.largeText}>{props.question}</h2>
		</div>
	)
}
