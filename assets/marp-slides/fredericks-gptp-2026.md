---
marp: true
# theme: marp-black-white
# theme: neobeam-oldenbeam
theme: rose-pine
paginate: true
math: katex
footer: Fredericks | W26 | GPTP26
---

<style> @import url('./cis241.css'); </style>

# Every Map an Evolution, Every Room a Generation: Co-Evolution in a Procedurally-Generated Video Game 

Erik Fredericks, frederer@gvsu.edu
Winter 2026

[https://efredericks.github.io](https://efredericks.github.io)

(Background image: [Etienne Jacob](https://necessarydisorder.wordpress.com/2017/11/15/drawing-from-noise-and-then-making-animated-loopy-gifs-from-there/))

![bg cover opacity:0.2 (looping perlin noise)](https://necessarydisorder.wordpress.com/wp-content/uploads/2017/11/agif3opt.gif)

![bottom-corner w:200 (website qr code)](img/qrcode_efredericks.github.io.png)

---

# Premise

Create a fully-evolved two-dimensional rogue**lite** game
- All aspects of procedural content generation (PCG) managed by genetic programming (GP)

![bg opacity:0.1 (nethack)](https://upload.wikimedia.org/wikipedia/commons/0/00/Nethack_releasing_a_djinni.png)

## Status

Basic co-evolution between 2 GPs
- Dungeon generation
- Enemy AI programming

<!-- background intentional - not a traditional roguelike (though that would be fun too) -->



---

# Procedural Content Generation 

What is PCG?
- Algorithmically-placing and generating content

Why PCG?
- Save the developer/designer time and effort!
  - One would think...

Goal for GP?
- Optimize for variety and difficulty in game experience
---

# Basic concept

Use math/algorithms to place content intelligently
- Dungeons, items, etc.

Noise functions:
- Calculate a noise value based on inputs and configurations
- Map that value to something useful

![bg cover (minecraft) opacity:0.2](https://minecraft.wiki/images/thumb/Overworld_1.18.png/600px-Overworld_1.18.png?9499d)


---

# For example - Perlin noise []

Typically, returns a value in [-1.0, 1.0] (p5js uses [0.0, 1.0])

For example (in p5):
`let n = noise(x * 0.01, y * 0.01);`

- `n = [0.0, 0.5] -- (x, y) -> water`
- `n = (0.5, 0.6] -- (x, y) -> beach`
- `n = (0.6, 0.9] -- (x, y) -> grass`
- `n = (0.9, 1.0] -- (x, y) -> rock`

There are other noise functions!  Worley noise, Simplex noise, etc.

---

![bg cover (minecraft) opacity:0.5](https://minecraft.wiki/images/thumb/Overworld_1.18.png/600px-Overworld_1.18.png?9499d)

# Noise function mappings:
- Environment biome
- Map height
- Enemy spawns


---

# Making a game map

&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;

![bg w:500 (lttp)](https://assetsio.gnwcdn.com/A-Link-to-the-Past-Map-Header1-05292020.jpg)

![bg w:500 (sunless skies)](https://i.imgur.com/wCPKOj1.jpg)

![bg  w:500](https://img.itch.zone/aW1hZ2UvMjg3NjgvNjcwOTk1LnBuZw==/original/tg4IqL.png)
![bg w:500](https://api.arcade.academy/en/2.6.17/_images/use_tileset.png)


<!-- _footer: . -->

---

<!-- # Examples! -->

![bg (noita)](img/noita-map.png)
![bg (boi)](https://d3kjluh73b9h9o.cloudfront.net/optimized/3X/6/0/60a6fc5ce76e78c2226541bb949e9e7b6bc73b71_2_690x391.jpeg)

---

# Fitness Functions

---

---

# Next Steps


---

# References

---


---

# Demo time

<div class="callout-dark" style="background:#333"><a href="https://tinyurl.com/24c9sftw">https://tinyurl.com/24c9sftw</a></div>


This time I made a pre-baked p5js template for you.  Go to this link and `File -> Duplicate`
- Make sure you login and save often

## The sketch

- You should have a little ASCII happy face that you can move around with your arrow keys
- Your game map is represented as a **two-dimensional grid** where the first index is the row and the second index is the column
- There is also a basic camera that follows your player so that we can make big maps

<!-- _footer: . -->

---

# The map

```js
[['#', '#', '#', ..., '#'],
 ['#', ' ', ' ', ..., '#'],
 ['#', '.', 't', ..., '#'],
 [...],
 ['#', '#', '#', ..., '#']]
```

`game_map[2][1]` returns a ???
* `.`

By default, the map puts walls on the outside and nothing on the inside - your job is to fill it with things

---

# Valid things:

| Character | Walkable? | Represents |
| ----------- | ----------- | ---- |
| `#` | No | Stone wall
| `t` | No | Tree
| `w` | No | Water
| ` ` | Yes | Empty space
| `.` | Yes | Pebbles
| `g` | Yes | Grass

Try setting some random cells to these characters!
- such as, `game_map[2][3] = 'g';` in `setup()` AFTER the game map is created

![bottom-right (keanuuu)](https://images.squarespace-cdn.com/content/v1/5f960514ad64315671f581a2/1616704085936-WQ1CKH7U0ZDLUC0HA0PI/Do+it+now.gif)

<div class="callout">Try hitting <code>~</code> and see what happens!</div>

<!-- _footer: . -->

---

# First, let's randomize things

After the call to `setupGameMap()` (which again, just gives us an empty grid with borders)

```js
for (let r = 1; r < num_rows - 1; r++) {
  for (let c = 1; c < num_cols - 1; c++) {
    let r = random();
    let ch = ' ';
    if (r > 0.8) ch = '#';

    game_map[r][c] = ch;
  }
}
```

<div class="callout">Is this something interesting?</div>

---

# Now let's give it a bit of detail 

First, comment out what you did inside that double loop.

```js
const zoom = 0.01;
for (let r = 1; r < num_rows - 1; r++) {
  for (let c = 1; c < num_cols - 1; c++) {
    let ch = ' ';
    let n = noise(c * zoom, r * zoom);


    // fill in with code from next slide


    game_map[r][c] = ch;
  }
}
```
<!-- _footer: . -->

---

# The noise bit

```js
if (n <= 0.5) ch = 'w';
else if (n <= 0.6) ch = 'b';
else if (n <= 0.9) ch = 't';
else {
  let r = random();
  if (r > 0.8) ch = '.';
  else ch = ' ';
}
```

---

# The finesse bit

Now this is the tricky part - you need to play with the `zoom` value and the `noiseDetail` (at the top) values to get exactly the output you want!

Try varying the:

- `zoom` into the noise distribution (try `0.1`, `0.001`, etc.)
- [https://p5js.org/reference/p5/noiseDetail/](https://p5js.org/reference/p5/noiseDetail/)
    - The number of octaves (first parameter in `noiseDetail`) - `[1, 16]` usually show interesting values
    - The falloff amount (second parameter in `noiseDetail`) - `[0.0, 1.0]`

---

# Other ways to do it!

Use a different algorithm!
- Rectangular room placement
- Cellular automata
- Wave function collapse
- ...

![bg right (wfc)](https://bfnightly.bracketproductions.com/c33-s8.gif)

