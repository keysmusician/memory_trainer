import { CharacterRenderer } from "../../renderers/Renderers.barrel";


export function JapaneseCharacterRenderer(props) {
	return <CharacterRenderer {...props} prompt={"How do you pronounce:"} />
}
