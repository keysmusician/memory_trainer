import { For, createSignal } from "solid-js"
import { QuizLayoutProps, TrainingHistory } from "./quiz"
import { style } from "./Style"


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
			<div style={style.group.baseText}>
				<span>{feedback(props)}</span>
			</div>
		</div>
	)
}

export function TrainingHistoryPanel(props: { trainingHistory: TrainingHistory }) {
	const [visible, setVisible] = createSignal(false)

	const backgroundColor = "rgba(255, 255, 255, .8)"

	const blurFilter = "blur(2px)"

	const trStyle = {
		'border-bottom': '1px solid black',
	}

	const column1 = {
		'background-color': 'rgba(0, 0, 0, .1)',
	}

	// const localStyle = document.createElement('style')
	// localStyle.appendChild(document.createTextNode(
	// 	`button:hover{ background-color: #00ff00 }`
	// ))
	// document.getElementsByTagName('head')[0].appendChild(localStyle);

	return (
		<section
			style={{
				'position': 'fixed',
				'left': '0',
				'top': '0',
				"width": "20rem",
				'height': '100vh',
				'transform': `translateX(${visible() ? 0 : -100}%)`,
				'transition': 'transform 200ms ease-in-out',
				'backdrop-filter': blurFilter,
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
									<td style={column1}>Question</td>
									<td>{JSON.stringify(trainingState.question)}</td>
								</tr>
								<tr style={trStyle}>
									<td style={column1}>Question Index</td>
									<td>{trainingState.questionIndex}</td>
								</tr>
								<tr style={trStyle}>
									<td style={column1}>Answer</td>
									<td>{JSON.stringify(trainingState.answer)}</td>
								</tr>
								<tr style={trStyle}>
									<td style={column1}>Response</td>
									<td>{JSON.stringify(trainingState.response)}</td>
								</tr>
								<tr style={trStyle}>
									<td style={column1}>Response Time</td>
									<td>{trainingState.responseTime / 1000} s</td>
								</tr>
								<tr style={trStyle}>
									<td style={column1}>Grade</td>
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
					'backdrop-filter': blurFilter,
					'border-radius': '0 2em 2em 0',
					'border': 'none',
					'box-sizing': 'border-box',
					'height': '4em',
					'width': "4em",
					'cursor': 'pointer',
				}}
				title="Show/hide training history."
				onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, .4)"}
				onMouseLeave={(e) => e.currentTarget.style.backgroundColor = backgroundColor}
			>{style.iconography.debug}</button>
		</section>
	)
}
