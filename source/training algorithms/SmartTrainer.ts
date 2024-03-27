import { BaseTrainingAlgorithm } from "./BaseTrainingAlgorithm"
import { shuffleArray } from "../library/library.barrel"


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

  // get comfortable_stats(): Map<number, QuestionStats> {
  //   return new Map(this.comfortable_questions.map(
  //     question => [question, this.stats[question]])
  //   )
  // }

  #print_stats(): void {
    console.log(this.stats)
    // this.stats.forEach((score, index) => {
    //   console.log(index, score)
    //   if (score['count'] > 0) {

    //     const accuracy = score['count'] > 0 ?
    //       score['correct'] / score['count'] : 0

    //     console.log(
    //       `${index}: ${accuracy * 100}%: ${JSON.stringify(score)}`)
    //   }
    // })
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
    else { // If a comfortable question is randomly chosen or there are no focus or unasked questions
      // console.log('comfortable_questions', this.comfortable_questions)

      this.comfortable_questions.sort((a, b) => a - b)

      const weights = this.comfortable_questions.map((question_number) =>
        this.stats[question_number]['weight'])

      const weighted_random_index = this.random_inversely_weighted_index(weights)
      // const weighted_random_index = Math.floor(
      //   Math.random() * this.comfortable_questions.length)

      next_question = this.comfortable_questions.splice(weighted_random_index, 1)[0]

      // console.log('next_question', next_question)

      // Return current item to a collection
      this.#return_collection.push(this.#current_question)

      // Where to return an item to if it's skipped
      this.#return_collection = this.comfortable_questions
    }

    this.stats[next_question]['count'] += 1

    this.#current_question = next_question

    return next_question
  }

  register(score: number): boolean {
    const current_item_stats = this.stats[this.current_question]

    this.#return_collection = this.focus_questions

    if (score) {
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

    return score === 1
  }

  random_inversely_weighted_index(weights: number[]): number {
    if (weights.length === 0) {
      throw new Error('Weights must not be empty')
    }

    const sensitivity = 64

    const sum = weights.reduce((a, b) => a + b)

    const scaled_weights = weights.map(weight => Math.pow(sum - weight, sensitivity))

    const scaled_sum = scaled_weights.reduce((a, b) => a + b)

    const inverse_weights = scaled_weights.map(weight => weight / scaled_sum)

    var cdf = inverse_weights.map((sum => value => sum += value)(0))

    var randomFraction = Math.random() * cdf[cdf.length - 1] // Random number between 0 and the sum of all weights, which should be 1 but might not be due to floating point error

    const index = cdf.findIndex(bin => randomFraction <= bin)

    // console.log('inverse_weights', inverse_weights)

    // console.log('cdf', cdf)

    // console.log('randomFraction', randomFraction)

    // console.log('index', index)

    return index === -1 ? cdf.length - 1 : index
  }
}
