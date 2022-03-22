class Entities {
  static Obstacle = Symbol("Obstacle");
  static Player = Symbol("Player");
  static Codiv = Symbol("Codiv");
}

class Entity {
  constructor(type, x, y, w, h) {
    this.type = type;
    this.id = Math.random() * 10000;
    this.world = null;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "white";
    this.toDelete = false;
    this.zIndex = 0;

    this.collidedTypes = [];
  };


  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  update() {}

  collide() {}
}

class Obstacle extends Entity {
  constructor(x, y, w, h) {
    super(Entities.Obstacle, x, y, w, h);
  }
}

const gravity = 0.2;

class Player extends Entity {
  constructor(x, y) {
    super(Entities.Player, x, y, 15, 25);
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.color = "rgb(145, 24, 201)";
    this.dir = 1;

    this.inputKeys = [37, 38, 39, 40, 98];
    this.inputs = [false, false, false, false, false];
    this.prevInputs = [false, false, false, false, false];

    this.collidedTypes.push(Entities.Obstacle);

    this.percent = 0;
  }

  update() {
    if (this.inputs[0]) this.ax -= 1;
    if (this.inputs[2]) this.ax += 1;
    if (this.inputs[3]) this.ay += 1;
    if (this.inputs[1] && !this.prevInputs[1]) this.vy = -4;

    if (this.inputs[4] && !this.prevInputs[4]) {
      if (this.inputs[3]) {
        this.world.addEntity(new AttackHitBox(this.x - 20, this.y + this.h - 10, 40 + this.w, 30, this.id, 0, 15, 0, 1))
      }else if (this.inputs[1]) {
        this.world.addEntity(new AttackHitBox(this.x - 10, this.y - 30, 20 + this.w, 30, this.id, 0, 10, 0, -1))
      }else {
        this.world.addEntity(new AttackHitBox(this.x + this.w / 2 + (this.dir == 1 ? 0 : -20), this.y + 5, 20, 15, this.id, 0, 5, this.dir, 0))
      }
    }

    if (this.vx > 0) {
      this.dir = 1;
    }
    if (this.vx < 0) {
      this.dir = -1;
    }
    this.vx += this.ax*0.2;
    this.vy += this.ay*0.2;
    this.ax = 0;
    this.ay = 0;

    this.vy += gravity;
    this.vx *= 0.9;
    this.vy = Math.min(this.vy, 5);

    this.x += this.vx;
    this.y += this.vy;

    this.prevInputs = [...this.inputs];
  }

  collide(entity, info) {
    if (info[0] == 1 && this.vy > 0) {
      this.y -= info[1];
      this.vy = 0;
    }
  }
}

class AttackHitBox extends Entity {
  constructor(x, y, w, h, sender, time, damage, dx, dy) {
    super(Entities.Attack, x, y, w, h);
    this.collidedTypes.push(Entities.Player);
    this.sender = sender;

    this.damage = damage;
    this.time = time;
    this.created = Date.now();

    this.dx = dx;
    this.dy = dy;
  }

  update() {
    if (Date.now() - this.created > this.time) {
      this.toDelete = true;
    }
  }

  collide(entity) {
    if (entity.id != this.sender) {
      entity.ax += this.dx * Math.min(5, entity.percent );
      entity.ay += this.dy * Math.min(5, entity.percent );

      entity.percent += this.damage;
    }
  }
}

class Codiv extends Entity {
  constructor(parent, dir) {
    super(Entities.Codiv, parent.x + 20 * dir, parent.y, 5, 5);
    this.vy = dir;
    this.color = parent.color == "rgb(145, 24, 201)" ? "#ae00ff" : "#ff0000";
    this.friend = parent;
  }

  update() {
    this.x += this.vy;
  }
}
