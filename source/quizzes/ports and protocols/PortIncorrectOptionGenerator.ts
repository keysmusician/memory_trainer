import { digitSimilarity, IncorrectOptionGenerator } from '../../library/confusing options';
import { PortAndProtocols } from './answer key'

const permuteDigits = (port: number): number[] => {
	const digits = String(port).split('')
	const permutations = new Set<string>()

	const visit = (remaining: string[], permutation: string) => {
		if (remaining.length === 0) {
			if (permutation[0] !== '0') permutations.add(permutation)
			return
		}

		remaining.forEach((digit, index) =>
			visit(
				remaining.filter((_, remainingIndex) => remainingIndex !== index),
				permutation + digit,
			)
		)
	}

	visit(digits, '')
	return [...permutations].map(Number).filter((permutedPort) => permutedPort !== port)
}

const portSimilarity = (candidate: PortAndProtocols, answer: PortAndProtocols) => {
	const numericSimilarity = candidate[0].reduce((total, port, index) => {
		const answerPort = answer[0][index] ?? answer[0][0]
		const distance = Math.abs(port - answerPort)
		return total + Math.exp(-distance / Math.max(1, answerPort * 0.1)) * 0.7 + digitSimilarity(port, answerPort) * 0.3
	}, 0) / candidate[0].length
	const portCountSimilarity = candidate[0].length === answer[0].length ? 0.2 : 0
	const protocolSimilarity = candidate[1].filter((protocol) => answer[1].includes(protocol)).length / Math.max(candidate[1].length, answer[1].length)
	const permutationSimilarity = candidate[0].some((port, index) =>
		permuteDigits(answer[0][index] ?? answer[0][0]).includes(port)
	) ? 0.4 : 0

	return numericSimilarity + portCountSimilarity + protocolSimilarity * 0.2 + permutationSimilarity
}

const generatePortCandidates = (answer: PortAndProtocols): PortAndProtocols[] => {
	const offsets = [-1000, -100, -10, -2, -1, 1, 2, 10, 100, 1000]
	const permutationCandidates = answer[0].flatMap((port, portIndex) => permuteDigits(port).map((permutedPort) => [
		answer[0].map((originalPort, index) => index === portIndex ? permutedPort : originalPort),
		[...answer[1]],
	] as PortAndProtocols))
	const offsetCandidates = answer[0].flatMap((port, portIndex) => offsets.map((offset) => [
		answer[0].map((originalPort, index) => index === portIndex ? Math.max(1, originalPort + offset) : originalPort),
		[...answer[1]],
	] as PortAndProtocols))

	return [...permutationCandidates, ...offsetCandidates]
		.filter(([ports]) => new Set(ports).size === ports.length)
}

export class PortIncorrectOptionGenerator extends IncorrectOptionGenerator<PortAndProtocols, [PortAndProtocols, number]> {
	equals(left: PortAndProtocols, right: PortAndProtocols) {
		return left[0].length === right[0].length &&
			left[0].every((port, index) => port === right[0][index]) &&
			left[1].length === right[1].length &&
			left[1].every((protocol, index) => protocol === right[1][index])
	}

	generate(answer: PortAndProtocols, count: number) {
		return this.rank(
			answer,
			generatePortCandidates(answer),
			count,
			portSimilarity,
			this.equals,
		)
	}
}
