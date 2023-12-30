import { BaseTrainingAlgorithm } from "./BaseTrainingAlgorithm"
import { shuffleArray } from "../library/shuffleArray"


type QuestionStats = {
    count: number,
    correct: number,
    streak: number,
    weight: number,
  }

/**
 * A smart training algorithm which tracks which questions were answered
 * incorrectly and selects those questions with a higher probability. It also
 * limits the size of the potential questions which may be asked depending
 * upon how well the test taker is doing.
 */
export class SmartTrainer extends BaseTrainingAlgorithm {

    #current_question: number | null

    #return_collection: number[] = []

    // The number of times each question needs be correctly answered in a row in
    // order to complete training
    #winning_streak = 3

    unasked_questions: number[]

    focus_questions: number[]

    comfortable_questions: number[]

    stats: QuestionStats[]

    constructor(question_count: number) {
      super(question_count)

      const questions = [...Array(question_count).keys()]

      shuffleArray(questions)

      this.unasked_questions = questions

      this.focus_questions = []

      this.comfortable_questions = []

      const stats = {
        count: 0,
        correct: 0,
        streak: 1,
        weight: 1,
      }

      this.stats = questions.map(_ => Object.create(stats))

      this.#current_question = null
    }

    get is_complete(): boolean {
      for (const stat of this.stats) {
        if (stat['streak'] < this.#winning_streak) { return false }
      }

      return true
    }

    get current_question(): number {
      if (this.#current_question === null) { return this.next_question() }
      return this.#current_question
    }

    get focus_stats(): Map<number, QuestionStats> {
      return new Map(this.focus_questions.map(
        question => [question, this.stats[question]])
      )
    }

    #print_stats(): void {
      this.stats.forEach((score, index) => {
        console.log(index, score)
        if (score['count'] > 0) {

          const accuracy = score['count'] > 0 ?
            score['correct'] / score['count'] : 0

          console.log(
            `${index}: ${accuracy * 100}%: ${JSON.stringify(score)}`)
        }
      })

    }

    next_question(): number {
      // this.#print_stats()

      const focus_questions_count = this.focus_questions.length

      // Probability of choosing a focus question (at least 50%):
      const P_focus = focus_questions_count / (focus_questions_count + .5)

      let next_question: number

      if (Math.random() < P_focus || (
        this.unasked_questions.length === 0 &&
        this.comfortable_questions.length === 0
      )
      ) { // If a focus question is randomly chosen or is the only option
        const random_index = Math.floor(
          Math.random() * this.focus_questions.length)

        next_question = this.focus_questions.splice(random_index, 1)[0]

        this.#return_collection.push(this.#current_question)

        this.#return_collection = this.focus_questions
      }
      else if (this.unasked_questions.length > 0) {
        next_question = this.unasked_questions.pop()

        if (this.#current_question !== null) {
          this.#return_collection.push(this.#current_question)
        }

        this.#return_collection = this.unasked_questions
      }
      else {
        const random_index = Math.floor(
          Math.random() * this.comfortable_questions.length)

        next_question = this.comfortable_questions.splice(random_index, 1)[0]

        // Return current item to a collection
        this.#return_collection.push(this.#current_question)

        // Where to return an item to if it's skipped
        this.#return_collection = this.comfortable_questions
      }

      this.stats[next_question]['count'] += 1

      this.#current_question = next_question

      return next_question
    }

    register(is_correct: boolean): boolean {
      const current_item_stats = this.stats[this.current_question]

      this.#return_collection = this.focus_questions

      if (is_correct) {
        current_item_stats['correct'] += 1

        current_item_stats['streak'] += 1

        if (current_item_stats['streak'] >= 2) { // Magic number!
          this.#return_collection = this.comfortable_questions
        }
      }
      else { current_item_stats['streak'] = 0 }

      current_item_stats['weight'] = (
        current_item_stats['streak'] *
        current_item_stats['correct']
      )

      return is_correct
    }
  }
