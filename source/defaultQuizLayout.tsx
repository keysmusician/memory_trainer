import { For } from "solid-js"
import { QuizLayoutProps, TrainingHistory } from "./quiz"
import { styleGroup } from "./Style"


export function DefaultQuizLayout(props: QuizLayoutProps) {
	return (
		<>
			<TrainingHistoryPanel trainingHistory={props.trainingHistory} />
			<article
				style={{
					'display': "flex",
					'flex-direction': "column",
					'align-items': "center",
				}}
			>
				<DefaultFeedbackRenderer
					answer={props.answer}
					question={props.question}
					trainingHistory={props.trainingHistory}
				/>

				<div>
					<props.quiz.renderer question={props.question} />
				</div>

				<div style={{ margin: "1em" }}>
					<props.quiz.response_fetcher
						answer={props.answer}
						question={props.question}
						quiz={props.quiz}
						trainingHistory={props.trainingHistory}
						setResponse={props.setResponse}
					/>
				</div>
			</article>
		</>

	)
}

type FeedbackFunction<QuestionType, AnswerType, ResponseType> =
	(props: FeedbackRendererProps<QuestionType, AnswerType, ResponseType>) => string

export function feedbackBuilder<QuestionType, AnswerType, ResponseType>(
	correct: FeedbackFunction<QuestionType, AnswerType, ResponseType> =
		(_) => "Correct!",
	hint: FeedbackFunction<QuestionType, AnswerType, ResponseType> =
		(props) => 'Hint: ' + (props.answer as string)[0],
	answer: FeedbackFunction<QuestionType, AnswerType, ResponseType> =
		(props) => `The answer was ${props.trainingHistory.last.answer}`,
) {
	return (props: FeedbackRendererProps<QuestionType, AnswerType, ResponseType>) => {
		console.log(props.trainingHistory.last)
		console.log(props.question)
		console.log(props.answer)
		if (props.trainingHistory.last === undefined) {
			return " "
		} else if (props.trainingHistory.last.grade) {
			return correct(props)
		} else if (
			props.trainingHistory.last.question == props.question
		) {
			return hint(props)
		} else {
			return answer(props)
		}
	}
}


interface FeedbackRendererProps<
	QuestionType = unknown,
	AnswerType = unknown,
	ResponseType = unknown
> {
	answer: AnswerType,
	question: QuestionType,
	trainingHistory: TrainingHistory<QuestionType, AnswerType, ResponseType>
	giveFeedback?: (props: FeedbackRendererProps<QuestionType, AnswerType, ResponseType>) => string
}
export function DefaultFeedbackRenderer<
	QuestionType = unknown,
	AnswerType = unknown,
	ResponseType = unknown
>(props: FeedbackRendererProps<QuestionType, AnswerType, ResponseType>) {

	const feedback = props.giveFeedback ?? feedbackBuilder()

	return (
		<div>
			<div style={styleGroup.baseText}>
				<span>{feedback(props)}</span>
			</div>
		</div>
	)
}

export function TrainingHistoryPanel(props: { trainingHistory: TrainingHistory }) {
	const enabled = true

	if (!enabled) {
		return null
	}

	return (
		<div
			style={{
				"display": "flex",
				"position": "fixed",
				"left": "0",
				"top": "0",
				"width": "20%",
				"height": "100vh",
				"flex-direction": "column",
				"overflow": "auto",
				"padding": "1em",
				"background": "rgba(0, 0, 0, .2)",
				"border-radius": "0 1em 1em 0",
				"box-sizing": "border-box",
			}}
		>
			<For each={Array.from(props.trainingHistory).reverse()} fallback={<div>No history</div>}>
				{(trainingState, index) => (
					<div>
						<p>{props.trainingHistory.length - index()}:</p>
						<div>
							<span>Question: {JSON.stringify(trainingState.question)}</span>
						</div>
						<div>
							<span>Answer: {JSON.stringify(trainingState.answer)}</span>
						</div>
						<div>
							<span>Response: {JSON.stringify(trainingState.response)}</span>
						</div>
						<div>
							<span>Grade: {trainingState.grade ? "pass" : "fail"}</span>
						</div>
					</div>
				)}
			</For>
		</div>
	)
}
