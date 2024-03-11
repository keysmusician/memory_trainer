import { For } from "solid-js"
import { pitch_classes } from "../answer keys/music_notation"
import { ResponseFetcherProps } from "../quiz"

/**
 * Fetches a musical note.
 */
export function MusicalKeyboard(props: ResponseFetcherProps<string>) {
    return (
        <div style={{ 'display': 'grid' }}>
            <For each={pitch_classes}>
                {(label, index) =>
                    <button
                        onClick={[props.setResponse, label]}
                        style={{
                            'font-size': '1.5em',
                            'padding': "0.25em",
                            'grid-column': `${index() % 7 + 1}`
                        }}
                    >
                        {label}
                    </button>
                }
            </For>
        </div>
    )
}
