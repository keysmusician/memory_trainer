const canvasSize = 100;

const kanjiOne = new Uint8ClampedArray(canvasSize * canvasSize).map((_, i) => {
	const x = i % canvasSize;
	const y = Math.floor(i / canvasSize);
	const [black, white] = [0x00, 0xff];

	if (y === 50) {
		// Horizontal line
		if (x > 10 && x < 90) {
			return black;
		}
	}

	return white;
})

export default kanjiOne
