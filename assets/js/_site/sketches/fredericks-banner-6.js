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

function setup() {
  container = document.getElementById('canvas-container');
  let canvas = createCanvas(container.clientWidth, container.clientHeight);
  canvas.parent('canvas-container');

  palette = random([grayscale, vaporwave]);

  noiseDetail(random(4, 8), random(0.25, 0.75));

  bg = color(random(palette));
  drawMe();
}

function draw() { }

function windowResized() {
  resizeCanvas(container.clientWidth, container.clientHeight);
  drawMe();
}

function drawMe() {
  background(bg);
  noFill();
  let idx = 0;
  for (let y = -20; y < height + 100; y += 2) {
    stroke(color(palette[idx]))
    idx++;
    if (idx > palette.length - 1) idx = 0;

    beginShape();
    for (let x = 0; x < width; x++) {
      let _y = y + noise(x*0.01, y*0.01) * map(y, 0, height, 10, 30) * cos(noise(x * 0.01, y * 0.01) * map(y, 0, height, 0.025, 0.0025) * x);
      vertex(x, _y);
    }
    endShape();
  }
}