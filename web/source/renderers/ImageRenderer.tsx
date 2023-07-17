/**
 * Image renderer.
 */
import { Renderer } from "./Renderer"
import * as style from '../Styles.module.css'
import { image_height } from "../answer_keys/country_flags"


/**
 * Renders images from their URLs.
 */
export const image_renderer: Renderer<string> = function(props) {
  return (
    <img
      src={props.question}
      class={style.image_renderer}
      height={image_height}
    />
  )
}
