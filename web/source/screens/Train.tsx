import { MemoryTrainerApp, MemoryTrainerInputs } from "../MemoryTrainer"
import { createReaction, createSignal } from "solid-js"
import { AppNavigator, routes, useQuiz } from "../App"
import { Quiz } from "../quizzes"
// import {
//   training_buttons,
//   verdict
// } from '../Styles.module.css'
import { useNavigate } from "@solidjs/router"
import { style, styleGroup } from "../Style"


type GetQuestionType<C extends Quiz> = C extends Quiz<infer Q> ? Q : unknown;

export function TrainScreen() {

  const [response, set_response] = createSignal()

  const [question, set_question] = createSignal<unknown>()

  const navigate = useNavigate() as AppNavigator

  const [quiz, setQuiz] = useQuiz()

  const question_render_root = document.createElement("div")

  const verdict_render_area = <div style={styleGroup.baseText} />

  async function fetch_response() {
    return new Promise((resolve) => {
      const trackResponse = createReaction(() => {
        resolve(response()!)
        set_response(undefined)
      }
      )
      trackResponse(() => response())
    })
  }

  const on_grade = quiz.on_grade ?
    quiz.on_grade(verdict_render_area) : undefined

  const quizSettings: MemoryTrainerInputs<any, any> = {
    ...quiz,
    set_question: set_question,
    fetch_response: fetch_response,
    on_grade: on_grade,
  }

  new MemoryTrainerApp(quizSettings).train().then(() => navigate(routes.score))

  return (
    <div
      style={styleGroup.contentBox}
    >
      {verdict_render_area}

      <div>
        <quiz.renderer question={question()} />
      </div>

      <div style={{ margin: "1em" }}>
        <quiz.response_fetcher
          set_response={set_response}
          quiz={quiz}
        />
      </div>

      <div style={{
        'justify-content': 'space-around',
        margin: style.layout.primaryMargin,
      }}>
        <button
          style={styleGroup.button}
          onClick={() => navigate(routes.start)}
          type="button"
        >
          Quit
        </button>
      </div>
    </div>
  )
}
