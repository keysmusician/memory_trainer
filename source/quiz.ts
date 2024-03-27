import { Component, JSXElement, Setter } from 'solid-js'
import { Renderer } from './renderers/Renderer'
import { DefaultQuizLayout } from './DefaultQuizLayout'
import { BaseTrainingAlgorithm } from './training algorithms/BaseTrainingAlgorithm'
import { SmartTrainer } from './training algorithms/SmartTrainer'
import { compare_strictly_equal } from './evaluators/evaluators'


// export interface Quiz extends SerializedQuiz {
// 	id: string
// 	unselected_answer_key: Map<string, string>
// }

// export class Quiz implements Quiz {
// 	id: string
// 	unselected_answer_key: Map<string, string>

// 	constructor(quiz: SerializedQuiz) {
// 		Object.assign(this, quiz)
// 		this.id = createUniqueId()
// 		this.unselected_answer_key = new Map()
// 	}
// }

/**
 * A number between 0 and 1 (inclusive).
 */
export class ClosedUnitIntervalElement extends Number {
	constructor(value: number) {
		if (value < 0 || value > 1) {
			throw new RangeError('The value must be between 0 and 1 (inclusive).')
		}

		super(value)
	}
}

export type Evaluator<ResponseType = any, AnswerType = any> =
	(response: ResponseType, answer: AnswerType) => ClosedUnitIntervalElement

export interface QuizLayoutProps<
	QuestionType = unknown,
	AnswerType = unknown,
	ResponseType = unknown
> {
	quiz: IQuiz<QuestionType, AnswerType, ResponseType>
	answer: AnswerType,
	question: QuestionType,
	/* This changes throughout the lifecycle of the quiz: */
	trainingHistory: TrainingHistory<QuestionType, AnswerType, ResponseType>,
	setResponse: Setter<ResponseType>
}

export class TrainingHistory<
	QuestionType = any,
	AnswerType = any,
	ResponseType = any
> extends Array<TrainingState<QuestionType, AnswerType, ResponseType>> {

	constructor(...args: TrainingState<QuestionType, AnswerType, ResponseType>[]) {
		super(...args)
	}

	/**
	 * The most recent training state (question, answer, response, and grade).
	 */
	get last(): TrainingState<QuestionType, AnswerType, ResponseType> {
		return this[this.length - 1]
	}

	/**
	 * The number of times the user has attempted the most recent question.
	 */
	get retries() {
		if (!this.last) {
			return 0
		}

		var retries = 0

		for (let index = this.length - 1; index >= 0; index--) {
			if (
				this[index].question === this.last.question &&
				this[index].grade < (.5 as ClosedUnitIntervalElement)
			) {
				retries++
			} else {
				break
			}
		}

		return retries
	}
}

export type TrainingState<QuestionType, AnswerType, ResponseType> = {
	grade: ClosedUnitIntervalElement
	question: QuestionType
	questionIndex: number
	questionsAskedCount: number
	answer: AnswerType
	response: ResponseType
	responseTime: number
}

export function defaultOnResponse(trainingHistory: TrainingHistory): boolean {
	return (
		trainingHistory.last.grade >= (.5 as ClosedUnitIntervalElement) ||
		trainingHistory.retries > 1
	)
}

export interface ResponseFetcherProps<
	ResponseType,
	QuestionType = unknown,
	AnswerType = unknown
> extends QuizLayoutProps<QuestionType, AnswerType, ResponseType> {
}

export type ResponseFetcher<QuestionType, AnswerType, ResponseType> =
	Component<ResponseFetcherProps<ResponseType, QuestionType, AnswerType>>

type HTTPSURL = `https://${string}`;

export interface IQuiz<
	QuestionType = any,
	AnswerType = any,
	ResponseType = any
> {
	answer_key: Map<QuestionType, AnswerType>
	evaluator: Evaluator<ResponseType, AnswerType>
	response_fetcher: ResponseFetcher<QuestionType, AnswerType, ResponseType>
	title: string
	renderer: Renderer<QuestionType>
	onResponse: (trainingHistory: TrainingHistory<QuestionType, AnswerType, ResponseType>) => boolean
	training_algorithm: typeof BaseTrainingAlgorithm
	layout: (props: QuizLayoutProps) => JSXElement
	background_image?: HTTPSURL
}

type Modify<T, R> = Omit<T, keyof R> & R;

type QuizParameters<QuestionType, AnswerType, ResponseType> =
	Modify<IQuiz<QuestionType, AnswerType, ResponseType>, {
		onResponse?: (trainingHistory: TrainingHistory<QuestionType, AnswerType, ResponseType>) => boolean
		training_algorithm?: typeof BaseTrainingAlgorithm
		layout?: (props: QuizLayoutProps) => JSXElement
	}>

export class Quiz<QuestionType = unknown, AnswerType = unknown, ResponseType = unknown>
	implements IQuiz<QuestionType, AnswerType, ResponseType> {
	readonly answer_key: Map<QuestionType, AnswerType>
	readonly evaluator: Evaluator<ResponseType, AnswerType>
	readonly response_fetcher: ResponseFetcher<QuestionType, AnswerType, ResponseType>
	readonly title: string
	readonly renderer: Renderer<QuestionType>
	readonly onResponse: (trainingHistory: TrainingHistory<QuestionType, AnswerType, ResponseType>) => boolean
	readonly training_algorithm: typeof BaseTrainingAlgorithm
	readonly layout: any

	constructor({
		answer_key,
		evaluator = compare_strictly_equal<ResponseType | AnswerType>,
		response_fetcher,
		title,
		renderer,
		onResponse = defaultOnResponse,
		training_algorithm = SmartTrainer,
		layout = DefaultQuizLayout,
	}: QuizParameters<QuestionType, AnswerType, ResponseType>) {
		this.answer_key = answer_key
		this.evaluator = evaluator
		this.response_fetcher = response_fetcher
		this.title = title
		this.renderer = renderer
		this.onResponse = onResponse
		this.training_algorithm = training_algorithm
		this.layout = layout
	}
}
