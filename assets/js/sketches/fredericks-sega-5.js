let vaporwave = [
  "#ff71ce",
  "#01cdfe",
  "#05ffa1",
  "#b967ff",
  "#fffb96",
  "#0f62fe",
  "#0f62fe",
  "#000000"
];

let main_gfx;
let dither_fs, dither_src, dither_which;
let cw, ch, h_cw, h_ch, zoom, perc;

function setup() {
  container = document.getElementById('canvas-container');
  let canvas = createCanvas(container.clientWidth, container.clientHeight);
  canvas.parent('canvas-container');

  noiseDetail(4, 0.75);

  dither_which = int(random(0, 2));
  dither_fs = createFilterShader(dither_src);
  dither_fs.setUniform("which", dither_which);
  // frameRate(4);

  zoom = 0.001;
  perc = random([0.01,0.025,0.03]);//random([0.01, 0.05, 0.1]);
  cw = width * perc;
  ch = height * perc;

  h_cw = cw / 2;
  h_ch = ch / 2;

  noStroke();
  frameRate(30);
}

function draw() {
  const m = frameCount;//millis();
  const cw2 = cw * 1.05;
  const ch2 = ch * 1.05;
  for (let y = 0; y < height; y += ch) {
    for (let x = 0; x < width; x += cw) {
      let n = noise(x * zoom, y * zoom, m*zoom);
      let cidx = int(map(n, 0.0, 1.0, 0, vaporwave.length - 1));
      fill(color(vaporwave[cidx]));
      rect(x, y, cw2, ch2);
    }
  }
}

function windowResized() {
  resizeCanvas(container.clientWidth, container.clientHeight);
  background(0);

  cw = width * perc;
  ch = height * perc;
  h_cw = cw / 2;
  h_ch = ch / 2;
}

