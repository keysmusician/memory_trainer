import { createStore } from 'solid-js/store'
import {
  createContext,
  useContext,
  Setter,
} from 'solid-js'
import {
  CreateScreen,
  EditScreen,
  ScoreScreen,
  StartScreen,
  TrainScreen,
} from './screens/Screens.barrel'
import { Quiz } from './quiz'
import { defaultQuiz, empty_quiz } from './quizzes'
import { Router, Routes, Route } from '@solidjs/router'
import { styleGroup } from './Style'


export namespace routes {
  export const start = '/'
  export const train = '/train'
  export const score = '/score'
  export const edit = '/edit'
  export const create = '/create'
}

export type AppRoute = typeof routes[keyof typeof routes]

export type AppNavigator = (route: AppRoute, params?: Record<string, string>) => void

const QuizContext = createContext<[
  Quiz,
  Setter<Quiz>
]>([new Quiz(empty_quiz), () => new Quiz(empty_quiz)]);

export function useQuiz() { return useContext(QuizContext)!; }

/**
 * Memory Trainer application root component.
 */
function App() {
  return (
    <Router>
      <QuizContext.Provider value={createStore<Quiz>(new Quiz(defaultQuiz))}>
        <h1 style={styleGroup.title}>Memory Trainer</h1>

        <section id='memory_trainer' style={styleGroup.contentBox}>
          <Routes>
            <Route path={[routes.start, '*']} element={<StartScreen />} />

            <Route path={routes.edit} element={<EditScreen />} />

            <Route path={routes.create} element={<CreateScreen />} />

            <Route path={routes.train} element={<TrainScreen />} />

            <Route path={routes.score} element={<ScoreScreen />} />
          </Routes>
        </section>
      </QuizContext.Provider>
    </Router >
  )
}

export default App
