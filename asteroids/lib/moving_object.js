function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos = this.game.wrap(this.pos);

  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];

};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  const x1 = this.pos[0];
  const y1 = this.pos[1];
  const x2 = otherObject.pos[0];
  const y2 = otherObject.pos[1];

  const r1 = this.radius;
  const r2 = otherObject.radius;

  if ((r1+r2) > Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) ) {
    return true;
  }

  return false;
};


module.exports = MovingObject;