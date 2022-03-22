class World {
  constructor() {
    this.camera = {
      x: 0,
      y: 0,
      zoom: 5
    };
    this.entities = {};
    this.players = {};
  };

  addPlayer(p) {
    p.world = this;
    this.players[p.id] = p;
    this.entities[p.id] = p;
  }
  addEntity(e) {
    e.world = this;
    this.entities[e.id] = e;
  }
  inputPlayer(id, input, value) {
    this.players[id].inputs[input] = value;
  }
  update() {
    for (const i in this.entities) {
      this.entities[i].update();
      if (this.entities[i].toDelete) {
        delete this.entities[i];
      }
    }

    for (const e1 in this.entities) {
      const entity1 = this.entities[e1];
      for (const e2 in this.entities) {
        const entity2 = this.entities[e2];
        if (entity1 != entity2) {
          if (entity1.collidedTypes.includes(entity2.type)) {
            const result = collision(entity1, entity2);
            if (result) {
              entity1.collide(entity2, result);
            }
          }
        }
      }
    }
  }
  render(ctx, width, height) {
    ctx.scale(this.camera.zoom, this.camera.zoom);
    let xoff = 0;
    let yoff = 0;
    if (Date.now() - this.collided < 40) {
      xoff = (Math.random() - 0.5) * 3;
      yoff = (Math.random() - 0.5) * 3;
    }
    ctx.translate(-this.camera.x + width / 2 / this.camera.zoom + xoff, -this.camera.y + height / 2 / this.camera.zoom + yoff);
    const entities = Object.values(this.entities).sort((a, b) => a.zIndex - b.zIndex);
    for (const i in entities) {
      entities[i].render(ctx);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  loadWorld(m) {
    for (const i in m) {
      let entity = null;
      switch (m[i].type) {
        case "Obstacle":
          entity = new Obstacle(m[i].x, m[i].y, m[i].w, m[i].h)
          break;
        case "Breakable":
          entity = new Breakable(m[i].x, m[i].y, m[i].w, m[i].h)
          break;
        case "Spike":
          entity = new Spike(m[i].x, m[i].y, m[i].w, m[i].h)
          break;
        case "PaddleX":
          entity = new PaddleX(m[i].x, m[i].y, m[i].g)
          break;
        default:
          return
      }
      this.addEntity(entity);
    }
  }
}
