import { createSignal, onMount } from "solid-js"
import { ResponseFetcherProps } from "../quizzes"

/**
 * String user input fetcher.
 */
export function string_fetcher(props: ResponseFetcherProps<string>) {
  const [response, set_response] = createSignal('')

  const set_and_clear_response = (response: string) => {
    props.set_response(response)
    set_response('')
  }

  return (
    <div>
      <input
        ref={(input_element) => {onMount(() => input_element.focus())}}
        type="text"
        onInput={e => set_response(e.currentTarget.value)}
        value={response()}
        title="Please type your answer here."
      />

      <button
        onClick={[set_and_clear_response, response]}
        title="Click to submit your answer."
      >
        Submit
      </button>
    </div>

  )
}
