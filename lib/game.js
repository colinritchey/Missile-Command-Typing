const Missile = require('./missile');
const CounterMissile = require('./counter_missile');

class Game {
  constructor() {
    this.missiles = [];
    this.counter_missiles = [];

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

  addCounterMissile(pos){
    const counter_missile = new CounterMissile(
      { pointOfImpact: pos, game: this}
    );

    this.counter_missiles.push(counter_missile);
  }

  allObjects() {
    return [].concat(this.missiles, this.counter_missiles);
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
    if(object instanceof Missile){
      this.missiles.splice(this.missiles.indexOf(object), 1);

      const missile = new Missile(
        { radius: 5, color: "#00FF00", game: this}
      );

      this.missiles.push(missile);
    } else {
      this.counter_missiles.splice(this.counter_missiles.indexOf(object), 1);
    }

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
        this.addCounterMissile(object.prepareForRemove());

        $('#user-prompt').val('');
        return true;
      }

      return false;
    });
  }

}

Game.BG_COLOR = "#ffffff";
Game.DIM_X = 800;
Game.DIM_Y = 500;
Game.FPS = 32;
Game.NUM_Missles = 2;

module.exports = Game;
