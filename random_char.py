import random

chars = [
    'あ',
    'い',
    'う',
    'え',
    'お',
]

# Integer between 0 and 1 determining the minimum chance an item may have
# of being selected.
# MINIMUM_RATE = .05

class Score:

    def __init__(self, item, correct=0, total=0, streak=0) -> None:
        self.item = item
        self.correct = correct
        self.total = total
        self.streak = streak

    def __repr__(self) -> str:
        return 'Score(' + str(self.item) + ': ' + f'{self.rate:.3}' + ')'

    @property
    def rate(self):
        try:
            score = self.correct / self.total
        except ZeroDivisionError:
            score = 0.0
        return score

    def __lt__(self, a):
        if type(a) is Score:
            a = a.rate
        return self.rate < a

    def __gt__(self, a):
        if type(a) is Score:
            a = a.rate
        return self.rate > a

# Give each character a score
scores = {item: Score(item, 0, 1) for item in chars}

char_count = len(chars)
max_random_index = len(chars) - 2
trial = 0

item_index = random.randint(0, max_random_index + 1)
item = chars[item_index]
chars.remove(item)
print(item)

while (True):
    trial += 1
    user_input = input()
    scores[item].total += 1
    if user_input == '1':
        scores[item].correct += 1
    elif user_input != '':
        exit()
    print('scores:', sorted(scores.values(), reverse=True))
    total_rate = sum(1 - score.rate for score in scores.values())
    weights = {
        char: (1 - scores.get(char).rate) / (total_rate) for char in chars
    }
    print('weights:', weights)
    queued_item_index = random.choices(
        range(max_random_index + 1), weights.values())[0]
    queued_item = chars[queued_item_index]
    chars.remove(queued_item)
    print(queued_item)
    chars.insert(item_index, item)
    item, item_index = queued_item, queued_item_index
