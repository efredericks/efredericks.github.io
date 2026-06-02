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

<!-- _footer: Background gif: Binding of Isaac -->

![bg cover opacity:0.4 (binding of isaac)](https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUyYzF0d3QwYnpwMGE0dHU0d3dmeGE5NGE1N2EzOTFzM2swYzhnY3dmciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/idcipQ8abT4hq/giphy.gif)
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


<!-- 
- background intentional - not a traditional roguelike (though that would be fun too) 
- created as part of a game jam at GVSU
-->

---

# Status 

<!-- _footer: . -->
![bg right (screenshot)](img/gptp-screenshots/screen.45diff.png)

One GP active and one in progress
- Dungeon generation (functioning, optimization required)
- Enemy AI programming (hooks in place)
- GP co-evolution in progress

<!-- background intentional - not a traditional roguelike (though that would be fun too) -->

---

# Why - making a game map/environment

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

<!--
LttP: hand-crafted
Sunless Skies: hand-crafted with procedural elements
-->
---

# Why - making a game map/environment

<div class="container">
<div class="col">
<img alt="tiled" src="https://api.arcade.academy/en/2.6.17/_images/use_tileset.png">
</div>
<div class="col">
<img alt="behavior tree" src="img/gptp-screenshots/bt.png" />
</div>
</div>

<!-- 
procedural content generation 
2d tilemaps
entities with tree/list behaviors
state machines
-->

<!-- _footer: . -->

---


# Procedural content generation 

What is PCG?
- Algorithmically-placing and generating content [8,9,11,12,13,14]

Why PCG?
- Save the developer/designer time and effort!
  - One would think...

Goal for GP?
- Optimize for variety and difficulty in game experience

---

# Optimizing PCG

PCG is typically **parameterized**

Things we can optimize (via GP/EC) [7,11,12,13]:
- Ideal/diverse enemy behaviors 
  - Behavior trees or programs
    - E.g., `[Move towards player`, `queue a bullet pattern`, `fire`, `wait 10 seconds`, `repeat]`

- Variety in environments
  - Obstacle/tile placement 
    - E.g., `#.t.$e` represents `wall`, `space`, `gold`, `enemy`
      - Represented as 2D/3D grid, graph, etc.

<!--
- which bullet pattern, how fast, etc.
-->
---

# Prior art

There has been a *lot* done with PCG and evolutionary computation

- Cooke *et al*. explored co-evolution for game generators [1,2]

- Stanley *et al*. used neuroevolution in games to train entities, generate environments, etc. [3,4,5,6]

- When game entities are considered agents, all kinds of interesting related work comes into play (planning in supervenience, Avida, etc.) [16,17,18]

