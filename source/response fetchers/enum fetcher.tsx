import { For, createSignal, onMount } from "solid-js";
import { ResponseFetcherProps } from "../quiz";
import { Key } from 'ts-key-enum';

interface EnumFetcherProps<
    ResponseType,
    QuestionType = unknown,
    AnswerType = unknown
> extends ResponseFetcherProps<ResponseType, QuestionType, AnswerType> {
    sort?: boolean
}

/**
 * Fetches a selection from an enumeration.
 *
 * Props:
 * - `sort`: Whether to sort the answers.
 **/
export function EnumFetcher<
    ResponseType,
    QuestionType = unknown,
    AnswerType = unknown
>(
    props: EnumFetcherProps<ResponseType, QuestionType, AnswerType>
) {
    const answers = Array.from(props.quiz.answer_key.values())

    if (props.sort) { answers.sort() }

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
