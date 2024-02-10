import { IQuiz } from "./quiz"
import { styleGroup } from "./Style"

export interface QuizLayoutProps<
	QuestionType = unknown,
	AnswerType = unknown,
	ResponseType = unknown
> {
	quiz: IQuiz<QuestionType, AnswerType, ResponseType>
	answer: AnswerType,
	question: QuestionType,
	/// These change throughout the lifecycle of the quiz. I might put them into a "history" data structure.
	grade: any,
	regrades: number,
	response: ResponseType,
	///
	setResponse: (response: ResponseType) => void,
	responseCount: number,
}
export function DefaultQuizLayout(props: QuizLayoutProps) {
	return (
		<article
			style={{
				'display': "flex",
				'flex-direction': "column",
				'align-items': "center",
			}}
		>
			<DefaultFeedbackRenderer
				answer={props.answer}
				grade={props.grade}
				regrades={props.regrades}
			/>

			<div>
				<props.quiz.renderer question={props.question} />
			</div>

			<div style={{ margin: "1em" }}>
				<props.quiz.response_fetcher
					answer={props.answer}
					grade={props.grade}
					question={props.question}
					quiz={props.quiz}
					regrades={props.regrades}
					response={props.response}
					responseCount={props.responseCount}
					setResponse={props.setResponse}
				/>
			</div>
		</article>
	)
}

interface FeedbackRendererProps {
	answer: unknown,
	grade: boolean,
	regrades: number,
}
function DefaultFeedbackRenderer(props: FeedbackRendererProps) {
	var previousAnswer = props.answer

	const feedback = () => {
		if (props.grade === undefined) {
			return " "
		} else if (props.grade) {
			return "Correct!"
		} else if (props.regrades > 0) {
			return `Hint: ${(props.answer as string)[0]}` // Assumes the answer is a string
		} else {
			const text = `The answer was ${previousAnswer}`
			previousAnswer = props.answer
			return text
		}
	}

	return (
		<div>
			<div style={styleGroup.baseText}>
				<span>{feedback()}</span>
			</div>
		</div>
	)
}
