// More realistic brush strokes: https://dev.to/ascorbic/a-more-realistic-html-canvas-paint-tool-313b

import { JSX, createEffect, onCleanup } from 'solid-js'
import { ResponseFetcherProps } from '../quiz'
import { styleGroup } from '../Style'
import { arcTanTurns } from '../library/library.barrel'
import { AbstractPath, Path, Point, Trail, } from '../library/path'


/**
 * Converts a trail of points to a Path.
 **/
function analyzePath(trail: Trail): Path {
	if (trail.length < 2) {
		console.warn('Trails must have at least 2 points to create a Path.')
		return new Path({ segments: [], origin: { x: 0, y: 0 } })
	}

	const abstractPath = new AbstractPath()

	let priorPoint: Point | undefined = undefined

	let absoluteAngle = 0 // Angle in turns

	const origin = trail.shift()! // Removing the first point as it can cause difficulty identifying the initial angle

	let initialHeading = 0

	trail.forEach((point, index) => {
		if (priorPoint !== undefined) {
			const dx = point.x - priorPoint.x

			const dy = point.y - priorPoint.y

			// Skip identical consecutive points
			if (dx == 0 && dy == 0) return

			// Note: Y is inverted, so turns are also inverted (clockwise).
			const angle = arcTanTurns({ x: dx, y: dy })

			let relativeAngle
			if (index == 1) {
				initialHeading = angle
				relativeAngle = 0
			} else {
				relativeAngle = angle - absoluteAngle
			}

			absoluteAngle = angle

			const length = Math.sqrt(dx * dx + dy * dy)

			// Skip points that are on the same line (unless it's the final point).
			if (relativeAngle == 0 && index < trail.length - 1) {
				return
			}

			abstractPath.addSegment({ relativeAngle, scalar: length })
		}

		priorPoint = point
	})

	return new Path({
		segments: abstractPath.segments,
		origin: origin,
		heading: initialHeading
	})
}

