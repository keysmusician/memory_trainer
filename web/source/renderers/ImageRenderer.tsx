import { BaseRenderer } from "./BaseRenderer"

/**
 * Renders URLs to images.
 */
export class ImageRenderer extends BaseRenderer<string> {
  render(question: string): void {
    const image_element = document.createElement('img')
    image_element.setAttribute('src', question)
    image_element.setAttribute('style', 'box-shadow: 0px 2px 10px black;')
    this.rendering_area.replaceChildren(image_element)
  }
}
