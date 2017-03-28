const Util = require('./util.js');

class MovingObject {
  constructor(options) {
    this.pos = options.pos || Util.randomPos();
    this.vel = options.vel || Util.randomVel();
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;

    this.isWrappable = false;

  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );

    ctx.fill();

  }

  move(timeDelta) {
    const velocityScale = 1;
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if(this.toBeDeleted){
      this.timeLeft--;
    }

    if(this.timeLeft < 0){
      this.remove();
    }

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  }

  remove() {
    this.game.remove(this);
  }

}

module.exports = MovingObject;
