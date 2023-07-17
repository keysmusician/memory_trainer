import { Renderer } from "./Renderer"
import { standard_text, large_text } from "../Styles.module.css"


/**
 * Renders state capital questions.
 */
export const state_capital_text_renderer: Renderer<string> = (props) => {
  return (
    <div>
      <p class={standard_text} >What's the capital of:</p>
      <h2 class={large_text}>{props.question + "?"}</h2>
    </div>
  )
}
