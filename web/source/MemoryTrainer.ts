import type { BaseRenderer } from "./renderers/BaseRenderer"
import type { BaseTrainingAlgorithm } from "./training_algorithms/BaseTrainingAlgorithm"

export interface GradingInfo {
  grade: any
  regrades: number
  question: any
  answer: any
}

export interface MemoryTrainerInputs<QuestionType, AnswerType> {
  answer_key: Map<QuestionType, AnswerType>
  evaluate: (response: any, answer: AnswerType) => any
  fetch_response: () => any
  on_grade?: (gradingInfo: GradingInfo) => boolean
  renderer: BaseRenderer<QuestionType>
  training_algorithm: typeof BaseTrainingAlgorithm
}

/**
 * Class which manages I/O for the MemoryTrainer.
 */
export class MemoryTrainerApp {
  answers: any[]
  evaluate: (response: any, answer: any) => any
  questions: any[]
  renderer: BaseRenderer<any>
  on_grade: (gradingInfo: GradingInfo) => boolean
  fetch_response: () => any
  trainer: BaseTrainingAlgorithm

  constructor({
    answer_key,
    evaluate,
    fetch_response,
    on_grade: on_grade,
    renderer,
    training_algorithm,
  }: MemoryTrainerInputs<any, any>) {
    const questions = [...answer_key.keys()]

    const answers = [...answer_key.values()]

    this.questions = questions

    this.answers = answers

    this.trainer = new training_algorithm(questions.length)

    this.on_grade = on_grade || (() => false)

    this.renderer = renderer

    this.fetch_response = fetch_response

    this.evaluate = evaluate
  }

  get answer(): any {
    return this.answers[this.trainer.current_question]
  }

  get question(): any {
    return this.questions[this.trainer.current_question]
  }

  async train(): Promise<void> {
    while (!this.trainer.is_complete) {
      this.renderer.render(this.question)

      let grade

      {
        let regrade = false

        let regrades = 0
        do {
          let response = await this.fetch_response()

          grade = this.evaluate(response, this.answer)

          regrade = this.on_grade({
            grade: grade,
            regrades: regrades,
            question: this.question,
            answer: this.answer,
          })

          regrades++
        } while (regrade);
      }

      this.trainer.register(grade)

      this.trainer.next_question()
    }
  }
}
