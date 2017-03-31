const MovingObject = require('./moving_object.js');
const Util = require('./util.js');

class Missile extends MovingObject {
    constructor(options = {}) {

      options.color = '#FF0000';
      options.pos = options.pos;
      options.radius = 25;
      options.vel = options.vel;
      super(options);

      this.text = Util.randomText();

      this.timeLeft = 100;
      this.toBeDeleted = false;
      this.pointOfImpact = [0,0];

    }

    draw(ctx) {

      let image = document.getElementById('missile');
      ctx.drawImage(image, this.pos[0] - 50, this.pos[1] - 15, 100, 30);


      ctx.fillStyle = this.color; // font color to write the text with
      let font = "bold " + (this.radius/2) +"px 'Press Start 2P'";
      ctx.font = font;

      // Move it down by half the text height and left by half the text width
      let width = ctx.measureText(this.text).width;
      let height = ctx.measureText("w").width; // this is a GUESS of height

      ctx.fillText(this.text, this.pos[0] - (width/2) ,this.pos[1] + (height/2));

    }

    prepareForRemove(){
      this.color = '#00ff00';
      this.toBeDeleted = true;
      this.pointOfImpact = Util.pointOfImpact(this.vel, this.pos);
      this.timeLeft = Util.timeLeft(this.pointOfImpact);

      console.log(this.timeLeft, "within Missile prepareForRemove");
      return this.pointOfImpact;
    }

}


module.exports = Missile;
