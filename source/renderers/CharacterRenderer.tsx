import { styleGroup } from "../Style"


/**
 * Renders text character questions.
 */
interface ICharacterRendererProps {
	/** The prompt to display above the question. */
	prompt: string
	/** The question to display. */
	question: string
}
export function CharacterRenderer(props) {
	return (
		<div>
			<p style={styleGroup.baseText}>{props.prompt}</p>
			<h2 style={styleGroup.largeText}>{props.question}</h2>
		</div>
	)
}
