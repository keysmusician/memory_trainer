import { BaseRenderer } from "./BaseRenderer"
import { standard_text } from "../screens/Styles.module.css"


/**
 * Renders string-type questions as text.
 */
export class TextRenderer extends BaseRenderer<string> {
    render(question: string) {
      const heading = (
        <p class={standard_text} >What's the capital of:</p>
      )
      const text_element = document.createElement('h2')
      text_element.innerText = question + "?"
      this.rendering_area.replaceChildren(heading, text_element)
    }
  }
