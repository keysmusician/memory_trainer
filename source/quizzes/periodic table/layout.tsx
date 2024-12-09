import { DefaultFeedbackRenderer, TrainingHistoryPanel } from "../../defaultQuizLayout"
import { QuizLayoutProps } from "../../quiz"
import { PeriodicTable } from "./answer key"


export function PeriodicTableQuizLayout(props: QuizLayoutProps<number, PeriodicTable.Element, number>) {
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
				<DefaultFeedbackRenderer<number> feedback={props.feedbackRenderer} />

				<div>
					<props.quiz.renderer question={props.question} />
				</div>

				<div style={{ margin: "1em" }}>
					<props.quiz.response_fetcher
						answer={props.answer}
						question={props.question}
						quiz={props.quiz}
						trainingHistory={props.trainingHistory}
						feedback={props.feedbackRenderer}
						setResponse={props.setResponse}
					/>
				</div>
			</article>
		</>
	)
}
