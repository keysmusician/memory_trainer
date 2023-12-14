import { Renderer } from "./Renderer"
import { styleGroup } from "../Style"


/**
 * Renders state capital questions.
 */
export const state_capital_text_renderer: Renderer<string> = (props) => {
  return (
    <div>
      <p style={styleGroup.baseText}>What's the capital of:</p>
      <h2 style={styleGroup.largeText}>{props.question + "?"}</h2>
    </div>
  )
}
