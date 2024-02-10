/**
 * The main associative memory training class. Determines which questions to
 * ask and when by keeping track of correct and incorrect answer.
 *
 * This class doesn't actually know what the questions or answers are, it
 * works with question *indexes*, so wherever you see "question" used in this
 * class, think "question index."
 */
export class BaseTrainingAlgorithm {

    #is_complete: boolean = false

    #current_question: number

    readonly question_count: number

    static complete: 'complete'

    constructor(question_count: number) {

        if (question_count < 1 || question_count % 1) {
        throw ("Question count must be an integer greater than 0.")
        }

        this.question_count = question_count

        this.#current_question = 0
    }

    get current_question(): number {
        if (this.#current_question === null) { this.next_question() }
        return this.#current_question
    }

    get is_complete(): boolean {return this.#is_complete}

    next_question(): number | undefined {
        if ((this.current_question + 1) === this.question_count) {
        this.#is_complete = true

        return undefined
        }

        this.#current_question += 1

        return this.#current_question
    }

    register(score: any): boolean { return true }
}
