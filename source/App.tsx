import { createStore } from 'solid-js/store'
import {
  createContext,
  useContext,
  Setter,
  createEffect,
  createSignal,
  For,
  Show,
  on,
  onMount,
  JSXElement,
} from 'solid-js'
import {
  CreateScreen,
  EditScreen,
  ScoreScreen,
  StartScreen,
  TrainScreen,
} from './screens/Screens.barrel'
import { IQuizBuilder } from './quiz'
import { empty_quiz } from './quizzes/quizzes'
import { Router, Routes, Route, useLocation } from '@solidjs/router'
import { style } from './Style'
import { Button } from './Button'
import { null_student, Student } from './Student'
import { getRandomPhoto } from './backgrounds'


export namespace routes {
  export const start = '/'
  export const train = '/train'
  export const score = '/score'
  export const edit = '/edit'
  export const create = '/create'
}

export type AppRoute = typeof routes[keyof typeof routes]

export type AppNavigator = (route: AppRoute, params?: Record<string, string>) => void

const [student, setStudent] = createStore<Student>(null_student);

const [quizValue, setQuizValue] = createStore<IQuizBuilder>(empty_quiz)

const QuizContext = createContext<[IQuizBuilder, Setter<IQuizBuilder>]>([quizValue, setQuizValue])

export const useQuiz = () => useContext(QuizContext)!

const [students, setStudents] = createStore<Student[]>([])

function loadStudents() {
  const storedStudents = localStorage.getItem('students')
  if (storedStudents) {
    setStudents(JSON.parse(storedStudents))
  }
}


/**
 * Memory Trainer application root component.
 */
function App() {
  onMount(() => {
    loadStudents()
  })

  return (
    <Frame>
      <Router>
        <QuizContext.Provider value={[quizValue, setQuizValue]}>
          <BackgroundImage />

          <Header>
            <ProfileButton
              student={student}
              setStudent={setStudent}
            />
          </Header>

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
    </Frame>
  )
}

function Frame(props: { children: JSXElement }) {
  return (
    <div
      style={{
        'display': 'flex',
        'flex-direction': 'column',
        'height': '100vh',
        'width': '100%',
        'min-width': '0',
        'margin': '0',
        'padding': '2.5rem',
        'box-sizing': 'border-box',
      }}
    >
      {props.children}
    </div>
  )
}

function BackgroundImage() {
  const cleanString = (dirtyString: string) => dirtyString
    .replace(' ', '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')

  const backgroundImage = () => quizValue.backgroundImage ?? getRandomPhoto(quizValue.title)

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
        'top': '0',
        'left': '0',
        'width': '100vw',
        'object-fit': 'cover',
        'z-index': '-1',
      }}
      alt='background'
      onLoad={() => setLoading(false)}
      elementtiming={''}
      fetchpriority={'auto'}
    />
  )
}

function Header(props: { children?: JSXElement }) {
  const [quiz] = useQuiz()
  const location = useLocation()
  const isCompact = () => location.pathname === routes.edit || location.pathname === routes.train
  const isTraining = () => location.pathname === routes.train

  return (
    <>
      <header
        style={{
          'display': 'flex',
          'flex-direction': 'column',
          'align-items': 'center',
          'flex': '0 0 auto',
          'align-self': 'stretch',
          'position': 'relative',
          'width': 'calc(100% + 5rem)',
          'margin-top': '-2.5rem',
          'margin-left': '-2.5rem',
          'box-sizing': 'border-box',
          'padding': isCompact() ? '.5rem 1rem' : '0',
          'box-shadow': isCompact() ? '0 4px 5px -4px rgba(0, 0, 0, .24)' : 'none',
          'transition': 'padding 250ms ease, box-shadow 250ms ease',
        }}
      >
        <h1 style={{
          ...style.group.title,
          'font-size': isCompact() ? '2rem' : 'clamp(2rem, 7vw, 5rem)',
          'line-height': '1.1',
          'padding': '0',
          'margin': '0',
          'transition': 'font-size 250ms ease',
        }}>Memory Trainer</h1>
        {props.children}
      </header>
      <Show when={isTraining()}>
        <h2
          style={{
            ...style.group.baseText,
            'font-size': '1.3rem',
            'align-self': 'center',
            'width': 'fit-content',
            'margin': '.5rem auto 0',
            'padding': '.35rem .75rem',
            'border-radius': '.5rem',
            'background-color': 'rgba(255, 255, 255, .55)',
            'box-shadow': '0 2px 6px rgba(0, 0, 0, .12)',
            'opacity': '1',
            'transition': 'opacity 250ms ease',
          }}
        >
          {quiz.title}
        </h2>
      </Show>
    </>
  )
}

