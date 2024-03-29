import { Mora } from "./_mora"
import { DefaultFeedbackRenderer, TrainingHistoryPanel, feedbackBuilder } from "../../DefaultQuizLayout"
import { QuizLayoutProps } from "../../quiz"


export function JapaneseQuizzesLayout(props: QuizLayoutProps<string, Mora, Mora>) {
	return (
		<article
			style={{
				'display': "flex",
				'flex-direction': "column",
				'align-items': "center",
			}}
		>
			<TrainingHistoryPanel trainingHistory={props.trainingHistory} />

			<div>
				<props.quiz.renderer question={props.question} />
			</div>

			<DefaultFeedbackRenderer<string, Mora, Mora>
				question={props.question}
				answer={props.answer}
				trainingHistory={props.trainingHistory}
				giveFeedback={feedbackBuilder(
					(_) => "Correct!",
					(_) => 'Hint: ' + (props.answer.romanization)[props.trainingHistory.retries - 1],
					(_) => `The answer was ${props.trainingHistory.last.answer.romanization}`
				)}
			/>

			<div style={{ margin: "1em" }}>
				<props.quiz.response_fetcher
					setResponse={props.setResponse}
					question={props.question}
					answer={props.answer}
					trainingHistory={props.trainingHistory}
					quiz={props.quiz}
				/>
			</div>
		</article>
	)
}
