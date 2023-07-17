// Currently doesn't work
/**
 * SolidJS based renderer.
 */
import { BaseRenderer } from "./Renderer"
import { Component, createSignal, Setter } from "solid-js"
import solid_web from "solid-js/web"


/**
 * SolidJS-based question renderer.
 */
export class SolidJSRenderer<QuestionType> extends BaseRenderer<QuestionType> {
    #setQuestion!: Setter<QuestionType | undefined>
    RendererRoot: Component<{question: QuestionType | undefined}> =
      (props) => {return props.question}

    constructor(rendering_area: HTMLElement) {
      super(rendering_area)

      const [question, setQuestion] = createSignal<QuestionType>()
      this.#setQuestion = setQuestion

      solid_web.render(
        () => <this.RendererRoot question={question()} />,
        this.rendering_area
      )
    }

    render(question: QuestionType): void {
      this.#setQuestion((previousQuestion) => question)
    }
  }
