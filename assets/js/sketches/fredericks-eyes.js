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

let eyes;
let eyeCols, eyeRows;
let gutter, cellWidth, cellHeight;
let eyeWidth, eyeHeight;

let particles = [];

// let event_active, ev_pos;

let mouseTimer;
const mouseTimeout = 60;
let smoothMouseX = 0;
let smoothMouseY = 0;
let blendFactor = 0;

function setup() {
  container = document.getElementById('canvas-container');
  let canvas = createCanvas(container.clientWidth, container.clientHeight);
  canvas.parent('canvas-container');
  background(20);

  colorMode(HSB, 255, 255, 255);
  textSize(48);

  eyeCols = 18;
  eyeRows = 21;
  // eyes = [];
  gutter = width * 0.008;
  cellWidth = width / eyeCols;
  cellHeight = height / eyeRows;

  // hidden particles for eyes to follow
  for (let _ = 0; _ < 100; _++) {
    particles.push({
      x: random(width),
      y: random(height),
      vx: random(-12, 12),
      vy: random(-12, 12),
    });
  }

  // actual drawn eye size, shrunk to leave a gap
  eyeWidth = cellWidth - gutter;
  eyeHeight = cellHeight - gutter;
  eyes = [];
  for (let r = 0; r < eyeRows; r++) {
    eyes[r] = [];
    for (let c = 0; c < eyeCols; c++) {
      eyes[r][c] = { target: int(random(0, particles.length - 1)), tgtx: 0, tgty: 0 };
    }
  }


  // event_active = true;
  // ev_pos = {};
  // ev_pos.x = width / 2;
  // ev_pos.y = height * 0.5;
  // ev_pos.r = height * 0.3;
  // ev_pos.t = PI;
  // ev_pos.s = PI / 64;
  // ev_pos.cx = 0;
  // ev_pos.cy = 0;

  mouseTimer = 0;
  smoothMouseX = width / 2;
  smoothMouseY = height / 2;
}

function mouseMoved() {
  mouseTimer = mouseTimeout;
}

