import { AnswerKey } from '../../../quiz'

export type JapaneseDayOfWeek =
	| 'げつようび'
	| 'かようび'
	| 'すいようび'
	| 'もくようび'
	| 'きんようび'
	| 'どようび'
	| 'にちようび'

export const answerKey = new AnswerKey<JapaneseDayOfWeek, string>([
	['げつようび', 'Monday'],
	['かようび', 'Tuesday'],
	['すいようび', 'Wednesday'],
	['もくようび', 'Thursday'],
	['きんようび', 'Friday'],
	['どようび', 'Saturday'],
	['にちようび', 'Sunday'],
])
