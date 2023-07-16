/**
 * String user input fetcher.
 */
export function build_fetch_string(
  answer_submit_button: HTMLButtonElement,
  user_input_element: HTMLInputElement
) {
  return function fetch_string(): Promise<string> {
    return new Promise((resolve) => {

      const listener = () => {
        answer_submit_button.removeEventListener('click', listener)
        resolve(user_input_element.value.trim())
        user_input_element.value = ''
      }

      answer_submit_button.addEventListener('click', listener)
    })
  }
}
