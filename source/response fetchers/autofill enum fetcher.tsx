import { For, createEffect, createSignal, onMount, untrack } from "solid-js"
import { NonNegativeNumber, ResponseFetcherProps } from "../quiz"
import { designSystem, style } from "../Style"
import { TimedAnswer, TimedResponse } from "../evaluators/evaluators"

interface AutofillEnumFetcherProps<
	QuestionType = unknown,
	AnswerType = unknown
> extends ResponseFetcherProps<string | TimedResponse<string>, QuestionType, AnswerType> {
	placeholder?: string
	responses?: Set<string>
}

/**
 * Fetches a selection from an enumeration.
 **/
export function AutofillEnumFetcher<
	QuestionType = unknown,
// AnswerType = string || TimedAnswer<string>,
>(
	props: AutofillEnumFetcherProps<QuestionType, string | TimedAnswer<string>>
) {
	const answers = Array.from(
		props.responses ??
		new Set(
			props.quiz.answerKey.values().map<string>(
				(answer) => // We don't know if the answer type will be a string, but we want to force it to be.
					'answer' in (answer as any) ?
						(answer as TimedAnswer<string>).answer : // answer.answer is a workaround for making this work for TimedAnswer types.
						answer as string
			)
		)
	)

	const [text, setText] = createSignal<string>("")

	const normalizedText = () => normalize(text())

	const options = () => answers.filter(
		answer => normalize(answer).includes(normalizedText())
	).sort((a, b) => firstMatch(normalize(a), normalize(b), normalizedText()))

	createEffect(() => {
		// If there's only one option, select it.
		if (options().length === 1) {
			setSelection(options()[0])
		}
	})

	const [selection, setSelection] = createSignal<string>(options()[0])

	const [hoveredOption, setHoveredOption] = createSignal<string | null>(null)

	// Get a reference to the text input and focus it when the component mounts.
	let input_ref: HTMLInputElement | undefined

	onMount(() => input_ref!.focus())

	const [startTime, setStartTime] = createSignal(Date.now())

	const responseTimeSeconds = () => new NonNegativeNumber((Date.now() - startTime()) / 1000)

	function submit() {
		input_ref!.value = ""
		setText("")
		props.setResponse(() =>
		// 'timeLimitSeconds' in (props.answer as TimedAnswer<string>) ? // WARNING: COUPLING
		// { response: selection(), responseTimeSeconds: untrack(() => responseTimeSeconds()) } :
		({
			answer: selection(),
			timeLimitSeconds: untrack(() => responseTimeSeconds())
		})
		)
		setStartTime(Date.now())
		setSelection(options()[0])
	}

	function selectOption(option: string) {
		setSelection(option)
		input_ref!.value = option
		setText(option)
	}

	function handleKeyPress(keyboardEvent: KeyboardEvent) {
		const index = options().indexOf(selection()) === -1 ? 0 :
			options().indexOf(selection())

		const first_option = options()[0]

		const selectionIsInOptions = options().includes(selection())

		switch (keyboardEvent.key) {
			case "ArrowDown": {
				if (selectionIsInOptions) {
					const next_option = options()[modulo(index + 1, options().length)]
					setSelection(next_option)
				} else {
					setSelection(first_option)
				}
				break
			}
			case "ArrowUp": {
				if (selectionIsInOptions) {
					const previous_option = options()[modulo(index - 1, options().length)]
					setSelection(previous_option)
				} else {
					const last_option = options()[options().length - 1]
					setSelection(last_option)
				}
				break
			}
			case "Enter": {
				if (first_option !== undefined) {
					if (first_option == selection()) {
						submit()
					} else if (selectionIsInOptions) {
						selectOption(selection()) // I know this logic looks redundant, but it's necessary because selectOption also sets the text.
					} else {
						selectOption(first_option)
					}
				}
				break
			}
		}
	}

	return (
		<div
			style={{
				...style.group.column,
				"justify-content": "start",
				"height": "20rem",
			}}
		>
			<div style={style.group.column}
			>
				<div
					style={{
						...style.group.column,
						'width': '100%',
						'margin': '0.5em',
						'gap': '0.5em'
					}}
				>
					<div
						style={{
							...style.group.baseText,
							...style.group.row,
							'background': 'white',
							'border-radius': "5px",
							'border': style.group.button.border,
							'box-sizing': 'border-box',
							'margin': 'auto',
							'padding': '0',
							'width': '100%',
						}}
					>
						<div
							style={{
								'flex': '1',
								'font-weight': 'bold',
								'text-align': 'center',
							}}
						>
							{selection()}
						</div>

						<button
							onClick={submit}
							title="Click here to submit your answer."
							style={{
								// 'border-radius': '0 1em 1em 0',
								'border': 'none',
								'box-sizing': 'border-box',
								'height': 'auto',
								'margin-left': '2px',
								'width': "2em",
							}}
						>
							→
						</button>
					</div>

					<div // Text search box
						style={{
							...style.group.baseText,
							...style.group.row,
							'border': style.layout.primaryBorder,
							'border-radius': designSystem.layout.border.radiusWide,
							'box-sizing': 'border-box',
							'margin': 'auto',
							'background': 'white',
							'padding': '0',
							'width': '100%',
						}}
					>
						<input
							style={{
								'border': 'none',
								'border-radius': 'inherit',
								'box-sizing': 'border-box',
								'flex': '1',
								'font-size': 'inherit',
								'height': '100%',
								'padding': '0 0.5em',
							}}
							type="text"
							ref={input_ref}
							onInput={e => setText(e.currentTarget.value)}
							placeholder={props.placeholder}
							onKeyDown={handleKeyPress}
						/>
					</div>

					<ul
						style={{
							'display': 'flex',
							'flex-direction': 'column',
							'gap': '2px',
							'list-style': "none",
							'margin': "0",
							'max-height': "200px",
							'overflow-y': "scroll",
							'padding': "0",
							'width': '100%',
						}}
						tabIndex={-1}
					>
						<For each={options()}>
							{option => <li
								style={
									{
										// ...(option === props.selectedOption &&
										// {
										// 	'position': 'absolute',
										// 	'top': '0',
										// }
										// ),
										'cursor': 'pointer',
										'padding': "5px",
										'border-radius': "5px",
										'background-color': selection() === option ?
											style.color.accent :
											hoveredOption() === option ? style.color.focused :
												"white",
										'border': style.group.button.border,
										'font-weight': selection() === option ? "bold" : "normal"
									}
								}
								onClick={() => selectOption(option)}
								onMouseEnter={
									() => setHoveredOption(option)
								}
								onMouseLeave={
									() => setHoveredOption(null)
								}
								tabIndex={0}
								onKeyPress={e => {
									if (e.key === "Enter") {
										selectOption(option)
									}
								}}
							>
								{option}
							</li>}
						</For>
					</ul>
				</div>
			</div>
		</div>
	)
}