// dither - https://medium.com/the-bkpt/dithered-shading-tutorial-29f57d06ac39
// http://alex-charlton.com/posts/Dithering_on_the_GPU/
// https://github.com/hughsk/glsl-dither/blob/master/example/index.frag
dither_src = `precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform float _noise;
uniform float indexMatrix4x4[16];

mat4 bayer = mat4(
  -0.5, 0.0, -0.375, 0.125,
  0.25, -0.25, 0.375, -0.125,
  -0.3125, 0.1875, -0.4375, 0.0625,
  0.4375, -0.0625, 0.3125, -0.1875
); 

// https://github.com/hughsk/glsl-luma/blob/master/index.glsl
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}
// https://github.com/hughsk/glsl-luma/blob/master/index.glsl
float luma(vec4 color) {
  return dot(color.rgb, vec3(0.299, 0.587, 0.114));
}

float dither4x4(vec2 position, float brightness) {
  int x = int(mod(position.x, 4.0));
  int y = int(mod(position.y, 4.0));
  int index = x + y * 4;
  float limit = 0.0;

  if (x < 8) {
    if (index == 0) limit = 0.0625;
    if (index == 1) limit = 0.5625;
    if (index == 2) limit = 0.1875;
    if (index == 3) limit = 0.6875;
    if (index == 4) limit = 0.8125;
    if (index == 5) limit = 0.3125;
    if (index == 6) limit = 0.9375;
    if (index == 7) limit = 0.4375;
    if (index == 8) limit = 0.25;
    if (index == 9) limit = 0.75;
    if (index == 10) limit = 0.125;
    if (index == 11) limit = 0.625;
    if (index == 12) limit = 1.0;
    if (index == 13) limit = 0.5;
    if (index == 14) limit = 0.875;
    if (index == 15) limit = 0.375;
  }

  return brightness < limit ? 0.0 : 1.0;
}

vec3 dither4x4(vec2 position, vec3 color) {
  return color * dither4x4(position, luma(color));
}

vec4 dither4x4(vec2 position, vec4 color) {
  return vec4(color.rgb * dither4x4(position, luma(color)), 1.0);
}

float dither8x8(vec2 position, float brightness) {
  int x = int(mod(position.x, 8.0));
  int y = int(mod(position.y, 8.0));
  int index = x + y * 8;
  float limit = 0.0;

  if (x < 8) {
    if (index == 0) limit = 0.015625;
    if (index == 1) limit = 0.515625;
    if (index == 2) limit = 0.140625;
    if (index == 3) limit = 0.640625;
    if (index == 4) limit = 0.046875;
    if (index == 5) limit = 0.546875;
    if (index == 6) limit = 0.171875;
    if (index == 7) limit = 0.671875;
    if (index == 8) limit = 0.765625;
    if (index == 9) limit = 0.265625;
    if (index == 10) limit = 0.890625;
    if (index == 11) limit = 0.390625;
    if (index == 12) limit = 0.796875;
    if (index == 13) limit = 0.296875;
    if (index == 14) limit = 0.921875;
    if (index == 15) limit = 0.421875;
    if (index == 16) limit = 0.203125;
    if (index == 17) limit = 0.703125;
    if (index == 18) limit = 0.078125;
    if (index == 19) limit = 0.578125;
    if (index == 20) limit = 0.234375;
    if (index == 21) limit = 0.734375;
    if (index == 22) limit = 0.109375;
    if (index == 23) limit = 0.609375;
    if (index == 24) limit = 0.953125;
    if (index == 25) limit = 0.453125;
    if (index == 26) limit = 0.828125;
    if (index == 27) limit = 0.328125;
    if (index == 28) limit = 0.984375;
    if (index == 29) limit = 0.484375;
    if (index == 30) limit = 0.859375;
    if (index == 31) limit = 0.359375;
    if (index == 32) limit = 0.0625;
    if (index == 33) limit = 0.5625;
    if (index == 34) limit = 0.1875;
    if (index == 35) limit = 0.6875;
    if (index == 36) limit = 0.03125;
    if (index == 37) limit = 0.53125;
    if (index == 38) limit = 0.15625;
    if (index == 39) limit = 0.65625;
    if (index == 40) limit = 0.8125;
    if (index == 41) limit = 0.3125;
    if (index == 42) limit = 0.9375;
    if (index == 43) limit = 0.4375;
    if (index == 44) limit = 0.78125;
    if (index == 45) limit = 0.28125;
    if (index == 46) limit = 0.90625;
    if (index == 47) limit = 0.40625;
    if (index == 48) limit = 0.25;
    if (index == 49) limit = 0.75;
    if (index == 50) limit = 0.125;
    if (index == 51) limit = 0.625;
    if (index == 52) limit = 0.21875;
    if (index == 53) limit = 0.71875;
    if (index == 54) limit = 0.09375;
    if (index == 55) limit = 0.59375;
    if (index == 56) limit = 1.0;
    if (index == 57) limit = 0.5;
    if (index == 58) limit = 0.875;
    if (index == 59) limit = 0.375;
    if (index == 60) limit = 0.96875;
    if (index == 61) limit = 0.46875;
    if (index == 62) limit = 0.84375;
    if (index == 63) limit = 0.34375;
  }

  return brightness < limit ? 0.0 : 1.0;
}

vec3 dither8x8(vec2 position, vec3 color) {
  return color * dither8x8(position, luma(color));
}

vec4 dither8x8(vec2 position, vec4 color) {
  return vec4(color.rgb * dither8x8(position, luma(color)), 1.0);
}

float dither2x2(vec2 position, float brightness) {
  int x = int(mod(position.x, 2.0));
  int y = int(mod(position.y, 2.0));
  int index = x + y * 2;
  float limit = 0.0;

  if (x < 8) {
    if (index == 0) limit = 0.25;
    if (index == 1) limit = 0.75;
    if (index == 2) limit = 1.00;
    if (index == 3) limit = 0.50;
  }

  return brightness < limit ? 0.0 : 1.0;
}

vec3 dither2x2(vec2 position, vec3 color) {
  return color * dither2x2(position, luma(color));
}

vec4 dither2x2(vec2 position, vec4 color) {
  return vec4(color.rgb * dither2x2(position, luma(color)), 1.0);
}

uniform int which;

void main() {
  vec2 uv = vTexCoord;
  //vec3 col;
  //vec4 _col = texture2D(tex0, uv);
  //col = _col.rgb;

  //col = dither(col);
  
  //gl_FragColor = vec4(col, 1.0);

  if (which == 0)
    gl_FragColor = dither2x2(gl_FragCoord.xy, texture2D(tex0, uv));
  else if (which == 1)
    gl_FragColor = dither4x4(gl_FragCoord.xy, texture2D(tex0, uv));
  else 
    gl_FragColor = dither8x8(gl_FragCoord.xy, texture2D(tex0, uv));

}`;