import { Renderer } from "./Renderer"
import { styleGroup } from "../Style"


/**
 * Renders text character questions.
 */
export const character_renderer: Renderer<string> = function (props) {
	return (
		<div>
			<p style={styleGroup.baseText}>How do you pronounce:</p>
			<h2 style={styleGroup.largeText}>{props.question}</h2>
		</div>
	)
}
