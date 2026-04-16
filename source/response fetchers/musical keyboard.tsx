import { For } from "solid-js"
import { pitch_classes, VexNotation, type PitchClass } from "../quizzes/music notation"
import { ResponseFetcher, ResponseFetcherProps } from "../quiz"

/**
 * Fetches a musical note.
 */
export function MusicalKeyboard(props: ResponseFetcherProps<string, VexNotation, PitchClass>) {
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

MusicalKeyboard satisfies ResponseFetcher<VexNotation, PitchClass>
