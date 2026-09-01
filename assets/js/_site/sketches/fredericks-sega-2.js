let update = true;
const num_rows = 30;
const num_cols = 80;
let container;

let timeout = 100;
let timer;
let actives = [];

let vaporwave = [
  "#ff71ce",
  "#01cdfe",
  "#05ffa1",
  "#b967ff",
  "#fffb96",
  "#0f62fe",
];

function setup() {
    container = document.getElementById('canvas-container');
    let canvas = createCanvas(container.clientWidth, container.clientHeight);
    canvas.parent('canvas-container');
    randomCells();
}

function randomCells() {
    actives = [];
    for (let _ = 0; _ < int(random(1, (num_rows * num_cols * 0.5))); _++) {
        let r = int(random(0, num_rows-1));
        let c = int(random(0, num_cols-1));
        actives.push({r:r,c:c, col:color(random(vaporwave))});
    }
    timer = timeout;
}

function draw() {
    if (update) {
        background(0);
        update = false;

        let cw = width / num_cols;
        let ch = height / num_rows;

        stroke(20);
        noFill();

        let cnt = 0;
        let x = 0;
        let y = 0;
        for (let r = 0; r < num_rows; r++) {
            for (let c = 0; c < num_cols; c++) {
                if (cnt % 2 == 0) fill(`rgba(220,220,220,0.5)`);
                else noFill();

                for (let a of actives) {
                    if (a.r == r && a.c == c) fill(a.col);
                }

                rect(c * cw, r * ch, cw, ch);

                cnt++;
            }
            cnt++;
        }
    }
    timer--;
    if (timer <= 0) {
        update = true;
        randomCells();
    }
}

function windowResized() {
    resizeCanvas(container.clientWidth, container.clientHeight);
    update = true;
}