import {FRICTION, GRAVITY} from './consts.js';

export const PlayerStates = {
  IDLE: 0,
  RUNNING: 1
}
export class Player {
  constructor(){
    this.x = 0;
    this.y = 25;
    this.width = 1.2;
    this.height = 2;
    this.spriteWidth = 2;
    this.spriteHeight = 2;
    this.spriteOffsetX = -0.4;
    this.spriteOffsetY = 0.2;
    this.velocityX = 0;
    this.velocityY = 0;
    this.grounded = false;
    this.animState = PlayerStates.IDLE;
    this.lookDirection = 1;
  }

  moveRight(){
    this.velocityX += 0.08;
    this.lookDirection = 1;
    this.animState = PlayerStates.RUNNING;
  }

  moveLeft(){
    this.velocityX -= 0.08;
    this.lookDirection = -1;
    this.animState = PlayerStates.RUNNING;
  }

  jump(){
    this.velocityY = -.5;
  }

  update(){
    this.velocityX *= FRICTION;
    if(Math.abs(this.velocityX) < 0.02)
      this.velocityX = 0;
    this.velocityY += GRAVITY;
    this.grounded = false;


    this.newY = this.y + this.velocityY;
    let collisionY = this.stage.platformsCollisionY(this.x, this.newY, this.width, this.height)
    if(collisionY){
      this.newY += collisionY.force;
      this.velocityY = 0;
      if(collisionY.grounded)
        this.grounded = true;
    }
    this.y = this.newY;


    this.newX = this.x + this.velocityX;
    if(this.newX < 0) this.newX = 0;
    if(this.newX > this.stage.width - this.width) this.newX = this.stage.width - this.width;
    let collisionX = this.stage.platformsCollisionX(this.newX, this.y, this.width, this.height)
    if(collisionX){
      this.newX += collisionX.force
    }
    this.x = this.newX;

    if(this.velocityY == 0 && this.velocityX == 0)
      this.animState = PlayerStates.IDLE;
  }
}
