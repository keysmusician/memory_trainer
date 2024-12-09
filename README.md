# Memory Trainer
This is the web demo of my memory training algorithm.

## Why this tool?
A lot of online tools for memorization simply use (pseudo)randomization for shuffling items you are trying to memorize. What makes this tool unique is that it tracks your accuracy and assigns a higher probability to items that you answer incorrectly, and conversely decreases the probability of presenting items you have less difficulty with.
<!-- Name ideas
Memory Trainer
Memory Speed Trainer
Recall Trainer
Memory Coach
-->

This training algorithm is based on a model of quizzing that focuses on a single question at a time. Other styles of quizzing might present multiple questions simultaneously allowing the participant to either prepare for upcoming questions (like sightreading.training) or answer questions in an arbitrary order (like most paper tests or JetPunk most quizzes).

## Directory structure

TODO: Clean it up and then explain it


## To-do
- Refactor out duplicate code in CharacterRenderer and StateCapitalTextRenderer
- Add a quiz configuration screen (in progress, long way to go)
- Add a quiz builder interface
- Need a way to add & select quiz presets, which are basically sub-quizzes, so should quizzes form tree structures?
- User data (remember quiz stats) https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
- Add a mechanism for limiting the size of the SmartTrainer's focus questions pool/set. IIRC, right now it can eventually grow to the size of the entire answer key, which defeats the purpose of a focus set.
- Consider adding a mechanism in the SmartTrainer to track overall performance over a training session. If a user's performance is declining across a single session, the UI could suggest taking a break or shrinking the number of questions or trying a less challenging version of the quiz or something.
- Clean up directory structure and write an overview of it

## References
Interesting TS solution with type guards:
https://stackoverflow.com/a/51124423/10402691
