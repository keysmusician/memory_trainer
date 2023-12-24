import { For, createEffect, createSignal, onMount } from "solid-js";
import { ResponseFetcherProps } from "../quizzes/quizzes";
import { Key } from 'ts-key-enum';

/**
 * Fetches a selection from an enumeration.
 */
export function enum_fetcher<ResponseType>(
    props: ResponseFetcherProps<ResponseType> & { items: Array<ResponseType> }
) {
    const [selection, set_selection] = createSignal<ResponseType>(props.items[0]);

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
                <For each={props.items}>
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
