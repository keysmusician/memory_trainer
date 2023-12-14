import { Quiz as SerializedQuiz } from './quizzes'
import { createUniqueId } from 'solid-js'


export interface Quiz extends SerializedQuiz {
	id: string
	unselected_answer_key: Map<string, string>
}

export class Quiz implements Quiz {
	id: string
	unselected_answer_key: Map<string, string>

	constructor(quiz: SerializedQuiz) {
		Object.assign(this, quiz)
		this.id = createUniqueId()
		this.unselected_answer_key = new Map()
	}
}
