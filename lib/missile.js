const MovingObject = require('./moving_object.js');
const Util = require('./util.js');

class Missile extends MovingObject {
    constructor(options = {}) {

      // options.color = '#FF0000';
      options.pos = options.pos;
      options.radius = 50;
      options.vel = options.vel;
      super(options);

      this.text = Util.randomText();

      this.timeLeft = 100;
      this.toBeDeleted = false;
      this.pointOfImpact = [0,0];

    }

    draw(ctx) {

      let image = document.getElementById('missile');
      // console.log(this.radius);
      ctx.drawImage(image, this.pos[0] - 50, this.pos[1] - 15, 100, 30);


      ctx.fillStyle = this.color;
      let font = "bold 15px 'Press Start 2P'";
      ctx.font = font;

      let width = ctx.measureText(this.text).width;
      let height = ctx.measureText("w").width;

      ctx.fillText(this.text, this.pos[0] - (width/2) ,this.pos[1] + (height/2));

    }

    prepareForRemove(){
      this.color = '#00ff00';

      this.toBeDeleted = true;
      this.timeLeft = Util.timeLeft(this.pos);
      this.pointOfImpact = Util.pointOfImpact(this.vel, this.pos, this.timeLeft);

      return this.pointOfImpact;
    }

}


module.exports = Missile;
