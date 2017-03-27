const Missile = require('./missile');

class Game {
  constructor() {
    this.missiles = [];

  }

  addMissiles() {

    for (let i = 0; i < Game.NUM_Missles; i++) {

      const missile = new Missile(
        { pos: [30+i*10, 30+i*10], vel: [2, 2], radius: 5, color: "#00FF00", game: this}
      );
      // this.missiles.push(new Missile({ game: this }));
      this.missiles.push(missile);
    }

    console.log(this.missiles, "add Missiles");
  }

  // addMissile(){
  //   const missile = new Missile(
  //     { pos: [35, 35], vel: [0.3, 0.3], radius: 5, color: "#00FF00", game: this}
  //   );
  //   this.missiles.push(missile);
  // }

  allObjects() {
    return [].concat(this.missiles);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
      // console.log(object.pos);
    });
  }

  step(delta) {
    this.moveObjects(delta);
    // this.checkCollisions();
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  remove(object){
    this.missiles.splice(this.missiles.indexOf(object), 1);

    const missile = new Missile(
      { pos: [30, 30], vel: [2, 2], radius: 5, color: "#00FF00", game: this}
    );
    
    this.missiles.push(missile);
    console.log(this.missiles);
    // this.addMissile();
  }

  wrap(pos) {
    return [
      this.Utilwrap(pos[0], Game.DIM_X), this.Utilwrap(pos[1], Game.DIM_Y)
    ];
  }

  Utilwrap (coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }

}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_Missles = 1;

module.exports = Game;
