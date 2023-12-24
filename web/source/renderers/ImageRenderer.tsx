/**
 * Image renderer.
 */
import { Renderer } from "./Renderer"
import { image_height } from "../quizzes/country flags/country_flags"
import { Show, createEffect, createSignal } from "solid-js"


/**
 * Renders images from their URLs.
 */
export const image_renderer: Renderer<string> = function (props) {
  const [image_loaded, set_image_loaded] = createSignal(false)

  createEffect(() => set_image_loaded(!props.question))

  return (
    <>
      <Show when={!image_loaded()}>
        <p>
          Loading...
        </p>
      </Show>

      <img
        src={props.question}
        style={{
          'box-shadow': '0px 2px 10px black',
          visibility: image_loaded() ? 'visible' : 'hidden'
        }}
        height={image_height}
        onLoad={[set_image_loaded, true]}
      />
    </>
  )
}
