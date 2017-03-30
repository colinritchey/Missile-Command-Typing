const Missile = require('./missile');
const CounterMissile = require('./counter_missile');
const Ground = require('./ground');
const Building = require('./building');

class Game {
  constructor() {
    this.missiles = [];
    this.counter_missiles = [];
    this.ground = [];
    this.buildings = [];

    this.hitPoints = 6;
    this.isOver = false;

    this.addBuildings();
    this.getInput();
  }

  // add(object){
  //   if (object instanceof Missile){
  //     this.missiles.push(object);
  //   } else if (object instanceof CounterMissile) {
  //     this.counter_missiles.push(object);
  //   }
  // }

  addBuildings(){

    for(let i = 0; i < Game.NUM_BUILDINGS; i++){
      let j = 0;

      if(i >= Game.NUM_BUILDINGS/2){ j = 150; }

      const building = new Building(
        { pos: [i*100 + 30 + j , 375], width: 60, height: 100, color: '#32CD32' }
      );

      this.buildings.push(building);
    }

  }

  addGround(){
    const ground = new Ground(
      { pos: [0, 375], color: '#32CD32' }
    );

    this.ground.push(ground);
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
    return [].concat(this.buildings, this.missiles,   this.counter_missiles);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    if(this.isOver){
      ctx.fillStyle = "black";
      ctx.font = "48px 'Press Start 2P', cursive";
      ctx.fillText('Game Over', 185, 200);

      ctx.font = "24px 'Press Start 2P', cursive";
      ctx.fillText('press "space" to play again', 70, 300);

    } else {
      this.allObjects().forEach((object) => {
        object.draw(ctx);
      });
    }

  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      if( !(object instanceof Building) ){

        object.move(delta);

      }
    });
  }

  checkCollision(){
    this.missiles.forEach((missile) => {

      this.buildings.forEach((building) => {

        if(building.isCollidedWith(missile) && !missile.toBeDeleted){
          this.hitPoints--;
          console.log(this.hitPoints, "been hit");
          this.remove(missile);
          building.destroyed = true;
          building.color = '#ADD8E6';
        }

      });

    });

    if(this.hitPoints <= 0){ this.isOver = true; }

  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollision();
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  remove(object){
    if(object instanceof Missile){
      let trash = this.missiles.splice(this.missiles.indexOf(object), 1)[0];

      trash = null;

      const missile = new Missile(
        { radius: 5, color: "#00FF00", game: this}
      );

      this.missiles.push(missile);
    } else {
      this.counter_missiles.splice(this.counter_missiles.indexOf(object), 1);
    }

  }

  getInput(){

    $('#user-prompt').on( ' keyup', () => {
      this.compareValues($('#user-prompt').val());
    });
  }

  compareValues(value){
    this.allObjects().some((object) => {

      if(value === object.text){
        let pos = object.prepareForRemove();

        this.addCounterMissile(pos);

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
Game.NUM_BUILDINGS = 6;

module.exports = Game;
