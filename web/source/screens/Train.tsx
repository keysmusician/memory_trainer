import { batch, createEffect, createReaction, createSignal, getOwner, on, runWithOwner, untrack } from "solid-js"
import { useNavigate } from "@solidjs/router"
// import { MemoryTrainerApp, MemoryTrainerInputs } from "../MemoryTrainer"
import { AppNavigator, routes, useQuiz } from "../App"
// import { Quiz } from "../quizzes/quizzes"
import { style, styleGroup } from "../Style"


// type GetQuestionType<C extends Quiz> = C extends Quiz<infer Q> ? Q : unknown;

export function TrainScreen() {
  const [quiz, _] = useQuiz()

  const questions = [...quiz.answer_key.keys()]

  const answers = [...quiz.answer_key.values()]

  const trainer = new quiz.training_algorithm(questions.length)

  const [questionIndex, setQuestionIndex] = createSignal(trainer.next_question())

  const question = () => questions[questionIndex()!]

  const answer = () => answers[questionIndex()!]

  const [response, setResponse] = createSignal()

  const [responseCount, setResponseCount] = createSignal(0)

  const [grade, setGrade] = createSignal()

  const [regrades, setRegrades] = createSignal(0)


  ///
  // const verdict_render_area = <div style={styleGroup.baseText} />

  // const owner = getOwner();

  // async function fetch_response() {
  //   return new Promise((resolve) =>
  //     runWithOwner(owner, () => {
  //       const trackResponse = createReaction(() => {
  //         resolve(response()!)
  //         set_response(undefined)
  //       })

  //       trackResponse(() => response())
  //     })
  //   )
  // }

  // const on_grade = quiz.on_grade ?
  //   quiz.on_grade(verdict_render_area) : undefined


  ///


  // const quizSettings: MemoryTrainerInputs<any, any> = {
  //   ...quiz,
  //   set_question: set_question,
  //   fetch_response: fetch_response,
  //   on_grade: on_grade,
  // }

  // async function fetch_response() {
  //   return new Promise((resolve) =>
  //     runWithOwner(owner, () => {
  //       const trackResponse = createReaction(() => {
  //         resolve(response()!)
  //         set_response(undefined)
  //       })

  //       trackResponse(() => response())
  //     })
  //   )
  // }

  const [registerGrade, setRegisterGrade] = createSignal<Boolean>(false)

  createEffect(on(responseCount, () => {
    setGrade(quiz.evaluator(answer(), response()))
    const registerGrade = quiz.onResponse({
      grade: grade(),
      question: question(),
      answer: answer(),
      responseCount: responseCount(),
      regrades: regrades(),
    })
    setRegisterGrade(registerGrade)
    setRegrades((regrades) => regrades + 1)
  }, { defer: true }))


  async function train(): Promise<void> {
    const owner = getOwner();

    const signalRegisterGrade = () => new Promise<void>(resolve => {
      runWithOwner(owner, () => {
        const trackRegisterGrade = createReaction(() => {
          resolve()
          setRegisterGrade(false)
          setRegrades(0)
        })

        trackRegisterGrade(() => registerGrade())
      })
    })

    while (!trainer.is_complete) {
      setQuestionIndex(trainer.current_question)

      await signalRegisterGrade()

      trainer.register(untrack(grade))

      trainer.next_question()
    }
  }

  const navigate = useNavigate() as AppNavigator

  // new MemoryTrainerApp(quizSettings).
  train().then(() => navigate(routes.score))

  return (
    <section
      style={styleGroup.contentBox}
    >
      <quiz.layout
        quiz={quiz}
        answer={answer()}
        question={question()}
        grade={grade()}
        regrades={regrades()}
        response={response()}
        setResponse={(response) => batch(() => {
          setResponseCount((responseCount) => responseCount + 1)
          setResponse(response)
        })}
        responseCount={responseCount()}
      />

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
    </section>
  )
}
