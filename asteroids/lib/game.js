const Asteroid = require('./asteroid.js');

function Game() {
  this.DIM_X = 900;
  this.DIM_Y = 900;
  this.NUM_ASTEROIDS = 5;
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition(), this));
  }
};

Game.prototype.randomPosition = function () {
  const result = [];
  result[0] = Math.floor(Math.random() * this.DIM_X);
  result[1] = Math.floor(Math.random() * this.DIM_Y);
  return result;
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,900,900);
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,900,900);
  for (let i = 0; i < this.asteroids.length; i++) {

    console.log(this.asteroids[i]);
    this.asteroids[i].draw(ctx);
  }


};

Game.prototype.moveObjects = function () {
  console.log(this.asteroids);
  for (let i = 0; i < this.asteroids.length; i++) {
    this.asteroids[i].move();
  }
};

Game.prototype.wrap = function (pos) {
  if (pos[0] < 0) {
    pos[0] += 900;
  } else if (pos[0] > 900) {
    pos[0] -= 900;
  }
  if (pos[1] < 0) {
    pos[1] += 900;
  } else if (pos[1] > 900) {
    pos[1] -= 900;
  }
  return pos;
};

Game.prototype.checkCollisions = function () {
  for (let i = 0; i < this.asteroids.length-1; i++) {
    for(let j = 1; j < this.asteroids.length; j++) {
      if (i === j){
        continue;
      } else if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
        alert("COLLISION");
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};










module.exports = Game;