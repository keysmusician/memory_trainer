const canvasSize = 100;

const kanjiTwo = new Uint8ClampedArray(canvasSize * canvasSize).map((_, i) => {
	const x = i % canvasSize;
	const y = Math.floor(i / canvasSize);
	const [black, white] = [0x00, 0xff];

	// Horizontal line
	if (y === 33 || y === 66) {
		if (x > 10 && x < 90) {
			return black;
		}
	}

	return white;
})

export default kanjiTwo
