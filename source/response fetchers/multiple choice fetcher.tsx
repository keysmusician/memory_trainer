import { NonNegativeNumber, ResponseFetcherProps } from "../quiz";


export interface MultipleChoiceFetcherProps<QuestionType, AnswerType, ResponseType>
	extends ResponseFetcherProps<QuestionType, AnswerType, ResponseType> {
	/**
	 * The number of choices to display.
	 **/
	choicesCount: NonNegativeNumber

	/**
	 * A function that returns the string label for a response option.
	 **/
	getLabel: (option: AnswerType) => string
	// TODO: Add grid layout options
	// columns: number
	// rows: number
}

export const MultipleChoiceFetcher = function <
	QuestionType,
	AnswerType,
	ResponseType,
>(
	props: MultipleChoiceFetcherProps<
		QuestionType,
		AnswerType,
		ResponseType
	>
) {
	const options = () => createMultipleChoiceOptions(
		props.answerKey.answers,
		props.answer,
		props.choicesCount
	)

	const columns = Math.ceil(Math.sqrt(props.choicesCount.valueOf()))

	return (
		<div
			style={{
				// Old grid version. Couldn't center the final row.
				// 'display': "grid",
				// 'grid-template-columns': `repeat(${columns}, 1fr)`,
				// 'grid-template-rows': `repeat(${rows}, 1fr)`,
				// 'gap': `${gapRem}rem`,
				// 'padding': `${paddingRem}rem`,

				// New flex version. Centers the final row.
				'display': "flex",
				'flex-direction': "row",
				'flex-wrap': "wrap",
				// 'gap': `${gapRem}rem`,
				// 'padding': `${paddingRem}rem`,
				'justify-content': "center",
			}}
		>
			{options().map((option) => (
				<div // Spacer/container
					style={{
						'flex': `0 0 ${100 / columns}%`,
						'display': 'flex',
						'justify-content': 'center',
					}}
				>
					<button
						style={{
							'flex': '1',
							'font-size': '1.5rem',
							'background-color': 'white',
							'color': 'black',

							'padding': '1rem',
							'margin': '0.5rem',
							'border': '1px solid black',
							'border-radius': '1rem',
							'cursor': 'pointer',
						}}

						onClick={() => props.setResponse(option)}

						onMouseOver={(mouseEvent) => {
							const style = mouseEvent.currentTarget.style
							style.backgroundColor = 'lightgray'
						}}

						onMouseLeave={(mouseEvent) => {
							const style = mouseEvent.currentTarget.style
							style.backgroundColor = 'white'
						}}
					>
						{props.getLabel(option)}
					</button>
				</div>
			))}
		</div>
	)
}

/**
 * Creates multiple choice options for a question.
 **/
function createMultipleChoiceOptions<AnswerType>(
	answers: AnswerType[],
	correctAnswer: AnswerType,
	optionCount: NonNegativeNumber
) {
	var _optionCount = optionCount.valueOf()
	switch (_optionCount) {
		case 0:
			return []
		case 1:
			return [correctAnswer]
		default:
			// Initialize options with the correct answer
			const options = [correctAnswer]

			const incorrectOptions = answers
				.filter((answer) => answer !== correctAnswer)
				// Shuffle array
				.map(value => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value)

			// Select random unique incorrect options
			for (let _ = 1; _ < _optionCount; _++) {
				options.push(incorrectOptions.pop()!)
			}

			// Shuffle the options
			return options
				.map(value => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value)
	}
}
