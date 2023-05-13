import { Setter, For, createSignal } from "solid-js"
import { Screen } from "../App"
import { Quiz, quizzes } from "../quizzes"
import { column_layout, quiz_list_item, start_button } from '../Styles.module.css'


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
    <div class={column_layout}>
      <For each={quizzes}>
        {(quiz, index) => {
          const input_id = String(index())

          return (
            <div class={quiz_list_item} onClick={[selectQuiz, [quiz, index]]}>
              <label for={input_id}>{quiz.name}</label>

              <input
                checked={index() === quizIndex()}
                id={input_id}
                type="radio"
                name="quiz"
                style={{'float': 'right'}}
              />
            </div>
          )
        }}
      </For>
    </div>
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
      <form>
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
