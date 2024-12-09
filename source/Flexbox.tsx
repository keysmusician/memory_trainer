import { JSX, JSXElement } from "solid-js"

export interface FlexboxProps {
	flex?: number | 'unset'
	style?: JSX.CSSProperties
	children?: JSXElement
}
export function Flexbox(props: FlexboxProps) {
	return (
		<div
			style={{
				...props.style,
				'display': 'flex',
				'flex': props.flex ?? 1,
			}}
		>
			{props.children}
		</div>
	)
}
