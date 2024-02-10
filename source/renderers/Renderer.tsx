/**
 * Question renderer type definition. All question renderers must extend this
 * interface.
 *
 * Renderers control how questions are visually presented.
 */
import { Component } from "solid-js";


export interface RendererProps<QuestionType> {
  question: QuestionType;
  [key: string]: any;
}

/**
 * Base question renderer. All question renderers must extend this interface.
 */
export type Renderer<QuestionType> = Component<RendererProps<QuestionType>>
