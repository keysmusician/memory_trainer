import { For, createEffect, createSignal } from "solid-js"
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
	const [visible, setVisible] = createSignal(false)

	var panelRef: HTMLDivElement | undefined

	createEffect(() => {
		if (visible()) {
			panelRef?.animate([
				{ transform: "translateX(-100%)" },
				{ transform: "translateX(0)" },
			], {
				duration: 200,
				easing: "ease-in-out",
				fill: "both",
			})
		} else {
			panelRef?.animate([
				{ transform: "translateX(0)" },
				{ transform: "translateX(-100%)" },
			], {
				duration: 200,
				easing: "ease-in-out",
				fill: "both",
			})
		}
	})

	const backgroundColor = "rgba(0, 0, 0, .2)"

	const trStyle = {
		'border-bottom': '1px solid black',
	}

	// const localStyle = document.createElement('style')
	// localStyle.appendChild(document.createTextNode(
	// 	`button:hover{ background-color: #00ff00 }`
	// ))
	// document.getElementsByTagName('head')[0].appendChild(localStyle);

	return (
		<section
			ref={panelRef}
			style={{
				'position': 'fixed',
				'left': '0',
				'top': '0',
				"width": "20%",
				'height': '100vh',
			}}
		>
			<span
				style={{
					'display': "flex",
					'flex-direction': "column",
					'gap': "2em",
					'overflow': "auto",
					'padding': "1em",
					'background': backgroundColor,
					'border-radius': "0 0 1em 0",
					'box-sizing': "border-box",
					'height': "100%",
				}}
			>
				<For each={Array.from(props.trainingHistory).reverse()} fallback={<div>No history</div>}>
					{(trainingState, index) => (
						<table style={{
							...trStyle,
							'border-collapse': 'collapse',
							'width': '100%',
							'vertical-align': 'top',
						}}
						>
							<thead>
								<tr style={trStyle}>
									<th colSpan={2}>
										{props.trainingHistory.length - index()}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr style={trStyle}>
									<td>Question</td>
									<td>{JSON.stringify(trainingState.question)}</td>
								</tr>
								<tr style={trStyle}>
									<td>Answer</td>
									<td>{JSON.stringify(trainingState.answer)}</td>
								</tr>
								<tr style={trStyle}>
									<td>Response</td>
									<td>{JSON.stringify(trainingState.response)}</td>
								</tr>
								<tr style={trStyle}>
									<td>Response Time</td>
									<td>{trainingState.responseTime / 1000} s</td>
								</tr>
								<tr style={trStyle}>
									<td>Grade</td>
									<td>{trainingState.grade ? "pass" : "fail"}</td>
								</tr>
							</tbody>
						</table>
					)}
				</For>
			</span>

			{/* Show/hide clickable tab */}
			<button
				onClick={() => setVisible(!visible())}
				style={{
					'position': 'absolute',
					'left': '100%',
					'top': '0',
					'background-color': backgroundColor,
					'border-radius': '0 1em 1em 0',
					'border': 'none',
					'box-sizing': 'border-box',
					'height': '2em',
					'width': "2em",
					'--test': 'test'
				}}
				title="Show/hide training history."
				onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, .4)"}
				onMouseLeave={(e) => e.currentTarget.style.backgroundColor = backgroundColor}
			>{'?'}</button>
		</section>
	)
}
