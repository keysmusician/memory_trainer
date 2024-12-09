import { Component, For, JSX, createEffect, createSignal } from "solid-js"
import { QuizLayoutProps, ResponseFetcher, TrainingHistory } from "./quiz"
import { style } from "./Style"
import { Renderer } from "./renderers/Renderer"

interface DefaultQuizLayoutBuilderProps<
	QuestionType, AnswerType, ResponseType, FeedbackType
> {
	questionRenderer: Renderer<QuestionType>
	feedbackRenderer: Component<{ feedback: FeedbackType }>
	responseFetcher: ResponseFetcher<QuestionType, AnswerType, ResponseType>
}
export function DefaultQuizLayoutBuilder<
	QuestionType = unknown,
	AnswerType = unknown,
	ResponseType = unknown,
	FeedbackType = unknown
>(
	builderProps: DefaultQuizLayoutBuilderProps<
		QuestionType,
		AnswerType,
		ResponseType,
		FeedbackType
	>
) {
	function DefaultQuizLayout(
		props: QuizLayoutProps<
			QuestionType,
			AnswerType,
			ResponseType,
			FeedbackType
		>
	) {
		return (
			<>
				{/* <TrainingHistoryPanel trainingHistory={props.trainingHistory} /> */}
				<article
					style={{
						'display': "flex",
						'flex-direction': "column",
						'align-items': "center",
					}}
				>
					<div>
						<builderProps.questionRenderer question={props.question} />
					</div>

					<builderProps.feedbackRenderer feedback={props.feedback} />

					<div style={{ margin: "1em" }}>
						<builderProps.responseFetcher
							question={props.question}
							answer={props.answer}
							setResponse={props.setResponse}
							quiz={props.quiz}
						// trainingHistory={props.trainingHistory}
						/>
					</div>
				</article>
			</>

		)
	}

	return DefaultQuizLayout
}

interface FeedbackRendererProps<FeedbackType extends JSX.Element> {
	feedback: FeedbackType
}
export function DefaultFeedbackRenderer<FeedbackType extends JSX.Element>(
	props: FeedbackRendererProps<FeedbackType>
) {
	return (
		<div>
			<div style={style.group.baseText}>
				<span>{props.feedback}</span>
			</div>
		</div>
	)
}

export function TrainingHistoryPanel(props: { trainingHistory: TrainingHistory }) {
	const [visible, setVisible] = createSignal(false)

	var previousTimestamp = Date.now()

	createEffect(() => {
		props.trainingHistory.last
		previousTimestamp = Date.now()
	})

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

	/**
	 * The time in seconds since the last history entry.
	 */
	const getDeltaTimeSeconds = () => {
		const now = Date.now()
		const delta = now - previousTimestamp
		return delta / 1000
	}

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
									<td style={column1}>Time since last history entry</td>
									<td>{getDeltaTimeSeconds()} seconds</td>
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
