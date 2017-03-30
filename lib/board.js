class Board {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.missiles = this.game.addMissiles();
  }

  start() {
    // this.bindKeyHandlers();
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    if(this.game.isOver){
      return;
    }

    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);

    this.game.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }

  endGame(){
    this.ctx.font = '48px serif';
    this.ctx.fillText('Hello world', 10, 50);
  }
}

module.exports = Board;
