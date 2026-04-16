export interface Student {
	id: symbol | null
	name: string
	icon?: string | null // URL to an image or icon representing the student
	// passwordHash?: string // TODO: Allow password protection
}

export const null_student = {
	id: null,
	name: '',
	icon: null,
}
