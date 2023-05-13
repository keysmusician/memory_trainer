import { createStore } from 'solid-js/store'
import { createSignal, Match, Switch } from 'solid-js'
import { StartScreen } from './screens/StartScreen'
import { defaultQuiz, Quiz } from './quizzes'
import { TrainScreen } from './screens/TrainScreen'
import { ScoreScreen } from './screens/ScoreScreen'
import { title } from './Styles.module.css'


export type Screen = 'Start' | 'Train' | 'Score'

/**
 * Memory Trainer application root component.
 */
function MemoryTrainer() {

  const [quiz, setQuiz] = createStore<Quiz>({...defaultQuiz})

  const [screen, setScreen] = createSignal<Screen>('Start')

  return (
    <main>
      <h1 class={title}>Memory Trainer</h1>

      <div id="memory_trainer">
        <Switch fallback={
          <StartScreen
            setScreenName={setScreen}
            setQuiz={setQuiz}
          />
        }>
          <Match when={screen() === 'Train'}>
            <TrainScreen setScreen={setScreen} quiz={quiz}/>
          </Match>

          <Match when={screen() === 'Score'}>
            <ScoreScreen setScreen={setScreen} />
          </Match>
        </Switch>
      </div>
    </main>
  )
}

export default MemoryTrainer
