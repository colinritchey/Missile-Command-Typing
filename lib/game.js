const Missile = require('./missile');

class Game {
  constructor() {
    this.missiles = [];

    this.getInput();
  }

  addMissiles() {

    for (let i = 0; i < Game.NUM_Missles; i++) {
        const missile = new Missile(
          { radius: 5, color: "#00FF00", game: this}
        );

        this.missiles.push(missile);
    }

  }

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
    });
  }

  step(delta) {
    this.moveObjects(delta);
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  remove(object){
    this.missiles.splice(this.missiles.indexOf(object), 1);

    const missile = new Missile(
      { radius: 5, color: "#00FF00", game: this}
    );

    this.missiles.push(missile);
  }

  getInput(){
    const compareValues = this.compareValues;
    $('#user-prompt').on( ' keyup', () => {
      this.compareValues($('#user-prompt').val());
    });
  }

  compareValues(value){
    this.allObjects().some((object) => {
      
      if(value === object.text){
        object.prepareForRemove();
        $('#user-prompt').val('');
        return true;
      }

      return false;
    });
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

Game.BG_COLOR = "#ffffff";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_Missles = 3;

module.exports = Game;
