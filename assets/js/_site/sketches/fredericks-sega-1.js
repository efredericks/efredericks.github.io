let pts = [];
let ts, hts;

let gridw, gridh;

let grid;
let nr, nc;
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');

    noiseDetail(4, 0.25);
    background(220);
    ts = width * 0.05;
    hts = ts / 2;
    textSize(ts);
    textFont("Ubuntu");
    textAlign(CENTER, CENTER);
    for (let _ = 0; _ < 25; _++) {
        pts.push({ x: random(ts, width - ts), y: random(ts, height - ts), ch: random(['S', 'E', 'G', 'A', '2', '0', '2', '6']) });
    }
    pts[0].ch = '@';

    grid = [];
    nr = 10;
    nc = 20;
    for (let r = 0; r < nr; r++) {
        grid[r] = [];
        for (let c = 0; c < nc; c++) {
            grid[r][c] = random(1, 50);
            if (random() > 0.8) grid[r][c] = "#";
        }
    }

    gridw = width / nc;
    gridh = height / nr;
}

function keyPressed() {
    if (key === "g") saveGif("ats.gif", 10);
    if (key === "s") save("ats.png");
    if (key === "p") paused = !paused;
}
let paused = false;
function draw() {
    if (!paused) {
        background(color(20, 20, 20, 1));

        stroke(color(220, 220, 220, 30));
        noFill();
        let tw = textWidth("SEGA 2026");
        let n = noise(millis() * 0.1);
        let off = map(n, 0.0, 1.0, -15, 15);
        text("SEGA 2026", 20 + tw/2 + random([-1,1])*off, 50 + random([-1,1])*off);

        noStroke();
        fill(color(0, 0, 0, 1));
        for (let r = 0; r < nr; r++) {
            for (let c = 0; c < nc; c++) {
                text(".", gridw / 2 + c * gridw, gridh / 2 + r * gridh);
            }
        }

        // for (let p of pts) {
        //   for (let p2 of pts) {
        //     if (p != p2) {
        //       if (dist(p.x, p.y, p2.x, p2.y) < 250) {
        //         push();
        //         stroke(color(220, 0, 220, 10));
        //         line(p.x, p.y, p2.x, p2.y);
        //         pop();
        //       }
        //     }
        //   }
        // }

        stroke(20);
        fill(220);
        // for (let p of pts) {
        for (let i = pts.length - 1; i >= 0; i--) {
            let p = pts[i];
            push();
            let n = noise(p.x * 0.01, p.y * 0.01, frameCount * 0.01);
            let a = map(n, 0.0, 1.0, -TWO_PI, TWO_PI);
            p.x += cos(a);
            p.y += sin(a);

            translate(p.x, p.y);
            rotate(a);
            text(p.ch, 0, 0);

            if (frameCount < 2000) {
                if (p.x > width + ts / 2) p.x -= width + ts;
                if (p.x < -ts / 2) p.x += width + ts;
                if (p.y < -ts / 2) p.y += height + ts;
                if (p.y > height + ts / 2) p.y -= height + ts;
            } else {
                if (p.x < -ts / 2 || p.x > width + ts / 2 || p.y < -ts / 2 || p.y > height + ts / 2) pts.slice(i, 1);
            }
            pop();
        }
        if (pts.length == 0) {
            console.log("done");
            noLoop();
        }

        /*
        for (let r = 0; r < nr; r++) {
          for (let c = 0; c < nc; c++) {
            if (r > 0 && r < nr - 1 && c > 0 && c < nc - 1) {
              let x = c * gridw;
              let y = r * gridh;
    
              if (grid[r][c] != "#") {
                push();
                translate(x, y);
                fill(color(220, 220, 220, grid[r][c]));
                rect(0, 0, gridw, gridh);
                // rotate(millis() * 0.001 + r * c);
                // text(grid[r][c], 0, 0);
                pop();
              }
            }
          }
        }*/
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    ts = width * 0.05;
    textSize(ts);
    gridw = width / nc;
    gridh = height / nr;
}
