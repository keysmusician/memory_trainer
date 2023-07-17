/**
 * Question renderer type definition. All question renderers must extend this
 * interface.
 *
 * Renderers control how questions are visually presented.
 */
import { JSXElement } from "solid-js";


/**
 * Base question renderer. All question renderers must extend this interface.
 */
export interface Renderer<QuestionType=unknown> {
  (props: {question: QuestionType}): JSXElement;
}

/**
 * Old renderer class. This is deprecated and will be removed in the future.
 */
export class BaseRenderer<QuestionType> {
  readonly rendering_area: HTMLElement;

  constructor(rendering_area: HTMLElement) {
    this.rendering_area = rendering_area;
  }

  render(question: QuestionType): void {
    this.rendering_area.innerText =
      `No renderer implemented for this data: ${question}`
  }
}