<!-- In philosophy, supervenience refers to a relation between sets of properties or sets of facts. X is said to supervene on Y if and only if some difference in Y is necessary for any difference in X to be possible. (https://en.wikipedia.org/wiki/Supervenience) -->

---

# Workflow

![bg right fit (flow chart)](img/gptp-flow.drawio.png)

---

# Genome

1. **Individual room layouts**
- 2D grid of characters to represent obstacles, painful obstacles, items, and enemies
- Room connections *currently* unoptimized

2. **Enemy programs** (tied to entities in room)
- List of actions to be executed in order
- Physics parameters (e.g., bullet speed, enemy acceleration, sensing radius)

---


# Fitness functions

<!-- _footer: . -->

$\underline{fitness = score_{layout} - penalty_{difficulty}}$


<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div style="border-right: 1px solid #ccc; padding: 1.5rem">

$$
\begin{aligned}
score_{layout} &= ratio_{obstacles} &* w_1\\ 
&+ ratio_{pain~obstacles} &* w_2 \\ 
&+ ratio_{open~cells} &* w_3 \\
&+ number_{center~obstacles} &* w_4 \\
&+ diversity_{enemy~program~} &* w_5 \\
&+ connectivity_{room} &* w_6 \\
&+ chokepoints_{room} &* w_7 \\
&+ clustering_{room} &* w_8 \\
&+ symmetry_{room} &* w_9 
\end{aligned}
$$

</div>
<div>

$$
\begin{aligned}
penalty_{difficulty} &= score_{difficulty} - target_{difficulty} & \\
{}\\
score_{difficulty} &= score_{space}  &* w_{10} \\ 
&+ score_{hazards}  &* w_{11} \\
&+ score_{chokepoints}  &* w_{12} \\
&+ score_{aggression}  &* w_{13} \\
&+ score_{complexity}  &* w_{14} \\
&+ score_{center~pressure}  &* w_{15}
\end{aligned}
$$

<br />

$target_{difficulty}$ increased per floor
</div>
</div>


<!-- $layout_score = 
ratio of obstacles [0.1, 0.25]%
ratio of pain obstacles [0.03, 0.15]
ratio of open cells [0.5, 1.0]
ratio of obstacles in center [0, 3]
diversity of enemy program$


## shape of room
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
  return clampf(d, 0.0, 1.0)</pre> -->


---

# Sample outputs (room generation)

<!-- ![bg w:400](img/gptp-screenshots/screen.36diff.png)
![bg w:400](img/gptp-screenshots/screen.45diff.png)
![bg w:400](img/gptp-screenshots/screen.50diff.png) -->

| | | |
| ----------- | ----------- | ---- |
| ![w:400](img/gptp-screenshots/screen.36diff.png) | ![w:400](img/gptp-screenshots/screen.45diff.png) | ![w:400](img/gptp-screenshots/screen.50diff.png)
| Difficulty: 0.36 | Difficulty: 0.45 | Difficulty: 0.50

---

# Sample outputs (enemy program)

<strong>Enemy:</strong> <code class="small-code">WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,AIM,WAIT_20,FIRE_ONE</code>

<strong>Enemy:</strong> <code class="small-code">WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40</code>


<!-- _footer: . -->

---

# Next steps

<style scoped>
  li {
    margin-bottom: 0.5rem;
  }
</style>

<!-- _footer: . -->

<div class="container">
<div class="col">
<ul>
<li>Update genome with feedback from gameplay in <b>current</b> room to impact <b>next</b> room</li>
<ul><li>E.g., finished quick with no health lost?  Next room is harder</li></ul>
<li>Additional fitness functions that reward room symmetry</li>
<li>Log metrics for incorporating in future runs</li>
<ul><li>Not just all sandboxed runs</li></ul>
<li>Full empirical evaluation</li>
</ul>
</div>
<div class="col">
<img src="img/evoworld.gif" alt="evoworld demo" />
<p align="center"><b>Ideal goal</b>: Larger map worlds</p>

</div>
</div>




<!-- ![bg right (evoworld gif)](img/evoworld.gif) -->
<!-- 
- potentially even a win condition 
- 500x500 grid - things are slow
-->

---

# Demo

The game is playable locally and in the browser
- Though, exiting just freezes the browser at the moment...
  -  (works fine in local builds)
- Gameplay based on Zenva tutorial [15]

&nbsp;
&nbsp;

https://efredericks.github.io/gp-roguelite/

---

# References

<!-- _footer: . -->

<ul id="references">
<li>[1] Cook, M., Colton, S., & Gow, J. (2016). The angelina videogame design system—part i. IEEE Transactions on Computational Intelligence and AI in Games, 9(2), 192-203.</li>
<li>[2] Cook, M., Colton, S., & Gow, J. (2016). The angelina videogame design system—part ii. IEEE Transactions on Computational Intelligence and AI in Games, 9(3), 254-266.</li>
<li>[3] Togelius, J., Champandard, A. J., Lanzi, P. L., Mateas, M., Paiva, A., Preuss, M., & Stanley, K. O. (2013). Procedural content generation: Goals, challenges and actionable steps.</li>
<li>[4] Stanley, K. O., Bryant, B. D., & Miikkulainen, R. (2005). Real-time neuroevolution in the NERO video game. IEEE transactions on evolutionary computation, 9(6), 653-668.</li>
<li>[5] Pugh, J. K., Soros, L. B., Frota, R., Negy, K., & Stanley, K. O. (2017, September). Major evolutionary transitions in the voxelbuild virtual sandbox game. In Artificial Life Conference Proceedings (pp. 553-560). One Rogers Street, Cambridge, MA 02142-1209, USA journals-info@ mit. edu: MIT Press.</li>
<li>[6] Hastings, E. J., Guha, R. K., & Stanley, K. O. (2009). Automatic content generation in the galactic arms race video game. IEEE Transactions on Computational Intelligence and AI in Games, 1(4), 245-263.</li>
<li>[7] Taylor, T., Bedau, M., Channon, A., Ackley, D., Banzhaf, W., Beslon, G., ... & Wiser, M. (2016). Open-ended evolution: Perspectives from the OEE workshop in York. Artificial life, 22(3), 408-423.</li>
<li>[8] Hendrikx, M., Meijer, S., Van Der Velden, J., & Iosup, A. (2013). Procedural content generation for games: A survey. ACM Transactions on Multimedia Computing, Communications, and Applications (TOMM), 9(1), 1-22.</li>
<li>[9] Shaker, N., Togelius, J., & Nelson, M. J. (2016). Procedural content generation in games.</li>
</ul>

---

# References

<!-- _footer: . -->

<ul id="references">
<li>[10] Streasick, S., Fredericks, E., DeVries, B., & Woodring, I. (2025, June). Incorporating Multiple Self-Adaptive Agents in Games. In Proceedings of the 33rd ACM International Conference on the Foundations of Software Engineering (pp. 1469-1476).</li>
<li>[11] Cai, Y., Miao, C., Tan, A. H., Shen, Z., & Li, B. (2009). Creating an immersive game world with evolutionary fuzzy cognitive maps. IEEE computer graphics and applications, 30(2), 58-70.</li>
<li>[12] de Pontes, R. G., & Gomes, H. M. (2020, November). Evolutionary procedural content generation for an endless platform game. In 2020 19th Brazilian Symposium on Computer Games and Digital Entertainment (SBGames) (pp. 80-89). IEEE.</li>
<li>[13] Zamorano López, M. D. M., Blasco, D., Cetina, C., & Sarro, F. (2025, April). Video game procedural content generation through software transplantation. In International Conference on Software Engineering: Software Engineering in Practice. IEEE/ACM.</li>
<li>[14] Rollings, A. (2010). Fundamentals of game design.</li>
<li>[15] Zenva. (2026). Build a Complete Roguelike from Scratch with Godot. https://academy.zenva.com/course/godot-roguelike-course/</li>
<li>[16] Spector, L. A. (1992). Supervenience in dynamic-world planning. University of Maryland, College Park.</li>
<li>[17] Ofria, C., & Wilke, C. O. (2004). Avida: A software platform for research in computational evolutionary biology. Artificial life, 10(2), 191-229.</li>
<li>[18] Gigliotta, O., Miglino, O., Schembri, M., & Di Ferdinando, A. (2014). Building up serious games with an artificial life approach: Two case studies. In Evolution, complexity and artificial life (pp. 149-158). Berlin, Heidelberg: Springer Berlin Heidelberg.</li>
</ul>


---

![bg opacity:0.4 (thank you - https://www.pexels.com/photo/cursive-text-on-a-paper-11341894/)](img/pexels-towfiqu-barbhuiya-3440682-11341894.jpg)

---

---

# Backup slides

---

<!-- Examples! -->

![bg (noita)](img/noita-map.png)
![bg (boi)](https://d3kjluh73b9h9o.cloudfront.net/optimized/3X/6/0/60a6fc5ce76e78c2226541bb949e9e7b6bc73b71_2_690x391.jpeg)

<!--
BoI: room templates with PCG placement
-->
---


# PCG basic concept

Use math/algorithms to place content intelligently
- Dungeons, items, etc.

**Noise functions**:

- Calculate a noise value based on inputs and configurations
  - E.g., Perlin noise, Simplex noise,

- Map that value to something useful

![bg cover (minecraft) opacity:0.2](https://minecraft.wiki/images/thumb/Overworld_1.18.png/600px-Overworld_1.18.png?9499d)

---

# For example - Perlin noise

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