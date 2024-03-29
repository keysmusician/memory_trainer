import { For, JSX, Setter, createEffect, createSignal, onCleanup, onMount } from "solid-js"
import { mora as moras } from "../answer keys/answer keys.barrel"
import { ResponseFetcherProps, TrainingHistory } from "../quiz";
import { Mora } from "../quizzes/japanese/_mora";

function convert_to_grid(
  moras: Mora[],
  format: "romanization" | "ipa" = "romanization"
) {
  const vowels = ["a", "i", "u", "e", "o"]
  const consonants = [
    ["k"],
    ['g'],
    ["s"],
    ['z', 'j'],
    ["t", "c"],
    ['d'],
    ["n"],
    ["h", "f"],
    ['b'],
    ['p'],
    ["m"],
    ["y"],
    ["r"],
    ["w"],
  ]
  const blank = null;
  const column_headers = [blank, ...vowels]
  const vowel_row = Array.from([blank, ...vowels],
    vowel => moras.find(mora => mora.romanization == vowel) ?? null
  )
  const grid_data: (string | Mora | null)[][] = [column_headers, vowel_row]
  for (const consonant_options of consonants) {
    const main_consonant = consonant_options[0]
    const row: (string | Mora | null)[] = [main_consonant]
    let include_row = false
    for (const vowel of vowels) {
      const mora = moras.find(mora =>
        consonant_options.includes(mora[format][0]) && // First character is in consonant list
        mora[format].slice(-1) == vowel // Last character is vowel
      ) ?? null
      if (mora) include_row = true
      row.push(mora)
    }
    if (include_row) grid_data.push(row)
  }
  const n = moras.find(mora => mora.romanization == "n")
  if (n) grid_data.push([blank, n])
  return grid_data
}

export function mora_fetcher_builder(answerKey: Map<string, Mora>) {
  /**
   * Hiragana/Katakana mora fetcher.
   */
  return function mora_fetcher(props: ResponseFetcherProps<Mora, string, Mora>) {

    const [format, setFormat] = createSignal<"romanization" | "ipa">("romanization")

    return (
      <div>
        <MoraGrid
          answerKey={answerKey}
          format={format}
          set_response={props.setResponse}
          trainingHistory={props.trainingHistory}
          answer={props.answer}
        />
        <FormatComboButton format={format} setFormat={setFormat} />
      </div>
    )
  }
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
  set_response: (response: Mora) => void
  trainingHistory: TrainingHistory<string, Mora, Mora>
  answer: Mora
}
function MoraGrid(props: MoraGridProps) {
  const grid_style = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    'grid-gap': "0.5em",
  }

  const grid_data = convert_to_grid([...new Set(props.answerKey.values())])

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
        consonant: keyboardEvent.key,
        vowel: selected.vowel
      }))
    }
  }

  onMount(() => {
    document.addEventListener('keypress', keypressHandler)
  })

  onCleanup(() => {
    document.removeEventListener('keypress', keypressHandler)
  })

  return (
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
                          `/${cell_data[props.format()]}/`
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
  )
}
