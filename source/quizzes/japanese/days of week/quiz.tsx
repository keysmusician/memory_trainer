import { compare_strictly_equal } from '../../../evaluators/evaluators'
import { AnswerKey, NonNegativeNumber, QuizBuilder } from '../../../quiz'
import { TextRenderer } from '../../../renderers/TextRenderer'
import { MultipleChoiceFetcher } from '../../../response fetchers/multiple choice fetcher'
import { DefaultCoordinator } from '../../../TrainingCoordinator'
import { DefaultQuizLayoutBuilder } from '../../../defaultQuizLayout'
import { CharacterRenderer } from '../../../renderers/CharacterRenderer'
import { answerKey, JapaneseDayOfWeek } from './answer key'

export const daysOfWeekJPtoEN = new QuizBuilder<JapaneseDayOfWeek, string, string, string>({
	title: 'Days of the Week: Japanese to English',
	answerKey,
	coordinator: new DefaultCoordinator({
		evaluator: compare_strictly_equal<string>,
		feedback: {
			correct: () => 'Correct!',
			tryAgain: () => 'Try again!',
			fail: (parameters) => `${parameters.question} means "${parameters.answer}"`,
		},
	}),
	layout: DefaultQuizLayoutBuilder<JapaneseDayOfWeek, string, string, string>({
		responseFetcher: (props) => <MultipleChoiceFetcher
			incorrectOptionsCount={new NonNegativeNumber(6)}
			getLabel={(option) => option}
			{...props}
		/>,
		questionRenderer: (props) => <CharacterRenderer prompt={'What day of the week is this?'} {...props} />,
	}),
})

export const daysOfWeekENtoJP = new QuizBuilder<string, JapaneseDayOfWeek, JapaneseDayOfWeek, string>({
	title: 'Days of the Week: English to Japanese',
	answerKey: new AnswerKey(
		answerKey.entries().toArray().map(([japanese, english]) => [english, japanese])
	),
	coordinator: new DefaultCoordinator({
		evaluator: compare_strictly_equal<JapaneseDayOfWeek>,
		feedback: {
			correct: () => 'Correct!',
			tryAgain: () => 'Try again!',
			fail: (parameters) => `The Japanese for "${parameters.question}" is ${parameters.answer}`,
		},
	}),
	layout: DefaultQuizLayoutBuilder<string, JapaneseDayOfWeek, JapaneseDayOfWeek, string>({
		responseFetcher: (props) => <MultipleChoiceFetcher
			incorrectOptionsCount={new NonNegativeNumber(6)}
			getLabel={(option) => option}
			{...props}
		/>,
		questionRenderer: (props) => <TextRenderer prompt={'What is the Japanese for:'} {...props} />,
	}),
})
