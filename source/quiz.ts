import { Component, Setter } from 'solid-js'
// import { Renderer } from './renderers/Renderer'
import { type BaseTrainingAlgorithm } from './training algorithms/BaseTrainingAlgorithm'
import { SmartTrainer } from './training algorithms/SmartTrainer'
import { ICoordinator } from './TrainingCoordinator'


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
export class ClosedUnitIntervalMember extends Number {
	constructor(
		value: number,
		overflowBehavior: 'wrap' | 'clamp' | 'reflect' | 'throw' = 'throw' // TODO: Implement wrap, clamp, and reflect. Document their behavior.
	) {
		if (value < 0 || value > 1) {
			throw new RangeError('The value must be between 0 and 1 (inclusive).')
		}

		super(value)
	}
}

/**
 * A non-negative number. Any number >= 0.
 */
export class NonNegativeNumber extends Number {
	static ONE = new NonNegativeNumber(1)
	static ZERO = new NonNegativeNumber(0)

	constructor(value: number) {
		if (value < 0) {
			throw new RangeError('The value must be greater than or equal to 0.')
		}

		super(value)
	}

	toString(radix?: number): string {
		return super.toString(radix)
	}

	add(value: number): number {
		return (this.valueOf() + value)
	}

	addNonNegative(value: NonNegativeNumber): NonNegativeNumber {
		return new NonNegativeNumber(this.valueOf() + value.valueOf())
	}

	subtract(value: number | NonNegativeNumber): number {
		if (value instanceof NonNegativeNumber) {
			return this.valueOf() - value.valueOf()
		}
		return this.valueOf() - value
	}
}

/**
 * A function which returns a grade for a user's response.
 * The grade is a number between 0 and 1 (inclusive).
 */
export type Evaluator<ResponseType = any, AnswerType = any> = (
	/**
	 * The user's response.
	 */
	response: ResponseType,
	/**
	 * The correct answer.
	 */
	answer: AnswerType
) => ClosedUnitIntervalMember

export interface QuizComponentBaseProps<
	QuestionType = unknown,
	AnswerType = unknown
> {
	quiz: IQuiz<QuestionType, AnswerType>
	answer: AnswerType,
	question: QuestionType,
}

export interface QuizLayoutProps<
	QuestionType = unknown,
	AnswerType = unknown,
	ResponseType = unknown,
	FeedbackType = unknown
> extends QuizComponentBaseProps<QuestionType, AnswerType> {
	question: QuestionType
	setResponse: Setter<ResponseType>
	feedback: FeedbackType

	// questionRenderer: Renderer<QuestionType>,
	// feedbackRenderer: Renderer<FeedbackType>,
	// responseFetcher: ResponseFetcher<QuestionType, AnswerType, ResponseType>,

	/* This mutates throughout the lifecycle of the quiz: */
	// trainingHistory: TrainingHistory<QuestionType, AnswerType, ResponseType>,
}

export type QuizLayout<
	QuestionType,
	AnswerType,
	ResponseType,
	FeedbackType
> = Component<QuizLayoutProps<
	QuestionType,
	AnswerType,
	ResponseType,
	FeedbackType
>>

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
				this[index].grade < (.5 as ClosedUnitIntervalMember)
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
	grade: ClosedUnitIntervalMember
	question: QuestionType
	questionIndex: number
	questionsAskedCount: NonNegativeNumber
	answer: AnswerType
	response: ResponseType
	timeStamp: number
}

export interface ResponseFetcherProps<
	QuestionType = unknown,
	AnswerType = unknown,
	ResponseType = unknown,
> extends QuizComponentBaseProps<QuestionType, AnswerType> {
	setResponse: Setter<ResponseType>
}

export type ResponseFetcher<QuestionType, AnswerType, ResponseType> =
	Component<ResponseFetcherProps<QuestionType, AnswerType, ResponseType>>

type HTTPSURL = `https://${string}`;

export interface IQuizParameters<QuestionType, AnswerType> {
	title?: string
	answerKey: Map<QuestionType, AnswerType>
}

