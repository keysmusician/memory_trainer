import { For, JSX, createSignal, onCleanup, onMount } from 'solid-js'
import { arc, pie, PieArcDatum } from 'd3-shape'
import { ResponseFetcherProps } from '../quiz'
import { Mora } from '../quizzes/japanese/_mora'

const consonants = [
  'k',
  'g',
  's',
  'z',
  't',
  'd',
  'n',
  'h',
  'b',
  'p',
  'm',
  'y',
  'r',
  'w',
]

const vowels = ['a', 'i', 'u', 'e', 'o']
const radial_pie = pie<Mora>()
  .sort(null)
  .value(() => 1)
const radial_arc = arc<PieArcDatum<Mora>>()
  .innerRadius(24)
  .outerRadius(78)
  .padAngle(0.025)
  .cornerRadius(3)
type MoraGroup = {
  consonant: string
  moras: Mora[]
}

export function RadialMoraFetcher(props: ResponseFetcherProps<string, Mora, Mora>) {
  const [hoveredGroup, setHoveredGroup] = createSignal<string>()
  const [pinnedGroup, setPinnedGroup] = createSignal<string>()
  const [hoveredMora, setHoveredMora] = createSignal<string>()

  const availableMoras = [...new Set(props.answerKey.values())]
  const groups: MoraGroup[] = [
    {
      consonant: '-',
      moras: vowels
        .map(vowel => availableMoras.find(mora => mora.consonant === '' && mora.vowel === vowel))
        .filter((mora): mora is Mora => mora !== undefined),
    },
    ...consonants.map(consonant => ({
      consonant,
      moras: availableMoras.filter(mora =>
        mora.consonant === consonant && mora.vowel !== ''
      ),
    })),
  ].filter(group => group.moras.length > 0)

  const standaloneN = availableMoras.find(mora => mora.romanization === 'n')
  if (standaloneN) {
    groups.find(group => group.consonant === 'n')?.moras.push(standaloneN)
  }

  const activeGroup = () => pinnedGroup() ?? hoveredGroup()

  function chooseMora(mora: Mora) {
    setHoveredGroup(undefined)
    setPinnedGroup(undefined)
    props.setResponse(mora)
  }

  function toggleGroup(group: MoraGroup) {
    if (pinnedGroup() === group.consonant) {
      setPinnedGroup(undefined)
      setHoveredGroup(undefined)
      return
    }

    if (pinnedGroup() !== undefined) return

    setPinnedGroup(group.consonant)
  }

  function closeOnOutsideClick(event: MouseEvent) {
    const pinned = pinnedGroup()
    if (pinned === undefined || !(event.target instanceof Element)) return

    const clickedGroup = event.target
      .closest<HTMLElement>('[data-mora-consonant]')
      ?.dataset.moraConsonant

    if (clickedGroup !== pinned) {
      setPinnedGroup(undefined)
      setHoveredGroup(undefined)
    }
  }

  onMount(() => document.addEventListener('click', closeOnOutsideClick))
  onCleanup(() => document.removeEventListener('click', closeOnOutsideClick))

  const grid_style: JSX.CSSProperties = {
    'display': 'grid',
    'grid-template-columns': 'repeat(5, minmax(2.5em, 1fr))',
    'gap': '0.75em',
    'width': '100%',
    'padding': '4em 1em',
    'box-sizing': 'border-box',
  }

  return (
    <div
      style={{
        'width': '90vw',
        'min-width': '0',
        'max-width': '90vw',
        'box-sizing': 'border-box',
      }}
    >
      <div style={grid_style}>
        <For each={groups}>
          {(group) => {
            const isOpen = () => activeGroup() === group.consonant
            const wedges = radial_pie(group.moras)

            return (
              <div
                data-mora-consonant={group.consonant}
                style={{
                  'position': 'relative',
                  'z-index': isOpen() ? 10 : 1,
                  'display': 'flex',
                  'justify-content': 'center',
                }}
                onMouseLeave={() => {
                  if (pinnedGroup() === undefined && hoveredGroup() === group.consonant) {
                    setHoveredGroup(undefined)
                  }
                }}
              >
                <button
                  type='button'
                  aria-label={`Open ${group.consonant === '-' ? 'vowel' : group.consonant} mora options`}
                  aria-expanded={isOpen()}
                  style={{
                    'position': 'relative',
                    'z-index': 21,
                    'display': 'grid',
                    'place-items': 'center',
                    'width': '2.75em',
                    'height': '2.75em',
                    'padding': '0',
                    'font-size': '1.1em',
                    'border-radius': '50%',
                    'background-color': isOpen() ? '#dbeafe' : 'white',
                    'cursor': 'pointer',
                    'transition': 'background-color 120ms ease-out',
                  }}
                  onMouseEnter={() => {
                    if (pinnedGroup() === undefined) setHoveredGroup(group.consonant)
                  }}
                  onClick={() => toggleGroup(group)}
                >
                  {group.consonant}
                </button>
                <svg
                  viewBox='0 0 180 180'
                  role='group'
                  aria-label={`${group.consonant} mora options`}
                  aria-hidden={!isOpen()}
                  style={{
                    'position': 'absolute',
                    'left': '50%',
                    'top': '50%',
                    'width': '180px',
                    'height': '180px',
                    'overflow': 'visible',
                    'z-index': 20,
                    'opacity': isOpen() ? 1 : 0,
                    'pointer-events': isOpen() ? 'auto' : 'none',
                    'transform': isOpen()
                      ? 'translate(-50%, -50%) scale(1)'
                      : 'translate(-50%, -50%) scale(0.35)',
                    'transition': 'transform 180ms ease-out, opacity 180ms ease-out',
                  }}
                >
                  <g transform='translate(90 90)'>
                    <For each={wedges}>
                      {(wedge) => {
                        const [labelX, labelY] = radial_arc.centroid(wedge)
                        const path = radial_arc(wedge) ?? ''

                        return (
                          <g
                            role='button'
                            tabindex={isOpen() ? 0 : -1}
                            aria-label={`Choose ${wedge.data.romanization}`}
                            style={{ 'cursor': isOpen() ? 'pointer' : 'default' }}
                            onMouseEnter={() => setHoveredMora(wedge.data.romanization)}
                            onMouseLeave={() => {
                              if (hoveredMora() === wedge.data.romanization) {
                                setHoveredMora(undefined)
                              }
                            }}
                            onFocus={() => setHoveredMora(wedge.data.romanization)}
                            onBlur={() => {
                              if (hoveredMora() === wedge.data.romanization) {
                                setHoveredMora(undefined)
                              }
                            }}
                            onClick={() => chooseMora(wedge.data)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault()
                                chooseMora(wedge.data)
                              }
                            }}
                          >
                            <path
                              d={path}
                              fill={hoveredMora() === wedge.data.romanization ? '#dbeafe' : 'white'}
                              stroke='#888'
                              stroke-width='2'
                              style={{ 'transition': 'fill 120ms ease-out' }}
                            />
                            <text
                              x={labelX}
                              y={labelY}
                              fill='#172554'
                              font-size='11'
                              font-weight='600'
                              text-anchor='middle'
                              dominant-baseline='middle'
                              pointer-events='none'
                            >
                              {wedge.data.romanization}
                            </text>
                          </g>
                        )
                      }}
                    </For>
                  </g>
                </svg>
              </div>
            )
          }}
        </For>
      </div>
    </div>
  )
}
