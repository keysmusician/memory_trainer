import { styleGroup } from "../Style"
import { Renderer } from "./Renderer"


/**
 * Renders text character questions.
 */
interface CharacterRendererProps extends Renderer {
	/** The prompt to display above the question. */
	prompt: string
	/** The question to display. */
	question: string
}
export function CharacterRenderer(props: CharacterRendererProps) {
	return (
		<div>
			<p style={styleGroup.baseText}>{props.prompt}</p>
			<h2 style={styleGroup.largeText}>{props.question}</h2>
		</div>
	)
}
