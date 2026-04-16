/*
 * Library of utility functions.
 */

/**
 * The turn, the ratio of a circle's circumference to its radius.
 * Equivalent to 2π.
 */
export const TAU = 2 * Math.PI;

/**
 * Returns the angle required to turn from the positive x-axis to the line from
 * the origin to the point. Units are in the fraction of a turn (in the range
 * [0, 1)).
 **/
export function arcTanTurns({ x, y }: { x: number, y: number }): number {
	return ((Math.atan2(y, x) + TAU) % TAU) / TAU
}

/**
 * Waits for a given number of milliseconds.
 */
export async function wait(msec: number) {
	return new Promise((resolve, _) => setTimeout(resolve, msec))
}

/**
 * Returns the average of an array of numbers.
 */
export function average(array: number[]): number {
	return array.reduce((a, b) => a + b, 0) / array.length
}

/**
 * Shuffles an array in place.
 */
export function shuffleArray(array: any[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]
	}
}

/**
 * Converts an array buffer to a base 64 encoded string.
 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
	return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

/**
 * Converts a base 64 encoded string to an array buffer.
 */
export function base64ToArrayBuffer(base64: string) {
	const binaryString = atob(base64);
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes.buffer;
}

/**
 * Creates a range of integers from `start` to `end` inclusive.
 */
export function createRange({ start = 0, end }: { start?: number, end: number }) {
	const range = []
	for (let i = start; i <= end; i++) {
		range.push(i)
	}
	return range
}
