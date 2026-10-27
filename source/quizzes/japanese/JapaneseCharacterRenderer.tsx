import { RendererProps } from "../../renderers/Renderer";
import { CharacterRenderer } from "../../renderers/Renderers.barrel";


export function JapaneseCharacterRenderer(props: RendererProps<string>) {
	return <CharacterRenderer {...props} prompt={"How do you pronounce:"} />
}
