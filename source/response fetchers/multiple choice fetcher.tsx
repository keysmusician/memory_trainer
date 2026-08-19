import { createMemo, on } from 'solid-js'
import { NonNegativeNumber, ResponseFetcherProps } from "../quiz";


export interface MultipleChoiceFetcherProps<QuestionType, AnswerType, ResponseType>
	extends ResponseFetcherProps<QuestionType, AnswerType, ResponseType> {
	/**
	 * The number of incorrect options/choices to display. The correct answer is
	 * always included in addition to these options.
	 **/
	incorrectOptionsCount: NonNegativeNumber

	/**
	 * A function that returns the string label for a response option.
	 **/
	getLabel: (option: AnswerType) => string

	/**
	 * An optional function that returns an array of incorrect response options
	 * for a question. Useful if you want a more customized set of options for a
	 * question than the default implementation provides.
	 *
	 * If not provided, the default implementation will be used. The default
	 * implementation will select random unique incorrect options from the
	 * answer key.
	 *
	 * If less than `incorrectOptionsCount` options are returned, the default
	 * implementation will be used to fill in the remaining options. If more
	 * than `incorrectOptionsCount` options are returned, a random subset of
	 * `incorrectOptionsCount` options will be selected from the returned
	 * options.
	 *
	 * The options will always be shuffled and the correct answer will be
	 * included in the final set of options.
	 **/
	getIncorrectOptions?: (question: QuestionType, answer: AnswerType) => AnswerType[]

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
	const options = createMemo(on(
		() => props.question,
		() => {
			const incorrectOptions = props.getIncorrectOptions?.(
				props.question,
				props.answer
			)

			validateOptions(
				props.answerKey.answers,
				props.answer,
				props.incorrectOptionsCount.valueOf(),
				incorrectOptions
			)

			return createMultipleChoiceOptions(
				props.answerKey.answers,
				props.answer,
				props.incorrectOptionsCount,
				incorrectOptions
			)
		}
	))

	const columns = Math.ceil(Math.sqrt(props.incorrectOptionsCount.valueOf() + 1))

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

function validateOptions<AnswerType>(
	answers: AnswerType[],
	correctAnswer: AnswerType,
	incorrectOptionsCount: number,
	incorrectOptions?: AnswerType[]
) {
	const availableIncorrectOptionsCount = answers
		.filter((answer) => answer !== correctAnswer)
		.length

	if (incorrectOptionsCount > availableIncorrectOptionsCount) {
		console.warn(
			`incorrectOptionsCount (${incorrectOptionsCount}) is greater than the ${availableIncorrectOptionsCount} incorrect options available in the answer key.`
		)
	}

	if (incorrectOptions && incorrectOptions.length < incorrectOptionsCount) {
		console.warn(
			`getIncorrectOptions returned ${incorrectOptions.length} options, but ${incorrectOptionsCount} were requested. Falling back to the default implementation for the remaining options.`
		)
	}
}

/**
 * Creates multiple choice options for a question.
 **/
function createMultipleChoiceOptions<AnswerType>(
	answers: AnswerType[],
	correctAnswer: AnswerType,
	incorrectOptionsCount: NonNegativeNumber,
	providedIncorrectOptions?: AnswerType[]
) {
	const _incorrectOptionsCount = incorrectOptionsCount.valueOf()

	const fallbackIncorrectOptions = answers
		.filter((answer) => answer !== correctAnswer)
	const requestedIncorrectCount = _incorrectOptionsCount
	const customIncorrectOptions = providedIncorrectOptions ?? []
	const uniqueIncorrectOptions = customIncorrectOptions
		.filter((option, index, options) =>
			option !== correctAnswer && options.indexOf(option) === index
		)
	const remainingIncorrectOptions = fallbackIncorrectOptions.filter(
		(option) => !uniqueIncorrectOptions.includes(option)
	)
	const selectedIncorrectOptions = shuffle(uniqueIncorrectOptions)
		.slice(0, requestedIncorrectCount)

	if (selectedIncorrectOptions.length < requestedIncorrectCount) {
		selectedIncorrectOptions.push(
			...shuffle(remainingIncorrectOptions).slice(
				0,
				requestedIncorrectCount - selectedIncorrectOptions.length
			)
		)
	}

	return shuffle([correctAnswer, ...selectedIncorrectOptions])
}

function shuffle<ValueType>(values: ValueType[]) {
	return values
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value)
}
