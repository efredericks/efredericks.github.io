// Erik Fredericks - demo for SEGA2026 working session
// todo - comment this mess

let img;
let particles;
let gfx;
let _scale;

let zoom;
let escale = 10;
let paused = false;

let dither_fs, tv_fs, rgb_fs;

let artists, artworks, artwork_id, artwork_title;
let font, ts;
let dropdown;
let artwork_div;

async function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);

    // Download from:
    // https://github.com/MuseumofModernArt/collection/raw/refs/heads/main/Artists.json;
    // https://github.com/MuseumofModernArt/collection/raw/refs/heads/main/Artworks.json
    artists = await loadJSON("./json/Artists.json");
    artworks = await loadJSON("./json/Artworks.json");

    font = await loadFont("./fonts/Manrope-Regular.ttf");

    artwork_div = document.getElementById("artwork_info");
    _scale = min(width, height) / 1000;

    // img = await loadImage(random(["coffeebird.jpg", "birdvader.png"]));
    backup = createGraphics(width, height);
    gfx = createGraphics(width, height);
    gfx.imageMode(CENTER);
    await selectNewImage();


    // ts = 48 * _scale;
    // let tw = textWidth(artwork_title, 0, 0);
    // while (tw > width * 0.9) {
    //     tw = textWidth(artwork_title, 0, 0);
    //     ts--;
    //     textSize(ts);
    // }

    // artworks = null;

    noiseDetail(4, 0.25);

    // textAlign(CENTER, CENTER);


    imageMode(CENTER);


    // image(gfx, 0, 0);
    noStroke();
    background(0);

    dither_fs = gfx.createFilterShader(dither_src);
    tv_fs = gfx.createFilterShader(tv_noise_src);
    rgb_fs = gfx.createFilterShader(rgb_src);

    if (random([true, false])) {
        rgb_fs.setUniform("_noise", random(0.01, 0.1));
        gfx.filter(rgb_fs);
    }
    if (random([true, false])) {
        tv_fs.setUniform("_noise", random(0.25, 0.5) * cos(millis() * 0.01));
        gfx.filter(tv_fs);
    }
    if (random([true, false])) {
        dither_fs.setUniform("which", int(random(0, 2)));
        gfx.filter(dither_fs);
    }

    // dropdown = createSelect();
    // dropdown.position(0, 0);

    // let sel = "";
    // for (let i = 0; i < artworks.length; i++) {
    //    if (i == artwork_id) sel = artworks[i].Title; 
    //    dropdown.option(artworks[i].Title);
    // }
    // dropdown.selected(sel);
}

function draw() {
    if (!paused) {
        translate(-width / 2, -height / 2);
        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];

            let dim = map(p.life, p.olife, 0, escale * _scale, escale * _scale);
            let c = gfx.get(p.x, p.y);
            fill(c);//color(255,0,255));
            ellipse(p.x, p.y, dim, dim * 0.1);

            let n = noise(p.x * zoom, p.y * zoom);
            let a = map(n, 0.0, 1.0, -TWO_PI, TWO_PI);

            p.x += cos(a);
            p.y += sin(a);

            p.life--;
            if (p.life <= 0 || p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
                particles.splice(i, 1);
                let life = random(100, 1000);
                particles.push({ x: random(width), y: random(height), life: life, olife: life });
            }
        }
        if (frameCount % 50 == 0) {
            zoom = random(0.001, 0.05);
        }

        // if (frameCount % 30 == 0) {
        //     rgb_fs.setUniform("_noise", random(0.1, 0.3));
        //     filter(rgb_fs);
        //     tv_fs.setUniform("_noise", random(0.25, 0.5) * cos(millis() * 0.01));
        //     filter(tv_fs);
        //     dither_fs.setUniform("which", int(random(0, 2)));
        //     filter(dither_fs);
        // }

        // push();
        // fill('rgb(255,255,255)');//,0.9)');
        // textSize(ts);
        // text(artwork_title, 0, 0);//height - ts);
        // pop();
    }
}

function resize_img(loc_img) {
    if (loc_img && loc_img != null) {
        if (loc_img.width > loc_img.height) {
            loc_img.resize(width, 0);
        } else {
            loc_img.resize(0, height);
        }
    }
}

async function keyPressed() {
    if (key == "p")
        paused = !paused;
    if (key == "z")
        zoom = random(0.001, 0.05);

    if (key == "k") escale += 0.5;
    if (key == "j") escale -= 0.5;
    escale = constrain(escale, 2, 50);


    if (key == "f") {
        paused = !paused;
        if (paused) {
            backup.clear();
            backup.copy(canvas, 0, 0, width, height, 0, 0, width, height);
            image(gfx, width / 2, height / 2);
        } else {
            copy(backup, 0, 0, width, height, -width / 2, -height / 2, width, height);
        }
    }

    if (key == "o") {
        paused = !paused;
        if (paused) {
            backup.clear();
            backup.copy(canvas, 0, 0, width, height, 0, 0, width, height);
            image(img, width / 2, height / 2);
        } else {
            copy(backup, 0, 0, width, height, -width / 2, -height / 2, width, height);
        }
    }

    if (key == "R") {
        await selectNewImage();
	resetShaderParams();
    }
}

let backup, canvas;
function mouseDoubleClicked() {
}

function resetShaderParams() {
    if (random([true, false])) {
        rgb_fs.setUniform("_noise", random(0.01, 0.1));
        gfx.filter(rgb_fs);
    }
    if (random([true, false])) {
        tv_fs.setUniform("_noise", random(0.25, 0.5) * cos(millis() * 0.01));
        gfx.filter(tv_fs);
    }
    if (random([true, false])) {
        dither_fs.setUniform("which", int(random(0, 2)));
        gfx.filter(dither_fs);
    }
}

async function selectNewImage() {
    artwork_id = int(random(0, artworks.length - 1));
    while (artworks[artwork_id].ImageURL == null) {
        artwork_id = int(random(0, artworks.length - 1));
    }
    artwork_title = artworks[artwork_id].Title;
    artwork_text = `${artworks[artwork_id].Artist[0]} - ${artwork_title}`;
    artwork_div.innerHTML = `<a href="${artworks[artwork_id].URL}" alt="${artwork_text}" target="_blank">${artwork_text}</a>`;
    // artwork_div.innerText = `${artworks[artwork_id].Artist[0]} - ${artwork_title}`;

    console.log(artwork_title)
    console.log(artworks[artwork_id].ImageURL);
    img = await loadImage(artworks[artwork_id].ImageURL);
    zoom = random(0.001, 0.05);

    background(0);
    gfx.clear();
    backup.clear();

    gfx.image(img, width / 2, height / 2);


    particles = [];
    for (let _ = 0; _ < 2500; _++) {
        let life = random(100, 1000);
        particles.push({ x: random(width), y: random(height), life: life, olife: life });
    }
}
