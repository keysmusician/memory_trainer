import { Mora } from "../answer_keys/hiragana"

/**
 * Hiragana mora fetcher.
 */
export function build_fetch_mora(
  answer_submit_button: HTMLButtonElement,
  user_input_element: HTMLInputElement
) {
  return function fetch_mora(): Promise<Mora> {
    return new Promise((resolve) => {

      const listener = () => {
        answer_submit_button.removeEventListener('click', listener)
        resolve(Mora.a)
        user_input_element.value = ''
      }

      answer_submit_button.addEventListener('click', listener)
    })
  }
}
