import { kanji } from "../model"

export const answer_key: Map<string, Uint8ClampedArray> = new Map(
	kanji.map((k) => [k.meaning, k.bitmap])
)
