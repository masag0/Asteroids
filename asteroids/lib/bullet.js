const MovingObject = require('./moving_object');
const Utils = require('./utils');
const Asteroid = require('./asteroid');


function Bullet(pos, vel, color, game) {
  this.COLOR = color;
  this.RADIUS = 2;
  vel[0] += vel[0]*2;
  vel[1] += vel[1]*2;
  const options = {
    pos: pos,
    vel: vel,
    radius: this.RADIUS,
    color: color,
    game: game
  };

  MovingObject.call(this, options);
}

Utils.inherits(Bullet, MovingObject);

Bullet.prototype.collideWith = function (otherObject) {
  if(otherObject instanceof Asteroid) {
    this.game.remove(this);
    this.game.remove(otherObject);
  }
};

Bullet.prototype.isWrappable = function () {
  return false;
};


module.exports = Bullet;