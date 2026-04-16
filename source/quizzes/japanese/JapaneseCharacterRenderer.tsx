import { CharacterRendererProps } from "../../renderers/CharacterRenderer";
import { CharacterRenderer } from "../../renderers/Renderers.barrel";


export function JapaneseCharacterRenderer(props: CharacterRendererProps) {
	return <CharacterRenderer {...props} prompt={"How do you pronounce:"} />
}