function getCustomCanvasRenderingContext2D(canvas: HTMLCanvasElement) {
	const context = canvas.getContext('2d') as CustomCanvasRenderingContext2D // NOTE: Hides possible null return

	context.reset = function (this: CanvasRenderingContext2D) {
		this.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	context.drawLine = function (
		this: CanvasRenderingContext2D,
		start: Point,
		end: Point,
		color = 'black'
	) {
		this.strokeStyle = color
		this.beginPath()
		this.moveTo(start.x, start.y)
		this.lineTo(end.x, end.y)
		this.stroke()
	}

	context.reset()

	return context
}

/**
 * A drawing canvas which sends paths as responses.
 **/
export const PathCanvas = (props: ResponseFetcherProps<Path[], string, Path[]>) => {
	let context: CustomCanvasRenderingContext2D
	const canvasSize = 200
	let mouseTrail: Trail = []
	let trails: Trail[] = []
	let currentPoint: Point | undefined = undefined
	let drawing = false
	const lineStyle = { lineWidth: 5, lineCap: 'round' as CanvasLineCap }

	/// Handle mouse up
	function handleMouseUp() {
		if (mouseTrail.length > 0) {
			trails.push(mouseTrail)

			// Convert mouseTrail to AbstractPath
			// const abstractPath = createAbstractPath(mouseTrail)

			// console.log(abstractPath.segments)

			// abstractPath.toTrail({
			// 	origin: { x: 150, y: 150 },
			// 	heading: 0,
			// 	scale: 1
			// }).reduce((priorPoint, point) => {
			// 	drawLine(priorPoint, point)
			// 	return point
			// })
			drawing = false
			currentPoint = undefined
			mouseTrail = []
		}
	}

	document.addEventListener('mouseup', handleMouseUp)

	onCleanup(() => { document.removeEventListener('mouseup', handleMouseUp) })
	///

	function clear() {
		context!.reset()
		trails = []
	}

	// function drawTrail(timeStamp: DOMHighResTimeStamp) {
	// 	if (context === undefined) return
	// 	if (trails.length > 0) {
	// 		const trail = trails.shift()!
	// 		const firstPoint = trail.shift()!

	// 		context.beginPath()
	// 		context.moveTo(firstPoint.x, firstPoint.y)
	// 		trail.forEach(point => {
	// 			context!.lineTo(point.x, point.y)
	// 		})
	// 		context.stroke()
	// 	}
	// 	window.requestAnimationFrame(drawTrail)
	// }

	// window.requestAnimationFrame(drawTrail)

	return (
		<div
			style={{
				'display': 'flex',
				'flex-direction': 'column',
				'align-items': 'center',
				'gap': '10px'
			}}
		>
			<div>
				<div>
					<GridLines canvasSize={canvasSize} />

					<HintCanvas
						canvasSize={canvasSize}
						answer={props.answer}
						lineStyle={lineStyle}
						visible={props.regrades > 0}
					/>

					<canvas
						ref={canvas => {
							context = getCustomCanvasRenderingContext2D(canvas)
							context.lineWidth = lineStyle.lineWidth
							context.lineCap = lineStyle.lineCap
							context.strokeStyle = 'black'
						}}
						width={canvasSize}
						height={canvasSize}
						style={{
							'width': `${canvasSize}px`,
							'height': `${canvasSize}px`,
							'border': '1px solid black',
							'cursor': 'crosshair',
							'image-rendering': 'crisp-edges',
							'box-sizing': 'border-box'
						}}
						onMouseDown={() => drawing = true}
						onMouseMove={mouseEvent => {
							if (context === undefined || !drawing) return

							let rect = mouseEvent.currentTarget.getBoundingClientRect()

							const newPoint: Point = {
								x: Math.floor((mouseEvent.clientX - rect.left)),
								y: Math.floor((mouseEvent.clientY - rect.top))
							}

							context.drawLine(currentPoint ?? newPoint, newPoint)

							mouseTrail.push(newPoint)

							currentPoint = newPoint
						}}
					/>
				</div>

				<div
					style={{
						'display': 'flex',
						'gap': '10px'
					}}
				>
					<button
						style={styleGroup.button as JSX.CSSProperties}
						onClick={clear}
					>
						Clear
					</button>

					<button
						style={styleGroup.button as JSX.CSSProperties}
						onClick={() => {
							const response = trails.map(analyzePath)

							clear()

							props.setResponse(response)
						}}
					>
						Submit
					</button>
				</div>
			</div>
		</div >
	)
}

function GridLines(props: { canvasSize: number }) {
	const color = 'lightgray'

	return (
		<svg
			width={props.canvasSize}
			height={props.canvasSize}
			style={{
				'position': 'absolute',
				'pointer-events': 'none',
				'z-index': -1
			}}
		>
			<line
				x1={props.canvasSize / 2}
				y1={0}
				x2={props.canvasSize / 2}
				y2={props.canvasSize}
				stroke={color}
				stroke-width='1'
			/>
			<line
				x1={0}
				y1={props.canvasSize / 2}
				x2={props.canvasSize}
				y2={props.canvasSize / 2}
				stroke={color}
				stroke-width='1'
			/>
		</svg>
	)
}

interface HintCanvasProps {
	canvasSize: number
	lineStyle: { lineWidth: number, lineCap: CanvasLineCap }
	answer: Path[]
	visible: boolean
}
function HintCanvas(props: HintCanvasProps) {
	const color = 'lightgray'

	return (
		<canvas
			ref={(canvas: HTMLCanvasElement) => {
				const context = getCustomCanvasRenderingContext2D(canvas)

				createEffect(() => {
					context.reset()
					context.lineWidth = props.lineStyle.lineWidth
					context.lineCap = props.lineStyle.lineCap

					props.answer.forEach((path: Path) => {
						path.toTrail().reduce((priorPoint, point) => {
							context.drawLine(priorPoint, point, color)
							return point
						})
					})
				})
			}}
			width={props.canvasSize}
			height={props.canvasSize}
			style={{
				'display': props.visible ? 'block' : 'none',
				'position': 'absolute',
				'pointer-events': 'none',
				'z-index': -1
			}}
		/>
	)
}

type CustomCanvasRenderingContext2D = CanvasRenderingContext2D & {
	reset: () => void
	drawLine: (start: Point, end: Point, color?: string) => void
}

// Add undo button
// Add redo button
