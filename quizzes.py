"""
Sets up quizzes.
"""
import csv


hiragana = {character: '' for character in [
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
]}


with open('us_state_capitals.csv') as file:
    reader = csv.reader(file)
    next(reader)
    us_state_capitals = {row[0].strip(): row[1].strip() for row in reader}

with open('european_capitals.csv') as file:
    reader = csv.reader(file)
    next(reader)
    european_capitals = {row[0].strip(): row[1].strip() for row in reader}
