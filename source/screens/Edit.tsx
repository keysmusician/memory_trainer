import { For, Setter, createEffect, createSignal } from "solid-js"
import { StartButton } from "./Start"
import { AppNavigator, routes, useQuiz } from "../App"
import { style } from "../Style"
import { Quiz } from "../quiz";
import { useNavigate } from "@solidjs/router";


export function EditScreen() {
  const [quiz, setQuiz] = useQuiz()!;

  return (
    <div
      style={{
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'center',
        'gap': '1em',
      }}
    >
      <h2>
        Editing <i>{quiz.title}</i>
      </h2>

      <AnswerKeyEditor quiz={quiz} setQuiz={setQuiz} />

      <div style={{ 'display': 'flex', 'gap': '1em', 'flex-direction': 'row' }}>

        <HomeButton />

        <StartButton />

      </div>

    </div >
  )
}

type EditingQuiz = Quiz<string, string, string> &
{ unselected_answer_key?: Map<string, string> }

interface AnswerKeyEditorProps {
  quiz: EditingQuiz
  setQuiz: Setter<EditingQuiz>
}
function AnswerKeyEditor(props: AnswerKeyEditorProps) {
  if (!props.quiz.unselected_answer_key) {
    props.setQuiz((quiz) => {
      console.log(quiz)
      quiz.unselected_answer_key = new Map()
      return quiz
    })
  }

  const [unselectedAnswerKey, setUnselectedAnswerKey] = createSignal(new Map<string, string>())

  createEffect(() => {
    props.quiz.unselected_answer_key = unselectedAnswerKey()
  })

  return (
    <div
      style={{
        'overflow-y': 'auto',
        'max-height': '50vh',
      }}
    >
      <table
        style={{
          'border-collapse': 'separate',
          'border-spacing': '0.5rem',
        }}
      >
        <caption>Answer Key</caption>
        <thead
          style={{
            position: 'sticky',
            top: 0,
          }}
        >
          <tr
            style={{
              'border-bottom': '1px solid black',
              'background-color': 'white',
            }}
          >
            <th>#</th>
            <th>Include</th>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          <For each={Array.from(props.quiz.answer_key).concat(
            Array.from(props.quiz.unselected_answer_key ?? [])
          )
          }>
            {([question, answer], index) => {
              const questionIsIncluded = props.quiz.answer_key.has(question)

              return (
                <tr>
                  <td>{index() + 1}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={questionIsIncluded}
                      onclick={() => {
                        if (questionIsIncluded) {
                          props.quiz.answer_key.delete(question)
                          setUnselectedAnswerKey(() =>
                            unselectedAnswerKey().set(question, answer))
                        }
                        else {
                          props.quiz.answer_key.set(question, answer)
                          setUnselectedAnswerKey((unselectedAnswerKey) => {
                            unselectedAnswerKey.delete(question);
                            return unselectedAnswerKey
                          })
                        }
                      }}
                    />
                  </td>
                  <td>{JSON.stringify(question)}</td>
                  <td>{JSON.stringify(answer)}</td>
                </tr>
              )
            }}
          </For>
        </tbody>
      </table >
    </div>
  )
}


export function HomeButton() {
  const navigate = useNavigate() as AppNavigator

  return (
    <button
      onClick={() => navigate(routes.start)}
      style={{
        ...style.group.button,
        'margin-left': '0.5rem'
      }}
    >
      Home
    </button>
  )
}
