main()

function main() {


  const canvas = document.getElementById("cnv");
  const context = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  context.shadowOffsetX=50
context.shadowOffsetX=50
context.shadowBlur=10
  function resize() {
    width = window.innerWidth,
    height = window.innerHeight,
    ratio = window.devicePixelRatio;
    canvas.height = height * ratio;
    canvas.width = width * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    context.width = width * ratio;
    context.height = height * ratio;
  }
  window.onresize = function() {
    resize();
  };
  window.onload = function() {
    resize();
    window.requestAnimationFrame(render);
  };
  document.getElementById("volume").addEventListener("input", (e)=>{
    myAudio.volume = Number(e.target.value)/100;
    boom.volume = Number(e.target.value)/100;
  });
  document.addEventListener('contextmenu', event => event.preventDefault());
  document.addEventListener("keydown", (e) => {
    if (e.repeat) return
    switch (e.keyCode) {
      case 37:
        world.inputPlayer(p1.id, 0, true)
        break;
      case 38:
        world.inputPlayer(p1.id, 1, true)
        break;
      case 39:
        world.inputPlayer(p1.id, 2, true)
        break;
      case 40:
        world.inputPlayer(p1.id, 3, true)
        break;
      case 81:
        world.inputPlayer(p2.id, 0, true)
        break;
      case 90:
        world.inputPlayer(p2.id, 1, true)
        break;
      case 68:
        world.inputPlayer(p2.id, 2, true)
        break;
      case 83:
        world.inputPlayer(p2.id, 3, true)
        break;
      case 32:
        if(p2.vx>0){
          world.addPlayer(new Codiv(p2,1))
        }
        else{
          world.addPlayer(new Codiv(p2,-1))
        }
        break;
        case 98:
          if(p1.vx>0){
            world.addPlayer(new Codiv(p1,1))
          }
          else{
            world.addPlayer(new Codiv(p1,-1))
          }

      default:return
    }}, false);

document.addEventListener("keyup", (e) => {
  switch (e.keyCode) {
    case 37:
      world.inputPlayer(p1.id, 0, false)
      break;
    case 38:
      world.inputPlayer(p1.id, 1, false)
      break;
    case 39:
      world.inputPlayer(p1.id, 2, false)
      break;
    case 40:
      world.inputPlayer(p1.id, 3, false)
      break;
    case 81:
        world.inputPlayer(p2.id, 0, false)
        break;
      case 90:
        world.inputPlayer(p2.id, 1, false)
        break;
      case 68:
        world.inputPlayer(p2.id, 2, false)
        break;
      case 83:
        world.inputPlayer(p2.id, 3, false)
        break;
      default:return
  }}, false);

const world = new World();
const p1 = new Player(-50, -20);
const p2 = new Player(50, -20);
p2.color="rgb(181,48,71)"
world.addPlayer(p1);
world.addPlayer(p2);
world.addEntity(new Obstacle(-120, 50, 240, 5));
world.addEntity(new Obstacle(-80, 0, 60, 5));
world.addEntity(new Obstacle(20, 0, 60, 5));

let left = false;
let up = false;
let right = false;
let down = false;

function render() {
  context.clearRect(0, 0, width, height);
  context.beginPath();
  context.fillStyle = "black";
  context.rect(0, 0, width, height);
  context.fill();
  context.closePath();
  world.update();
  world.render(context, width, height);
  window.requestAnimationFrame(render);
  }
}
