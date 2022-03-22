main()

function main() {


  const canvas = document.getElementById("cnv");
  const context = canvas.getContext("2d");
  var width = window.innerWidth;
  var height = window.innerHeight;


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
    //context.scale(ratio, ratio);
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
		if (e.keyCode == 37) {
        world.inputPlayer(p1.id, 0, true)
    }
    if (e.keyCode == 38) {
        world.inputPlayer(p1.id, 1, true)
    }
    if (e.keyCode == 39) {
        world.inputPlayer(p1.id, 2, true)
    }
	if (e.keyCode == 40) {
        world.inputPlayer(p1.id, 3, true)
    }
  }, false);

    document.addEventListener("keyup", (e) => {
		if (e.keyCode == 37) {
world.inputPlayer(p1.id, 0, false)
    }
    if (e.keyCode == 38) {
world.inputPlayer(p1.id, 1, false)
    }
    if (e.keyCode == 39) {
world.inputPlayer(p1.id, 2, false)
    }
	if (e.keyCode == 40) {
world.inputPlayer(p1.id, 3, false)
    }
  }, false);





  const world = new World();
  const p1 = new Player(100, 50);
  const p2 = new Player(50, 50);
  world.addPlayer(p1);
  world.addPlayer(p2);

  world.addEntity(new Obstacle(20, 120, 250, 3));

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
