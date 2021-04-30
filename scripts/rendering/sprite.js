export class Sprite {
  constructor(src, spriteSize){
    this.imgAsset = new Image();
    this.imgAsset.src = src;
    this.imgAsset.onload = () => this.loaded = true;
    this.row = 0;
    this.column = 1;
    this.spriteSize = spriteSize;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.spriteSize;
    this.canvas.height = this.spriteSize;
    this.animationDelay = 7;
    this.animCounter = 0;
  }

  draw(){
    this.animate();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    if(this.flip){
      this.ctx.scale(-1, 1);
      this.ctx.translate(-this.spriteSize, 0)
    }

    this.ctx.drawImage(this.imgAsset,
                      this.column * this.spriteSize, this.row * this.spriteSize,
                      this.spriteSize, this.spriteSize,
                      0, 0, this.spriteSize, this.spriteSize)
    this.ctx.restore();

  }

  animate(){
    if(this.animCounter == this.animationDelay){
      this.animCounter = 0;
      this.column++;
     if(this.column > 7) this.column = 0;
   } else {
    this.animCounter++;
   }
  }

  setAnimation(row){
    if(this.row == row) return;
    this.row = row;
    this.column = 0;
  }
}
