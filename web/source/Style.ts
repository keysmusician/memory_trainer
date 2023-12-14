import { JSX } from "solid-js"

// Project styles.
export namespace designSystem {
	export namespace color {
		export const white = '#ffffff'
		export const black = '#000000'
		export const deepRed = 'rgb(239, 41, 41)'
		export const lightRed = 'rgb(255, 70, 70)'
		export const mediumBlue = 'rgb(60, 195, 240)'
		export const paleBlue = 'rgb(95, 214, 253)'
	}

	export namespace typography {
		export namespace typeface {
			export const sansSerif = "sans-serif"
			export const dmSans = "DM Sans"
		}

		export namespace size {
			export const small = "1rem"
			export const medium = "2rem"
			export const large = "4rem"
			export const extraLarge = "5rem"
		}

		export namespace weight {
			export const light = "300"
			export const regular = "400"
			export const medium = "500"
			export const bold = "700"
			export const bolder = "bolder"
		}
	}

	export namespace layout {
		export namespace border {
			export const radiusMediumRelative = "0.5rem"
			export const radiusWide = "50px"
			export const widthThin = ".1rem"
			export const marginMedium = "6px"
		}
	}

	export namespace animation {
		export const transitionDuration = "0.2s"
	}

	export namespace iconography {
	}
}

// These are the style roles used in this project. They should reference the
// design system elements in most cases, but can be overridden if needed.
//
// Note that the identifier names should refer to roles or jobs that the style
// fulfills, not the specific design system element that it is.
export namespace style {
	export namespace color {
		export const primary = designSystem.color.white
		export const secondary = designSystem.color.black
		export const accent = designSystem.color.paleBlue
	}

	export namespace typography {

		export namespace typeface {
			export const primary = designSystem.typography.typeface.dmSans
			export const secondary = designSystem.typography.typeface.sansSerif
		}

		export namespace size {
			export const title = designSystem.typography.size.extraLarge
			export const primary = designSystem.typography.size.medium
		}
	}

	export namespace layout {
		export const buildBorder = (width: string, color: string) =>
			`${width} solid ${color}`

		export const buildBoxShadow = (x: string, y: string, blur: string, spread: string, color: string) =>
			`${x} ${y} ${blur} ${spread} ${color}`

		export const primaryBorder = buildBorder(
			designSystem.layout.border.widthThin,
			style.color.secondary
		)

		export const primaryBoxShadow = buildBoxShadow(
			'0px',
			'0px',
			'0px',
			'0px',
			style.color.secondary
		)
		export const primaryMargin = designSystem.layout.border.marginMedium
		export const buttonHeight = '3rem'
		export const buttonWidth = '6rem'
	}

	export namespace animation {
	}

	export namespace iconography {
	}
}

export namespace styleGroup {

	export const row: JSX.CSSProperties = {
		display: 'flex',
		'flex-direction': 'row',
	}

	export const column: JSX.CSSProperties = {
		'align-items': 'center',
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'space-between',
		margin: style.layout.primaryMargin,
	}

	export const baseText = {
		'font-family': `${style.typography.typeface.primary}, ${style.typography.typeface.secondary}`,
		'font-size': style.typography.size.primary,
		color: style.color.primary,
	}

	export const title = {
		...baseText,
		'font-size': style.typography.size.title,
		'font-weight': designSystem.typography.weight.bolder,
	}

	export const largeText = {
		...baseText,
		'font-size': designSystem.typography.size.large,
	}

	// TODO: Convert values to project style tokens or design system tokens
	export const contentBox: JSX.CSSProperties = {
		...column,
		'box-sizing': 'border-box',
		flex: 1,
		'justify-content': 'space-evenly',
		width: '100%',
	}

	export const button = {
		...baseText,
		...column,
		border: style.layout.primaryBorder,
		'border-radius': designSystem.layout.border.radiusWide,
		cursor: 'pointer',
		height: style.layout.buttonHeight,
		margin: style.layout.primaryMargin,
	}

	export const startButton = {
		...button,
		'border-color': style.color.accent,
	}
}
