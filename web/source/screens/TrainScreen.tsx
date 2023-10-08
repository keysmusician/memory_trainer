import { MemoryTrainerApp, MemoryTrainerInputs } from "../MemoryTrainer"
import { createReaction, createSignal } from "solid-js"
import { useScreen } from "../App"
import { Quiz } from "../quizzes"
import {
  quit_button,
  standard_text,
  training_buttons,
  verdict
} from '../Styles.module.css'

type GetQuestionType<C extends Quiz> = C extends Quiz<infer Q> ? Q : unknown;


interface TrainScreenProps {
  quiz: Quiz
}
export function TrainScreen(props: TrainScreenProps) {

  const [response, set_response] = createSignal()

  const [question, set_question] = createSignal<unknown>()

  const [screen, setScreen] = useScreen()!;

  const question_render_root = document.createElement("div")

  const verdict_render_area = <div class={verdict} />

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

  const on_grade = props.quiz.on_grade ?
    props.quiz.on_grade(verdict_render_area) : undefined

  const quizSettings: MemoryTrainerInputs<any, any> = {
    ...props.quiz,
    set_question: set_question,
    fetch_response: fetch_response,
    on_grade: on_grade,
  }

  new MemoryTrainerApp(quizSettings).train().then(() => setScreen('Score'))

  return (
    <div
      style={{
        display: 'flex',
        "flex-direction": 'column',
        "align-items": 'center',
        "justify-content": 'center',
        height: '100%'
      }}
    >
      {verdict_render_area}

      <div>
        <props.quiz.renderer question={question()} />
      </div>

      <div style={{ margin: "1em" }}>
        <props.quiz.response_fetcher
          set_response={set_response}
          quiz={props.quiz}
        />
      </div>

      <div class={training_buttons}>
        <button
          class={quit_button}
          onClick={() => setScreen('Start')}
          type="button"
        >
          Quit
        </button>
      </div>
    </div>
  )
}
