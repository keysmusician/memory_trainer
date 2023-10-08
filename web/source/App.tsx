import { createStore } from 'solid-js/store'
import {
  createSignal,
  createContext,
  useContext,
  Match,
  Switch,
  Accessor,
  Setter,
} from 'solid-js'
import {
  StartScreen,
  TrainScreen,
  ScoreScreen,
  EditScreen
} from './screens/Screens.barrel'
import { defaultQuiz, Quiz } from './quizzes'
import { title, content_box } from './Styles.module.css'


export type Screen = 'Start' | 'Train' | 'Score' | 'Edit'

const ScreenContext = createContext<[
  Accessor<Screen>,
  Setter<Screen>
]>(['Start', () => { }]);

export function useScreen() { return useContext(ScreenContext); }

/**
 * Memory Trainer application root component.
 */
function MemoryTrainer() {
  const [screen, setScreen] = createSignal<Screen>('Start')

  const [quiz, setQuiz] = createStore<Quiz>({ ...defaultQuiz })

  return (
    <ScreenContext.Provider value={[screen, setScreen]}>
      <h1 class={title}>Memory Trainer</h1>

      <section id="memory_trainer" class={content_box}>
        <Switch fallback={
          <StartScreen setQuiz={setQuiz} />
        }>

          <Match when={screen() === 'Edit'}>
            <EditScreen quiz={quiz} setQuiz={setQuiz} />
          </Match>

          <Match when={screen() === 'Train'}>
            <TrainScreen quiz={quiz} />
          </Match>

          <Match when={screen() === 'Score'}>
            <ScoreScreen />
          </Match>
        </Switch>
      </section>
    </ScreenContext.Provider>
  )
}

export default MemoryTrainer
