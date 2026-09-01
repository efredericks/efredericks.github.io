let ibm_blue = "#0f62fe";
let vaporwave = [
  "#ff71ce",
  "#01cdfe",
  "#05ffa1",
  "#b967ff",
  "#fffb96",
  "#0f62fe",
];
let grayscale = [
  "#000",
  "#202020",
  "#222",
  "#666",
]

let palette;
let bg;
let container

let particles = [];
let hw, hh;
let buffer;
let ellipseSize;
let rule_mode;
let scale_factor = 1;
let base_w, base_h;

function setup() {
  container = document.getElementById('canvas-container');
  let canvas = createCanvas(container.clientWidth, container.clientHeight);
  canvas.parent('canvas-container');

  palette = random([grayscale, vaporwave]);
  bg = color(random(palette));

  hw = width / 2;
  hh = height / 2;
  for (let i = 0; i < 500; i++) {
    particles.push(
      new RuleParticle(
        random(-hw, hw),
        random(-hh, hh),
        random(height * 0.001, height * 0.003)
      )
    );
  }
  background(20);
  buffer = width * 0.005;

  rule_mode = random(["cardinal", "both", "walker"])

  base_w = width;
  base_h = height;
  scale_factor = 1;
}

function draw() {
  loadPixels();
  push();
  translate(hw, hh);
  scale(scale_factor);
  fill(220);
  noStroke();

  const live_particles = particles.filter((p) => !p.dead);
  for (let p of live_particles) {
    let retval = p.update();
    if (retval) p.draw();
  }

  if (live_particles.length == 0) {
    console.log("done");
    noLoop();
  }
  pop();
}

function windowResized() {
  resizeCanvas(container.clientWidth, container.clientHeight);
  hw = width / 2;
  hh = height / 2;
  buffer = width * 0.005;
  background(20);

  scale_factor = min(width / base_w, height / base_h);
  
  push();
  translate(hw, hh);
  scale(scale_factor);
  noFill();
  for (let p of particles) {
    if (p.points.length > 1) p.draw();
  }
  pop();
}


let DIRS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

class RuleParticle {
  constructor(x, y, sz) {
    this.pos = createVector(x, y);
    let d = random(DIRS);
    this.dir = createVector(d[0], d[1]);
    this.sz = sz;
    this.life = random(500, 2500);

    this.rule = random(["square", "walker"]);
    if (this.rule == "walker") {
      this.dir.x = random([-1, 0, 1]);
      this.dir.y = random([-1, 0, 1]);
    }

    this.points = [];
    this.dead = false;
  }

  check() {
    for (let i = 1; i <= buffer; i++) {
      let next_x = this.pos.x + this.dir.x * i;
      let next_y = this.pos.y + this.dir.y * i;
      const idx = getPixelID(next_x, next_y);
      if (pixels[idx] >= 40 || pixels[idx + 1] >= 40 || pixels[idx + 2] >= 40)
        return false;
    }
    return true;
  }

  update() {
    let retval = false;
    if (!this.dead) {
      retval = this.check();
      if (!retval) {
        if (this.rule == "walker") {
          this.dir.x = random([-1, 0, 1]);
          this.dir.y = random([-1, 0, 1]);
        } else this.dir = createVector(...random(DIRS));

        if (random() > 0.99 && !this.dead && particles.length < 5000) {
          particles.push(
            new RuleParticle(
              random(-hw, hw),
              random(-hh, hh),
              random(height * 0.001, height * 0.003)
            )
          );
          this.dead = true;
        }
      } else {
        this.pos.x += this.dir.x;
        this.pos.y += this.dir.y;
        // this.points.push(this.pos);
        this.points.push(this.pos.copy());
      }

      this.life--;
      if (this.life <= 0) {
        this.dead = true;
        retval = false;
      }
    }
    return retval;
  }

  draw() {
    // ellipse(this.pos.x, this.pos.y, this.sz, this.sz);
    strokeWeight(this.sz);

    noFill();
    stroke(220);
    beginShape();
    for (let p of this.points) vertex(p.x, p.y);
    endShape();
  }
}

function getPixelID(x, y) {
  let pd = pixelDensity();
  let sx = int(x + hw); // world → screen coords
  let sy = int(y + hh);
  return 4 * (sy * width * pd + sx) * pd;
}