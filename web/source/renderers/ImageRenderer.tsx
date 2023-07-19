/**
 * Image renderer.
 */
import { Renderer } from "./Renderer"
import * as style from '../Styles.module.css'
import { image_height } from "../answer_keys/country_flags"
import { Show, createEffect, createSignal } from "solid-js"


/**
 * Renders images from their URLs.
 */
export const image_renderer: Renderer<string> = function(props) {
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
        class={style.image_renderer}
        style={{ visibility: image_loaded() ? 'visible' : 'hidden' }}
        height={image_height}
        onLoad={[set_image_loaded, true]}
      />
    </>
  )
}
