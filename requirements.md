
CODING EXERCISE
Instructions:
Please provide the implementation of the Live Football World Cup Score Board as a simple
library:
1. Please read and familiarize yourself with the guidelines below.
2. Please follow the guidelines to implement the task as per requirements described further
down in this document.
Guidelines:
✓ Keep it simple. Follow the requirements and try to implement the simplest solution you can think of
that works. Do not forget about edge cases!
✓ Use an in-memory store solution (for example just use collections to store the information you might
require).
✓ We don’t expect the solution to be a REST API, command line application, a Web Service,
or Microservice. Just a simple library implementation.
✓ Focus on Quality. Use Test-Driven Development (TDD), pay attention to OO design, Clean Code
and adherence to SOLID principles.
✓ Approach. Code the solution according to your standards. Please share your solution with a link
to a source control repository (e.g. GitHub, GitLab, BitBucket) as we would like you to see your
progress (your commit history is important)
✓ Add a README.md file where beside the project documentation you can make notes of any
assumption or things you would like to mention to us about your solution. 

Task requirements:
You are working in a sports data company, and we would like you to develop a new Live Football
World Cup Scoreboard library that shows all the ongoing matches and their scores.
The scoreboard supports the following operations:
1. Start a new match, assuming initial score 0 – 0 and adding it the scoreboard.
This should capture following parameters:
a. Home team
b. Away team
2. Update score. This should receive a pair of absolute scores: home team score and away
team score.
3. Finish match currently in progress. This removes a match from the scoreboard.
4. Get a summary of matches in progress ordered by their total score. The matches with the
same total score will be returned ordered by the most recently started match in the
scoreboard.
For example, if following matches are started in the specified order and their scores
respectively updated:
a. Mexico 0 - Canada 5
b. Spain 10 - Brazil 2
c. Germany 2 - France 2
d. Uruguay 6 - Italy 6
e. Argentina 3 - Australia 1
The summary should be as follows:
1. Uruguay 6 - Italy 6
2. Spain 10 - Brazil 2
3. Mexico 0 - Canada 5
4. Argentina 3 - Australia 1
5. Germany 2 - France 2