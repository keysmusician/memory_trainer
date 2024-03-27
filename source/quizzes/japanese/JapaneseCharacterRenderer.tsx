import { CharacterRenderer } from "../../renderers/renderers.barrel";


export function JapaneseCharacterRenderer(props) {
	return <CharacterRenderer {...props} prompt={"How do you pronounce:"} />
}
