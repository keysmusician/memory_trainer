import { music_notation } from "./data.js";

declare global {
  interface Window {
      Vex: any;
  }
}


// Disable form submission
window.onload = function() {
  document.getElementById("answer_form")!.onsubmit = function(submit_event) {
    submit_event.preventDefault();
  }
}

const question_display_base: HTMLElement =
  document.getElementById('item_display')!;

/**
 * Shuffles an array in place.
 */
function shuffleArray(array: any[]): void {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

type QuestionStats = {
  count: number,
  correct: number,
  streak: number,
  weight: number,
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

  #current_question: number;

  #return_collection: number[];

  // The number of times each question needs be correctly answered in a row in
  // order to complete training
  #winning_streak = 3;

  unasked_questions: number[];

  focus_questions: number[];

  comfortable_questions: number[];

  stats: Map<number, QuestionStats>;

  constructor(question_count: number) {
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

    this.stats = new Map(
      questions.map(question => [question, Object.create(stats)]));

    this.#current_question = null;
  };

  get is_complete(): boolean {
    for (const item of this.stats.values()) {
      if (item['streak'] < this.#winning_streak) { return false; }
    }

    return true;
  }

  get current_question(): number {
    if (this.#current_question === null) { this.get_next_question(); }
    return this.#current_question
  }

  get focus_stats(): Map<number, QuestionStats> {
    return new Map(this.focus_questions.map(
      question => [question, this.stats.get(question)])
    );
  }

  get_next_question(): number {
    const focus_questions_count = this.focus_questions.length;

    // Probability of choosing a focus question (at least 50%):
    const P_focus = focus_questions_count / (focus_questions_count + .5)

    const random_index = Math.floor(
      Math.random() * this.focus_questions.length);

    let next_question: number;

    if (Math.random() < P_focus || (
        this.unasked_questions.length === 0 &&
        this.comfortable_questions.length === 0
        )
      ) { // If a focus question is randomly chosen or is the only option

        next_question = this.focus_questions.splice(random_index, 1)[0];

        this.#return_collection.push(this.#current_question);

        this.#return_collection = this.focus_questions;
    }
    else if (this.unasked_questions.length > 0) {
        next_question = this.unasked_questions.pop();

        if (this.#current_question) {
          this.#return_collection.push(this.#current_question);
        }

        this.#return_collection = this.unasked_questions;
    }
    else {
        next_question = this.focus_questions.splice(random_index, 1)[0];

        // Return current item to a collection
        this.#return_collection.push(this.#current_question);

        // Where to return an item to if it's skipped
        this.#return_collection = this.comfortable_questions;
    }

    this.stats.get(next_question)['count'] += 1;

    this.#current_question = next_question;

    return next_question;
  }

  register(is_correct: boolean): boolean {
    const current_item_stats = this.stats.get(this.current_question);

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
};

/**
 * Input interpreter.
 */
function get_user_input() {
  return new Promise((resolve) => {
    const submit_button = document.getElementById('submit')!;
    const user_input = <HTMLInputElement>document.getElementById('user_input')!;

    const listener = () => {
      submit_button.removeEventListener('click', listener);
      resolve(user_input.value.trim());
      user_input.value = '';
    }
    submit_button.addEventListener('click', listener);
  });
}


/**
 * Output renderer. Controls how questions are visually presented.
 */
class BaseRenderer {
  rendering_area: HTMLElement;

  constructor(rendering_area: HTMLElement) {
    this.rendering_area = rendering_area;
  }

  render(question: any): void {
    this.rendering_area.innerText =
      `No renderer implemented for this data: ${question}`
  }
};

/**
 * Class which manages associative memory training.
 *
 * Wrapper around a Trainer.
 */
class MemoryTrainer {
  trainer: Trainer;

  renderer: BaseRenderer;

  questions: any[];

  answers: any[];

  constructor(answer_key: Map<any, any>, renderer: BaseRenderer) {
    const questions = [...answer_key.keys()];

    const answers = [...answer_key.values()];

    this.questions = questions;

    this.answers = answers;

    this.trainer = new Trainer(questions.length);

    this.renderer = renderer;
  }

  get answer(): any {
    return this.answers[this.trainer.current_question];
  }

  get hint(): any {
    return this.answer[0];
  }

  get question(): any {
    return this.questions[this.trainer.current_question]
  }

  /**
   * Input evaluator.
   *
   * Determines whether an answer was correct or incorrect.
   *
   * Note: This could later be extended to give a degree of correctness in the
   * range 0–1.
   */
  evaluate(user_answer: any): boolean {
    const correct_answer = String(
        this.answers[this.trainer.current_question]
      )
      .toLowerCase();

      return String(user_answer).toLowerCase() === correct_answer;
  }

  respond(user_answer: any): boolean {
    const is_correct = this.evaluate(user_answer)

    this.trainer.register(is_correct);

    return is_correct;
  }

  async train(): Promise<void> {
    const verdict_element = document.getElementById('verdict')!;

    while (!this.trainer.is_complete) {
      this.renderer.render(this.question)

      let user_input = await get_user_input();

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

          if (this.evaluate(await get_user_input())) {
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

      this.trainer.get_next_question();
    }

  }
}

class TextRenderer extends BaseRenderer {
  render(question: string) {
    this.rendering_area.innerHTML = `
    <h2>${question}</h2>
    `
  }
}

class MusicNotationRenderer extends BaseRenderer {
  render_context;

  constructor (rendering_area: HTMLElement) {
    super(rendering_area);

    const Renderer = window.Vex.Flow.Renderer;

    const renderer = new Renderer(this.rendering_area, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(208, 350);

    const render_context = renderer.getContext();

    render_context.scale(2, 2);

    this.render_context = render_context
  }

  render([clef, pitch, accidental]: [string, string, string]) {
    // Clear existing notes from the staff.
    const notation = document.querySelectorAll(
      '.vf-stavenote, .vf-stave');

    for (const element of notation) {
      element.remove();
    }

    const { Accidental, Formatter, Stave, StaveNote, Voice } = window.Vex.Flow;

    const stave = new Stave(...Object.values({
      left: 0,
      top: 25,
      width: 100
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

const memory_trainer = new MemoryTrainer(
  music_notation,
  new MusicNotationRenderer(question_display_base)
);

memory_trainer.train();
