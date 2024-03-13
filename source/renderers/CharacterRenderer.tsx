import { styleGroup } from "../Style"
import { Renderer } from "./Renderer"


/**
 * Renders text character questions.
 */
interface CharacterRendererProps extends Renderer<string> {
	/** The prompt to display above the question. */
	prompt: string
	/** The question to display. */
	question: string
}
export function CharacterRenderer(props: CharacterRendererProps) {
	return (
		<div>
			<p style={styleGroup.largeText}>{props.prompt}</p>
			<h2 style={{ ...styleGroup.largeText, 'font-size': '5em' }}>{props.question}</h2>
		</div>
	)
}
