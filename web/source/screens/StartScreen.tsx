import { For, createSignal } from 'solid-js'
import { useQuiz, routes, AppNavigator } from '../App'
import { Quiz } from '../quiz'
import { quizzes as serialized_quizzes } from '../quizzes'
// import { column_layout, quiz_list_item, start_button, nested_button } from '../Styles.module.css'
import { useNavigate } from '@solidjs/router'
import { styleGroup, style } from '../Style'


export const quizzes = serialized_quizzes.map(quiz => new Quiz(quiz))

const [quizIndex, setQuizIndex] = createSignal(0)

export function StartScreen() {

  return (
    <Quizzes />
  )
}

function Quizzes() {
  const [, setQuiz] = useQuiz()

  const navigate = useNavigate() as AppNavigator

  const selectQuiz = ([quiz, index]: [Quiz, number]) => {
    setQuiz(quiz)
    setQuizIndex(index)
  }

  return (
    <ul style={styleGroup.column}>
      <For each={quizzes}>
        {(quiz, index) => {
          const input_id = String(index())

          return (
            <li
              style={{
                width: '100%',
              }}
              onClick={[selectQuiz, [quiz, index]]}
              tabIndex={-1}
            >
              <label for={input_id}>{quiz.name}</label>

              <div
                style={{ 'float': 'right' }}
              >
                <input
                  style={{
                    'margin': '0 0.5rem 0 0',
                  }}
                  checked={index() === quizIndex()}
                  id={input_id}
                  type='radio'
                  name='quiz'
                />
                <button
                  onClick={() => navigate(routes.edit)}
                // style={nested_button}
                >
                  Configure
                </button>

                <button
                  onClick={() => {
                    setQuiz(quiz)
                    navigate(routes.train)
                  }}
                // style={nested_button}
                >
                  Start
                </button>
              </div>
            </li>
          )
        }}
      </For>

      <li>
        <NewQuizButton />
      </li>
    </ul>
  )
}

interface StartButtonProps {
  onClick?: () => void
}
export function StartButton(props: StartButtonProps) {

  const navigate = useNavigate()

  function beginTraining() {
    if (props.onClick) { props.onClick() }
    navigate(routes.train)
  }

  return (
    <button
      onClick={beginTraining}
      style={styleGroup.startButton}
    >
      Start
    </button>
  )
}


function NewQuizButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(routes.create)}
      tabIndex={0}
      style={{
        ...styleGroup.startButton,
        'margin-right': '0.5rem',
      }}
      type='button'
    >
      New Quiz
    </button>
  )
}
