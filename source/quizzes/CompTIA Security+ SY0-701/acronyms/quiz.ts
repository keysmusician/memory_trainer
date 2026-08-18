import { DefaultQuizLayoutBuilder } from '../../../defaultQuizLayout'
import { DefaultCoordinator } from '../../../TrainingCoordinator'
import { Textbox } from '../../../response fetchers/user input fetchers.barrel'
import { TextRenderer } from '../../../renderers/TextRenderer'
import { QuizBuilder, ResponseFetcher } from '../../../quiz'
import { CompTIA_Security_Plus_SY0_701_acronyms } from './answer key'

const normalize = (text: string) =>
	text.toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '')

const compareAcronymDefinition = (response: string, answers: string[]) =>
	answers.some(answer => normalize(response) === normalize(answer)) ? 1 : 0

export const comptiaSecurityPlusAcronyms = new QuizBuilder<
	string,
	string[],
	string,
	string
>({
	title: 'CompTIA Security+ SY0-701 acronyms',
	answerKey: CompTIA_Security_Plus_SY0_701_acronyms,
	coordinator: new DefaultCoordinator({
		evaluator: compareAcronymDefinition,
		feedback: {
			correct: () => 'Correct!',
			tryAgain: () => 'Try again.',
			fail: ({ answer }) => answer.length === 1
				? `The answer was '${answer[0]}'`
				: `Acceptable answers were ${answer.map(value => `'${value}'`).join(', ')}`,
		},
	}),
	layout: DefaultQuizLayoutBuilder<string, string[], string, string>({
		responseFetcher: Textbox as ResponseFetcher<string, string[], string>,
		questionRenderer: TextRenderer,
	}),
})