function draw() {
  background(0);


  let targetBlend = mouseTimer > 0 ? 1.0 : 0.0;
  blendFactor = lerp(blendFactor, targetBlend, 0.05);
  if (mouseTimer > 0) {

    mouseTimer--;
    // event_active = false;
  }
  // smoothMouseX = lerp(smoothMouseX, mouseX, 0.15);
  // smoothMouseY = lerp(smoothMouseY, mouseY, 0.15);
  smoothMouseX = lerp(smoothMouseX, mouseX, 0.15);
  smoothMouseY = lerp(smoothMouseY, mouseY, 0.15);

  for (let row = 1; row < eyeRows - 1; row++) {
    for (let col = 1; col < eyeCols - 1; col++) {
      const x = (col + 0.5) * cellWidth;
      const y = (row + 0.5) * cellHeight;

      drawingContext.shadowColor = 220; //color(h, s, b);

      drawMathEye(x, y, eyeWidth, eyeHeight);

      // let angle = atan2(mouseY - y, mouseX - x);
      // let _distance = dist(mouseX, mouseY, x, y);
      // let maxConstraint = eyeWidth / 4;
      // let irisX = x + cos(angle) * min(_distance, maxConstraint);
      // let irisY = y + sin(angle) * min(_distance, maxConstraint);

      // let mx = particles[eyes[row][col].target].x;
      // let my = particles[eyes[row][col].target].y;

      // turn into a target instead
      // if (!event_active) {
      //   if (random(0, 10000) > 9998) {
      //     if (eyes[row][col].target == "mouse") {
      //       eyes[row][col].target = int(random(particles.length - 1));
      //     } else {
      //       eyes[row][col].target = "mouse";
      //     }
      //     //   mx = random(width);
      //     //   my = random(height)
      //   }
      // }

      // if (mouseTimer > mouseTimeout * 0.5) {
      //   mx = mouseX;
      //   my = mouseY;
      // } else if (mouseTimer > 0) { // lerp
      //   const _x = particles[eyes[row][col].target].x;
      //   const _y = particles[eyes[row][col].target].y;
      //   const perc = map(mouseTimer, mouseTimeout, 0, 1.0, 0.0);
      //   mx = lerp(_x, mouseX, perc);
      //   my = lerp(_y, mouseY, perc);
      // }
      // if (mouseTimer > 0) {
      //   // Target position
      //   const _x = particles[eyes[row][col].target].x;
      //   const _y = particles[eyes[row][col].target].y;

      //   // Calculate perc: 1.0 when mouse just moved (at mousePos), 
      //   // tapering down to 0.0 when timer hits 0 (at targetPos)
      //   const perc = map(mouseTimer, mouseTimeout, 0, 1.0, 0.0);

      //   // Smooth lerp across the entire duration
      //   mx = lerp(_x, mouseX, perc);
      //   my = lerp(_y, mouseY, perc);
      // } else {
      //   // Fully rested at the target position when timer reaches 0
      //   mx = particles[eyes[row][col].target].x;
      //   my = particles[eyes[row][col].target].y;
      // }
      // Target position from assigned particle
      const targetX = particles[eyes[row][col].target].x;
      const targetY = particles[eyes[row][col].target].y;

      // 2. Smoothly transition between target particle and smoothed mouse position
      // const perc = map(mouseTimer, mouseTimeout, 0, 1.0, 0.0, true);
      // let mx = lerp(targetX, smoothMouseX, perc);
      // let my = lerp(targetY, smoothMouseY, perc);

      let mx = lerp(targetX, smoothMouseX, blendFactor);
      let my = lerp(targetY, smoothMouseY, blendFactor);

      // if (event_active) {
      //   mx = ev_pos.cx;
      //   my = ev_pos.cy;
      // } else if (eyes[row][col].target != "mouse") {
      //   let p = particles[eyes[row][col].target];
      //   mx = p.x;
      //   my = p.y;

      //   // push()
      //   // fill("#ff00ff")
      //   // circle(p.x, p.y, 10)
      //   // pop()
      // }
      let angle = atan2(my - y, mx - x);
      let _distance = dist(mx, my, x, y);

      // separate constraints per axis, matching the eye's shape
      let maxX = eyeWidth / 4;
      let maxY = eyeHeight / 4;

      // direction vector, normalized
      let dx = cos(angle);
      let dy = sin(angle);

      // find how far along this direction we can go before hitting the ellipse boundary
      // ellipse boundary: (t*dx/maxX)^2 + (t*dy/maxY)^2 = 1  →  solve for t
      let denom = sqrt((dx * dx) / (maxX * maxX) + (dy * dy) / (maxY * maxY));
      let maxConstraint = denom > 0 ? 1 / denom : 0;

      let moveDist = min(_distance, maxConstraint);
      let irisX = x + dx * moveDist;
      let irisY = y + dy * moveDist;

      let d = min(eyeWidth, eyeHeight) * 0.35;
      let r = d / 2;

      let h = map(col, 0, eyeCols - 1, 0, 255);
      let s = map(row + col, 0, eyeRows - 1 + (eyeCols - 1), 255, 100); // keep a saturation floor, e.g. 100 not 0
      let b = 255; // max brightness so it pops

      // drawingContext.shadowOffsetX = -2;
      // drawingContext.shadowOffsetY = -2;
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = color(h, s, b);
      fill(h, s, b);

      // let h = map(col, 0, eyeCols - 1, 0, 255);
      // let s = map(row + col, 0, eyeRows - 1 + (eyeCols - 1), 255, 0);
      // let b = 255;
      // fill(h, s, b);
      // fill(0, 150, 255);
      noStroke();

      d = lerp(d, d*2, blendFactor);
      r = d/2;
      let f = color(20);
      f = lerpColor(f, color(210,180,255), blendFactor)



      ellipse(irisX, irisY, d, d);

      fill(f);
      ellipse(irisX, irisY, r, r);
      // drawingContext.shadowOffsetX = 0;
      // drawingContext.shadowOffsetY = 0;
      // drawingContext.shadowBlur = 0;
    }
  }
  // textAlign(CENTER, CENTER);
  // fill(0, 255, 255);
  // text("@", mouseX, mouseY);

  for (let p of particles) {
    // fill(255)
    // circle(p.x, p.y, 5);
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  }

  // if (event_active) {
  //   push();
  //   translate(ev_pos.x, ev_pos.y);
  //   let _x = ev_pos.r * cos(ev_pos.t);
  //   let _y = ev_pos.r * sin(ev_pos.t);
  //   ev_pos.cx = ev_pos.x + _x;
  //   ev_pos.cy = ev_pos.y + _y;
  //   fill("#ff00ff");
  //   circle(_x, _y, 50);
  //   ev_pos.t += ev_pos.s;
  //   pop();
  // }
}

function windowResized() {
  resizeCanvas(container.clientWidth, container.clientHeight);
  gutter = width * 0.008;
  cellWidth = width / eyeCols;
  cellHeight = height / eyeRows;

  smoothMouseX = width / 2;
  smoothMouseY = height / 2;

  // actual drawn eye size, shrunk to leave a gap
  eyeWidth = cellWidth - gutter;
  eyeHeight = cellHeight - gutter;
}

// reset noise function
function doubleClicked() {
}

function drawMathEye(x, y, w, h) {
  noFill();
  stroke(220);
  strokeWeight(2);

  // Top Eyelid Arc
  beginShape();
  for (let i = 0; i <= w; i++) {
    let angle = map(i, 0, w, 0, PI);
    let yOffset = sin(angle) * (h / 2);
    vertex(x - w / 2 + i, y - yOffset);
  }
  endShape();

  // Bottom Eyelid Arc
  beginShape();
  for (let i = 0; i <= w; i++) {
    let angle = map(i, 0, w, 0, PI);
    let yOffset = sin(angle) * (h / 2);
    vertex(x - w / 2 + i, y + yOffset);
  }
  endShape();
}
