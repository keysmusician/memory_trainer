export function binaryGridSimilarity(
	array1: Uint8ClampedArray,
	array2: Uint8ClampedArray
): number {
	console.log("array1:", array1)
	console.log("array2:", array2)

	// Calculate the dot product
	let dotProduct = 0
	for (let i = 0; i < array1.length; i++) {
		const value1 = Math.floor(array1[i] / 0xff) == 0 ? -1 : 1
		const value2 = Math.floor(array2[i] / 0xff) == 0 ? -1 : 1
		dotProduct += value1 * value2
	}
	console.log("dotProduct:", dotProduct)

	const similarity = dotProduct / array1.length

	console.log("Similarity:", similarity)

	return similarity
}