/**
 * Sorts the given strings, `a` and `b` based on how well they match the given text.
 */
function firstMatch(a: string, b: string, match_text: string): number {
	const a_index = a.indexOf(match_text)
	const b_index = b.indexOf(match_text)
	if (a_index === b_index) {
		return a.localeCompare(b)
	}
	return a_index - b_index
}

function normalize(text: string) {
	// Remove non-alphabetic characters and convert to lowercase.
	return text.replaceAll(/[^a-z]/gi, "").toLowerCase()
}

/**
 * Returns the modulo of n and m. Distinct from the % operator in that it always
 * returns a positive number.
 * */
function modulo(n: number, m: number) {
	return ((n % m) + m) % m
}

// Saved for reference, might use somewhere else.
/*
function textInputComboButton(props) {
	return (
		<div
			style={{
				...style.group.baseText,
				...style.group.row,
				'border': style.layout.primaryBorder,
				'border-radius': designSystem.layout.border.radiusWide,
				'box-sizing': 'border-box',
				'margin': 'auto',
				'background': 'white',
				'padding': '0',
				'width': '100%',
			}}
		>
			<input
				style={{
					'border': 'none',
					'border-radius': '1em 0 0 1em',
					'box-sizing': 'border-box',
					'flex': '1',
					'font-size': 'inherit',
					'height': '100%',
					'padding': '0 0.5em',
				}}
				type="text"
				ref={input_ref}
				onInput={e => setText(e.currentTarget.value)}
				placeholder={props.placeholder}
				onKeyDown={handleKeyPress}
			/>

			<button
				onClick={submit}
				title="Click here to submit your answer."
				style={{
					'border-radius': '0 1em 1em 0',
					'border': 'none',
					'box-sizing': 'border-box',
					'height': '100%',
					'margin-left': '2px',
					'width': "2em",
				}}
			>
				→
			</button>
		</div >
	)
}
*/

/* Another old version of the input field, with a different style.
	<div
		style={{
			...style.group.baseText,
			...style.group.row,
			'border': style.layout.primaryBorder,
			'border-radius': designSystem.layout.border.radiusWide,
			'box-sizing': 'border-box',
			'margin': 'auto',
			'background': 'white',
			'padding': '0',
			'width': '100%',
		}}
	>
		<input
			style={{
				'border': 'none',
				'border-radius': '1em 0 0 1em',
				'box-sizing': 'border-box',
				'flex': '1',
				'font-size': 'inherit',
				'height': '100%',
				'padding': '0 0.5em',
			}}
			type="text"
			ref={input_ref}
			onInput={e => setText(e.currentTarget.value)}
			placeholder={props.placeholder}
			onKeyDown={handleKeyPress}
		/>

		<button
			onClick={submit}
			title="Click here to submit your answer."
			style={{
				'border-radius': '0 1em 1em 0',
				'border': 'none',
				'box-sizing': 'border-box',
				'height': '100%',
				'margin-left': '2px',
				'width': "2em",
			}}
		>
			→
		</button>
	</div>
*/
