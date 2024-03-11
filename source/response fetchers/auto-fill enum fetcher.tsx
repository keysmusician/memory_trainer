import { For, JSX, createSignal, onMount } from "solid-js"
import { ResponseFetcherProps } from "../quiz"
import { style, styleGroup } from "../Style"

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
>(
	props: AutofillEnumFetcherProps<QuestionType>
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

	const flexColumn = {
		'display': 'flex',
		'flex-direction': 'column',
		'gap': '5px',
	};

	function submit() {
		input_ref!.value = ""
		setText("")
		props.setResponse(selection())
		setSelection(options()[0])
	}

	function selectOption(option: string) {
		setSelection(option)
		input_ref!.value = option
		setText(option)
	}

	return (
		<div style={flexColumn as JSX.CSSProperties}
			onKeyPress={keyboardEvent => {
				const index = options().indexOf(selection())

				switch (keyboardEvent.key) {
					case "ArrowDown": {
						const next_option = options()[(index + 1) % options().length]
						setSelection(next_option)
						break
					}
					case "ArrowUp": {
						const previous_option = options()[(index - 1) % options().length]
						setSelection(previous_option)
						break
					}
					case "Enter": {
						if (options().includes(selection())) {
							selectOption(selection())
						}

						const first_option = options()[0]

						if (first_option !== undefined) {
							if (first_option == selection()) {
								submit()
							} else {
								selectOption(first_option)
							}
						}
						break
					}
				}
			}}
		>
			<div style={flexColumn as JSX.CSSProperties}>
				<input
					type="text"
					ref={input_ref}
					onInput={e => setText(e.currentTarget.value)}
					placeholder={props.placeholder}
					style={{
						"box-sizing": "border-box",
						'width': "100%",
					}}
					onKeyPress={e => {
						if ([`Enter`, `ArrowDown`, `ArrowUp`].includes(e.key)) {
							e.preventDefault()
						}
					}}
				/>
				<OptionList
					options={options()}
					selectedOption={selection()}
					selectOption={selectOption}
				/>
			</div>
			<button
				onClick={submit}
				title="Click here to submit your answer."
				style={{ ...styleGroup.button, 'width': "100%" } as JSX.CSSProperties}
			>
				Submit
			</button>
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
		<div>
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
								cursor: "pointer",
								'padding': "5px",
								'border-radius': "5px",
								'background-color': props.selectedOption === option ?
									style.color.accent :
									hoveredOption() === option ? style.color.focused :
										"white",
								'border': '1px solid black',
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
			<div
				style={{
					'border': "1px solid black",
					'border-radius': "5px",
					'padding': "5px",
					'margin-top': "5px"
				}}
			>
				{`Selected: ${props.selectedOption}`}
			</div>
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
