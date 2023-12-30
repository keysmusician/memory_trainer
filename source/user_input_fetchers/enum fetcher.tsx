import { For, createSignal, onMount } from "solid-js";
import { ResponseFetcherProps } from "../quiz";
import { Key } from 'ts-key-enum';

/**
 * Fetches a selection from an enumeration.
 */
export function EnumFetcher<ResponseType>(
    props: ResponseFetcherProps<ResponseType>,
    sort?: boolean
) {
    const answers = Array.from(props.quiz.answer_key.values())
    console.log(sort)
    if (sort) { answers.sort() }

    const [selection, set_selection] = createSignal<ResponseType>(answers[0]);

    return (
        <div>
            <select
                ref={ref => onMount(() => ref?.focus())}
                onChange={e => set_selection(e.currentTarget.value)}
                onKeyDown={e => {
                    if (e.key === Key.Enter) {
                        props.setResponse(selection());
                    }
                }}
                title="Please select your answer here."
            >
                <For each={answers}>
                    {item => <option value={item}>{item}</option>}
                </For>
            </select>
            <button
                onClick={() => props.setResponse(selection())}
                title="Click here to submit your answer."
            >
                Submit
            </button>
        </div>
    )
}
