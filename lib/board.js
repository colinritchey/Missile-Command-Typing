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
    this.game.isOver = false;

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

    requestAnimationFrame(this.animate.bind(this));
  }

}

module.exports = Board;
