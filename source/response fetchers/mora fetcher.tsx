import { For, JSX, Setter, createSignal, onCleanup, onMount } from "solid-js"
import { mora as moras } from "../answer keys/answer keys.barrel"
import { ResponseFetcherProps } from "../quiz";
import { Mora } from "../quizzes/japanese/_mora";

function lookupMora(consonant: string, vowel: string): Mora | undefined {
  consonant = ["c", "ch", "ts"].includes(consonant) ? "t" : consonant
  consonant = ["j"].includes(consonant) ? "z" : consonant
  consonant = ["sh"].includes(consonant) ? "s" : consonant
  consonant = ["f"].includes(consonant) ? "h" : consonant

  return Object.values(moras).find(mora =>
    mora.consonant === consonant &&
    mora.vowel === vowel
  )
}

function convertToGrid(
  moras: Mora[],
) {
  const vowels = ['a', 'i', 'u', 'e', 'o']

  const consonants = [
    // 'k',
    // 'g',
    // 's',
    // 'z',
    // 't',
    // 'd',
    // 'n',
    // 'h',
    // 'b',
    // 'p',
    // 'm',
    // 'y',
    // 'r',
    // 'w',
  ]

  const blank = null;

  const column_headers = [blank, ...vowels]

  const vowel_row = Array.from([blank, ...vowels],
    vowel => moras.find(mora => mora.romanization == vowel) ?? null
  )

  const grid_data: (string | Mora | null)[][] = [column_headers, vowel_row]

  for (const consonant of consonants) {
    const row: (string | Mora | null)[] = [consonant]

    let include_row = false

    for (const vowel of vowels) {
      const mora = lookupMora(consonant, vowel) ?? null

      if (mora) include_row = true

      row.push(mora)
    }

    if (include_row) grid_data.push(row)
  }

  const n = moras.find(mora => mora.consonant == "n")

  if (n) grid_data.push([blank, n])

  return grid_data
}

/**
 * Hiragana/Katakana mora fetcher.
 */
export function MoraFetcher(props: ResponseFetcherProps<string, Mora, Mora>) {

  const [format, setFormat] = createSignal<"romanization" | "ipa">("romanization")

  return (
    <div>
      <MoraGrid
        answerKey={props.quiz.answerKey}
        format={format}
        set_response={props.setResponse}
        answer={props.answer}
      />
      <FormatComboButton format={format} setFormat={setFormat} />
    </div>
  )
}

interface FormatComboButtonProps {
  format: () => "romanization" | "ipa"
  setFormat: Setter<"romanization" | "ipa">
}
function FormatComboButton(props: FormatComboButtonProps) {
  const button_style: JSX.CSSProperties = {
    'flex': '1',
    'text-align': 'center',
  }

  const selected_background_color = 'white'

  const unselected_background_color = 'whitesmoke'

  return (
    <div
      style={{
        'margin': '1em 0',
        'border': '1px solid black',
        'display': 'flex',
        'border-radius': "1em",
      }}
      onClick={
        () => props.setFormat(props.format() == "romanization" ? "ipa" : "romanization")
      }
      onMouseEnter={
        (e) => {
          e.currentTarget.style.backgroundColor = selected_background_color
          e.currentTarget.style.cursor = 'pointer'
        }
      }
      onMouseLeave={
        (e) => {
          e.currentTarget.style.backgroundColor = ''
          e.currentTarget.style.cursor = 'default'
        }
      }
    >
      <span
        style={{
          ...button_style,
          'color': props.format() == "romanization" ? 'black' : 'gray',
          'background-color': props.format() == "romanization" ? selected_background_color : unselected_background_color,
          'border-radius': '1em 0 0 1em',
        }}
      // disabled={props.format() == "romanization"}
      >Romanized</span>
      <span
        style={{
          'flex': '0 0 0px',
          'box-sizing': 'border-box',
          'border-left': '.5px solid black',
          'border-right': '.5px solid black',
        }}
      />
      <span
        style={{
          ...button_style,
          'color': props.format() == "ipa" ? 'black' : 'gray',
          'background-color': props.format() == "ipa" ? selected_background_color : unselected_background_color,
          'border-radius': '0 1em 1em 0',
        }}
      >IPA</span>
    </div>
  )
}

