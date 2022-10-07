from collections import UserList
import csv
import random
import time


class RecallTrainer():

    def __init__(self, answer_key, shuffle=True):
        if not type(answer_key) is dict:
            raise TypeError(
                '`answer_key` must be a dict of questions and answers')
        self.__answer_key = answer_key
        questions = list(answer_key.keys())
        self.__questions = questions
        self.__answers = answer_key.values()
        if shuffle:
            random.shuffle(questions)
        self.unasked_questions:list = questions
        self.focus_questions:list = []
        self.comfortable_questions:list = []
        stats = {
            'count': 0,
            'correct': 0,
            'streak': 1,
            'weight': 1
        }
        self.stats = {item: dict(stats) for item in questions} # dict(stats) instantiates a new dict per item so items don't share their stats
        self.__current_item = None

        # Probability of an unasked question being selected: <- variable description
        # self.P_CHOOSE_UNASKED = .5 # <- variable with a shortened name; Variables should have a full name which collapses to a short version automatically by the IDE

    @property
    def answer(self):
        return self.answer_key.get(self.current_item) # current item could be None, so use `.get`` rather than bracket notation <- implementation justification

    @property
    def answer_key(self):
        return self.__answer_key

    @property
    def complete(self) -> bool:
        """
        Whether the RecallTrainer has completed training.
        """
        return all(item['streak'] >= 3 for item in self.stats.values())

    @property
    def current_item(self):
        """
        The item chosen for the current example.
        """
        if self.__current_item is None:
            self.next_item()
        return self.__current_item

    @property
    def focus_stats(self):
        return {
            item: stats for item, stats in self.stats.items()
            if item in self.focus_questions
        }

    def __normalized_inverse_weights(self, weights):
        # Calculate the relative weights of each item
        max_weight = max(weights.values())

        inverse_weights = {
            item: max_weight - weight for item, weight in weights.items()
        }

        total_inverse_weight = sum(inverse_weights.values())

        weights = {
            item: weight / total_inverse_weight if
            total_inverse_weight > 0 else 0 for item, weight in
            inverse_weights.items()
        }

        print('__normalized_inverse_weights : ', {k: v for k, v in weights.items()}) # <- Debugging line

        weights_list = list(weights.items())

        items = [element[0] for element in weights_list]

        weights = [element[1] for element in weights_list]

        return items, weights

    def _next_item(self):
        """
        Chooses the (hopefully) optimal item for helping you memorize the
        entire sequence.

        Traits:
            Idempotent: false
            Side-effects: self-mutating

        Returns: A prompt item.
        """
        focus_is_ready_to_grow = all(
            stats['streak'] >= 2 for stats in self.focus_stats.values())
        if focus_is_ready_to_grow and len(self.unasked_questions) > 0:
            del focus_is_ready_to_grow
            next_item = self.unasked_questions.pop()
            self.focus_questions.append(next_item)
        else:
        # Draw a new item, and replace the previous item (if there was one):
            current_item = self.__current_item
            if current_item is not None:
                self.focus_questions.remove(current_item)

            items, weights = self.__normalized_inverse_weights(
                {item: score['weight'] for item, score in
                self.focus_stats.items()}
            )

            next_item = random.choices(items, weights)[0]
            if current_item is not None:
                self.focus_questions.append(current_item)

        self.__current_item = next_item
        self.stats[next_item]['count'] += 1

        return next_item

    def add_answers(self, key_or_dict, value=None):
        """
        Adds one or more answers to the answer key.

        key_or_dict: A dictionary of new keys and values, or a single key to
            add.
        """
        if type(key_or_dict) is dict:
            self.__answer_key = key_or_dict.update(self.answer_key)
            keys = key_or_dict.keys()
        else:
            if value is None:
                raise ValueError(
                    'Value must be provided when `item` is not a dict')
            self.__answer_key[key] = value
            keys = [key_or_dict]

        for key in keys:
            if self.stats.get(key) is None:
                self.stats[key] = 1

    # Incomplete:
    def check_answer(self, user_input) -> bool:
        """
        Validates user's response.

        Returns: Whether the answer is correct or not.
        """
        correct_answer = str(self.answer_key.get(self.current_item)).casefold()
        return str(user_input).casefold() == correct_answer

    def next_item(self):
        """
        Chooses the (hopefully) optimal item for helping you memorize the
        entire sequence.

        Traits:
            Idempotent: false
            Side-effects: self-mutating

        Returns: A prompt item.
        """
        print('RecallTrainer.next_item: # unasked questions:', len(self.unasked_questions))
        focus_questions_count = len(self.focus_questions)

        # Probability of choosing a focus question (at least 50%):
        P_focus = focus_questions_count / (focus_questions_count + 1)

        if random.random() < P_focus or (
            len(self.unasked_questions) == 0 and
            len(self.comfortable_questions) == 0
        ): # If a focus question is randomly chosen or is the only option
            next_item = random.choices(self.focus_questions)[0] # Add weights

            self.focus_questions.remove(next_item) # There's probably a more efficient way to do this

            self.__return_collection.append(self.__current_item)

            self.__return_collection = self.focus_questions
        elif len(self.unasked_questions) > 0:
            next_item = self.unasked_questions.pop()

            if self.__current_item:
                self.__return_collection.append(self.__current_item)

            self.__return_collection = self.unasked_questions
        else:
            next_item = random.choices(
                self.comfortable_questions)[0] # Add weights

            self.comfortable_questions.remove(next_item) # There's probably a more efficient way to do this
            # Return current item to a collection
            self.__return_collection.append(self.__current_item)
            # Where to return an item to if it's skipped
            self.__return_collection = self.comfortable_questions

        self.__current_item = next_item

        self.stats[next_item]['count'] += 1

        return next_item

    def register(self, user_input):
        """
        Registers an answer for the current item.

        Returns: Whether the answer was correct.
        """
        current_item_stats = self.stats[self.current_item]

        is_correct = self.check_answer(user_input)

        self.__return_collection = self.focus_questions

        if is_correct:
            current_item_stats['correct'] += 1

            current_item_stats['streak'] += 1

            if current_item_stats['streak'] >= 2: # Magic number!
                self.__return_collection = self.comfortable_questions
        else:
            current_item_stats['streak'] = 0

        current_item_stats['weight'] = (
            current_item_stats['streak'] *
            current_item_stats['correct']
        )

        return is_correct

    def respond(self, answer: str) -> bool:
        """
        Registers an answer for the current item and proceeds to the next item.

        answer: User's input answer.

        Returns: Whether the answer was correct.

        Traits:
            side-effects: self-mutating
        """
        is_correct = self.register(answer)

        self.next_item()

        return is_correct

