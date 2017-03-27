const MovingObject = require('./moving_object.js');

class Missile extends MovingObject {
    constructor(options = {}) {

      options.color = '#FF0000';
      options.pos = options.pos;
      options.radius = 25;
      options.vel = options.vel;
      super(options);
    }

    // collideWith(otherObject) {
    //   if (otherObject instanceof Ship) {
    //     otherObject.relocate();
    //         return true;
    //   } else if (otherObject instanceof Bullet) {
    //         this.remove();
    //         otherObject.remove();
    //         return true;
    //     }
    // }
}


module.exports = Missile;
