import { createApi } from 'unsplash-js';
import { arrayBufferToBase64, base64ToArrayBuffer } from './library/library';
import { HTTPSURL } from './quiz';

const key = await crypto.subtle.importKey(
	"raw",
	base64ToArrayBuffer("nxxKTLTwptDU8ycb2KacTw=="),
	"AES-GCM",
	true,
	["encrypt", "decrypt"]
)

const accessKey = await decryptString(
	key,
	{ iv: "FFwetsZ3XcA4FRNw", ciphertext: "Uwg3wY18p5Wunrmqms+fRT/m+fXeGrC+K1xdqD9Hoj3c3UwOtisPndz1x9LpB2epCVLwuuezBCPYBtk=" }
)

const browserApi = createApi({ accessKey });

export const getRandomPhoto = async (query: string): Promise<HTTPSURL> => {
	try {
		const photo = await browserApi.photos.getRandom(
			{
				query: query,
				orientation: "landscape"
			})

		return photo.response?.urls.regular as HTTPSURL;
	}
	catch (error) {
		console.error(error);
		return "";
	}
}

// Encrypt a string
async function encryptString(key: CryptoKey, plaintext: string) {
	const encoder = new TextEncoder();
	const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector

	const ciphertext = await crypto.subtle.encrypt(
		{
			name: "AES-GCM",
			iv: iv
		},
		key,
		encoder.encode(plaintext)
	);

	return {
		iv: arrayBufferToBase64(iv.buffer),
		ciphertext: arrayBufferToBase64(ciphertext)
	};
}

// Decrypt a string
async function decryptString(key: CryptoKey, encrypted: any) {
	const iv = base64ToArrayBuffer(encrypted.iv);
	const ciphertext = base64ToArrayBuffer(encrypted.ciphertext);

	const decrypted = await crypto.subtle.decrypt(
		{
			name: "AES-GCM",
			iv: iv
		},
		key,
		ciphertext
	);

	const decoder = new TextDecoder();
	return decoder.decode(decrypted);
}


// (async () => {

//   const plaintext = "Hello, world!"

//   const encrypted = await encryptString(key, plaintext)

//   console.log("Encrypted Data:", encrypted)

//   // const decrypted = await decryptString(key, encrypted)

//   // console.log("Decrypted Data:", decrypted)
// })();
