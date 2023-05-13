import { Setter, For, createSignal } from "solid-js"
import { Screen } from "../App"
import { Quiz, quizzes } from "../quizzes"
import { screen_change_button, quiz_list_item, start_button } from './Styles.module.css'


const [quizIndex, setQuizIndex] = createSignal(0)

interface QuizzesProps {
  setQuiz: Setter<Quiz>
}
function Quizzes(props: QuizzesProps) {
  const selectQuiz = ([quiz, index]: [Quiz, number]) => {
    props.setQuiz(quiz)
    setQuizIndex(index)
  }

  return (
    <For each={quizzes}>
      {(quiz, index) => {
        const input_id = String(index())

        return (
          <div class={quiz_list_item}>
            <label for={input_id}>{quiz.name}</label>

            <input
              checked={index() === quizIndex()}
              id={input_id}
              type="radio"
              name="quiz"
              onClick={[selectQuiz, [quiz, index]]}
            />
          </div>
        )
      }}
    </For>
  )
}

interface StartScreenProps {
  setScreenName: Setter<Screen>
  setQuiz: Setter<Quiz>
}
export function StartScreen(props: StartScreenProps) {
  function beginTraining() { props.setScreenName('Train') }

  return (
    <>
      <Quizzes setQuiz={props.setQuiz} />
      <form style={{ 'margin': '20px' }}>
        <button
          onClick={beginTraining}
          class={start_button}
        >
          Start
        </button>
      </form>
    </>
  )
}
