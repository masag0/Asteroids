const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship');
const Bullet = require('./bullet');

Util.inherits(Asteroid, MovingObject);

function Asteroid(pos, game){
  this.COLOR = '#fff';
  this.RADIUS = 25;

  const options = {
    pos: pos,
    vel: Util.randomVec(0.5),
    radius: this.RADIUS,
    color: this.COLOR,
    game: game
  };

  MovingObject.call(this, options);
}

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship ) {
    otherObject.relocate();
  }
  else if (otherObject instanceof Bullet) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};

module.exports = Asteroid;