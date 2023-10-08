import { Setter, For, createSignal } from "solid-js"
import { useScreen } from "../App"
import { Quiz, quizzes } from "../quizzes"
import { column_layout, quiz_list_item, start_button } from '../Styles.module.css'

for (const quiz of quizzes) {
  quiz.unselected_answer_key ??= new Map()
}

const [quizIndex, setQuizIndex] = createSignal(0)

interface QuizzesProps {
  setQuiz: Setter<Quiz>
}
function Quizzes(props: QuizzesProps) {
  const selectQuiz = ([quiz, index]: [Quiz, number]) => {
    props.setQuiz(quiz)
    setQuizIndex(index)
  }

  const [, setScreen] = useScreen()!;

  return (
    <ul class={column_layout}>
      <For each={quizzes}>
        {(quiz, index) => {
          const input_id = String(index())

          return (
            <li
              class={quiz_list_item}
              onClick={[selectQuiz, [quiz, index]]}
              tabIndex={-1}
            >
              <label for={input_id}>{quiz.name}</label>

              <div
                style={{ 'float': 'right' }}
              >
                <input
                  checked={index() === quizIndex()}
                  id={input_id}
                  type="radio"
                  name="quiz"
                />
                <button
                  onClick={[setScreen, "Edit"]}
                  style={{ 'margin-left': '0.5rem' }}
                >
                  Configure
                </button>

                <button
                  onClick={() => {
                    props.setQuiz(quiz)
                    setScreen('Train')
                  }}
                  style={{ 'margin-left': '0.5rem' }}
                >
                  Start
                </button>
              </div>
            </li>
          )
        }}
      </For>
    </ul>
  )
}

interface StartScreenProps {
  setQuiz: Setter<Quiz>
}
export function StartScreen(props: StartScreenProps) {

  return (
    <Quizzes setQuiz={props.setQuiz} />
  )
}

interface StartButtonProps {
  onClick?: () => void
}
export function StartButton(props: StartButtonProps) {
  const [, setScreen] = useScreen()!;

  function beginTraining() {
    if (props.onClick) { props.onClick() }
    setScreen('Train')
  }

  return (
    <button
      onClick={beginTraining}
      class={start_button}
    >
      Start
    </button>
  )
}
