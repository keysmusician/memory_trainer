import { Renderer } from "./Renderer"
import { style } from "../Style"


/**
 * Renders state capital questions.
 */
export const state_capital_text_renderer: Renderer<string> = (props) => {
  return (
    <div>
      <p style={style.group.baseText}>What's the capital of:</p>
      <h2 style={style.group.largeText}>{props.question + "?"}</h2>
    </div>
  )
}
