const MovingObject = require('./moving_object.js');
const Util = require('./util.js');

class CounterMissile extends MovingObject{
  constructor(options = {}) {
    super(options);
    this.color = '#ADD8E6';
    this.color = options.color;


    this.pos = [400, 500];
    this.pointOfImpact = options.pointOfImpact;
    this.timeLeft = Util.timeLeft(this.pointOfImpact);
    this.vel = Util.counter_velocity(this.pos, this.pointOfImpact, this.timeLeft);


    this.toBeDeleted = true;

  }

  draw(ctx) {

    let image = document.getElementById('counter-missile');


    ctx.drawImage(image, this.pos[0] - 10, this.pos[1] - 10, 20, 20);
  }

}


module.exports = CounterMissile;
