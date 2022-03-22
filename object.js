class Entities{
  static Obstacle = Symbol("Obstacle");
  static Player = Symbol("Player");
  static Codiv = Symbol("Codiv");
}

class Entity{
  constructor(type, x, y, w, h){
    this.type = type;
    this.id = Math.random()*10000;
    this.world = null;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "white";
    this.toDelete = false;
    this.zIndex = 0;
  };


  render(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  collision(e){
    let npx = ((e.x+e.w/2)-(this.x+this.w/2))/this.w;
    let npy = ((e.y+e.h/2)-(this.y+this.h/2))/this.h;
    if (!(e.x+e.w<this.x || e.x>this.x+this.w || e.y+e.h<this.y || e.y>this.y+this.h)) {
      if( Math.abs(npx) > Math.abs(npy) ){
        if(npx>0){return [1, this.x+this.w - e.x]}
        else{return [2, e.x + e.w - this.x]}
      }
      else{
        if(npy>0){return [3, this.y + this.h - e.y]}
        else {return [2, this.y + this.h - e.y]}
      }
    }
    return 0;
  }

  update(){}

  collide(){}
}

class Obstacle extends Entity{
  constructor(x, y, w, h){
    super(Entities.Obstacle, x, y, w, h);
  }
}

const gravity = 0.13;

class Player extends Entity{
  constructor(x, y){
    super(Entities.Player, x, y, 10, 10);
    this.vx = 0;
    this.vy = 0;
    this.color = "rgb(145, 24, 201)";
    this.inputs = [false, false, false, false];
    this.prevInputs = [false, false, false, false];
  }

  update(){
    if (this.inputs[0]) {this.vx -= 0.2;}
    if (this.inputs[2]) {this.vx += 0.2;}
    if (this.inputs[3]) {this.vy += 0.1;}
    if (this.inputs[1] && !this.prevInputs[1]) {this.vy -= 3;}
    this.x += this.vx;
    this.y += this.vy;
    this.vy += gravity;
    this.vy = Math.min(this.vy, 5);
    this.vx *= 0.9;
    this.prevInputs =  [...this.inputs];
  }
}

class Codiv extends Entity{
  constructor(parent,dir){
    super(Entities.Codiv, parent.x+20*dir, parent.y, 5, 5);
    this.vy = dir;
    this.color = parent.color=="rgb(145, 24, 201)"?"#ae00ff":"#ff0000";
    this.friend=parent;
  }

  update(){
    this.x += this.vy;
  }
}
