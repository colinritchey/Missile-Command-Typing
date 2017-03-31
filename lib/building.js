const Util = require('./util.js');

class Building {
  constructor(options){
    // super(options);
    this.game = options.game;
    this.pos = options.pos;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;

    this.destroyed = false;
  }

  draw(ctx){

    if(this.destroyed){
      return;
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);

      ctx.fill();

      ctx.fillStyle = '#ffff00';

      for(let i = 0; i < 3; i++){

        for(let j = 0; j < 4; j++){
          ctx.fillRect(this.pos[0] + 5 + i*20, this.pos[1] + 5 + j*20, 10, 10);
        }

      }
      ctx.fill();
    }

  }

  isCollidedWith(object) {
    if (this.destroyed){ return false; }
    return object.pos[1] > this.pos[1] && (object.pos[0] > this.pos[0] && object.pos[0] < this.pos[0] + this.width);
  }

  remove() {
    this.game.remove(this);
  }


}

module.exports = Building;
