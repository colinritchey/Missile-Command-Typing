const Missile = require('./missile');
const CounterMissile = require('./counter_missile');
const Building = require('./building');
const Util = require('./util');

class Game {
  constructor() {
    this.missiles = [];
    this.counter_missiles = [];
    this.buildings = [];

    this.hitPoints = Game.HIT_POINTS;
    this.isOver = true;

    this.score = 0;

  }

  addBuildings(){

    for(let i = 0; i < Game.NUM_BUILDINGS; i++){
      let j = 0;

      if(i >= Game.NUM_BUILDINGS/2){ j = 150; }

      const building = new Building(
        { pos: [i*100 + 50 + j , 375], width: 60, height: 100,
          color: 'green', game: this }
      );

      this.buildings.push(building);
    }

  }

  addMissiles() {

    for (let i = 0; i < Game.NUM_Missles; i++) {
      const missile = new Missile(
        { radius: 5, color: "black", pos: [400, 0], game: this}
      );
      this.missiles.push(missile);
    }

  }

  addCounterMissile(pos, timeLeft){

    const counter_missile = new CounterMissile(
      { pointOfImpact: pos, pos: [400, 500], timeLeft: timeLeft, game: this}
    );

    this.counter_missiles.push(counter_missile);

  }

  allObjects() {
    return [].concat(this.buildings, this.missiles,   this.counter_missiles);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    let image = document.getElementById('sunset-city');
    ctx.drawImage(image, 0, 0, Game.DIM_X, Game.DIM_Y);



    if(this.isOver){
      ctx.fillStyle = Game.BG_COLOR;
      ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

      ctx.fillStyle = "white";
      ctx.font = "48px 'Press Start 2P', cursive ";
      ctx.fillText('Game Over', 200, 200);

      ctx.font = "24px 'Press Start 2P', cursive";
      ctx.fillText('press "space" to play again', 75, 300);

      this.allObjects().forEach((object) => {
        object.remove();
      });

      this.missiles = [];
      this.buildings = [];
      this.counter_missiles = [];

      $('#user-prompt').off( 'input', this.playerInput);

    } else {
      ctx.fillStyle = "white";
      ctx.font = "24px 'Press Start 2P', cursive ";
      ctx.fillText(`SCORE: ${this.score * 100}`, 525, 50);

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
      if(missile.toBeDeleted){return;}

      this.buildings.forEach((building) => {

        if(building.isCollidedWith(missile) && !missile.toBeDeleted){

          this.hitPoints--;
          this.remove(missile);

          building.destroyed = true;
        }

      });

    });

    if(this.hitPoints <= 0){
      this.isOver = true;
    }

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
        { radius: 5, color: "black", pos: [400, 0], game: this}
      );

      this.missiles.push(missile);
    } else if(object instanceof CounterMissile){

      this.counter_missiles.splice(this.counter_missiles.indexOf(object), 1);
    } else{
      this.buildings.splice(this.buildings.indexOf(object), 1);
    }

  }

  getInput(){

    const playerInput= () => {this.compareValues($('#user-prompt').val());};

    $('#user-prompt').on( 'input', playerInput);

    return playerInput;
  }

  compareValues(value){
    this.missiles.some((object) => {
      if(object.toBeDeleted){ return; }

      if(value === object.text){

        this.score++;

        let pos = object.prepareForRemove();
        this.addCounterMissile(pos, object.timeLeft);
        $('#user-prompt').val('');

        return true;
      }

      return false;
    });
  }

}

Game.BG_COLOR = "#000000";
Game.DIM_X = 800;
Game.DIM_Y = 500;
Game.FPS = 32;
Game.NUM_Missles = 2;
Game.NUM_BUILDINGS = 6;
Game.HIT_POINTS = 6;

module.exports = Game;
