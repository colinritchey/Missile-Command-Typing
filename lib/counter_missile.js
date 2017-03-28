const MovingObject = require('./moving_object.js');
const Util = require('./util.js');

class CounterMissile extends MovingObject{
  constructor(options = {}) {
    super(options);
    this.color = '#ADD8E6';
    this.pos = [500, 600];
    this.radius = 5;
    this.pointOfImpact = options.pointOfImpact;
    this.vel = Util.counter_velocity(this.pos, this.pointOfImpact, 100);


    this.timeLeft = 100;
    this.toBeDeleted = true;

  }

}


module.exports = CounterMissile;
