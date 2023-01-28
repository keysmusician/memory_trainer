var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Trainer_current_question, _Trainer_return_collection, _Trainer_winning_streak;
import { music_notation } from "./data.js";
// Disable form submission
window.onload = function () {
    document.getElementById("answer_form").onsubmit = function (submit_event) {
        submit_event.preventDefault();
    };
};
const question_display_base = document.getElementById('item_display');
/**
 * Shuffles an array in place.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
/**
 * The main training class. Determines which questions to ask and when by
 * keeping track of correct and incorrect answer.
 *
 * This class doesn't actually know what the questions or answers are, it
 * works with question *indexes*, so wherever you see "question" used in this
 * class, think "question index."
 */
class Trainer {
    constructor(question_count) {
        _Trainer_current_question.set(this, void 0);
        _Trainer_return_collection.set(this, void 0);
        // The number of times each question needs be correctly answered in a row in
        // order to complete training
        _Trainer_winning_streak.set(this, 3);
        const questions = [...Array(question_count).keys()];
        shuffleArray(questions);
        this.unasked_questions = questions;
        this.focus_questions = [];
        this.comfortable_questions = [];
        const stats = {
            count: 0,
            correct: 0,
            streak: 1,
            weight: 1,
        };
        this.stats = questions.map(_ => Object.create(stats));
        __classPrivateFieldSet(this, _Trainer_current_question, null, "f");
    }
    ;
    get is_complete() {
        for (const stat of this.stats) {
            if (stat['streak'] < __classPrivateFieldGet(this, _Trainer_winning_streak, "f")) {
                return false;
            }
        }
        return true;
    }
    get current_question() {
        if (__classPrivateFieldGet(this, _Trainer_current_question, "f") === null) {
            this.get_next_question();
        }
        return __classPrivateFieldGet(this, _Trainer_current_question, "f");
    }
    get focus_stats() {
        return new Map(this.focus_questions.map(question => [question, this.stats[question]]));
    }
    get_next_question() {
        const focus_questions_count = this.focus_questions.length;
        // Probability of choosing a focus question (at least 50%):
        const P_focus = focus_questions_count / (focus_questions_count + .5);
        let next_question;
        if (Math.random() < P_focus || (this.unasked_questions.length === 0 &&
            this.comfortable_questions.length === 0)) { // If a focus question is randomly chosen or is the only option
            const random_index = Math.floor(Math.random() * this.focus_questions.length);
            next_question = this.focus_questions.splice(random_index, 1)[0];
            __classPrivateFieldGet(this, _Trainer_return_collection, "f").push(__classPrivateFieldGet(this, _Trainer_current_question, "f"));
            __classPrivateFieldSet(this, _Trainer_return_collection, this.focus_questions, "f");
        }
        else if (this.unasked_questions.length > 0) {
            next_question = this.unasked_questions.pop();
            if (__classPrivateFieldGet(this, _Trainer_current_question, "f") !== null) {
                __classPrivateFieldGet(this, _Trainer_return_collection, "f").push(__classPrivateFieldGet(this, _Trainer_current_question, "f"));
            }
            __classPrivateFieldSet(this, _Trainer_return_collection, this.unasked_questions, "f");
        }
        else {
            const random_index = Math.floor(Math.random() * this.comfortable_questions.length);
            next_question = this.comfortable_questions.splice(random_index, 1)[0];
            // Return current item to a collection
            __classPrivateFieldGet(this, _Trainer_return_collection, "f").push(__classPrivateFieldGet(this, _Trainer_current_question, "f"));
            // Where to return an item to if it's skipped
            __classPrivateFieldSet(this, _Trainer_return_collection, this.comfortable_questions, "f");
        }
        this.stats[next_question]['count'] += 1;
        __classPrivateFieldSet(this, _Trainer_current_question, next_question, "f");
        return next_question;
    }
    register(is_correct) {
        const current_item_stats = this.stats[this.current_question];
        __classPrivateFieldSet(this, _Trainer_return_collection, this.focus_questions, "f");
        if (is_correct) {
            current_item_stats['correct'] += 1;
            current_item_stats['streak'] += 1;
            if (current_item_stats['streak'] >= 2) { // Magic number!
                __classPrivateFieldSet(this, _Trainer_return_collection, this.comfortable_questions, "f");
            }
        }
        else {
            current_item_stats['streak'] = 0;
        }
        current_item_stats['weight'] = (current_item_stats['streak'] *
            current_item_stats['correct']);
        return is_correct;
    }
}
_Trainer_current_question = new WeakMap(), _Trainer_return_collection = new WeakMap(), _Trainer_winning_streak = new WeakMap();
;
/**
 * Input interpreter.
 */
