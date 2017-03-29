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
      ctx.fillStyle = this.color;

      // ctx.beginPath();
      // ctx.arc(
      //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
      // );

      ctx.fillRect(this.pos[0]-50, this.pos[1]-15, 100, 30);

      ctx.fill();
      // ctx.drawImage(document.getElementById('missile'), this.pos[0] - 10, this.pos[1] - 10, 100, 20);

      if(this.toBeDeleted){
        // ctx.drawImage(document.getElementById('source'), this.pointOfImpact[0] - 10, this.pointOfImpact[1] - 10, 20, 20);
        ctx.fillRect(this.pointOfImpact[0], this.pointOfImpact[1], 10, 10);
      }



      ctx.fillStyle = "white"; // font color to write the text with
      let font = "bold " + (this.radius/2) +"px 'Press Start 2P', cursive";
      ctx.font = font;

      // Move it down by half the text height and left by half the text width
      let width = ctx.measureText(this.text).width;
      let height = ctx.measureText("w").width; // this is a GUESS of height

      ctx.fillText(this.text, this.pos[0] - (width/2) ,this.pos[1] + (height/2));

    }

    prepareForRemove(){
      this.color = '#ADD8E6';
      this.toBeDeleted = true;
      this.pointOfImpact = Util.pointOfImpact(this.vel, this.pos);
      return this.pointOfImpact;
    }

}


module.exports = Missile;
