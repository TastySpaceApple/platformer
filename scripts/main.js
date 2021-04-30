import {StageCanvas} from './rendering/stage-canvas.js';
import {Stage} from './game/stage.js';
import {Player} from './game/player.js';

let stage = new Stage();
let player = new Player();
stage.addPlayer(player);
let keys = {};
window.keys = keys;

let stageCanvas = new StageCanvas(document.querySelector('#stage-canvas'), stage);

function userInput(){
  if(keys[39] || keys[68]){ // right arrow
    player.moveRight();
  }
  if(keys[37] || keys[68]){ // left arrow
    player.moveLeft();
  }
  if(keys[32] && player.grounded){
    player.jump();
  }
}

function loop(){
  userInput();
  player.update(); // update player physics
  stageCanvas.draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
