import { For, JSX } from "solid-js"
import { Mora } from "../answer_keys/answer_keys.barrel"
import { ResponseFetcherProps } from "../quizzes"

function convert_to_grid(moras: Mora[]) {
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
  const grid_data: (string | null)[][] = [column_headers, column_headers]
  for (const consonant_options of consonants) {
    const main_consonant = consonant_options[0]
    const row: (string | null)[] = [main_consonant]
    let include_row = false
    for (const vowel of vowels) {
      const mora = moras.find(mora =>
        consonant_options.includes(mora[0]) && // First character is in consonant list
        mora.slice(-1) == vowel // Last character is vowel
      ) ?? null
      if (mora) include_row = true
      row.push(mora)
    }
    if (include_row) grid_data.push(row)
  }
  const n = moras.find(mora => mora == "n")
  if (n) grid_data.push([blank, n])
  return grid_data
}

export function mora_fetcher_builder(answer_key: Map<string, Mora>) {
  /**
   * Hiragana/Katakana mora fetcher.
   */
  return function mora_fetcher(props: ResponseFetcherProps<Mora>) {
    const grid_style = {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      'grid-gap': "0.5em",
    }

    const grid_data = convert_to_grid([...new Set(answer_key.values())])

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
                  if (row_index() == 0 || column_index() == 0) {
                    return <span style={common_style}>{cell_data}</span>
                  }
                  return <button
                    style={{
                      ...common_style,
                      ...cell_data == 'n' ? { 'grid-column': 'span 5' } : {},
                    }}
                    onClick={[props.set_response, cell_data]}
                  >
                    /{cell_data}/
                  </button>
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
}
