import { BaseRenderer } from "./BaseRenderer"
import { standard_text, large_text } from "../Styles.module.css"


/**
 * Renders string-type questions as text.
 */
export class TextRenderer extends BaseRenderer<string> {
    render(question: string) {
      const heading =
        <p class={standard_text} >What's the capital of:</p>
      const text_element = <h2 class={large_text}>{question + "?"}</h2>
      this.rendering_area.replaceChildren(heading, text_element)
    }
  }
