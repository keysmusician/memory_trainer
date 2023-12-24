import { IQuiz } from "./quiz"
import { styleGroup } from "./Style"

export interface QuizLayoutProps {
	quiz: IQuiz,
	answer: any,
	question: any,
	grade: any,
	regrades: number,
	response: any,
	setResponse: (response: any) => void,
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
	answer: string,
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
			return `Hint: ${props.answer[0]}`
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
