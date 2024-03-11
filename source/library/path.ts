import { TAU } from './library.barrel'


export type Point = {
	x: number,
	y: number
}

export type Trail = Point[]

export interface ISegment {
	relativeAngle: number
	scalar: number
}

export class Segment implements ISegment {
	private _relativeAngle: number = 0
	private _scalar: number = 1
	// curvature: number // Not implemented

	constructor({ relativeAngle, scalar }: ISegment) {
		this.relativeAngle = relativeAngle
		this.scalar = scalar
	}

	/**
	 * The shortest relative angle of the segment, in turns.
	 * Values range from (-0.5–0.5].
	 */
	public get relativeAngle() {
		return this._relativeAngle
	}

	public set relativeAngle(value: number) {
		value = value % 1

		if (value > .5) {
			value -= 1
		} else if (value <= -.5) {
			value += 1
		}

		this._relativeAngle = value
	}

	/**
	 * The scale factor of the segment.
	 * Values are always positive.
	 */
	public get scalar() {
		return this._scalar
	}

	public set scalar(value: number) {
		this._scalar = Math.abs(value)
	}
}

/**
 * Options for converting an AbstractPath to a Trail.
 *
 * @param origin The starting point of the trail.
 * @param heading The initial heading of the trail, in turns.
 * ~~@param sampleCount The total number of points to sample from the path.~~
 */
interface toPathOptionsBase {
	origin: Point
	heading: number
}

interface toPathByLength extends toPathOptionsBase {
	length: number
	scale?: never
}

interface toPathByUnit extends toPathOptionsBase {
	length?: number
	scale: number
}

export type toPathOptions = toPathByLength | toPathByUnit

export class AbstractPath {
	public readonly segments: Segment[] = []

	constructor(segments?: Segment[]) {
		if (segments !== undefined) {
			this.segments = segments
		}
	}

	addSegment(segment: ISegment) {
		this.segments.push(new Segment(segment))
	}

	toTrail({
		origin,
		heading,
		// sampleCount: totalSampleCount,
		length, // The total length of the path
		scale // Factor to scale the entire path by
	}: toPathOptions): Trail {
		const abstractLength = this.segments.reduce((sum, { scalar: segmentScalar }) => sum + segmentScalar, 0)

		scale = scale ?? length! / abstractLength

		const trail: Trail = [origin]

		let currentPoint = origin

		let currentHeading = heading

		this.segments.forEach(({ relativeAngle, scalar: segmentScalar }) => {

			segmentScalar *= scale

			// Calculate the new point
			const newHeading = (currentHeading + relativeAngle) % 1

			const dx = segmentScalar * Math.cos(newHeading * TAU)

			const dy = segmentScalar * Math.sin(newHeading * TAU)

			const newPoint = {
				x: currentPoint.x + dx,
				y: currentPoint.y + dy
			}

			trail.push(newPoint)

			currentPoint = newPoint

			currentHeading = newHeading
		})

		return trail
	}
}

export class Path extends AbstractPath {
	readonly origin: Point
	readonly heading: number
	readonly length: number

	constructor({
		segments,
		origin,
		heading = 0,
	}: { segments: Segment[], origin: Point, heading?: number }) {
		super(segments)
		this.origin = origin
		this.heading = heading
		this.length = this.segments.reduce((sum, { scalar: scale }) => sum + scale, 0)
		this.normalize(100)
	}

	private normalize(unitLength: number = 1) {
		const length = this.length

		this.segments.forEach(segment => {
			segment.scalar *= unitLength / length
		})
	}

	override toTrail(): Trail {
		return super.toTrail({
			heading: this.heading,
			origin: this.origin,
			length: this.length
		})
	}
}
