import { createSignal, onMount } from "solid-js"
import { ResponseFetcherProps } from "../quiz"

/**
 * Textbox. A user input fetcher for arbitrary string responses.
 */
export function Textbox(props: ResponseFetcherProps<string>) {
  const [response, set_response] = createSignal('')

  const set_and_clear_response = (response: string) => {
    props.setResponse(response)
    set_response('')
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        set_and_clear_response(response())
      }}
      style={{
        'display': 'flex',
        'gap': '0.5rem',
        'align-items': 'stretch',
        'width': 'min(100%, 30rem)',
      }}
    >
      <input
        ref={(input_element) => { onMount(() => input_element.focus()) }}
        type="text"
        onInput={e => set_response(e.currentTarget.value)}
        value={response()}
        title="Please type your answer here."
        style={{
          'box-sizing': 'border-box',
          'flex': '1',
          'min-width': '0',
          'padding': '0.7rem 0.85rem',
          'border': '2px solid rgb(198, 198, 198)',
          'border-radius': '0.5rem',
          'background-color': '#ffffff',
          'font-size': '1rem',
          'outline': 'none',
        }}
      />

      <button
        type="submit"
        title="Click to submit your answer."
        style={{
          'padding': '0.7rem 1rem',
          'border': '0',
          'border-radius': '0.5rem',
          'background-color': 'rgb(60, 195, 240)',
          'color': '#000000',
          'font-size': '1rem',
          'font-weight': '700',
          'cursor': 'pointer',
        }}
      >
        Submit
      </button>
    </form>

  )
}
