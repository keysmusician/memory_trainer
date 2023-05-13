import { MemoryTrainerApp, MemoryTrainerInputs } from "../MemoryTrainer"
import { Setter } from "solid-js"
import { Screen } from "../App"
import { Quiz } from "../quizzes"
import { quit_button, submit_button, response_box, standard_text} from './Styles.module.css'


interface TrainScreenProps {
  setScreen: Setter<Screen>
  quiz: Quiz
}
export function TrainScreen(props: TrainScreenProps) {
  const question_render_root = document.createElement("div")

  const verdict_render_area = <div class={standard_text} />

  const answer_submit_button = (
    <button class={submit_button}>Submit</button>
  ) as HTMLButtonElement

  const user_input_element = (
    <input type="text" class={response_box} title="Please enter a response"/>
  ) as HTMLInputElement

  const on_grade = props.quiz.on_grade ?
    props.quiz.on_grade(verdict_render_area) : undefined

  const quizSettings: MemoryTrainerInputs<any, any> = {
    ...props.quiz,
    renderer: new props.quiz.renderer(question_render_root),
    fetch_response: props.quiz.fetch_response(
      answer_submit_button, user_input_element
    ),
    on_grade: on_grade,
  }

  new MemoryTrainerApp(quizSettings).train().then(
    () => props.setScreen('Score')
  )

  return (
    <>
      {verdict_render_area}

      <div style={{ 'margin': '25px' }}>
        {question_render_root}
      </div>

      <form
        action=""
        id="answer_form"
        onsubmit={submit_event => submit_event.preventDefault()}
        style={{
          "display": "flex",
          "flex-direction": 'column',
          "align-items": "center",
        }}
      >
        <label for="user_input" class={standard_text} title="Answer"/>
        {user_input_element}
        {answer_submit_button}
      </form>

      <button
        class={quit_button}
        onClick={() => props.setScreen('Start')}
      >
        Quit
      </button>
    </>
  )
}
