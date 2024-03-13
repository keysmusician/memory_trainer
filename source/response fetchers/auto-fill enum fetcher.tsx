import { For, JSX, createSignal, onMount } from "solid-js"
import { ResponseFetcherProps } from "../quiz"
import { designSystem, style, styleGroup } from "../Style"

interface AutofillEnumFetcherProps<
	QuestionType = unknown,
	AnswerType = unknown
> extends ResponseFetcherProps<string, QuestionType, AnswerType> {
	placeholder?: string
	responses?: string[]
}

/**
 * Fetches a selection from an enumeration.
 **/
export function AutofillEnumFetcher<
	QuestionType = unknown,
	AnswerType = unknown
>(
	props: AutofillEnumFetcherProps<QuestionType, AnswerType>
) {
	const answers = props.responses ?? Array.from(props.quiz.answer_key.values())

	const [text, setText] = createSignal<string>("")

	const normalizedText = () => normalize(text())

	const options = () => answers.filter(
		answer => normalize(answer).includes(normalizedText())
	).sort((a, b) => firstMatch(normalize(a), normalize(b), normalizedText()))

	const [selection, setSelection] = createSignal<string>(options()[0])

	// Get a reference to the text input and focus it when the component mounts.
	let input_ref: HTMLInputElement | undefined

	onMount(() => input_ref!.focus())

	function submit() {
		input_ref!.value = ""
		setText("")
		props.setResponse(() => selection(),)
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
		<div style={{
			...styleGroup.column,
			"justify-content": "start",
			"height": "20rem",
		}}
		>
			<div style={styleGroup.column}
			>
				<div
					style={{
						...styleGroup.baseText,
						...styleGroup.row,
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

				<OptionList
					options={options()}
					selectedOption={selection()}
					selectOption={selectOption}
				/>
			</div>
		</div>
	)
}

interface OptionListProps {
	options: string[]
	selectedOption: string
	selectOption: (option: string) => void
}
function OptionList(props: OptionListProps) {
	const [hoveredOption, set_hoveredOption] = createSignal<string | null>(null)

	return (
		<div
			style={{ 'width': '100%', 'margin': '0.5em' }}
		>
			<div
				style={{
					'background': 'white',
					'border': styleGroup.button.border,
					'border-radius': "5px",
					'padding': "5px",
					'margin': ".5em 0",
				}}
			>
				{`Selected: ${props.selectedOption}`}
			</div>

			<ul
				style={{
					'display': 'flex',
					'flex-direction': 'column',
					'overflow-y': "scroll",
					'max-height': "200px",
					'list-style': "none",
					'padding': "0",
					'margin': "0",
					'gap': '2px',
				}}
				tabIndex={-1}
			>
				<For each={props.options}>
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
								'background-color': props.selectedOption === option ?
									style.color.accent :
									hoveredOption() === option ? style.color.focused :
										"white",
								'border': styleGroup.button.border,
								'font-weight': props.selectedOption === option ? "bold" : "normal"
							}
						}
						onClick={() => props.selectOption(option)}
						onMouseEnter={
							() => set_hoveredOption(option)
						}
						onMouseLeave={
							() => set_hoveredOption(null)
						}
						tabIndex={0}
						onKeyPress={e => {
							if (e.key === "Enter") {
								props.selectOption(option)
							}
						}}
					>
						{option}
					</li>}
				</For>
			</ul>
		</div>
	)
}

// Sorts the given strings based on how well they match the given text.
function firstMatch(a: string, b: string, match_text: string) {
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
function textInputComboButton() {
	return (
		<div
			style={{
				...styleGroup.baseText,
				...styleGroup.row,
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
