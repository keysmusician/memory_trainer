export interface Student {
	id: symbol | null
	name: string
	// passwordHash?: string // TODO: Allow password protection
}

export const null_student = {
	id: null,
	name: ''
}