interface SelectedCell {
  consonant: string | undefined
  vowel: string | undefined
}

interface MoraGridProps {
  answerKey: Map<string, Mora>
  format: () => "romanization" | "ipa"
  set_response: Setter<Mora>
  answer: Mora
}
function MoraGrid(props: MoraGridProps) {
  const grid_style = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    'grid-gap': "0.5em",
  }

  const grid_data = convertToGrid([...new Set(props.answerKey.values())])

  const [selectedCell, setSelectedCell] = createSignal<SelectedCell>({
    consonant: undefined,
    vowel: undefined,
  })

  function keypressHandler(keyboardEvent: KeyboardEvent) {
    if ('aiueo'.includes(keyboardEvent.key)) {
      setSelectedCell(selected => ({
        consonant: selected.consonant,
        vowel: keyboardEvent.key
      }))
    }
    if ('kgszjtdcnhfbpmyrw'.includes(keyboardEvent.key)) {
      setSelectedCell(selected => ({
        consonant: keyboardEvent.key === "c" ? "ch" : keyboardEvent.key,
        vowel: selected.vowel
      }))
    }
  }

  const keysDown = new Set<string>()

  const selectedCellKey = () => `${selectedCell().consonant ?? ''}${selectedCell().vowel ?? ''}`

  function keyupHandler(keyboardEvent: KeyboardEvent) {
    keysDown.delete(keyboardEvent.key)

    const response: Mora | undefined = lookupMora(
      selectedCell().consonant ?? '',
      selectedCell().vowel ?? ''
    )

    if (keysDown.size === 0) {
      setSelectedCell({
        consonant: undefined,
        vowel: undefined,
      })

      if (response !== undefined) {
        props.set_response(response)
      }
    }
  }

  function keyDownHandler(keyboardEvent: KeyboardEvent) {
    keysDown.add(keyboardEvent.key)
  }

  onMount(() => {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keypress', keypressHandler)
    document.addEventListener('keyup', keyupHandler)
  })

  onCleanup(() => {
    document.removeEventListener('keydown', keyDownHandler)
    document.removeEventListener('keypress', keypressHandler)
    document.addEventListener('keyup', keyupHandler)
  })

  return (
    <>
      <div
        style={{
          'text-align': 'center',
          'display': 'flex',
          'color': lookupMora(
            selectedCell().consonant ?? '',
            selectedCell().vowel ?? ''
          ) !== undefined ? 'green' : 'white',
        }}
      >
        <h2 style={{ 'user-select': 'none', 'flex': 0 }}>&nbsp{" "}</h2>
        <h2 style={{ 'flex': 1 }}>
          {selectedCellKey()}
        </h2>
      </div>

      <div style={grid_style}>
        <For each={grid_data}>
          {(row, row_index) =>
            <For each={row}>
              {(cell_data, column_index) => {
                const common_style: JSX.CSSProperties = {
                  'grid-row': row_index() + 1,
                  'grid-column': column_index() + 1,
                  'text-align': 'center',
                }
                if (cell_data) {
                  if (typeof cell_data == 'string') {
                    return (
                      <span
                        style={{
                          ...common_style,
                          'color': selectedCell().consonant == cell_data || selectedCell().vowel == cell_data ? 'red' : 'black'
                        }}
                      >{cell_data as string}</span>
                    )
                  } else {
                    return (
                      <button
                        style={{
                          ...common_style,
                          ...cell_data.romanization == 'n' ?
                            { 'grid-column': 'span 5' } : {},
                        }}
                        onClick={() => {
                          setSelectedCell({
                            consonant: undefined,
                            vowel: undefined,
                          })

                          props.set_response(cell_data)
                        }}
                      >{
                          typeof cell_data == 'string' ? cell_data :
                            `${cell_data[props.format()]}`
                        }</button>
                    )
                  }
                } else {
                  return <span style={common_style}></span>
                }
              }}
            </For>
          }
        </For>
      </div>
    </>
  )
}
