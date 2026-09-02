let container;

// palettes via coolors
let palettes = {
  "pastel rainbow fantasy": [
    "#ffadad99",
    "#ffd6a599",
    "#fdffb699",
    "#caffbf99",
    "#9bf6ff99",
    "#a0c4ff99",
    "#bdb2ff99",
    "#ffc6ff99",
    "#fffffc99",
  ],
  "ocean sunset": [
    "#00121999",
    "#005f7399",
    "#0a939699",
    "#94d2bd99",
    "#e9d8a699",
    "#ee9b0099",
    "#ca670299",
    "#bb3e0399",
    "#ae201299",
    "#9b222699",
  ],
  "pastel dreams": [
    "#809bce99",
    "#95b8d199",
    "#b8e0d299",
    "#d6eadf99",
    "#eac4d599",
  ],
};
let palette;

let gfx;
let SIM_W, SIM_H; // "real" width/height

let circles = [];
let particles = [];
let grid = [];

const numParticles = 2500;
const cellSize = 60;
let zoom = 0.02;
let cols, rows;

/// noise functions
function flowey(n) {
  return map(n, 0.0, 1.0, -TWO_PI, TWO_PI);
}
function squarey(n) {
  return Math.ceil((map(n, 0.0, 1.0, -TWO_PI, TWO_PI) * (PI / 4)) / (PI / 4));
}
const noise_fns = [flowey, squarey];
let active_noise_fn;

function setup() {
  container = document.getElementById('canvas-container');
  let canvas = createCanvas(container.clientWidth, container.clientHeight);
  canvas.parent('canvas-container');
  background(20);

  SIM_W = canvas.width;
  SIM_H = canvas.height;

  // pick a palette
  let pidx = random(Object.keys(palettes));
  palette = palettes[pidx];
  console.log(`Current palette: ${pidx}`);

  // pick a noise function
  active_noise_fn = random(noise_fns);

  gfx = createGraphics(SIM_W, SIM_H);
  gfx.background(20);

  cols = Math.ceil(SIM_W / cellSize);
  rows = Math.ceil(SIM_H / cellSize);
  for (let i = 0; i < rows * cols; i++) {
    grid[i] = [];
  }

  // circle packing
  const min_r = min(SIM_W, SIM_H) * 0.005;
  const max_r = min(SIM_W, SIM_H) * 0.12;

  // initial circles
  for (let _ = 0; _ < 500; _++) {
    let circ = {
      x: int(random(SIM_W)), y: int(random(SIM_H)),
      r: min_r,
      d: min_r * 2,
      done: false,
    };

    if (!circles.some((c) => circCollision(circ, c))) {
      circles.push(circ);
    }
  }

  // growth
  let anyGrowing = true;
  let growthGuard = 0;
  while (anyGrowing && growthGuard < 1000) {
    growthGuard++;
    anyGrowing = false;

    for (let circ of circles) {
      if (!circ.done) {
        circ.r++;
        let hitEdge =
          circ.x - circ.r <= 0 ||
          circ.x + circ.r >= SIM_W ||
          circ.y - circ.r <= 0 ||
          circ.y + circ.r >= SIM_H ||
          circ.r >= max_r;

        let hitOther = circles.some(
          (c) => c !== circ && circCollision(circ, c)
        );

        if (hitEdge || hitOther) {
          circ.r--;
          circ.done = true;
        } else {
          anyGrowing = true;
        }
        circ.d = circ.r * 2;
      }
    }
  }

  // spatial grid
  for (let c of circles) {
    c.r_sq = c.r * c.r;
    let reach = c.r * 2.2;
    c.reach_sq = reach * reach;

    let minCol = max(0, Math.floor((c.x - reach) / cellSize));
    let maxCol = min(cols - 1, Math.floor((c.x + reach) / cellSize));

    let minRow = max(0, Math.floor((c.y - reach) / cellSize));
    let maxRow = min(rows - 1, Math.floor((c.y + reach) / cellSize));

    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        grid[col + row * cols].push(c);
      }
    }
  }

  // instantiate particles
  for (let i = 0; i < numParticles; i++) {
    let p = {
      x: 0, y: 0,
      c: color(random(palette)),
      age: 0, maxAge: 0,
      stuck: 0,
    }
    respawnParticle(p);
    particles.push(p);
  }

  gfx.strokeWeight(1.2);
}

