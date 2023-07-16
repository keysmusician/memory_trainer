import { HiraganaCharacter } from "../answer_keys/hiragana"
import { BaseRenderer } from "./BaseRenderer"
import { standard_text, large_text } from "../Styles.module.css"


/**
 * Renders Hiragana questions.
 */
export class HiraganaRenderer extends BaseRenderer<string> {
    render(question: HiraganaCharacter) {
      const heading =
        <p class={standard_text} >What's the mora of:</p>
      const text_element = <h2 class={large_text}>{question + "?"}</h2>
      this.rendering_area.replaceChildren(heading, text_element)
    }
  }
