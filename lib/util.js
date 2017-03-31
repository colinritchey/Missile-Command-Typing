const Words = require('./words.js');

const Util = {
  isOver(session = true){
    return session;
  },

  randomVel(){
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let x = (plusOrMinus)* ( Math.random() * (0.5 - 0.1) + 0.5);
    let y = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

    return [x, y];
  },

  randomPos(){ // might want to remove
    return [400, 0];
  },

  randomText(){

    let randomIndex = Math.floor(Math.random() * (Words.length));

    return Words[randomIndex];
  },

  pointOfImpact(vel, pos, time){
    return [vel[0]*time + pos[0], vel[1]*time + pos[1]];
  },

  counter_velocity(start, finish, time){
    let x = (finish[0] - start[0])/time;
    let y = (finish[1] - start[1])/time;

    return [x, y];
  },

  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  timeLeft(pos){
    // let distFrom = this.dist(pos, [400, 500]);
    // let distFrom = 500 - pos[1];
    // console.log(distFrom, "distFrom");
    // console.log(100 - (pos[1]/500)*80, "new time");

    return 100 - (pos[1]/500)*80;
  }
};

module.exports = Util;
