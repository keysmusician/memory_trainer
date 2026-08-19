export interface IIncorrectOptionGenerator<AnswerType, Arguments extends unknown[] = unknown[]> {
	generate(...args: Arguments): AnswerType[]
}

export abstract class IncorrectOptionGenerator<AnswerType, Arguments extends unknown[] = unknown[]>
	implements IIncorrectOptionGenerator<AnswerType, Arguments> {
	abstract generate(...args: Arguments): AnswerType[]

	protected rank(
		correctAnswer: AnswerType,
		candidates: AnswerType[],
		count: number,
		score: (candidate: AnswerType, correctAnswer: AnswerType) => number,
		equals: (left: AnswerType, right: AnswerType) => boolean = (left, right) => left === right,
	): AnswerType[] {
		const uniqueCandidates = candidates
			.filter((candidate) => !equals(candidate, correctAnswer))
			.filter((candidate, index, allCandidates) =>
				allCandidates.findIndex((other) => equals(candidate, other)) === index
			)

		return uniqueCandidates
			.map((candidate) => ({ candidate, score: score(candidate, correctAnswer) }))
			.sort((left, right) => right.score - left.score)
			.slice(0, count)
			.map(({ candidate }) => candidate)
	}
}

export function digitSimilarity(left: number, right: number) {
	const leftDigits = String(left)
	const rightDigits = String(right)
	const matchingDigits = [...leftDigits].filter((digit, index) => digit === rightDigits[index]).length
	return matchingDigits / Math.max(leftDigits.length, rightDigits.length)
}
