const stageWidth = 50;
const stageHeight = 30;

const level = {
  width: 50,
  platforms: [
    {x: 0, y: 28, height: 2, width: 50},
    {x: 0, y: 23, height: 2, width: 3},
    {x: 5, y: 26, height: 2, width: 3}
  ]
}

export class Stage {
  constructor(){
    this.loadLevel(level);
  }

  loadLevel(level){
    this.platforms = level.platforms;
    this.width = level.width;
  }

  addPlayer(player){
    this.player = player;
    player.stage = this;
  }

  platformsCollisionY(x, y, width, height){
    for(const platform of this.platforms){
      if(x + width <= platform.x || x >= platform.x + platform.width) continue; // out of x bounds
      if(platform.y < y && y < platform.y + platform.height){ // top collision
        return {force: platform.y + platform.height - y}
      }
      if(platform.y < y + height && y + height < platform.y + platform.height){ // bottom collision
        return {grounded: true, force: - (y + height) + platform.y}
      }
    }
    return false;
  }

  platformsCollisionX(x, y, width, height){
    for(const platform of this.platforms){
      if(y + height <= platform.y + .5 || y >= platform.y + platform.height) continue; // out of y bounds
      if(platform.x < x && x < platform.x + platform.width){ // right side collision
        return {force: platform.x + platform.width - x}
      }
      if(platform.x < x + width && x + width < platform.x + platform.width)
        return {force: platform.x - x - width}
    }
    return false;
  }
}
