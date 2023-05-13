import { BaseRenderer } from "./BaseRenderer"
import { image_renderer } from '../Styles.module.css'
import { image_height } from "../answer_keys/country_flags"


/**
 * Renders URLs to images.
 */
export class ImageRenderer extends BaseRenderer<string> {
  render(question: string): void {
    const image_element = <img src={question} class={image_renderer} height={image_height}/>
    this.rendering_area.replaceChildren(image_element)
  }
}
