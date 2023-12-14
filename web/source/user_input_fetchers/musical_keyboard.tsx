import { For } from "solid-js"
import { pitch_classes } from "../answer_keys/music_notation"
import { ResponseFetcherProps } from "../quizzes"

/**
 * Fetches a musical note.
 */
export function musical_keyboard(props: ResponseFetcherProps<string>) {
    return (
        <div style={{'display': 'grid'}}>
            <For each={pitch_classes}>
                {(label, index) =>
                    <button
                        onClick={[props.set_response, label]}
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