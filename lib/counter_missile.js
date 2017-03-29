const MovingObject = require('./moving_object.js');
const Util = require('./util.js');

class CounterMissile extends MovingObject{
  constructor(options = {}) {
    super(options);
    this.color = '#ADD8E6';
    this.pos = [400, 500];
    this.radius = 5;
    this.pointOfImpact = options.pointOfImpact;
    this.vel = Util.counter_velocity(this.pos, this.pointOfImpact, 100);


    this.timeLeft = 100;
    this.toBeDeleted = true;

  }

  draw(ctx) {

    let image = document.getElementById('counter-missile');
    // console.log(image, "image");
    // console.log($(image), "$image");
    // let newImage = $(image).css('background-color', 'green');
    // ctx.save(); // save current state
    // ctx.rotate(Math.PI); // rotate
    ctx.drawImage(image, this.pos[0] - 10, this.pos[1] - 10, 20, 20);
    // ctx.restore(); // restore original states (no rotation etc)
  }

}


module.exports = CounterMissile;
