const GameView = require('./lib/game_view.js');


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 900;
  canvasEl.height = 900;

  const ctx = canvasEl.getContext("2d");
  ctx.fillRect(0, 0, 900, 900);
  ctx.fillStyle = '#000';

  const gameView = new GameView(ctx);
  gameView.start();
});



