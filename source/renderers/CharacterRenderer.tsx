import { JSX } from "solid-js"
import { style } from "../Style"
import { Renderer, RendererProps } from "./Renderer"


/**
 * Renders text character questions.
 */
interface CharacterRendererProps extends RendererProps<string> {
	/** The prompt to display above the question. */
	prompt: string
	/** The question to display. */
	question: string
	/** Additional style properties. */
	style?: JSX.CSSProperties
}
export function CharacterRenderer(props: CharacterRendererProps) {
	return (
		<div>
			<p style={{
				...style.group.largeText,
			}}>
				{props.prompt}
			</p>
			<h2 style={{
				...style.group.largeText,
				'font-size': '5em',
				...props.style,
			}}>
				{props.question}
			</h2>
		</div>
	)
}
// CharacterRenderer satisfies Renderer<string>
