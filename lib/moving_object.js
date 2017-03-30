const Util = require('./util.js');

const NORMAL_FRAME_TIME_DELTA = 1000/60;

class MovingObject {
  constructor(options) {

    this.pos = options.pos || [400, 0];
    this.vel = options.vel || Util.randomVel();
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;

    this.isWrappable = false;

  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
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

      this.remove();
    }
  }

  remove() {
    this.game.remove(this);
  }

}



module.exports = MovingObject;
