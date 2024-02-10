import { GradingInfo } from './MemoryTrainer'
import { Component, JSXElement } from 'solid-js'
import { Renderer } from './renderers/Renderer'
import { QuizLayoutProps, DefaultQuizLayout } from './defaultQuizLayout'
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


export function defaultOnResponse({ grade, regrades }: GradingInfo): boolean {
	return grade || regrades == 1
}

export interface ResponseFetcherProps<
	ResponseType,
	QuestionType = unknown,
	AnswerType = unknown
> extends QuizLayoutProps<QuestionType, AnswerType, ResponseType> {
}

export type ResponseFetcher<QuestionType, AnswerType, ResponseType> =
	Component<ResponseFetcherProps<ResponseType, QuestionType, AnswerType>>

export interface IQuiz<
	QuestionType = unknown,
	AnswerType = unknown,
	ResponseType = unknown
> {
	answer_key: Map<QuestionType, AnswerType>
	evaluator: (response: ResponseType, answer: AnswerType) => any
	response_fetcher: ResponseFetcher<QuestionType, AnswerType, ResponseType>
	title: string
	renderer: Renderer<QuestionType>
	onResponse: (gradingInfo: GradingInfo<QuestionType, AnswerType>) => boolean
	training_algorithm: typeof BaseTrainingAlgorithm
	layout: (props: QuizLayoutProps) => JSXElement
}

type Modify<T, R> = Omit<T, keyof R> & R;

type QuizParameters<QuestionType, AnswerType, ResponseType> =
	Modify<IQuiz<QuestionType, AnswerType, ResponseType>, {
		onResponse?: (gradingInfo: GradingInfo<QuestionType, AnswerType>) => boolean
		training_algorithm?: typeof BaseTrainingAlgorithm
		layout?: (props: QuizLayoutProps) => JSXElement
	}>

export class Quiz<QuestionType, AnswerType, ResponseType> implements IQuiz<QuestionType, AnswerType, ResponseType> {
	readonly answer_key: Map<QuestionType, AnswerType>
	readonly evaluator: (response: ResponseType, answer: AnswerType) => any
	readonly response_fetcher: ResponseFetcher<QuestionType, AnswerType, ResponseType>
	readonly title: string
	readonly renderer: Renderer<QuestionType>
	readonly onResponse: (gradingInfo: GradingInfo<QuestionType, AnswerType>) => boolean
	readonly training_algorithm: typeof BaseTrainingAlgorithm
	readonly layout: any

	constructor({
		answer_key,
		evaluator = compare_strictly_equal<ResponseType>,
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
