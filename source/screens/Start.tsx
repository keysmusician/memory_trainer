import { For, JSX, createSignal } from 'solid-js'
import { useQuiz, routes, AppNavigator } from '../App'
import { Quiz } from '../quiz'
import { quizzes as serialized_quizzes } from '../quizzes/quizzes'
// import { column_layout, quiz_list_item, start_button, nested_button } from '../Styles.module.css'
import { useNavigate } from '@solidjs/router'
import { style } from '../Style'


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

  const selectQuiz = ([quiz, index]: [Quiz<unknown, unknown, unknown>, number]) => {
    setQuiz(quiz)
    setQuizIndex(index)
  }

  const nested_button: JSX.CSSProperties = {
    'box-sizing': 'border-box',
    'border': 'none',
    'height': '100%',
    'padding': '.5rem',
    'cursor': 'pointer',
    'margin-left': '3px',
  }

  return (
    <ul style={{
      ...style.group.column,
      'gap': '0.75rem',
      // 'overflow-y': 'scroll',
      'height': 'auto',
    }}
    >
      <For each={quizzes}>
        {(quiz, index) => {
          const input_id = String(index())

          return (
            <li
              style={{
                ...style.group.row,
                ...style.group.border,
                'justify-content': 'space-between',
                'padding': '0',
                'width': '100%',
                'height': '100%',
                'background-color': 'white',
                'transition': 'box-shadow 0.1s',
              }}
              onClick={[selectQuiz, [quiz, index]]}
              tabIndex={-1}
              // Set box shadow on hover
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 1rem 0 white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <label
                for={input_id}
                style={{
                  'margin': '0 0.5rem 0 0',
                  'padding': '.5rem',
                }}
              >
                {quiz.title}
              </label>

              <div
                style={{
                  // 'float': 'right',
                  'height': '100%',
                  'display': 'flex',
                }}
              >
                {/* <input
                  style={{
                    'margin': '0 0.5rem 0 0',
                  }}
                  checked={index() === quizIndex()}
                  id={input_id}
                  type='radio'
                  name='quiz'
                /> */}
                <button
                  onClick={() => navigate(routes.edit)}
                  style={nested_button}
                >
                  Configure
                </button>

                <button
                  onClick={() => {
                    setQuiz(quiz)
                    navigate(routes.train)
                  }}
                  style={{
                    ...nested_button,
                    'border-radius': '0 50px 50px 0',
                    'font-weight': 'bold',
                  }}
                >
                  Start
                </button>
              </div>
            </li>
          )
        }}
      </For>

      {/* <li>
        <NewQuizButton />
      </li> */}
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
      style={style.group.button}
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
        ...style.group.button,
      }}
      type='button'
    >
      New Quiz
    </button>
  )
}
