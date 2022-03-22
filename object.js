class Entity{
  constructor(x, y, w, h){
    this.id = Math.random()*10000;
    this.world = null;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "white";
    this.toDelete = false;
    this.zIndex = 0;
  }

  export(){
    return {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h
    }
  }

  render(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update(){

  }

  collision(e){
    let npx = ((e.x+e.w/2)-(this.x+this.w/2))/this.w;
    let npy = ((e.y+e.h/2)-(this.y+this.h/2))/this.h;
    if (!(e.x+e.w<this.x || e.x>this.x+this.w || e.y+e.h<this.y || e.y>this.y+this.h)) {
      if(Math.abs(npx)>Math.abs(npy)){
        if(npx>0){
          return 1;
        }else {
          return 2;
        }
      }else {
        if(npy>0){
          return 3;
        }else {
          return 4;
        }
      }
    }
    return 0;
  }

  collide(col){

  }
}

class Obstacle extends Entity{}


const gravity = 0.13;

class Player extends Entity{
  constructor(x, y){
    super(x, y, 10, 10);
    this.vx = 0;
    this.vy = 0;
    this.color = "rgb(145, 24, 201)";

    this.inputs = [false, false, false, false];
    this.prevInputs = [false, false, false, false];
  }

  update(){

    if(this.inputs[0]){
      this.vx -= 0.2;
    }
    if (this.inputs[2]) {
      this.vx += 0.2;
    }

    if (this.inputs[3]) {
      this.vy += 0.1;
    }

    if (this.inputs[1] && !this.prevInputs[1]) {
      this.vy -= 3;
    }

    this.x += this.vx;
    this.y += this.vy

    this.vy += gravity;
    this.vy = Math.min(this.vy, 5);

    this.vx *= 0.9;

    this.prevInputs =  [...this.inputs];
  }

}
