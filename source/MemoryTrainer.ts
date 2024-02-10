/**
 * This file contains the main class for the memory trainer. It is responsible
 * for connecting all the quiz components together and running the training
 * loop.
 **/
import type { BaseTrainingAlgorithm } from "./training algorithms/BaseTrainingAlgorithm"


export interface GradingInfo<QuestionType = any, AnswerType = any> {
  grade: any
  question: QuestionType
  answer: AnswerType
  regrades: number
  responseCount: number
}

export interface MemoryTrainerInputs<QuestionType, AnswerType> {
  answer_key: Map<QuestionType, AnswerType>
  evaluator: (response: unknown, answer: AnswerType) => any
  fetch_response: () => Promise<unknown>
  on_grade?: (gradingInfo: GradingInfo<QuestionType, AnswerType>) => boolean
  set_question: (question: QuestionType) => void
  training_algorithm: typeof BaseTrainingAlgorithm
}

/**
 * Connects all the quiz components together and defines the training loop.
 */
export class MemoryTrainerApp {
  answers: any[]
  evaluate: (response: any, answer: any) => any
  questions: any[]
  set_question: (question: any) => void
  on_grade: (gradingInfo: GradingInfo) => boolean
  fetch_response: () => any
  trainer: BaseTrainingAlgorithm

  constructor({
    answer_key,
    evaluator,
    fetch_response,
    on_grade: on_grade,
    set_question: set_question,
    training_algorithm,
  }: MemoryTrainerInputs<any, any>) {
    const questions = [...answer_key.keys()]

    const answers = [...answer_key.values()]

    this.questions = questions

    this.answers = answers

    this.trainer = new training_algorithm(questions.length)

    this.on_grade = on_grade || (() => false)

    this.set_question = set_question

    this.fetch_response = fetch_response

    this.evaluate = evaluator
  }

  get answer(): any {
    return this.answers[this.trainer.current_question]
  }

  get question(): any {
    return this.questions[this.trainer.current_question]
  }

  async train(): Promise<void> {
    while (!this.trainer.is_complete) {
      this.set_question(this.question)

      let grade

      {
        let regrade = false

        let regrades = 0
        do {
          let response = await this.fetch_response()

          grade = this.evaluate(response, this.answer)

          regrade = this.on_grade({
            grade: grade,
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
