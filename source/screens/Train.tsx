import { JSX, createEffect, createReaction, createSignal, getOwner, runWithOwner, on } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { AppNavigator, routes, useQuiz as useQuizBuilder } from "../App"
import { NonNegativeNumber, TrainingSessionHistory } from "../quiz"
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

  const [trainingSessionHistory, setTrainingSessionHistory] = createSignal(
    new TrainingSessionHistory()
  )

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

  createEffect(on(answerKeyIndex, (currentAnswerKeyIndex) => {
    if (currentAnswerKeyIndex === undefined) return

    setTrainingSessionHistory((trainingHistory) => new TrainingSessionHistory(...trainingHistory, {
        type: 'question',
        question: question(),
        questionIndex: currentAnswerKeyIndex,
        questionsAskedCount: new NonNegativeNumber(trainingHistory.filter((event) => event.type === 'question').length + 1),
        answer: answer(),
        timestamp: Date.now(),
      }))
  }))

  createEffect(on(response, (currentResponse) => {
    if (currentResponse === undefined) return

    setTrainingSessionHistory((trainingHistory) => new TrainingSessionHistory(
      ...trainingHistory,
      { type: 'response', response: currentResponse, timestamp: Date.now() }
    ))
  }))

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
      setGrade: (grade) => {
        setTrainingSessionHistory((trainingHistory) => new TrainingSessionHistory(
          ...trainingHistory,
          { type: 'grade', grade, timestamp: Date.now() }
        ))
      },
      setFeedback: (newFeedback) => {
        setFeedback(newFeedback)
        setTrainingSessionHistory((trainingHistory) => new TrainingSessionHistory(
          ...trainingHistory,
          { type: 'feedback', feedback: newFeedback, timestamp: Date.now() }
        ))
      },
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
        trainingSessionHistory={trainingSessionHistory()}
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
