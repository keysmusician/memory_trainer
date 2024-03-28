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

const unselectedAnswerKeys: Map<string, Map<string, string>> = new Map()

type EditingQuiz = Quiz<string, string, string> &
{ unselected_answer_key?: Map<string, string> }

interface AnswerKeyEditorProps {
  quiz: EditingQuiz,
  setQuiz: Setter<EditingQuiz>
}
function AnswerKeyEditor(props: AnswerKeyEditorProps) {
  const [selectedAnswerKey, setSelectedAnswerKey] = createSignal(
    props.quiz.answer_key, { "equals": _ => false }
  )

  const [unselectedAnswerKey, setUnselectedAnswerKey] = createSignal(
    unselectedAnswerKeys.get(props.quiz.title) ?? new Map<string, string>(),
    { "equals": _ => false }
  )

  function answerKey() {
    const answerKey: { question: string, answer: string, selected: boolean }[] =
      []

    selectedAnswerKey().forEach((answer, question) => {
      answerKey.push({ question, answer, selected: true })
    })

    unselectedAnswerKey().forEach((answer, question) => {
      answerKey.push({ question, answer, selected: false })
    })

    return answerKey
  }

  createEffect(() => {
    props.setQuiz({
      ...props.quiz,
      answer_key: selectedAnswerKey()
    })
    unselectedAnswerKeys.set(props.quiz.title, unselectedAnswerKey())
  })

  const tableCellStyle = {
    'padding': '0.5rem',
  }

  const TableData = (props: any) =>
    <td
      style={{
        ...tableCellStyle,
        'border-bottom': '1px solid black',

      }}
    >
      {props.children}
    </td>

  return (
    <div
      style={{
        'overflow-y': 'auto',
        'max-height': '50vh',
        'backdrop-filter': 'blur(5px)',
        'background-color': 'rgba(255, 255, 255, 0.5)',
        'border-radius': '1rem',
      }}
    >
      <table
        style={{
          'border-collapse': 'separate',
          'border-spacing': '0rem',
        }}
      >
        <caption>
          <h3>
            Answer Key
          </h3>
        </caption>
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
              'box-shadow': '0 .5rem .5rem 0 rgba(255, 255, 255, 1)'
            }}
          >
            <th style={tableCellStyle}>#</th>
            <th style={tableCellStyle}>Include</th>
            <th style={tableCellStyle}>Question</th>
            <th style={tableCellStyle}>Answer</th>
          </tr>
        </thead>
        <tbody>
          <For each={answerKey()}>
            {({ question, answer, selected }, index) => {

              return (
                <tr>
                  <TableData>{index() + 1}</TableData>
                  <TableData>
                    <input
                      type="checkbox"
                      checked={selected}
                      onclick={() => {
                        if (selected) {
                          setUnselectedAnswerKey(() =>
                            unselectedAnswerKey().set(question, answer)
                          )
                          setSelectedAnswerKey(() => {
                            selectedAnswerKey().delete(question)
                            return selectedAnswerKey()
                          })
                        }
                        else {
                          setSelectedAnswerKey(() =>
                            selectedAnswerKey().set(question, answer)
                          )
                          setUnselectedAnswerKey((unselectedAnswerKey) => {
                            unselectedAnswerKey.delete(question);
                            return unselectedAnswerKey
                          })
                        }
                      }}
                    />
                  </TableData>
                  <TableData>{JSON.stringify(question)}</TableData>
                  <TableData>{JSON.stringify(answer)}</TableData>
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
