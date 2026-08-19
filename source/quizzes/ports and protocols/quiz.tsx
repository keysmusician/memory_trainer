import { DefaultQuizLayoutBuilder } from '../../defaultQuizLayout'
import { DefaultCoordinator } from '../../TrainingCoordinator'
import { MultipleChoiceFetcher } from '../../response fetchers/multiple choice fetcher'
import { TextRenderer } from '../../renderers/TextRenderer'
import { AnswerKey, NonNegativeNumber, QuizBuilder } from '../../quiz'
import { PortAndProtocols, portsAndProtocols } from './answer key'
import { PortIncorrectOptionGenerator } from './PortIncorrectOptionGenerator'

const answerText = ([port, protocols]: PortAndProtocols) =>
	`${port.join('/')}`// ${protocols.join('/')}`

const comparePortAndProtocol = (response: PortAndProtocols, answer: PortAndProtocols) =>
	response[0].every((port, index) => port === answer[0][index]) &&
		response[1].every((protocol, index) => protocol === answer[1][index]) ? 1 : 0

const portIncorrectOptionGenerator = new PortIncorrectOptionGenerator()

export const protocolsToPortsQuiz = new QuizBuilder<string, PortAndProtocols, PortAndProtocols, string>({
	title: 'protocols to ports',
	answerKey: portsAndProtocols,
	coordinator: new DefaultCoordinator({
		evaluator: comparePortAndProtocol,
		feedback: {
			correct: () => 'Correct!',
			tryAgain: () => 'Try again.',
			fail: ({ question, answer }) => `${question} uses port${answer[0].length > 1 ? 's' : ''} ${answerText(answer)}`,
		},
	}),
	layout: DefaultQuizLayoutBuilder<string, PortAndProtocols, PortAndProtocols, string>({
		responseFetcher: (props) => <MultipleChoiceFetcher
			incorrectOptionsCount={new NonNegativeNumber(9)}
			getLabel={answerText}
			getIncorrectOptions={() => portIncorrectOptionGenerator.generate(props.answer, 1).filter((answer: PortAndProtocols) =>
				!props.trainingSessionHistory.last('question')?.answer ||
				!portIncorrectOptionGenerator.equals(answer, props.trainingSessionHistory.last('question')!.answer)
			)}
			{...props}
		/>,
		questionRenderer: (props) => <TextRenderer prompt="What well-known port is this service registered to?" {...props} />,
	}),
})

const portsToProtocolsAnswerKey = new AnswerKey<string, string>(
	portsAndProtocols.questions.map((question, index) => [
		portsAndProtocols.answers[index][0].join('/'),
		question,
	])
)

export const portsToProtocolsQuiz = new QuizBuilder<string, string, string, string>({
	title: 'ports to protocols',
	answerKey: portsToProtocolsAnswerKey,
	coordinator: new DefaultCoordinator({
		evaluator: (response, answer) => response === answer ? 1 : 0,
		feedback: {
			correct: () => 'Correct!',
			tryAgain: () => 'Try again.',
			fail: ({ question, answer }) => `${question} is used by ${answer}`,
		},
	}),
	layout: DefaultQuizLayoutBuilder<string, string, string, string>({
		responseFetcher: (props) => <MultipleChoiceFetcher
			incorrectOptionsCount={new NonNegativeNumber(8)}
			getLabel={(answer) => answer}
			{...props}
		/>,
		questionRenderer: (props) => <TextRenderer prompt="Which service uses this port?" {...props} />,
	}),
})