# Show me a random item from a list of things I want to memorize.
# The list of things I want to memorize:

with open('us_state_capitals.csv') as file:
    reader = csv.reader(file)
    next(reader)
    us_state_capitals = {row[0].strip(): row[1].strip() for row in reader}


hiragana = [
    'あ',
    'い',
    'う',
    'え',
    'お',
    'か',
    'き',
    'く',
    'け',
    'こ'
]

all_items = us_state_capitals

all_items = {key: us_state_capitals[key] for key in random.sample(list(all_items.keys()), 5)}

# Don't show the same item twice in a row.
recall_trainer = RecallTrainer(all_items)


while not recall_trainer.complete:
    print(recall_trainer.current_item)
# I'll tell you what I think the answer is. <- english explanation

    fail_streak = 0 # <- loop variable
    # Time the response <- block/multiline code summary
    start_time = time.time_ns()
    while True:
        user_input = input() # should probably be sanitized <- to-do

        if recall_trainer.check_answer(user_input):
            print("correct")
            recall_trainer.register(user_input)
            break

        # implicit else: <- explicit notice/reminder of an implicit detail
        fail_streak += 1
# If I'm wrong, tell me to try again.
        if fail_streak == 1:
            print('Try again')
# If I'm wrong a second time, give me a hint.
        elif fail_streak == 2:
            print(f"Hint: {recall_trainer.answer[0]}")
# If I'm wrong a third time, tell me what it is.
        elif fail_streak >= 3:
            print(f"Answer:{recall_trainer.answer}")
            recall_trainer.register(user_input)
            break

    end_time = time.time_ns()
    answer_duration = end_time - start_time

    # print stats
    print('{:.3g}s'.format(answer_duration / 1e9))

    for key, score in sorted(recall_trainer.stats.items(), reverse=True):
        if score['count'] > 0:
            accuracy = score['correct'] / score['count'] \
                if score['count'] > 0 else 0
            print('{}: {:3}%: {}'.format(key, float(accuracy) * 100, score))

    recall_trainer.next_item()
# If I'm right, show me a different item at random.
# Remember the ones I get wrong, and choose those more frequently.
# If I get something right the first time, assume that I don't need to practice it.
# If I get multiple wrong, don't introduce new items until I show that I'm confident with the ones I'm getting wrong
