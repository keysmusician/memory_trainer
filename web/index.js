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
var _Trainer_current_item, _Trainer_return_collection, _Trainer_winning_streak;
import { state_capitals } from "./data.js";
// Disable form submission
window.onload = function () {
    document.getElementById("answer_form").onsubmit = function (submit_event) {
        submit_event.preventDefault();
    };
};
/**
 * Shuffles an array in place.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
class Trainer {
    constructor(question_count) {
        _Trainer_current_item.set(this, void 0);
        _Trainer_return_collection.set(this, void 0);
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
        this.stats = new Map(questions.map(question => [question, Object.create(stats)]));
        __classPrivateFieldSet(this, _Trainer_current_item, null, "f");
    }
    ;
    get complete() {
        for (const item of this.stats.values()) {
            if (item['streak'] < __classPrivateFieldGet(this, _Trainer_winning_streak, "f")) {
                return false;
            }
        }
        return true;
    }
    get current_item() {
        if (__classPrivateFieldGet(this, _Trainer_current_item, "f") === null) {
            this.next_item();
        }
        return __classPrivateFieldGet(this, _Trainer_current_item, "f");
    }
    get focus_stats() {
        return new Map(this.focus_questions.map(item => [item, this.stats.get(item)]));
    }
    next_item() {
        const focus_questions_count = this.focus_questions.length;
        // Probability of choosing a focus question (at least 50%):
        const P_focus = focus_questions_count / (focus_questions_count + .5);
        const random_index = Math.floor(Math.random() * this.focus_questions.length);
        let next_item;
        if (Math.random() < P_focus || (this.unasked_questions.length === 0 &&
            this.comfortable_questions.length === 0)) { // If a focus question is randomly chosen or is the only option
            next_item = this.focus_questions.splice(random_index, 1)[0];
            __classPrivateFieldGet(this, _Trainer_return_collection, "f").push(__classPrivateFieldGet(this, _Trainer_current_item, "f"));
            __classPrivateFieldSet(this, _Trainer_return_collection, this.focus_questions, "f");
        }
        else if (this.unasked_questions.length > 0) {
            next_item = this.unasked_questions.pop();
            if (__classPrivateFieldGet(this, _Trainer_current_item, "f")) {
                __classPrivateFieldGet(this, _Trainer_return_collection, "f").push(__classPrivateFieldGet(this, _Trainer_current_item, "f"));
            }
            __classPrivateFieldSet(this, _Trainer_return_collection, this.unasked_questions, "f");
        }
        else {
            next_item = this.focus_questions.splice(random_index, 1)[0];
            // Return current item to a collection
            __classPrivateFieldGet(this, _Trainer_return_collection, "f").push(__classPrivateFieldGet(this, _Trainer_current_item, "f"));
            // Where to return an item to if it's skipped
            __classPrivateFieldSet(this, _Trainer_return_collection, this.comfortable_questions, "f");
        }
        this.stats.get(next_item)['count'] += 1;
        __classPrivateFieldSet(this, _Trainer_current_item, next_item, "f");
        return next_item;
    }
    register(is_correct) {
        const current_item_stats = this.stats.get(this.current_item);
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
_Trainer_current_item = new WeakMap(), _Trainer_return_collection = new WeakMap(), _Trainer_winning_streak = new WeakMap();
;
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
function display_item(item) {
    document.getElementById('item_display').innerText = item;
}
/**
 * Class which manages memory training.
 *
 * Wrapper around a Trainer.
 */
class MemoryTrainer {
    constructor(answer_key) {
        const questions = [...answer_key.keys()];
        const answers = [...answer_key.values()];
        this.questions = questions;
        this.answers = answers;
        this.trainer = new Trainer(questions.length);
    }
    get answer() {
        return this.answers[this.trainer.current_item];
    }
    get hint() {
        return this.answer[0];
    }
    get current_item() {
        return this.questions[this.trainer.current_item];
    }
    check_answer(user_answer) {
        const correct_answer = String(this.answers[this.trainer.current_item])
            .toLowerCase();
        return String(user_answer).toLowerCase() === correct_answer;
    }
    respond(user_answer) {
        const is_correct = this.check_answer(user_answer);
        this.trainer.register(is_correct);
        return is_correct;
    }
    train() {
        return __awaiter(this, void 0, void 0, function* () {
            const verdict_element = document.getElementById('verdict');
            while (!this.trainer.complete) {
                display_item(this.current_item);
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
                        if (this.check_answer(yield get_user_input())) {
                            verdict_element.innerText = 'correct';
                            break;
                        }
                    }
                }
                // Print stats
                for (const [key, score] of Array.from(this.trainer.stats).sort()) {
                    console.log(key, score);
                    if (score['count'] > 0) {
                        const accuracy = score['count'] > 0 ?
                            score['correct'] / score['count'] : 0;
                        console.log(`${key}: ${accuracy * 100}%: ${JSON.stringify(score)}`);
                    }
                }
                this.trainer.next_item();
            }
        });
    }
}
const memory_trainer = new MemoryTrainer(state_capitals);
memory_trainer.train();
