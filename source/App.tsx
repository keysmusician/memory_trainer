import { createStore } from 'solid-js/store'
import {
  createContext,
  useContext,
  Setter,
  createEffect,
  createSignal,
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


/**
 * Memory Trainer application root component.
 */
function App() {
  return (
    <Router>
      <QuizContext.Provider value={[quizValue, setQuizValue]}>
        <BackgroundImage />

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

            {/* <Route path={routes.create} element={<CreateScreen />} /> */}

            <Route path={routes.train} element={<TrainScreen />} />

            <Route path={routes.score} element={<ScoreScreen />} />
          </Routes>
        </section>
      </QuizContext.Provider>
    </Router >
  )
}

function BackgroundImage() {
  const cleanString = (dirtyString: string) => dirtyString
    .replace(' ', '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')

  const backgroundImage = () => quizValue.background_image ??
    `https://source.unsplash.com/1600x900/?${cleanString(quizValue.title)}`

  const [transitioning, setTransitioning] = createSignal(false)

  const [loading, setLoading] = createSignal(false)

  let backgroundImageRef;

  const fadeDuration = 500

  createEffect(() => {
    backgroundImage()
    setLoading(true)
    setTransitioning(true)
    backgroundImageRef!.animate(
      [{ opacity: '0' }],
      { duration: fadeDuration, fill: 'forwards' }
    ).onfinish = () => {
      backgroundImageRef!.src = backgroundImage()
      setTransitioning(false)
    }
  })

  createEffect(() => {
    if (!loading() && !transitioning()) {
      backgroundImageRef!.animate(
        [{ opacity: '.5' }],
        { duration: fadeDuration, fill: 'forwards' }
      )
    }
  })

  return (
    <img
      ref={backgroundImageRef}
      style={{
        'display': 'flex',
        'opacity': '0',
        'flex-direction': 'column',
        'height': '100vh',
        'position': 'fixed',
        'width': '100%',
        'z-index': '-1',
      }}
      alt='background'
      onLoad={() => setLoading(false)}
      elementtiming={''}
      fetchpriority={'auto'}
    />
  )
}

export default App
