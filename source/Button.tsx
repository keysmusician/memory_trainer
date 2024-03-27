import { JSX, createSignal } from "solid-js";
import { style } from "./Style";

export type ButtonProps = {
	onClick?: () => void
	onHover?: () => void
	style?: JSX.CSSProperties & { ':hover': JSX.CSSProperties }
	text?: string
	children?: any
}

export function Button(props: ButtonProps) {
	const [hovered, setHovered] = createSignal(false)

	return (
		<button
			onClick={props.onClick}
			style={{
				...style.group.button,
				...props.style,
				...(hovered() && props.style ? props.style[':hover'] : {}),

			}}
			onmouseenter={() => setHovered(true) && props.onHover?.()}
			onmouseleave={() => setHovered(false) && props.onHover?.()}
		>
			{
				props.children ??
				<text
					style={{
						...style.group.baseText,
						margin: "0.5em",
					}}
				>
					{props.text}
				</text>
			}
		</button>
	)
}