export interface IQuiz<QuestionType, AnswerType>
	extends IQuizParameters<QuestionType, AnswerType> {
	readonly questions: QuestionType[]
	readonly answers: AnswerType[]
}

export class Quiz<QuestionType, AnswerType> implements IQuiz<QuestionType, AnswerType> {
	readonly title?: string
	readonly answerKey: Map<QuestionType, AnswerType>

	get questions(): QuestionType[] {
		return [...this.answerKey.keys()]
	}

	get answers(): AnswerType[] {
		return [...this.answerKey.values()]
	}

	constructor({
		title,
		answerKey: answer_key,
	}: IQuizParameters<QuestionType, AnswerType>) {
		this.title = title
		this.answerKey = answer_key
	}
}

/**
 * A Quiz builder. Use this class to create new quizzes.
 *
 * @readonly title: The display name of the quiz.
 */
export interface IQuizBuilder<
	QuestionType = any,
	AnswerType = any,
	ResponseType = any,
	FeedbackType = any
> {
	readonly title: string
	readonly quiz: IQuiz<QuestionType, AnswerType>
	readonly coordinator: ICoordinator<QuestionType, AnswerType, ResponseType, FeedbackType>
	// readonly evaluator: Evaluator<ResponseType, AnswerType>
	// readonly response_fetcher: ResponseFetcher<QuestionType, AnswerType, ResponseType>
	// readonly renderer: Renderer<QuestionType>
	readonly trainingAlgorithm: BaseTrainingAlgorithm
	readonly layout: QuizLayout<QuestionType, AnswerType, ResponseType, FeedbackType>
	readonly backgroundImage?: HTTPSURL
}1

type Modify<T, R> = Omit<T, keyof R> & R;

type QuizBuilderParameters<QuestionType, AnswerType, ResponseType, FeedbackType> =
	Modify<IQuizBuilder<QuestionType, AnswerType, ResponseType>, {
		trainingAlgorithm?: BaseTrainingAlgorithm
		layout: QuizLayout<QuestionType, AnswerType, ResponseType, FeedbackType>
	}>

export class QuizBuilder< // TODO: Rename. QuizBuilder isn't exactly correct.
	QuestionType = unknown,
	AnswerType = unknown,
	ResponseType = unknown,
	FeedbackType = unknown
> implements IQuizBuilder<
	QuestionType,
	AnswerType,
	ResponseType,
	FeedbackType
> {
	readonly quiz: IQuiz<QuestionType, AnswerType>
	readonly coordinator: ICoordinator<QuestionType, AnswerType, ResponseType, FeedbackType>
	// readonly evaluator: Evaluator<ResponseType, AnswerType>
	// readonly response_fetcher: ResponseFetcher<QuestionType, AnswerType, ResponseType>
	readonly title: string
	// readonly renderer: Renderer<QuestionType>
	readonly trainingAlgorithm: BaseTrainingAlgorithm
	readonly layout: QuizLayout<QuestionType, AnswerType, ResponseType, FeedbackType>
	readonly backgroundImage?: HTTPSURL
	// readonly getTimeLimitSeconds: (question: QuestionType) => NonNegativeNumber

	constructor({
		quiz,
		coordinator,
		// evaluator = compare_strictly_equal<ResponseType | AnswerType>,
		// response_fetcher,
		title,
		// renderer,
		trainingAlgorithm = new SmartTrainer(quiz.answerKey.size),
		layout,
		backgroundImage,
		// getTimeLimitSeconds: getTimeLimit = () => Infinity
	}: QuizBuilderParameters<QuestionType, AnswerType, ResponseType, FeedbackType>) {
		this.quiz = quiz
		this.coordinator = coordinator
		// this.evaluator = evaluator
		// this.response_fetcher = response_fetcher
		this.title = title
		// this.renderer = renderer
		this.trainingAlgorithm = trainingAlgorithm
		this.layout = layout
		this.backgroundImage = backgroundImage
		// this.getTimeLimitSeconds = getTimeLimit
	}
}
