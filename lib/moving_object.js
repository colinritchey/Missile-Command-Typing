const Util = require('./util.js');

class MovingObject {
  constructor(options) {
    this.pos = options.pos || Util.randomPos();
    this.vel = options.vel || Util.randomVel();
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;

    this.isWrappable = false;
    this.text = Util.randomText();

    this.timeLeft = 100;
    this.toBeDeleted = false;
    this.pointOfImpact = [0,0];

  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );

    ctx.fill();

    if(this.toBeDeleted){
      // let point = Util.pointOfImpact(this.vel, this.pos);

      // console.log(point[0], point[1], "x, y");

      ctx.fillRect(this.pointOfImpact[0], this.pointOfImpact[1], 10, 10);
    }

    ctx.fillStyle = "black"; // font color to write the text with
    let font = "bold " + this.radius +"px serif";
    ctx.font = font;
    // Move it down by half the text height and left by half the text width
    let width = ctx.measureText(this.text).width;
    let height = ctx.measureText("w").width; // this is a GUESS of height
    ctx.fillText(this.text, this.pos[0] - (width/2) ,this.pos[1] + (height/2));

  }

  move(timeDelta) {
    //timeDelta is number of milliseconds since last move
    //if the computer is busy the time delta will be larger
    //in this case the MovingObject should move farther in this frame
    //velocity of object is how far it should move in 1/60th of a second
    // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    //     offsetX = this.vel[0] * velocityScale,
    //     offsetY = this.vel[1] * velocityScale;
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

  prepareForRemove(){
    this.color = '#ADD8E6';
    this.toBeDeleted = true;
    this.pointOfImpact = Util.pointOfImpact(this.vel, this.pos);
  }


}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject;
