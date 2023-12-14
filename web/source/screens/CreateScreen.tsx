import { For, createSignal } from "solid-js";
import { HomeButton } from "./EditScreen";
import { StartButton } from "./StartScreen";
import { useQuiz } from "../App";


export function CreateScreen() {
	const [quiz, setQuiz] = useQuiz()

	const quizProperties = Object.keys(quiz)

	const [quizProperty, setQuizProperty] = createSignal(quizProperties[0])


	return (
		<>
			<h2>Create</h2>

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
					Here you can create a new quiz.
				</li>

				<li>
					<button>
						New Quiz
					</button>
				</li>

				<li>
					<button>
						Import Quiz
					</button>
				</li>

				<li>
					<button>
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

			<HomeButton />

			<StartButton />
		</>
	)
}
