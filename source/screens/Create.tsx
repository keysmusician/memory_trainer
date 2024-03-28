import { For, createSignal } from "solid-js";
import { HomeButton } from "./Edit";
import { StartButton } from "./Start";
import { useQuiz } from "../App";
import { style } from "../style";


export function CreateScreen() {
	const [quiz, setQuiz] = useQuiz()

	const quizProperties = Object.keys(quiz)

	const [quizProperty, setQuizProperty] = createSignal(quizProperties[0])


	return (
		<>
			<h2>Create</h2>
			<p>
				Here you can create a new quiz.
			</p>

			<ul
				style={{
					'list-style-type': 'none',
					'padding': '0',
					'display': 'flex',
					'flex-direction': 'row',
					'gap': '1em',
				}}
			>

				<li>
					<button
						style={style.group.button}
					>
						New Quiz
					</button>
				</li>

				<li>
					<button
						style={style.group.button}
					>
						Import Quiz
					</button>
				</li>

				<li>
					<button
						style={style.group.button}
					>
						Export Quiz
					</button>
				</li>
			</ul>

			<h3>Quiz properties:</h3>
			<For each={quizProperties}>
				{(key) => (
					<p>
						{key}
					</p>
				)}
			</For>

			<div
				style={{
					...style.group.row,
					'gap': '1em',
				}}
			>
				<HomeButton />

				<StartButton />
			</div>
		</>
	)
}
