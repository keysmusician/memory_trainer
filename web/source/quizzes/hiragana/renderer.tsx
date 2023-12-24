import { HiraganaCharacter } from "./answer key"
import { character_renderer } from "../../renderers/CharacterRenderer"
import { Renderer } from "../../renderers/Renderer"

/**
 * Renders Hiragana questions.
 */
export const hiragana_renderer: Renderer<HiraganaCharacter> =
  function (props) {
    return character_renderer({
      question: props.question,
    })
  }
