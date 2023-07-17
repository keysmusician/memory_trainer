import { For, Setter } from "solid-js"
import { Mora, hiragana } from "../answer_keys/hiragana"
import { ResponseFetcherProps } from "../quizzes"

/**
 * Hiragana mora fetcher.
 */
export function mora_fetcher(props: ResponseFetcherProps<Mora>) {
  const grid_style = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    'grid-gap': "0.5em",
  }

  return (
    <div style={grid_style}>
      <For each={Array.from(hiragana.values())}>
        {(label, index) =>
          <button
            onClick={[props.set_response, label]}
            style={{
              'padding': "0.25em",
              'grid-column': `${index() % 5 + 1}`
            }}
          >
            /{label}/
          </button>
        }
      </For>
    </div>
  )
}
