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
