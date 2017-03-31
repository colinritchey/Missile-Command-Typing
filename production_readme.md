# Missile Command

[Live](https://colinritchey.github.io/Missile-Command-Typing/)

### Background

Missile Command is an arcade game that came out in 1980 and was published by Atari, Inc. and designed by Dave Theurer. A iteration of this game appeared in a mini-game within the browser game Frog Fractions in 2012, which was developed by Jim Crawford of Twinbeard Studios.

The basic premise is that the player must prevent missiles from landing by clicking where the counter-missiles will be launched and explode. Too many missiles landing on the ground and the player loses.

This iteration will have a command prompt and each missile will have text overlaying them. The player must type the word on the missile and a counter-missile will automatically launch and hit the falling missile. These are randomly selected words (from a pool of possible words) and when the player spells the right word the prompt will clear.

### Instructions

Press the spacebar to get started. Type in the words on the falling missiles to destroy them, the text will
turn green if you type the correct word and a counter missile will fire. If you miss your
buildings might get destroyed. Once all your buildings are destroyed the game will be over.
(Press the spacebar again to restart.)

### Architecture and Technologies

This project will use:

  - Javascript and Jquery for game logic and structure
  - HTML5 Canvas for DOM manipulation and rendering
  - Webpack to bundle and serve up the various scripts.

### Code snippets

```Javascript
  pointOfImpact(vel, pos, time){
    return [vel[0]*time + pos[0], vel[1]*time + pos[1]];
  },

  counter_velocity(start, finish, time){
    let x = (finish[0] - start[0])/time;
    let y = (finish[1] - start[1])/time;

    return [x, y];
  },
```

This next bit isn't really showing off a neat feature but more of a warning about canvas.
HTML5 canvas runs asynchronously, so if you run your canvas on page load be aware that
other promises (such as fetching Google Fonts) will not be loaded into canvas properly.

The solution is to have a HTML element with the font you desire (or call a function that
  will fetch your promise before the canvas is created).

```css
.start-screen{
  color: white;

  font-family: 'Press Start 2P', cursive;
}
```  

```HTML
  <section class="content-container">
    <div class="start-screen">
        press "space" to start typing
    </div>
    <canvas id="demoCanvas" class="canvas" width="800px" height="500px"></canvas>
    <input type="text" id="user-prompt" ></input>
  </section>
```

```javascript
  document.body.onkeyup = (e) => {
    if(e.keyCode === 32){

      $(".start-screen").hide();
      let ctx = canvasEl.getContext("2d");

      let game = new Game();
      let board = new Board(game, ctx);
      board.start();

      user_input.focus();
    }
  };

```

### Future features

  - Explosions for the missile and buildings
  - Difficulty setting, larger words and/or faster missiles
  - sound effects
