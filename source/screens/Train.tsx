import { JSX, createReaction, createSignal, getOwner, runWithOwner } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { AppNavigator, routes, useQuiz as useQuizBuilder } from "../App"
import { ClosedUnitIntervalMember, TrainingHistory } from "../quiz"
import { style } from "../Style"


export function TrainScreen() {
  const [quizBuilder, _] = useQuizBuilder()

  const [answerKeyIndex, setAnswerKeyIndex] = createSignal<number | undefined>()

  const question = () => quizBuilder.answerKey.questions[answerKeyIndex()!] // TODO: Handle undefined case

  // const [questionsAskedCount, setQuestionsAskedCount] = createSignal(0)

  // createEffect(() => {
  //   questionIndex()
  //   setQuestionsAskedCount((questionsAskedCount) => questionsAskedCount + 1)
  // })

  const answer = () => quizBuilder.answerKey.answers[answerKeyIndex()!]

  const [response, setResponse] = createSignal<any>(undefined,
    { equals: () => false }) // Force a reaction to every update, even if the value is the same.

  const [feedback, setFeedback] = createSignal<any>()

  // const [trainingHistory, setTrainingHistory] = createSignal<TrainingHistory>(new TrainingHistory())
  // const _trainingHistory = setTrainingHistory((trainingHistory) => {
  //   return new TrainingHistory(...trainingHistory, {
  //     grade: quiz.evaluator(response(), answer()),
  //     // feedback: quiz.feedback(response(), answer()),
  //     question: question(),
  //     questionIndex: questionIndex()!,
  //     questionsAskedCount: questionsAskedCount++,
  //     answer: answer(),
  //     response: response(),
  //     timeStamp: Date.now(),
  //   })
  // })

  // createEffect(() => {
  //   setTrainingHistory((trainingHistory) => {
  //     return new TrainingHistory(...trainingHistory, {
  //       grade: response() ? quizBuilder.evaluator(response(), answer()) : null,
  //       question: question(),
  //       questionIndex: questionIndex()!,
  //       questionsAskedCount: questionsAskedCount(),
  //       answer: answer(),
  //       response: response(),
  //       timeStamp: Date.now(),
  //     })
  //   })
  // })

  const owner = getOwner();

  const awaitResponse = () => new Promise((resolve) =>
    runWithOwner(owner, () => {
      const resolveResponseWhen = createReaction(() => {
        resolve(response())
      })

      // Will execute the reaction one time when the response changes:
      resolveResponseWhen(() => response())
    })
  )

  const navigate = useNavigate() as AppNavigator

  quizBuilder.coordinator.train({
    answerKey: quizBuilder.answerKey,
    trainingAlgorithm: quizBuilder.trainingAlgorithm,
    userInterface: {
      setAnswerKeyIndex: setAnswerKeyIndex,
      setFeedback: setFeedback,
      awaitResponse: awaitResponse,
    },
  }).then(() => navigate(routes.score))

  return (
    <section
      style={style.group.contentBox}
    >
      <quizBuilder.layout
        answerKey={quizBuilder.answerKey}
        answer={answer()}
        question={question()}
        feedback={feedback()}
        setResponse={setResponse}
      // trainingHistory={trainingHistory()}
      />

      <div style={{
        'justify-content': 'space-around',
        margin: style.layout.primaryMargin,
      }}>
        <button
          style={style.group.button as JSX.CSSProperties}
          onClick={() => navigate(routes.start)}
          type="button"
        >
          Quit
        </button>
      </div>
    </section>
  )
}
