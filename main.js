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
    for(const player in world.players){
      for(const key in world.players[player].inputKeys){
        if (world.players[player].inputKeys[key] == e.keyCode) {
          world.inputPlayer(player, key, true);
        }
      }
    }}, false);

document.addEventListener("keyup", (e) => {
  for(const player in world.players){
    for(const key in world.players[player].inputKeys){
      if (world.players[player].inputKeys[key] == e.keyCode) {
        world.inputPlayer(player, key, false);
      }
    }
  }}, false);

const world = new World();
const p1 = new Player(-50, -20);
const p2 = new Player(50, -20);
p2.inputKeys = [81, 90, 68, 83, 72];
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