function draw() {
  // swap color every so often
  if (frameCount % 1500 == 0) {
    let pidx = random(Object.keys(palettes));
    console.log(`Palette: ${pidx} // Zoom: ${zoom}`);
    palette = palettes[pidx];

    for (let p of particles) {
      p.c = color(random(palette));
    }
  }

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.age++;

    gfx.stroke(p.c);

    let flow = getTangentialFlow(p.x, p.y);

    let prevX = p.x;
    let prevY = p.y;

    p.x += flow.x * 1.5;
    p.y += flow.y * 1.5;

    // constrain to edges and figure out if stuck
    let touchedCircle = constrainToCircleSurfaces(p);
    if (touchedCircle) p.stuck++;
    else p.stuck = 0;

    gfx.line(prevX, prevY, p.x, p.y);

    // respawn if offscreen or stuck
    if (p.x < 0 || p.x > SIM_W || p.y < 0 || p.y > SIM_H || p.age > p.maxAge || p.stuck > 4)
      respawnParticle(p);
  }

  image(gfx, 0, 0, width, height);
}

function windowResized() {
  resizeCanvas(container.clientWidth, container.clientHeight);
}

// reset noise function
function doubleClicked() {
  zoom = random(0.1, 0.005);
  active_noise_fn = random(noise_fns);
  gfx.clear();
  clear();
  console.log(`Clearing screen - new zoom (${zoom}) with new noise function: ${active_noise_fn}`)

}

// set particle's parameters
function respawnParticle(p) {
  p.x = random(SIM_W);
  p.y = random(SIM_H);
  p.age = 0;
  p.maxAge = int(random(250, 500));
  p.stuck = 0;

  constrainToCircleSurfaces(p);
}

// don't enter a circle
function constrainToCircleSurfaces(p) {
  let col = Math.floor(p.x / cellSize);
  let row = Math.floor(p.y / cellSize);
  let hit = false;

  if (col >= 0 && col < cols && row >= 0 && row < rows) {
    let cellCircles = grid[col + row * cols];
    for (let i = 0; i < cellCircles.length; i++) {
      let c = cellCircles[i];
      let dx = p.x - c.x;
      let dy = p.y - c.y;
      let dSq = dx * dx + dy * dy;

      if (dSq <= (c.r + 1.5) * (c.r + 1.5)) {
        let d = sqrt(dSq) || 1;
        p.x = c.x + (dx / d) * (c.r + 2);
        p.y = c.y + (dy / d) * (c.r + 2);
        hit = true;
      }
    }
  }
  return hit;
}

// get tangent off circle surface for smoother movement
function getTangentialFlow(x, y) {
  // flow update
  const n = noise(x * zoom, y * zoom);
  let angle = active_noise_fn(n);

  let vx = cos(angle);
  let vy = sin(angle);

  // check our spatial grid
  let col = floor(x / cellSize);
  let row = floor(y / cellSize);

  if (col >= 0 && col < cols && row >= 0 && row < rows) {
    let cellCircles = grid[col + row * cols];

    for (let i = 0; i < cellCircles.length; i++) {
      let c = cellCircles[i];
      let dx = x - c.x;
      let dy = y - c.y;
      let dSq = dx * dx + dy * dy;

      if (dSq < c.reach_sq && dSq > 0) {
        let d = sqrt(dSq);
        let nx = dx / d;
        let ny = dy / d;

        let vRad = vx * nx + vy * ny;

        if (vRad < 0) {
          let margin = c.r * 1.2;
          let t = 1.0 - constrain((d - c.r) / margin, 0, 1);
          let w = t * t * (3 - 2 * t);

          vx -= nx * vRad * w;
          vy -= ny * vRad * w;

          let tx = -ny;
          let ty = nx;
          if (vx * tx + vy * ty < 0) {
            tx = -tx;
            ty = -ty;
          }

          vx += tx * w * 0.4;
          vy += ty * w * 0.4;
        }
      }
    }
  }

  let len = sqrt(vx * vx + vy * vy);
  if (len > 0) {
    vx /= len;
    vy /= len;
  }

  return { x: vx, y: vy };
}

// circle-circle collision
function circCollision(c1, c2) {
  const dx = c1.x - c2.x;
  const dy = c1.y - c2.y;
  const rsum = c1.r + c2.r;
  return dx * dx + dy * dy <= rsum * rsum;
}