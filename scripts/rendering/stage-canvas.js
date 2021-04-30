import {Sprite} from './sprite.js';

export class StageCanvas {
  constructor(canvas, stage){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.resizeCanvas();
    this.playerSprite = new Sprite("./assets/images/player/spritesheet.png", 32);
    this.stage = stage;

    this.viewportX = 0;
    this.viewportY = 15;

    window.addEventListener('resize', () => this.resizeCanvas())
  }

  resizeCanvas(){
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.blockSize = 32;
  }

  draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. draw platforms
    this.stage.platforms.forEach(platform => this.drawPlatform(platform))

    // 2. draw player
    this.drawPlayer(this.stage.player)

    // 3. adjust viewport to player
    this.setViewportCenter(this.stage.player.x)
  }

  drawBlock(x, y){
    this.ctx.fillStyle = "lime";
    this.ctx.fillRect(-this.viewportX * this.blockSize + x * this.blockSize, -this.viewportY * this.blockSize + y * this.blockSize, this.blockSize, this.blockSize);
  }

  drawPlatform(platform){
    for(let y = 0; y < platform.height; y++)
      for(let x = 0; x < platform.width; x++){
        // TODO spritesheeting
        this.drawBlock(platform.x + x, platform.y + y);
      }
  }

  drawPlayer(player){
    this.playerSprite.flip = player.lookDirection == -1;
    this.playerSprite.draw();
    this.playerSprite.setAnimation(player.animState);
    this.ctx.imageSmoothingEnabled = false;
    // this.ctx.fillRect(-this.viewportX * this.blockSize + player.x * this.blockSize, player.y * this.blockSize, player.width * this.blockSize, player.height * this.blockSize);
    this.ctx.drawImage(this.playerSprite.canvas,
                          -this.viewportX * this.blockSize + (player.x + player.spriteOffsetX) * this.blockSize,
                          -this.viewportY * this.blockSize + (player.y + player.spriteOffsetY) * this.blockSize,
                          player.spriteWidth * this.blockSize, player.spriteHeight * this.blockSize)
  }

  setViewportCenter(x){
    let screenCenter = Math.floor(window.innerWidth / this.blockSize / 2);
    // centerX = centerX * this.blockSize;
    this.viewportX = -screenCenter + x;
  }
}
