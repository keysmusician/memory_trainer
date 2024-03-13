import { DefaultFeedbackRenderer, feedbackBuilder, TrainingHistoryPanel } from "../../defaultQuizLayout"
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
				<DefaultFeedbackRenderer<number, PeriodicTable.Element, number>
					answer={props.answer}
					question={props.question}
					trainingHistory={props.trainingHistory}
					giveFeedback={feedbackBuilder<number, PeriodicTable.Element, number>(
						(_) => "Correct!",
						(props) => `Hint: ${props.answer.symbol}`,
						(props) => `The answer was ${props.answer.name}`
					)}
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
