import { DefaultQuizLayoutBuilder } from "../../defaultQuizLayout"
import { floatTimedCompareStrictlyEqual, TimedAnswer, TimedResponse } from "../../evaluators/evaluators"
import { NonNegativeNumber, Quiz, QuizBuilder } from "../../quiz"
import { TextRenderer } from "../../renderers/TextRenderer"
import { AutofillEnumFetcher } from "../../response fetchers/autofill enum fetcher"
import { DefaultCoordinator } from "../../TrainingCoordinator"

const timeLimitSeconds = new NonNegativeNumber(5)

// Vocab lists:
// https://en.wiktionary.org/wiki/Appendix:1000_Japanese_basic_words
// https://thejapanesepage.com/jlpt-n5-vocabulary/
const answer_key = new Map<string, TimedAnswer<string>>([
	['あめ', 'Rain | Candy'],
	['あと', 'Later'],
	// ['はい', 'Yes'],
	// ['あい', 'Love'],
	// ['はな', 'Flower'],
	// ['いす', 'Chair'],
	['かみ', 'Paper'],
	// ['くち', 'Mouth; Opening'],
	['くろ', 'Black'],
	['あか', 'Red'],
	['あお', 'Blue'],
	['しろ', 'White'],
	// ['みず', 'Water'],
	['ちず', 'Map'],
	['つき', 'Moon'],
	['みみ', 'Ear'],
	// ['ほん', 'Book'],
	// ['ねこ', 'Cat'],
	// ['いぬ', 'Dog'],
	// ['へび', 'Snake'],
	['うま', 'Horse'],
	['くま', 'Bear'],
	['やま', 'Mountain'],
	// ['そら', 'Sky'],
	['くも', 'Cloud | Spider'],
	['あき', 'Autumn; Fall'],
	['くつ', 'Shoes; Footwear'],
	// ['ちゃ', 'Tea'],
	['むし', 'Insect; Bug;'],
	['あさ', 'Morning'],
	['いえ', 'House'],
	['あし', 'Foot; Leg'],
	['あに', 'Older brother'],
	['あね', 'Older sister'],
	['あれ/あの', 'That (over there | mutually familiar thing)'],
	['これ/この', 'This (near me)'],
	['それ/その', 'That (near you)'],
	['どの', 'Which (one, of at least three)'],
	// Three characters
	['あまい', 'Sweet'],
	// ['あなた', 'You'],
	// ['いいえ', 'No'],
	// ['あした', 'Tomorrow'],
	// Four characters
	// ['あたらしい', 'Bright'],
	// ['おてあらい', 'Bathroom; Restroom'],
].map(([question, answer]) => [question, { answer, timeLimitSeconds }]))


const coordinator = new DefaultCoordinator({
	evaluator: floatTimedCompareStrictlyEqual<string>,
	feedback: {
		correct: () => "Correct!",
		tryAgain: (parameters) => `Hint: ${parameters.answer.answer[0]}`,
		fail: (parameters) => `The answer was ${parameters.answer.answer}`
	}
})

const layout = (prompt: string) => DefaultQuizLayoutBuilder<
	string,
	TimedAnswer<string>,
	TimedResponse<string>,
	string
>({
	responseFetcher: (props) => <AutofillEnumFetcher {...props} />,
	questionRenderer: (props) => <TextRenderer prompt={prompt} {...props} />,
	feedbackRenderer: (props) => <div>{props.feedback}</div>,
})

export const japanese_vocabulary = new QuizBuilder<
	string, // QuestionType
	TimedAnswer<string>, // AnswerType
	TimedResponse<string>, // ResponseType
	string // FeedbackType
>({
	title: "Japanese Vocabulary",
	quiz: new Quiz({ answerKey: answer_key }),
	coordinator: coordinator,
	layout: layout("What does this word mean:"),
})

export const english_to_japanese_vocabulary = new QuizBuilder<
	string, // QuestionType
	TimedAnswer<string>, // AnswerType
	TimedResponse<string>, // ResponseType
	string // FeedbackType
>({
	title: "English to Japanese Vocabulary",
	quiz: new Quiz({
		answerKey: new Map(
			answer_key.entries().map(([question, { answer }]) =>
				[answer, { answer: question, timeLimitSeconds }])
		)
	}),
	coordinator: coordinator,
	layout: layout("What is the Japanese word for:"),
})
