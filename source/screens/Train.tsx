import { JSX, createReaction, createSignal, getOwner, runWithOwner } from "solid-js"
import { useNavigate } from "@solidjs/router"
import { AppNavigator, routes, useQuiz } from "../App"
import { TrainingHistory } from "../quiz"
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

  const [response, setResponse] = createSignal(undefined,
    { equals: () => false }) // Force a reaction to every update, even if the value is the same.

  const [trainingHistory, setTrainingHistory] = createSignal<TrainingHistory>(new TrainingHistory())


  /* This is the new main training loop */
  async function train(): Promise<void> {
    const owner = getOwner();
    var questionsAskedCount = 1

    while (!trainer.is_complete) {
      setQuestionIndex(trainer.current_question)

      // Wait for the user to respond to the question
      const trainingHistory = await new Promise<TrainingHistory>((resolve) =>
        runWithOwner(owner, () => {
          const askedAt = Date.now()

          const createTrainingHistoryWhen = createReaction(() => {

            const _trainingHistory = setTrainingHistory((trainingHistory) =>
              new TrainingHistory(...trainingHistory, {
                grade: quiz.evaluator(response(), answer()),
                question: question(),
                questionsAskedCount: questionsAskedCount++,
                answer: answer(),
                response: response(),
                responseTime: Date.now() - askedAt,
              })
            )

            resolve(_trainingHistory)
          })

          // Will execute the reaction one time when the response changes:
          createTrainingHistoryWhen(() => response())
        })
      )

      if (!quiz.onResponse(trainingHistory)) { // Allows each quiz to determine if the user has passed the question and the grade should be registered with the Trainer. This is useful for quizzes that allow retries.
        // TODO: Allow quizzes to adjust grades before registering them, for example, to penalize regrades.
        continue
      }

      trainer.register(trainingHistory.last.grade)

      trainer.next_question()

      questionsAskedCount++
    }
  }

  const navigate = useNavigate() as AppNavigator

  train().then(() => navigate(routes.score))

  return (
    <section
      style={styleGroup.contentBox}
    >
      <quiz.layout
        quiz={quiz}
        answer={answer()}
        question={question()}
        trainingHistory={trainingHistory()}
        setResponse={setResponse}
      />

      <div style={{
        'justify-content': 'space-around',
        margin: style.layout.primaryMargin,
      }}>
        <button
          style={styleGroup.button as JSX.CSSProperties}
          onClick={() => navigate(routes.start)}
          type="button"
        >
          Quit
        </button>
      </div>
    </section>
  )
}
