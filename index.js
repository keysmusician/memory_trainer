import { state_capitals } from "./data.js";


// Disable form submission
window.onload = function() {
  document.getElementById("answer_form").onsubmit = function(submit_event) {
    submit_event.preventDefault();
  }
}

/**
 * Shuffles an array in place.
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

class MemoryTrainer {

  #current_item;
  #return_collection;

  constructor(answer_key, shuffle=true) {
    this.answer_key = answer_key;

    const questions = [...answer_key.keys()];

    const answers = [...answer_key.keys()];

    if (shuffle) {
      shuffleArray(questions);
    }

    this.unasked_questions = questions;

    this.focus_questions = [];

    this.comfortable_questions = [];

    const stats = {
      count: 0,
      correct: 0,
      streak: 1,
      weight: 1,
    };

    this.stats = new Map(
      questions.map(question => [question, Object.create(stats)]));

    this.#current_item = null;
  };

  get answer() {
    return this.answer_key.get(this.current_item);
  }

  get complete() {
    for (const item of this.stats.values()) {
      if (item['streak'] < 3) { return false; }
    }

    return true;
  }

  get current_item() {
    if (this.#current_item === null) { this.next_item(); }
    return this.#current_item
  }

  get focus_stats() {
    return new Map(
      this.focus_questions.map(item => [item, this.stats.get(item)]));
  }

  get hint() {
    return this.answer[0];
  }

  check_answer(user_input) {
    const correct_answer = String(this.answer_key.get(this.current_item))
      .toLowerCase();

      return String(user_input).toLowerCase() === correct_answer;
  }

  next_item() {
    const focus_questions_count = this.focus_questions.length;

    // Probability of choosing a focus question (at least 50%):
    const P_focus = focus_questions_count / (focus_questions_count + .5)

    const random_index = Math.floor(
      Math.random() * this.focus_questions.length);

    let next_item;

    if (Math.random() < P_focus || (
        this.unasked_questions.length === 0 &&
        this.comfortable_questions.length === 0
        )
      ) { // If a focus question is randomly chosen or is the only option

        next_item = this.focus_questions.splice(random_index, 1)[0];

        this.#return_collection.push(this.#current_item);

        this.#return_collection = this.focus_questions;
    }
    else if (this.unasked_questions.length > 0) {
        next_item = this.unasked_questions.pop();

        if (this.#current_item) {
          this.#return_collection.push(this.#current_item);
        }

        this.#return_collection = this.unasked_questions;
    }
    else {
        next_item = this.focus_questions.splice(random_index, 1)[0];

        // Return current item to a collection
        this.#return_collection.push(this.#current_item);

        // Where to return an item to if it's skipped
        this.#return_collection = this.comfortable_questions;
    }

    this.stats.get(next_item)['count'] += 1;

    this.#current_item = next_item;

    return next_item;
  }

  register(user_input) {
    const current_item_stats = this.stats.get(this.current_item);

    const is_correct = this.check_answer(user_input);

    this.#return_collection = this.focus_questions;

    if (is_correct) {
        current_item_stats['correct'] += 1;

        current_item_stats['streak'] += 1;

        if (current_item_stats['streak'] >= 2) { // Magic number!
          this.#return_collection = this.comfortable_questions;
        }
    }
    else { current_item_stats['streak'] = 0; }

    current_item_stats['weight'] = (
        current_item_stats['streak'] *
        current_item_stats['correct']
    );

    return is_correct;
  }

  respond(answer) {
    const is_correct = this.register(answer);

    this.next_item();

    return is_correct;
  }
};

function get_user_input() {
  return new Promise((resolve) => {
    const submit_button = document.getElementById('submit');
    const user_input = document.getElementById('user_input');

    const listener = () => {
      submit_button.removeEventListener('click', listener);
      resolve(user_input.value.trim());
      user_input.value = '';
    }
    submit_button.addEventListener('click', listener);
  });
}

function display_item(item) {
  document.getElementById('item_display').innerText = item;
}

const memory_trainer = new MemoryTrainer(state_capitals);

const verdict_element = document.getElementById('verdict');

while (!memory_trainer.complete) {
  display_item(memory_trainer.current_item)

  let user_input = await get_user_input();

  if (memory_trainer.register(user_input)) {
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
        verdict_element.innerText = `Hint: ${memory_trainer.hint}`;
      }
      else if (fail_streak >= 3) {
        verdict_element.innerText = `The correct answer was: ` +
          `${memory_trainer.answer}`;
        break;
      }

      if (memory_trainer.check_answer(await get_user_input())) {
        verdict_element.innerText = 'correct';
        break;
      }
    }
  }

  // Print stats
  for (const [key, score] of Array.from(memory_trainer.stats).sort()) {
    console.log(key, score);
    if (score['count'] > 0) {

      const accuracy = score['count'] > 0 ?
        score['correct'] / score['count'] : 0;

      console.log(`${key}: ${accuracy * 100}%: ${JSON.stringify(score)}`);
    }
  }

  memory_trainer.next_item();
}
