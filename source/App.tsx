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
import { IQuiz } from './quiz'
import { empty_quiz } from './quizzes/quizzes'
import { Router, Routes, Route } from '@solidjs/router'
import { style } from './Style'


export namespace routes {
  export const start = '/'
  export const train = '/train'
  export const score = '/score'
  export const edit = '/edit'
  export const create = '/create'
}

export type AppRoute = typeof routes[keyof typeof routes]

export type AppNavigator = (route: AppRoute, params?: Record<string, string>) => void


const [quizValue, setQuizValue] = createStore<IQuiz>(empty_quiz);
const QuizContext = createContext<[IQuiz, Setter<IQuiz>]>([quizValue, setQuizValue]);

export function useQuiz() { return useContext(QuizContext)! }

const backgroundImage = () => quizValue.background_image ??
  `https://source.unsplash.com/1600x900/?${quizValue.title.replace(' ', '-').toLowerCase()}`

/**
 * Memory Trainer application root component.
 */
function App() {
  return (
    <>
      <div style={{
        'background-attachment': 'fixed',
        'background-image': `url(${backgroundImage()})`,
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'display': 'flex',
        'filter': 'opacity(.5)',
        'flex-direction': 'column',
        'height': '100vh',
        'position': 'fixed',
        'width': '100%',
        'z-index': '-1',
      }} />

      <Router>
        <QuizContext.Provider value={[quizValue, setQuizValue]}>
          <h1 style={{
            ...style.group.title,
            margin: ".5em",
          }}>Memory Trainer</h1>

          <section
            id='memory_trainer'
            style={style.group.contentBox}
          >
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
    </>
  )
}

export default App
