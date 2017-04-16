const Util = require('./util.js');

class Building {
  constructor(options){
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
      // ctx.fillStyle = this.color;
      // ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
      //
      // ctx.fill();
      //
      // ctx.fillStyle = '#ffff00';
      //
      // for(let i = 0; i < 3; i++){
      //   for(let j = 0; j < 4; j++){
      //     ctx.fillRect(this.pos[0] + 5 + i*20, this.pos[1] + 5 + j*20, 10, 10);
      //   }
      // }
      //
      // ctx.fill();
      let image = document.getElementById('building');

      ctx.drawImage(image, this.pos[0], this.pos[1], this.width, this.height);
    }

  }

  isCollidedWith(object) {
    if (this.destroyed){ return false; }

    let collision = false;

    if (object.pos[0] - 50 < this.pos[0] + this.width &&
      object.pos[0] + 50 > this.pos[0] &&
      object.pos[1] < this.pos[1] + this.height &&
      object.pos[1] + 15> this.pos[1]) {
        // collision detected!
          collision = true;
      }

    // return object.pos[1] > this.pos[1] && object.pos[0] > this.pos[0]
    //   && (object.pos[0] < (this.pos[0] + this.width));
    return collision;
  }

  remove() {
    this.game.remove(this);
  }

}

module.exports = Building;
