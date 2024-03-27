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
		export const paleGreen = 'rgb(167, 240, 209)'
		export const gray = 'rgb(198, 198, 198)'
	}

	export namespace typography {
		export namespace typeface {
			export const sansSerif = "sans-serif"
			export const dmSans = "DM Sans"
		}

		export namespace size {
			export const extraSmall = ".6rem"
			export const small = "1rem"
			export const medium = "1.3rem"
			export const large = "1.6rem"
			export const extraLarge = "2rem"
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
			export const radiusWide = "50px"  // TODO: 3.125rem
			export const widthThin = ".1rem"
			export const marginMedium = "6px" // TODO: 0.375rem
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
		export const primary = designSystem.color.black
		export const secondary = designSystem.color.white
		export const accent = designSystem.color.paleGreen
		export const focused = designSystem.color.gray
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
		export const debug = (
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 20 20"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					'padding': '0.5rem 1rem 0.5rem 0.5rem',
					'box-sizing': 'border-box',
				}}
			>
				<defs />
				<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					<g id="Dribbble-Light-Preview" transform="translate(-260.000000, -4519.000000)" fill="#000000">
						<g id="icons" transform="translate(56.000000, 160.000000)">
							<path d="M218,4362 C218,4361.448 217.552,4361 217,4361 L211,4361 C210.448,4361 210,4361.448 210,4362 L210,4363 L210,4365 L210,4368 L210,4370 L210,4373 L210,4375 L210,4376 C210,4376.552 210.448,4377 211,4377 L217,4377 C217.552,4377 218,4376.552 218,4376 L218,4375 L218,4373 L218,4370 L218,4368 L218,4365 L218,4363 L218,4362 Z M220,4365 L220,4368 L223,4368 C223.552,4368 224,4368.448 224,4369 C224,4369.552 223.552,4370 223,4370 L220,4370 L220,4373 L222,4373 C223.105,4373 224,4373.895 224,4375 L224,4378 C224,4378.552 223.552,4379 223,4379 C222.448,4379 222,4378.552 222,4378 L222,4376 C222,4375.448 221.552,4375 221,4375 L220,4375 L220,4377 C220,4378.105 219.105,4379 218,4379 L210,4379 C208.895,4379 208,4378.105 208,4377 L208,4375 L207,4375 C206.448,4375 206,4375.448 206,4376 L206,4378 C206,4378.552 205.552,4379 205,4379 C204.448,4379 204,4378.552 204,4378 L204,4375 C204,4373.895 204.895,4373 206,4373 L208,4373 L208,4370 L205,4370 C204.448,4370 204,4369.552 204,4369 C204,4368.448 204.448,4368 205,4368 L208,4368 L208,4365 L206,4365 C204.895,4365 204,4364.105 204,4363 L204,4360 C204,4359.448 204.448,4359 205,4359 C205.552,4359 206,4359.448 206,4360 L206,4362 C206,4362.552 206.448,4363 207,4363 L208,4363 L208,4361 C208,4359.895 208.895,4359 210,4359 L218,4359 C219.105,4359 220,4359.895 220,4361 L220,4363 L221,4363 C221.552,4363 222,4362.552 222,4362 L222,4360 C222,4359.448 222.448,4359 223,4359 C223.552,4359 224,4359.448 224,4360 L224,4363 C224,4364.105 223.105,4365 222,4365 L220,4365 Z M216,4373 C215.448,4373 215,4373.448 215,4374 C215,4374.552 215.448,4375 216,4375 C216.552,4375 217,4374.552 217,4374 C217,4373.448 216.552,4373 216,4373 L216,4373 Z M213,4374 C213,4374.552 212.552,4375 212,4375 C211.448,4375 211,4374.552 211,4374 C211,4373.448 211.448,4373 212,4373 C212.552,4373 213,4373.448 213,4374 L213,4374 Z" id="bug_spider-[#825]" />
						</g>
					</g>
				</g>
			</svg>
		)
	}

	export namespace group {

		export const row: JSX.CSSProperties = {
			display: 'flex',
			'flex-direction': 'row',
		}

		export const column: JSX.CSSProperties = {
			'align-items': 'center',
			display: 'flex',
			'flex-direction': 'column',
			'justify-content': 'space-between',
		}

		export const baseText: JSX.CSSProperties = {
			'font-family': `${style.typography.typeface.primary}, ${style.typography.typeface.secondary}`,
			'font-size': style.typography.size.primary,
			color: style.color.primary,
		}

		export const title: JSX.CSSProperties = {
			...baseText,
			'font-size': style.typography.size.title,
			'font-weight': designSystem.typography.weight.bolder,
		}

		export const largeText: JSX.CSSProperties = {
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
			'margin': 0
		}

		export const border: JSX.CSSProperties = {
			'border': style.layout.primaryBorder,
			'border-radius': designSystem.layout.border.radiusWide,
			'box-sizing': 'border-box',
		}

		export const button: JSX.CSSProperties = {
			...baseText,
			...column,
			...border,
			cursor: 'pointer',
			// height: style.layout.buttonHeight,
			margin: 'auto',
			padding: '.5em',
		}
	}
}
