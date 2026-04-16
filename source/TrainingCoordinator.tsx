import { ClosedUnitIntervalMember, IAnswerKey, NonNegativeNumber } from "./quiz";
import { BaseTrainingAlgorithm } from "./training algorithms/BaseTrainingAlgorithm";
import { SmartTrainer } from "./training algorithms/SmartTrainer";


interface IApplicationUI<ResponseType, FeedbackType> {
	setAnswerKeyIndex(index: number): void
	awaitResponse(): Promise<ResponseType>
	setFeedback(feedback: FeedbackType): void
}

/**
 * A coordinator is responsible for managing the training process.
 * It schedules all training events. It is responsible for determining when to
 * ask questions, when to provide feedback, and when to move on to the next
 * question.
 */
export interface ICoordinator<
	QuestionType, AnswerType, ResponseType, FeedbackType
> {
	/**
	 * The "training loop" or "control loop".
	 * @param trainParameters
	 */
	train(
		trainParameters: TrainParameters<
			QuestionType, AnswerType, ResponseType, FeedbackType
		>
	): Promise<void>
}

interface TrainParameters<
	QuestionType, AnswerType, ResponseType, FeedbackType
> {
	trainingAlgorithm: BaseTrainingAlgorithm
	answerKey: IAnswerKey<QuestionType, AnswerType>
	userInterface: IApplicationUI<ResponseType, FeedbackType>
}

export namespace Default {
	interface FeedbackFunctionParameters<QuestionType, AnswerType, ResponseType> {
		question: QuestionType
		answer: AnswerType
		response: ResponseType
		retryCount: NonNegativeNumber
		retryNumber: NonNegativeNumber
	}
	export type FeedbackFunction<QuestionType, AnswerType, ResponseType, FeedbackType> =
		(parameters: FeedbackFunctionParameters<QuestionType, AnswerType, ResponseType>) => FeedbackType

	interface DefaultCoordinatorParameters<
		QuestionType, AnswerType, ResponseType, FeedbackType
	> {
		retryCount?: NonNegativeNumber
		evaluator: (response: ResponseType, answer: AnswerType) => ClosedUnitIntervalMember
		feedback: {
			correct: FeedbackFunction<QuestionType, AnswerType, ResponseType, FeedbackType>,
			tryAgain: FeedbackFunction<QuestionType, AnswerType, ResponseType, FeedbackType>,
			fail: FeedbackFunction<QuestionType, AnswerType, ResponseType, FeedbackType>,
		}
		TrainingAlgorithmType?: typeof BaseTrainingAlgorithm
	}

	export class Coordinator<
		QuestionType, AnswerType, ResponseType, FeedbackType
	> implements ICoordinator<
		QuestionType, AnswerType, ResponseType, FeedbackType
	> {
		readonly retryCount: NonNegativeNumber
		readonly evaluator: (response: ResponseType, answer: AnswerType) => ClosedUnitIntervalMember
		readonly feedback: {
			correct: FeedbackFunction<QuestionType, AnswerType, ResponseType, FeedbackType>,
			tryAgain: FeedbackFunction<QuestionType, AnswerType, ResponseType, FeedbackType>,
			fail: FeedbackFunction<QuestionType, AnswerType, ResponseType, FeedbackType>,
		}
		readonly TrainingAlgorithmType: typeof BaseTrainingAlgorithm

		/**
		 * @param retryCount The number of times a question can be retried before it is considered failed.
		 */
		constructor({
			evaluator,
			feedback,
			retryCount = new NonNegativeNumber(1),
			TrainingAlgorithmType = SmartTrainer,
		}: DefaultCoordinatorParameters<
			QuestionType, AnswerType, ResponseType, FeedbackType
		>) {
			this.retryCount = retryCount
			this.evaluator = evaluator
			this.feedback = feedback
			this.TrainingAlgorithmType = TrainingAlgorithmType
		}

		public async train({ answerKey, userInterface }:
			TrainParameters<QuestionType, AnswerType, ResponseType, FeedbackType>
		): Promise<void> {
			const trainingAlgorithm = new this.TrainingAlgorithmType(answerKey.size)
			const getQuestion = () => answerKey.questions[trainingAlgorithm.currentQuestion]
			const getAnswer = () => answerKey.answers[trainingAlgorithm.currentQuestion]

			let questionsAskedCount = 0

			while (!trainingAlgorithm.isComplete) {
				userInterface.setAnswerKeyIndex(
					trainingAlgorithm.currentQuestion
				)

				questionsAskedCount++

				let responseCount = NonNegativeNumber.ZERO
				let grade: ClosedUnitIntervalMember | undefined = undefined
				while (responseCount <= this.retryCount) {

					// Wait for the user to respond to the question
					const response = await userInterface.awaitResponse()

					// await new Promise<any>((resolve) =>
					// 	runWithOwner(owner, () => {
					// 		const resolveResponseWhen = createReaction(() => {
					// 			resolve(response())
					// 		})

					// 		// Will execute the reaction one time when the response changes:
					// 		resolveResponseWhen(() => response())
					// 	})
					// )

					responseCount = responseCount.addNonNegative(NonNegativeNumber.ONE)

					// Determine the next action to take (e.g., grade the response, skip the question, etc.)

					grade = this.evaluator(response, getAnswer())

					if (grade !== 0) {
						userInterface.setFeedback(
							this.feedback.correct({
								question: getQuestion(),
								answer: getAnswer(),
								response,
								retryCount: this.retryCount,
								retryNumber: responseCount // TODO: Test this
							})
						)
						break
					} else if (responseCount <= this.retryCount) {
						userInterface.setFeedback(
							this.feedback.tryAgain({
								question: getQuestion(),
								answer: getAnswer(),
								response,
								retryCount: this.retryCount,
								retryNumber: responseCount
							})
						)
					} else {
						userInterface.setFeedback(
							this.feedback.fail({
								question: getQuestion(),
								answer: getAnswer(),
								response,
								retryCount: this.retryCount,
								retryNumber: responseCount
							})
						)
					}
				}

				if (grade !== undefined) {
					trainingAlgorithm.register(grade)
				} else {
					const question = answerKey.questions[trainingAlgorithm.currentQuestion]
					console.warn(`A grade was not determined for question ${questionsAskedCount}: ${JSON.stringify(question)}.`)
				}

				trainingAlgorithm.next_question()
			}
		}
	}
}

export const DefaultCoordinator = Default.Coordinator
