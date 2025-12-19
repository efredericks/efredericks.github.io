let vaporwave = [
    "#ff71ce",
    "#01cdfe",
    "#05ffa1",
    "#b967ff",
    "#fffb96",
    "#0f62fe",
];

let particles;
let line_active = false;
let the_text = "SEGA 2026";
let text_w;
let text_x;
let text_cid = 0;

function setup() {
    container = document.getElementById('canvas-container');
    let canvas = createCanvas(container.clientWidth, container.clientHeight);
    canvas.parent('canvas-container');
    particles = [];

    for (let _ = 0; _ < 100; _++) {
        particles.push({
            x: random(width), y: random(height),
            vx: random(-2, 2), vy: random(-2, 2),
            col: color(random(vaporwave))
        });
    }

    background(0);
    textFont('monospace');
    text_x = -50;
    textSize(height * 0.2);
    textAlign(CENTER, CENTER);
    text_w = textWidth(the_text);
    text_cid = int(random(vaporwave.length))
}

function draw() {
    noStroke();
    background(`rgba(0,0,0,0.1)`);

    // precalculate sin text
    let text_y = height / 2;
    let _text_x = text_x;
    let t_pos = [];
    for (let i = the_text.length - 1; i >= 0; i--) {
        let _text_y = text_y + height * 0.25 * cos(0.025 * _text_x);
        t_pos.push({ x: _text_x, y: _text_y, txt:the_text[i] });
        _text_x -= textWidth(the_text[i]);
    }
    text_x += 2;
    if (text_x > width + text_w) {
        text_x = -50;
        text_cid = int(random(vaporwave.length))
    }

    // radar line
    if (frameCount % 50 == 0) line_active = true;
    if (line_active) {
        stroke(`rgba(9, 177, 149, 0.5)`);
        line(0, ly, width, ly);
        ly += 4;

        if (ly >= height) {
            line_active = false;
            ly = 0;
        }
    }

    // particle drawing + dist check
    for (let p of particles) {
        fill(p.col);
        ellipse(p.x, p.y, 5, 5);

        let _text_x = text_x;
        for (let t of t_pos) {
            let d = dist(p.x, p.y, t.x, t.y);
            if (d < width * 0.07) {
                stroke(`rgba(220,0,220,0.5)`);
                line(p.x, p.y, t.x, t.y);
            }
        }

        // for (let p2 of particles) {
        //     if (p != p2) {
        //         let d = dist(p.x, p.y, p2.x, p2.y);
        //         if (d < width * 0.07) {
        //             stroke(`rgba(220,0,220,0.5)`);
        //             line(p.x, p.y, p2.x, p2.y);
        //         }
        //     }
        // }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = constrain(p.x, 0, width);
        p.y = constrain(p.y, 0, height);
    }

    // draw text on top
    for (let t of t_pos) {
        fill(color(vaporwave[text_cid]));
        text(t.txt, t.x, t.y);
    }


}
let ly = 0;

function windowResized() {
    resizeCanvas(container.clientWidth, container.clientHeight);
    update = true;
    textSize(height * 0.2);
    text_w = textWidth(the_text);
    text_cid = int(random(vaporwave.length))
    text_x = -50;
}