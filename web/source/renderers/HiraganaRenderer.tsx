import { HiraganaCharacter } from "../answer_keys/hiragana"
import { Renderer } from "./Renderer"
import { standard_text, enormous_text } from "../Styles.module.css"


/**
 * Renders Hiragana questions.
 */
export const hiragana_renderer: Renderer<HiraganaCharacter> =
function(props) {
  return (
    <div>
      <p class={standard_text} >How do you pronounce:</p>
      <h2 class={enormous_text}>{props.question}</h2>
    </div>
  )
}
