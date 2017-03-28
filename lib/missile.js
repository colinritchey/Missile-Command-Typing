const MovingObject = require('./moving_object.js');

class Missile extends MovingObject {
    constructor(options = {}) {

      options.color = '#FF0000';
      options.pos = options.pos;
      options.radius = 25;
      options.vel = options.vel;
      super(options);
    }

    

}


module.exports = Missile;
