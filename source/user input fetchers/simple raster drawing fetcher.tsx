import { JSX, onMount } from 'solid-js';
import { ResponseFetcherProps } from '../quiz';
import { styleGroup } from '../Style';

function reset(this: CanvasRenderingContext2D) {
	this.fillStyle = 'white';
	this.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.fillStyle = 'black';
}

type Point = {
	x?: number,
	y?: number
}

export const Canvas = (props: ResponseFetcherProps<Uint8ClampedArray>) => {
	let canvas: HTMLCanvasElement | undefined;
	let context: CanvasRenderingContext2D | undefined;
	let rect: DOMRect | undefined;
	const currentPoint: Point = { x: undefined, y: undefined };

	onMount(() => {
		if (canvas === undefined) return;
		rect = canvas.getBoundingClientRect();
		context = canvas.getContext('2d', {
			alpha: false,
			desynchronized: true
		})!;
		context.reset = reset;
		context.reset();
	})

	const canvasSize = 100;


	return (
		<div
			style={{
				'display': 'flex',
				'flex-direction': 'column',
				'align-items': 'center',
				'gap': '10px'
			}}
		>
			<canvas
				ref={canvas}
				width={canvasSize}
				height={canvasSize}
				style={{
					'width': `${canvasSize}px`,
					'height': `${canvasSize}px`,
					'border': '1px solid black',
					'cursor': 'crosshair',
					'image-rendering': 'pixelated'
				}}
				onMouseMove={mouseEvent => {
					if (
						canvas === undefined ||
						context === undefined ||
						rect === undefined
					) return;
					if (mouseEvent.buttons == 0) {
						currentPoint.x = undefined;
						currentPoint.y = undefined;
					} else if (mouseEvent.buttons !== 1) return;

					const newPoint: Point = {
						x: Math.floor((mouseEvent.clientX - rect.left)),
						y: Math.floor((mouseEvent.clientY - rect.top))
					}

					context.beginPath();
					context.moveTo(currentPoint.x, currentPoint.y);
					context.strokeStyle = 'black';
					context.lineWidth = 2;
					context.lineCap = "round";
					context.lineJoin = "round";
					context.lineTo(newPoint.x, newPoint.y);
					context.stroke();
					currentPoint.x = newPoint.x;
					currentPoint.y = newPoint.y;
				}}
			/>
			<button
				style={styleGroup.button as JSX.CSSProperties}
				onClick={() => {
					if (context === undefined) return;

					const response = context!.getImageData(0, 0, canvasSize, canvasSize).data
						// remove redundant channels since only black is used
						.filter((_, channelIndex) => (channelIndex % 4 == 0))

					context.reset();
					props.setResponse(response);
					rect = canvas!.getBoundingClientRect();
				}}
			>
				Submit
			</button>
		</div>
	)
};
