---
marp: true
# theme: marp-black-white
# theme: neobeam-oldenbeam
theme: rose-pine
paginate: true
math: katex
footer: Erik Fredericks | GPTP26
---

<style> @import url('./cis241.css'); </style>

# Every Map an Evolution, Every Room a Generation: Co-Evolution in a Procedurally-Generated Video Game 

Erik Fredericks, frederer@gvsu.edu
GPTP, June 4th, 2026

[https://efredericks.github.io](https://efredericks.github.io)

(Background gif: Binding of Isaac)

![bg cover opacity:0.2 (looping perlin noise)](https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUyYzF0d3QwYnpwMGE0dHU0d3dmeGE5NGE1N2EzOTFzM2swYzhnY3dmciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/idcipQ8abT4hq/giphy.gif)
<!-- ![bg cover opacity:0.2 (looping perlin noise)](https://necessarydisorder.wordpress.com/wp-content/uploads/2017/11/agif3opt.gif) -->

![bottom-corner w:200 (website qr code)](img/qrcode_efredericks.github.io.png)

---

# Premise

<!-- _footer: . -->
![bg right (nethack)](https://upload.wikimedia.org/wikipedia/commons/0/00/Nethack_releasing_a_djinni.png)

Create a fully-evolved two-dimensional rogue/lite/ game

All aspects of procedural content generation (PCG) managed by genetic programming (GP)

  - Map creation
  - Entity placement
  - Enemy AI control


<!-- background intentional - not a traditional roguelike (though that would be fun too) -->

---

# Status 

<!-- _footer: . -->
![bg right (nethack)](https://upload.wikimedia.org/wikipedia/commons/0/00/Nethack_releasing_a_djinni.png)

One GP active and one in progress
- Dungeon generation (functioning, optimization required)
- Enemy AI programming (hooks in place)
- GP co-evolution in progress

<!-- background intentional - not a traditional roguelike (though that would be fun too) -->

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

![bg w:500 (sunless skies)](img/sunless_skies.jpeg)

![bg  w:500](https://img.itch.zone/aW1hZ2UvMjg3NjgvNjcwOTk1LnBuZw==/original/tg4IqL.png)
![bg w:500](https://api.arcade.academy/en/2.6.17/_images/use_tileset.png)

<!-- 
procedural content generation 
2d tilemaps
entities with tree/list behaviors
state machines
-->


<!-- _footer: . -->

---

<!-- # Examples! -->

![bg (noita)](img/noita-map.png)
![bg (boi)](https://d3kjluh73b9h9o.cloudfront.net/optimized/3X/6/0/60a6fc5ce76e78c2226541bb949e9e7b6bc73b71_2_690x391.jpeg)

---

# Procedural Content Generation 

What is PCG?
- Algorithmically-placing and generating content [hendrikx,shaker]

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

# Optimizing PCG

Algorithms exist to be optimized

---

# For example - Perlin noise []

<!-- _footer: . -->

<!-- Typically, returns a value in [-1.0, 1.0] (p5js uses [0.0, 1.0]) -->

For example (in p5):

`let n = noise(x * 0.01, y * 0.01);`

- `n = [0.0, 0.5] -- (x, y) -> water`
- `n = (0.5, 0.6] -- (x, y) -> beach`
<!-- - `n = (0.6, 0.9] -- (x, y) -> grass`
- `n = (0.9, 1.0] -- (x, y) -> rock` -->

There are other noise functions!  Worley noise, Simplex noise, etc.

## Noise function mappings:
- Environment biome
- Map height
- Enemy spawns

![bg cover (minecraft) opacity:0.2](https://minecraft.wiki/images/thumb/Overworld_1.18.png/600px-Overworld_1.18.png?9499d)

---

# Prior Art

There has been a *lot* done with PCG and evolutionary computation

- Cooke *et al*. explored co-evolution for game generators []

- Stanley *et al*.

---

# Workflow

![bg right fit (flow chart)](img/gptp-flow.drawio.png)

---

# Genome

1. **Individual room layouts**
- 2D grid of characters to represent obstacles, painful obstacles, items, and enemies

2. **Enemy programs** (tied to entities in room)
- List of actions to be executed in order

---


# Fitness Functions

fitness = layout_score - difficulty_penalty

layout_score = 
ratio of obstacles [0.1, 0.25]%
ratio of pain obstacles [0.03, 0.15]
ratio of open cells [0.5, 1.0]
ratio of obstacles in center [0, 3]
diversity of enemy program

# shape of room
maximize connectivity 
score chokepoints
score clustering
score symmetry




difficulty_penalty = difficulty_score - target_difficulty
difficulty_score = estimate_difficulty()

<pre>func estimate_difficulty() -> float:
  var d = 0.0
  d += score_difficulty_space()           * 0.25
  d += score_difficulty_hazards()         * 0.15
  d += score_difficulty_chokepoints()     * 0.20
  d += score_difficulty_aggression()      * 0.25
  d += score_difficulty_complexity()      * 0.10
  d += score_difficulty_center_pressure() * 0.05
  return clampf(d, 0.0, 1.0)</pre>


---

# Sample Outputs (Room Generation)

<!-- ![bg w:400](img/gptp-screenshots/screen.36diff.png)
![bg w:400](img/gptp-screenshots/screen.45diff.png)
![bg w:400](img/gptp-screenshots/screen.50diff.png) -->

| | | |
| ----------- | ----------- | ---- |
| ![w:400](img/gptp-screenshots/screen.36diff.png) | ![w:400](img/gptp-screenshots/screen.45diff.png) | ![w:400](img/gptp-screenshots/screen.50diff.png)
| Difficulty: 0.36 | Difficulty: 0.45 | Difficulty: 0.50

---

# Sample Outputs (Enemy Program)

<strong>Enemy:</strong> <code class="small-code">WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,AIM,WAIT_20,FIRE_ONE</code>

<strong>Enemy:</strong> <code class="small-code">WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40</code>


<!-- _footer: . -->

---

# Next Steps

- Additional fitness functions that reward room symmetry

- Log metrics for incorporating in future runs
  - Not just all sandboxed runs

- Full empirical evaluation

<!-- potentially even a win condition -->

---

# Demo

The game is playable locally and in the browser
- Though, exiting just freezes the browser at the moment...
- Gameplay based on Zenva tutorial []


https://efredericks.github.io/gp-roguelite/

---

# References

<!-- _footer: . -->

<ul id="references">
<li>[] Cook, M., Colton, S., & Gow, J. (2016). The angelina videogame design system—part i. IEEE Transactions on Computational Intelligence and AI in Games, 9(2), 192-203.</li>
<li>[] Cook, M., Colton, S., & Gow, J. (2016). The angelina videogame design system—part ii. IEEE Transactions on Computational Intelligence and AI in Games, 9(3), 254-266.</li>
<li>[] Togelius, J., Champandard, A. J., Lanzi, P. L., Mateas, M., Paiva, A., Preuss, M., & Stanley, K. O. (2013). Procedural content generation: Goals, challenges and actionable steps.</li>
<li>[] Stanley, K. O., Bryant, B. D., & Miikkulainen, R. (2005). Real-time neuroevolution in the NERO video game. IEEE transactions on evolutionary computation, 9(6), 653-668.</li>
<li>[] Pugh, J. K., Soros, L. B., Frota, R., Negy, K., & Stanley, K. O. (2017, September). Major evolutionary transitions in the voxelbuild virtual sandbox game. In Artificial Life Conference Proceedings (pp. 553-560). One Rogers Street, Cambridge, MA 02142-1209, USA journals-info@ mit. edu: MIT Press.</li>
<li>[] Hastings, E. J., Guha, R. K., & Stanley, K. O. (2009). Automatic content generation in the galactic arms race video game. IEEE Transactions on Computational Intelligence and AI in Games, 1(4), 245-263.</li>
<li>[] Taylor, T., Bedau, M., Channon, A., Ackley, D., Banzhaf, W., Beslon, G., ... & Wiser, M. (2016). Open-ended evolution: Perspectives from the OEE workshop in York. Artificial life, 22(3), 408-423.</li>
<li>[] Hendrikx, M., Meijer, S., Van Der Velden, J., & Iosup, A. (2013). Procedural content generation for games: A survey. ACM Transactions on Multimedia Computing, Communications, and Applications (TOMM), 9(1), 1-22.</li>
<li>[] Shaker, N., Togelius, J., & Nelson, M. J. (2016). Procedural content generation in games.</li>
<li>[] Streasick, S., Fredericks, E., DeVries, B., & Woodring, I. (2025, June). Incorporating Multiple Self-Adaptive Agents in Games. In Proceedings of the 33rd ACM International Conference on the Foundations of Software Engineering (pp. 1469-1476).</li>
<li>[] Cai, Y., Miao, C., Tan, A. H., Shen, Z., & Li, B. (2009). Creating an immersive game world with evolutionary fuzzy cognitive maps. IEEE computer graphics and applications, 30(2), 58-70.</li>
<li>[] de Pontes, R. G., & Gomes, H. M. (2020, November). Evolutionary procedural content generation for an endless platform game. In 2020 19th Brazilian Symposium on Computer Games and Digital Entertainment (SBGames) (pp. 80-89). IEEE.</li>
<li>[] Zamorano López, M. D. M., Blasco, D., Cetina, C., & Sarro, F. (2025, April). Video game procedural content generation through software transplantation. In International Conference on Software Engineering: Software Engineering in Practice. IEEE/ACM.</li>
<li>[] Rollings, A. (2010). Fundamentals of game design.</li>
</ul>


---


---
---
---
---
---
---
---
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

