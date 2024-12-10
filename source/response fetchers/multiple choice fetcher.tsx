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
		props.quiz.answers,
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
	switch (optionCount.valueOf()) {
		case 0:
			return []
		case 1:
			return [correctAnswer]
		default:
			return Array.from( // TODO: Make this more efficient.
				takeRandom(
					answers,
					new NonNegativeNumber(optionCount.subtract(1))
				).add(correctAnswer)
			).sort(() => .5 - Math.random())
	}
}

/**
 * Returns a Set of `elementCount` random elements from an array.
 **/
// TODO: Write a more efficient implementation.
function takeRandom<ArrayType>(array: ArrayType[], elementCount: NonNegativeNumber) {
	return new Set(
		Array
			.from(array)
			.sort(() => .5 - Math.random())
			.slice(0, elementCount.valueOf())
	)
}