function get_user_input() {
    return new Promise((resolve) => {
        const submit_button = document.getElementById('submit');
        const user_input = document.getElementById('user_input');
        const listener = () => {
            submit_button.removeEventListener('click', listener);
            resolve(user_input.value.trim());
            user_input.value = '';
        };
        submit_button.addEventListener('click', listener);
    });
}
/**
 * Output renderer. Controls how questions are visually presented.
 */
class BaseRenderer {
    constructor(rendering_area) {
        this.rendering_area = rendering_area;
    }
    render(question) {
        this.rendering_area.innerText =
            `No renderer implemented for this data: ${question}`;
    }
}
;
/**
 * Class which manages associative memory training.
 *
 * Wrapper around a Trainer.
 */
class MemoryTrainer {
    constructor(answer_key, Renderer = BaseRenderer) {
        const questions = [...answer_key.keys()];
        const answers = [...answer_key.values()];
        this.questions = questions;
        this.answers = answers;
        this.trainer = new Trainer(questions.length);
        this.renderer = new Renderer(question_display_base);
    }
    get answer() {
        return this.answers[this.trainer.current_question];
    }
    get hint() {
        return this.answer[0];
    }
    get question() {
        return this.questions[this.trainer.current_question];
    }
    /**
     * Input evaluator.
     *
     * Determines whether an answer was correct or incorrect.
     *
     * Note: This could later be extended to give a degree of correctness in the
     * range 0–1.
     */
    evaluate(user_answer) {
        const correct_answer = String(this.answers[this.trainer.current_question][1])
            .toLowerCase();
        return String(user_answer).toLowerCase() === correct_answer;
    }
    respond(user_answer) {
        const is_correct = this.evaluate(user_answer);
        this.trainer.register(is_correct);
        return is_correct;
    }
    train() {
        return __awaiter(this, void 0, void 0, function* () {
            const verdict_element = document.getElementById('verdict');
            while (!this.trainer.is_complete) {
                this.renderer.render(this.question);
                let user_input = yield get_user_input();
                if (this.respond(user_input)) {
                    verdict_element.innerText = 'correct';
                }
                else {
                    let fail_streak = 0;
                    while (true) {
                        fail_streak += 1;
                        if (fail_streak === 1) {
                            verdict_element.innerText = 'Try again';
                        }
                        else if (fail_streak === 2) {
                            verdict_element.innerText = `Hint: ${this.hint}`;
                        }
                        else if (fail_streak >= 3) {
                            verdict_element.innerText = `The correct answer was: ` +
                                `${this.answer}`;
                            break;
                        }
                        if (this.evaluate(yield get_user_input())) {
                            verdict_element.innerText = 'correct';
                            break;
                        }
                    }
                }
                // Print stats
                this.trainer.stats.forEach((score, index) => {
                    console.log(index, score);
                    if (score['count'] > 0) {
                        const accuracy = score['count'] > 0 ?
                            score['correct'] / score['count'] : 0;
                        console.log(`${index}: ${accuracy * 100}%: ${JSON.stringify(score)}`);
                    }
                });
                this.trainer.get_next_question();
            }
        });
    }
}
class TextRenderer extends BaseRenderer {
    render(question) {
        this.rendering_area.innerHTML = `
    <h2>${question}</h2>
    `;
    }
}
class ImageRenderer extends BaseRenderer {
    render(image_source) {
        this.rendering_area.innerHTML = `
    <img src="${image_source}"/>
    `;
    }
}
class MusicNotationRenderer extends BaseRenderer {
    constructor(rendering_area) {
        super(rendering_area);
        const Renderer = window.Vex.Flow.Renderer;
        const renderer = new Renderer(this.rendering_area, Renderer.Backends.SVG);
        // Configure the rendering context.
        renderer.resize(208, 350);
        const render_context = renderer.getContext();
        render_context.scale(2, 2);
        this.render_context = render_context;
    }
    render([clef, pitch, accidental]) {
        // Clear existing notes from the staff.
        const notation = document.querySelectorAll('.vf-stavenote, .vf-stave');
        for (const element of notation) {
            element.remove();
        }
        const { Accidental, Formatter, Stave, StaveNote, Voice } = window.Vex.Flow;
        const stave = new Stave(...Object.values({
            left: 1,
            top: 25,
            width: 101
        }));
        stave.addClef(clef);
        stave.setContext(this.render_context).draw();
        const note = new StaveNote({ clef: clef, keys: [pitch], duration: "w" });
        if (accidental !== '')
            note.addModifier(new Accidental(accidental));
        const voices = [
            new Voice({
                num_beats: 4,
                beat_value: 4,
            }).addTickables([note]),
        ];
        new Formatter().joinVoices(voices).format(voices, 200);
        for (const voice of voices) {
            voice.draw(this.render_context, stave);
        }
    }
}
const memory_trainer = new MemoryTrainer(music_notation, MusicNotationRenderer);
memory_trainer.train();
