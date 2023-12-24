import { Mora } from "../../answer_keys/_mora"
import { IQuiz } from "../../quiz"
import { styleGroup } from "../../Style"

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
export function JapaneseQuizzesLayout(props: QuizLayoutProps) {
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
					setResponse={props.setResponse}
					// question={question()}
					// response_count
					quiz={props.quiz}
				/>
			</div>
		</article>
	)
}

interface FeedbackRendererProps {
	answer: Mora,
	grade: boolean,
	regrades: number,
}
function DefaultFeedbackRenderer(props: FeedbackRendererProps) {
	var previousAnswer = props.answer

	const feedback = () => {
		if (props.grade === undefined) {
			return <>&nbsp;</>
		} else if (props.grade) {
			return "Correct!"
		} else if (props.regrades > 0) {
			return `Hint: ${props.answer.romanization[0]}`
		} else {
			const text = `The answer was ${previousAnswer.romanization}`
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
