import { HiraganaCharacter } from "../answer_keys/hiragana"
import { character_renderer } from "./CharacterRenderer"
import { Renderer } from "./Renderer"

/**
 * Renders Hiragana questions.
 */
export const hiragana_renderer: Renderer<HiraganaCharacter> =
  function (props) {
    return character_renderer({
      question: props.question,
    })
  }
