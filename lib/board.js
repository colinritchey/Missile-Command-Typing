class Board {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.playerInput = undefined;
    this.lastTime = 0;
  }

  start() {
    this.game.addMissiles();
    this.game.addBuildings();
    this.playerInput = this.game.getInput();

    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    if(this.game.isOver){
      document.getElementById("user-prompt").blur();

      return;
    }

    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);

    this.game.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }

  endGame(){ // currently not in use
    this.ctx.font = '48px serif';
    this.ctx.fillText('Hello world', 10, 50);

    this.game.missiles.forEach((missile) => {
      missile.remove();
    });

    $('#user-prompt').off( 'input', this.playerInput);
  }
}

module.exports = Board;
