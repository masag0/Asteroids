const Asteroid = require('./asteroid.js');
const Ship = require('./ship');
const Bullet = require('./bullet');

function Game() {
  this.DIM_X = 900;
  this.DIM_Y = 900;
  this.NUM_ASTEROIDS = 10;
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship(this.randomPosition(), this);
  this.bullets = [];
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
  for (let i = 0; i < this.allObjects().length; i++) {

    console.log(this.allObjects()[i]);
    this.allObjects()[i].draw(ctx);
  }


};

Game.prototype.moveObjects = function () {
  console.log(this.allObjects());
  for (let i = 0; i < this.allObjects().length; i++) {
    this.allObjects()[i].move();
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
  for (let i = 0; i < this.allObjects().length-1; i++) {
    for(let j = 1; j < this.allObjects().length; j++) {
      if (i === j){
        continue;
      } else if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
        this.allObjects()[i].collideWith(this.allObjects()[j]);
        // alert("collided");
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

// Game.prototype.remove = function (asteroid) {
//   const index = this.asteroids.indexOf(asteroid);
//   this.asteroids.splice(index, 1);
// };

Game.prototype.allObjects = function () {
  console.log(this.asteroids.concat([this.ship]).concat(this.bullets));
  return this.asteroids.concat([this.ship]).concat(this.bullets);
};

Game.prototype.add = function (obj) {
  if (obj instanceof Asteroid) {
    this.asteroids.push(obj);
  }
  if (obj instanceof Bullet) {
    this.bullets.push(obj);
  }
};

Game.prototype.remove = function (obj) {
  if (obj instanceof Asteroid) {
    const index = this.asteroids.indexOf(obj);
    this.asteroids.splice(index, 1);
  }
  if (obj instanceof Bullet) {
    const index = this.bullets.indexOf(obj);
    this.bullets.splice(index, 1);
  }
};

Game.prototype.isOutOfBounds = function (pos) {
  if (pos[0] > 900 || pos[0] < 0 || pos[1] > 900 || pos[1] < 0) {
    return true;
  }
  return false;
};







module.exports = Game;