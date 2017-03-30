const Util = require('./util.js');

class Ground {
  constructor(options){
    this.pos = options.pos;
    this.color = options.color;
  }

  draw(ctx){
    ctx.fillStyle = this.color;

    ctx.fillRect(this.pos[0], this.pos[1], 800, 400);

    ctx.fill();
  }

  isCollidedWith(object) {
    return object.pos[1] > this.pos[1];
  }

}

module.exports = Ground;