interface ProfileButtonProps {
  student: Student
  setStudent: Setter<Student>
}
function ProfileButton(props: ProfileButtonProps) {
  const [hovered, setHovered] = createSignal(false)

  const noProfilesExist = () => {
    return (
      student.id === null_student.id &&
      students.length === 0
    )
  }

  var icon = props.student.icon ?
    <img
      src={props.student.icon}
      alt="Profile Icon"
      style={{
        'border-radius': '50%',
        'width': '32px',
        'height': '32px',
        'object-fit': 'cover',
      }}
      elementtiming=""
      fetchpriority="auto"
    /> :
    style.iconography.user();

  var dialogRef: HTMLDialogElement | undefined;

  var buttonText = noProfilesExist() ?
    'Create Profile' :
    (
      props.student.id === null_student.id ?
        'Select Profile' :
        props.student.name
    )

  return (
    <>
      <article
        style={{
          ...style.group.border,
          'padding': '.25rem',
          'position': 'absolute',
          'top': '50%',
          'right': '1rem',
          'transform': 'translateY(-50%) scale(.75)',
          'transform-origin': 'right center',
          'display': 'inline-flex',
          'align-items': 'center',
          'cursor': 'pointer',
          'background-color': hovered() ? style.color.button.primaryHovered : style.color.button.primary,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => dialogRef?.showModal()}
      >
        <div
          style={{
            ...style.group.border,
            'padding': '5px',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'margin-right': '.5rem',
            'border-radius': '50%',
            'background-color': style.color.contentBackground,

          }}
        >
          {icon}
        </div>

        <span
          style={{
            'font-family': `${style.typography.typeface.primary}, ${style.typography.typeface.secondary}`,
            'font-size': '1rem',
            'color': style.color.secondary,
          }}
        >
          {buttonText}
        </span>
      </article>
      {
        noProfilesExist() ?
          <CreateProfileDialog
            setStudent={props.setStudent}
            dialogRef={dialogRef}
          /> :
          <SelectProfileDialog
            setStudent={props.setStudent}
            dialogRef={dialogRef}
          />
      }
    </>
  )
}

interface CreateProfileDialogProps {
  setStudent: Setter<Student>
  dialogRef: HTMLDialogElement | undefined
}
function CreateProfileDialog(props: CreateProfileDialogProps) {
  const [name, setName] = createSignal('')

  const handleSubmit = () => {
    const newStudent: Student = {
      id: Symbol(),
      name: name(),
      icon: null_student.icon
    }

    students.push(newStudent)
    props.setStudent(newStudent)
    props.dialogRef?.close()
  }

  return (
    <dialog
      ref={props.dialogRef}
      style={{
        'align-items': 'center',
        'justify-content': 'center',
        'flex-direction': 'column',
        'position': 'absolute',
        'margin': 'auto',
        'padding': '1rem',
        'border-radius': '8px',
        'background-color': style.color.contentBackground,
      }}
    >
      <button
        style={{
          'position': 'absolute',
          'top': '0rem',
          'right': '0rem',
          'border': 'none',
          'background-color': 'transparent',
          'margin': '0.5rem',
          'cursor': 'pointer',
          'font-size': '1rem',
        }}
        onClick={() => {
          props.dialogRef?.close()
        }}
      >
        {style.iconography.close()}
      </button>

      <h2 style={{
        ...style.group.title,
        'margin': '0',
      }}>Create Profile</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name()}
        onInput={(e) => setName(e.currentTarget.value)}
        style={{
          ...style.group.baseText,
          width: '100%',
          margin: '.5rem 0',
          padding: '.5rem',
          'border-radius': '.25rem',
          border: `1px solid ${style.color.focused}`,
        }}
      />

      <Button
        onClick={handleSubmit}
      >
        Create Profile
      </Button>
    </dialog>
  )

}

// This modal is just a placeholder for now, I'll probably replace it with an animated popup menu or something later.
interface SelectProfileDialogProps {
  setStudent: Setter<Student>
  dialogRef: HTMLDialogElement | undefined
}
function SelectProfileDialog(props: SelectProfileDialogProps) {
  return (<dialog
    ref={props.dialogRef}
    style={{
      'align-items': 'center',
      'justify-content': 'center',
      'flex-direction': 'column',
      'position': 'absolute',
      'margin': 'auto',
      'padding': '1rem',
      'border-radius': '8px',
      'background-color': style.color.contentBackground,
    }}
  >
    <button
      style={{
        'position': 'absolute',
        'top': '0rem',
        'right': '0rem',
        'border': 'none',
        'background-color': 'transparent',
        'margin': '0.5rem',
        'cursor': 'pointer',
        'font-size': '1rem',
      }}
      onClick={() => {
        dialogRef?.close()
      }}
    >
      {style.iconography.close()}
    </button>

    <h2 style={{
      ...style.group.title,
      'margin': '0',
    }}>Profiles</h2>
    <ul>
      <For each={students}>
        {(student) => (
          <li>
            <button
              onClick={() => {
                props.setStudent(student)
                props.dialogRef?.close()
              }}
            >
              {student.name}
            </button>
          </li>
        )}
      </For>
    </ul>
  </dialog>)
}

export default App
