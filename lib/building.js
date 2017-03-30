const Util = require('./util.js');

class Building {
  constructor(options){
    // super(options);
    this.pos = options.pos;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;

    this.destroyed = false;
  }

  draw(ctx){
    ctx.fillStyle = this.color;

    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);

    ctx.fill();
  }

  isCollidedWith(object) {
    if (this.destroyed){ return false; }
    return object.pos[1] > this.pos[1] && (object.pos[0] > this.pos[0] && object.pos[0] < this.pos[0] + this.width);
  }

}

module.exports = Building;
