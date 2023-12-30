import { GradingInfo } from './MemoryTrainer'
import { Component, JSXElement, createUniqueId } from 'solid-js'
import { Renderer } from './renderers/Renderer'
import { QuizLayoutProps, DefaultQuizLayout } from './defaultQuizLayout'
import { BaseTrainingAlgorithm } from './training_algorithms/BaseTrainingAlgorithm'
import { SmartTrainer } from './training_algorithms/SmartTrainer'


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

export interface ResponseFetcherProps<ResponseType = unknown> extends QuizLayoutProps {
}

export type ResponseFetcher<ResponseType = unknown> =
	Component<ResponseFetcherProps<ResponseType>>

export interface IQuiz<
	QuestionType = unknown,
	AnswerType = unknown,
	ResponseType = unknown
> {
	answer_key: Map<QuestionType, AnswerType>
	evaluator: (response: ResponseType, answer: AnswerType) => any
	response_fetcher: ResponseFetcher<ResponseType>
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
	answer_key: Map<QuestionType, AnswerType>
	evaluator: (response: ResponseType, answer: AnswerType) => any
	response_fetcher: ResponseFetcher<ResponseType>
	title: string
	renderer: Renderer<QuestionType>
	onResponse: (gradingInfo: GradingInfo<QuestionType, AnswerType>) => boolean
	training_algorithm: typeof BaseTrainingAlgorithm
	layout: any

	constructor({
		answer_key,
		evaluator,
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
