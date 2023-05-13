/**
 * Question renderer base class definition. All question renderers must inherit
 * from this class.
 *
 * Renderers control how questions are visually presented.
 */


/**
 * Base question renderer. All question renderers must inherit from this class.
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
