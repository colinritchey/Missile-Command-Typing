# Missile Command

### Background

Missile Command is an arcade game that came out in 1980 and was published by Atari, Inc. and designed by Dave Theurer. A iteration of this game appeared in a mini-game within the browser game Frog Fractions in 2012, which was developed by Jim Crawford of Twinbeard Studios.

The basic premise is that the player must prevent missiles from landing by clicking where the counter-missiles will be launched and explode. Too many missiles landing on the ground and the player loses.

This iteration will have a command prompt and each missile will have text overlaying them. The player must type the word on the missile and a counter-missile will automatically launch and hit the falling missile. These are randomly selected words (from a pool of possible words) and when the player spells the right word the prompt will clear.

### Functionalities

  -[ ] Player will be able to start and reset game.

  -[ ] type into the command prompt

  -[ ] Production README

  -[ ] About Modal for instructions

### Wireframe

This game will have a Game board, Command Prompt where the player will be typing, an About Modal describing the controls, and a links to the Github Repo and my LinkedIn profile page.

![wireframe-main-screen](./Missile-Command-Typing.png)

### Architecture and Technologies

This project will use:

  - Javascript and Jquery for game logic and structure
  - Easel.js with HTML5 Canvas for DOM manipulation and rendering
  - Webpack to bundle and serve up the various scripts.

##### Scripts

  - `board.js` will render the necesary Easel.js elements on the screen.

  - `game.js` will handle the logic of the game. This includes spanning and giving directions to `Missile` Objects, comparing the player `Prompt` object's `word` to each missile active, calculate the win/failure state with a `life-bar`, and calculate the `counter_missile` object's direction.

  - `missile.js` (and `counter_missile.js`) will be the constructor and will update functions for `Missile` objects. Each `Missile` will have a `direction`, an `alive` state, and a `word`

  - `counter_missile.js` will be similar to `Missile` but will not have a random direction, but will calculate the direction based on the trajectory given (the `Missile` it is going to destroy).

  - `prompt.js` will construct the `Prompt` object, which will handle the player input and output to `Game` the current player `word`.

### Implementation Timeline

##### Day 1

Setup all necessary Node modules, including getting webpack up and running and Easel.js installed. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all the scripts outlined above. Learn the basics of Easel.js.

  - webpack Setup
  - Basic file structure
  - Learn basic Easel.js

##### Day 2

Build out the `Prompt` constructor and write logic within `game.js` to handle word checking. Populate the game with a few words with time limits and remove words if the prompt's word matches. Render a `Missile` object and populate within `board.js`. Render the command prompt and remove missiles when player word matches.

  - `Prompt` object creation and handling
  - word gathering and removal within `game.js`
  - Render `Missile` objects in `Board`
  - combine with game logic

##### Day 3

Work on Game logic to create and populate board continuously. Handle Missile collision with the ground and update the Game with hit points, develop a failure state and restart game option. Create `counter-missile.js` and have it calculate its path with the `Missile` object's path. Render `counter-missile` object.

  - Continuous missile spanning
  - Hit bar and missile collision
  - `counter-missile.js`, path calculation and rendering

##### Day 4

Style and clean up front-end, catchup on any features missing.

##### Bonus

  - insert music and/or sound effects similar to the original game
