import { average } from "../../../../library/library.barrel";
import { Path, Segment } from '../../../../library/path';


// TODO: 1. Match strokes so you're not penalized for incorrect stroke order. Add an option to penalize for incorrect stroke order.
// 2. Reduce penalty for different lengths.
// 3. Complete shape similarity function.

export function pathsSimilarity(
	responsePaths: Path[],
	answerPaths: Path[]
): number {
	const longerPathListLength = Math.max(
		responsePaths.length,
		answerPaths.length
	)

	const similarities = []

	for (let index = 0; index < longerPathListLength; index++) {
		const responsePath = responsePaths.at(index)

		const answerPath = answerPaths.at(index)

		const similarity = (
			responsePath === undefined ||
			answerPath === undefined
		) ?
			0 :
			pathSimilarity(responsePath, answerPath)

		similarities.push(similarity)
	}

	// Log the similarities
	console.log("similarities:", similarities)
	console.log("total avg:", average(similarities))
	console.log(average(similarities) > .7 ? "pass" : "fail")

	return (average(similarities) > .7 ? 1 : 0)
}

function pathSimilarity(
	responsePath: Path,
	answerPath: Path
): number {
	const originDistance = Math.sqrt(
		Math.pow(responsePath.origin.x - answerPath.origin.x, 2) +
		Math.pow(responsePath.origin.y - answerPath.origin.y, 2)
	)

	const originSimilarity = Math.exp(-originDistance / 200)

	// const headingSimilarity = (1 + Math.cos(
	// 	(responsePath.heading - answerPath.heading) * TAU
	// )) / 2 // Adapted cosine similarity

	const shapeSimilarity = abstractPathSimilarity(
		responsePath.segments,
		answerPath.segments
	)

	const lengthSimilarity = Math.min(responsePath.length, answerPath.length) /
		Math.max(responsePath.length, answerPath.length)

	// Log the similarities
	console.log("originSimilarity:", originSimilarity)
	console.log("shapeSimilarity:", shapeSimilarity)
	console.log("lengthSimilarity:", lengthSimilarity)

	const score = (
		originSimilarity ** .5 *
		shapeSimilarity *
		sigmoidWeight(lengthSimilarity, .0006, 4) // Length similarity is less important
	)

	console.log("score:", score)

	return score
}

// Returns the smaller of displacement error and rotation error
// Abstract length (sum of scalars) must be equal, and all scalars must be nonzero
function abstractPathSimilarity(
	responseSegments_: Segment[],
	answerSegments_: Segment[]
): number {
	if (responseSegments_.length < 1 || answerSegments_.length < 1) {
		throw new Error("Abstract paths must each have at least one segment.")
	}

	// Duplicate the segments so they can be mutated
	const responseSegments = cloneSegments(responseSegments_)
	const answerSegments = cloneSegments(answerSegments_)
	console.log("-responseSegments:", responseSegments)
	console.log("-answerSegments:", answerSegments)
	let totalDisplacementError = 0
	let totalRotationalDifference = 0
	let totalRotationError = 0
	let index = 0
	while (true) {
		const responseSegment = responseSegments[index]
		const answerSegment = answerSegments[index]

		if (responseSegment === undefined || answerSegment === undefined) {
			break
		}

		// Resample the segments to the same number of points by placing segments at the same distances along each abstract path
		if (responseSegments.length != answerSegments.length) { // This check is only necessary because when comparing the final segments, there is often a negligible difference in scalar size which would cause a new segment to be inserted, making the lengths different
			const remainder = Math.abs(responseSegment.scalar - answerSegment.scalar)
			if (responseSegment.scalar > answerSegment.scalar) {
				responseSegments.splice(index + 1, 0, new Segment({
					relativeAngle: responseSegment.relativeAngle,
					scalar: remainder
				}))
				responseSegment.scalar = answerSegment.scalar
			} else if (answerSegment.scalar > responseSegment.scalar) {
				answerSegments.splice(index + 1, 0, new Segment({
					relativeAngle: answerSegment.relativeAngle,
					scalar: remainder
				}))
				answerSegment.scalar = responseSegment.scalar
			}
		}
		// Calculate the displacement error
		// console.log("responseSegments:", responseSegments)
		// console.log("answerSegments:", answerSegments)

		// Calculate the rotation error
		const rotationalDifference = leastAngleDifference(
			responseSegment.relativeAngle,
			answerSegment.relativeAngle
		)

		const rotationalError = Math.abs(rotationalDifference) * 2 // Normalize to [0-1]

		totalRotationalDifference += rotationalDifference

		totalRotationError += rotationalError

		index++
	}
	console.log("total rotational difference:", totalRotationalDifference);

	console.log("total rotational error:", totalRotationError);

	const penaltyCurveStrength = 8 // Penalizes rotation error more heavily the higher the value

	const angularSimilarity = (1 - (totalRotationError / answerSegments.length)) ** penaltyCurveStrength

	return angularSimilarity // Math.min(totalDisplacementError, totalRotationError)
}

function sigmoidWeight(x: number, a: number, b: number): number {
	return (1 / (1 + x)) ** (a / x ** b)
}

/**
 * Returns the smaller distance from angleStart to angleEnd, either clockwise or
 * counterclockwise, in percent of a turn. Ranges from -0.5 to 0.5.
 */
function leastAngleDifference(angleStart: number, angleEnd: number): number {
	let difference = angleEnd - angleStart
	if (difference > 0.5) {
		difference -= 1
	} else if (difference < -0.5) {
		difference += 1
	}
	return difference
}

function segmentSimilarity(
	responseSegment: Segment,
	answerSegment: Segment
): number {
	const angleSimilarity = Math.cos(
		Math.PI * Math.abs(responseSegment.relativeAngle - answerSegment.relativeAngle)
	)

	const lengthSimilarity = Math.exp(
		-Math.abs(responseSegment.scalar - answerSegment.scalar)
	)
	return (angleSimilarity + lengthSimilarity) / 2
}

function cloneArray<T>(array: T[]): T[] {
	return array.map(object => ({ ...object }))
}

function cloneSegments(segments: Segment[]): Segment[] {
	return segments.map(segment => new Segment(segment))
}

// export function binaryGridSimilarity(
// 	array1: Uint8ClampedArray,
// 	array2: Uint8ClampedArray
// ): number {
// 	console.log("array1:", array1)
// 	console.log("array2:", array2)

// 	// Calculate the dot product
// 	let dotProduct = 0
// 	for (let i = 0; i < array1.length; i++) {
// 		const value1 = Math.floor(array1[i] / 0xff) == 0 ? -1 : 1
// 		const value2 = Math.floor(array2[i] / 0xff) == 0 ? -1 : 1
// 		dotProduct += value1 * value2
// 	}
// 	console.log("dotProduct:", dotProduct)

// 	const similarity = dotProduct / array1.length

// 	console.log("Similarity:", similarity)

// 	return similarity
// }
