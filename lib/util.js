const Util = {
  randomVel(){
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let x = (plusOrMinus)* (Math.floor(Math.random() * (2 - 1 + 1)) + 1)/2;
    let y = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

    return [x, y];
  },

  randomPos(){
    let x = Math.ceil(Math.random()*(200- 100 +1)) + 100;
    let y = Math.ceil(Math.random()*100);
    return [500, 0];
  },

  randomText(){
    let words = ["hello", "absolute", "javascript", "missile", "board", "game"];

    let randomIndex = Math.floor(Math.random() * (words.length));

    return words[randomIndex];
  },

  pointOfImpact(vel, pos){
    return [vel[0]*100 + pos[0], vel[1]*100 + pos[1]];
  }
};

module.exports = Util;
