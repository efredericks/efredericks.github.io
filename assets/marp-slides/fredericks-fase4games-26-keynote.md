---
marp: true
# theme: marp-black-white
# theme: neobeam-oldenbeam
theme: rose-pine
paginate: true
math: katex
footer: Fredericks | FaSE4Games'26 Keynote | Esoteric Software Engineering for Games
---

<!-- 40+20 -->

<style> @import url('./cis241.css'); </style>

<!-- Description: Uncertainty can impact games given the numerous uncertainties involved, from supporting a wide range of hardware architectures and interfaces to managing unexpected human interactions.  The failure of systems in gaming due to uncertainty, whether a hard crash or a performance slowdown, can lead to player frustration and disengagement.  In this talk I will discuss approaches that my lab has explored for both discovering and managing uncertainty from a software engineering perspective that can be applied to games, from requirements monitoring at run time to search-based fuzz testing.  I'll also cover its applications in other domains such as safety-critical systems and algorithmic art to demonstrate the domain-independence of these techniques.  I'll end with a discussion of potential future directions that can be explored in the context of uncertainty and game development. -->

<!-- # Bridging Esoteric Software Engineering Practices to the Video Games Domain -->
<!-- # Opportunities for Esoteric Software Engineering Practices in Games -->
# Opportunities for Esoteric Software Engineering Practices for Managing Uncertainty in Games

### FaSE4Games Keynote (07/05/2026)

Erik Fredericks, frederer@gvsu.edu

> [https://efredericks.github.io](https://efredericks.github.io)


<!-- ![bg cover opacity:0.2 (looping perlin noise)](https://necessarydisorder.wordpress.com/wp-content/uploads/2017/11/agif3opt.gif) -->

![bottom-corner w:200 (website qr code)](img/qrcode_efredericks.github.io.png)

---

<!-- _footer: . -->

# Acknowledgements 

<div class="container">
<div class="col">
<b>Current/Former Students</b>
<p>(Too many to list, but most recently)</p>
<ul>
<li>Abigail Diller</li>
<li>Steven Streasick</li>
<li>Mallory Jacobs</li>
<li>Skyler Burden</li>
<li>Cameron Schneider</li>
<li>Andrew Goodling</li>
<li>Astha Thapa</li>
<li>...and more!</li>
</ul>
</div>
<div class="col-mid">
<b>Collaborators and Mentors</b>
<ul>
<li>Byron DeVries</li>
<li>Jared Moore</li>
<li>Ira Woodring</li>
<li>Betty H. C. Cheng</li>
<li>Austin Ferguson</li>
<li>Alex Lalejini</li>
</ul>
</div>
<div class="col-right">
<b>Sponsors</b>
<ul>
<li>Grand Valley State University</li>
<li>Michigan Space Grant Consortium</li>
<li>National Science Foundation</li>
</ul>
</div>
</div>

<!-- primarily undergrad institution -->

---

# What is the purpose of this keynote?

Dealing with **uncertainty** and its insidious impacts on software systems

More specifically?
- Causing requirements violations
- Inducing performance slowdowns
- Crashes!

![bg cover opacity:0.3 (an angry user)](img/pexels-vantik93-16876741.jpg)


<!-- _footer: Photo by Михаил Крамор from Pexels: https://www.pexels.com/photo/angry-girl-sitting-at-desk-in-classroom-16876741/ -->

---

# Why is this interesting to you specifically?

I'm not pitching you a career's worth of work but rather opportunities for future work
- And things I find interesting anyway

What we'll be talking about :

- Recognizing and quantifying uncertainty
- Techniques for managing uncertainty
- Potential future options in this area 

---

# Who am I?

<!-- _footer: (**crowning achievement) -->

- Until recently, a person who has focused on managing uncertainty in safety-critical systems with search-based software engineering 

  - Safety-critical systems [] / robotics [] 
  - Self-adaptive systems []

- And then:

  - Algorithmic art []
  - Procedural content generation []
  - SIGBOVIK contributor [] **
  
---

# What is uncertainty?

Uncertainty is:

- Insidious
- Difficult to quantify
- Difficult to *recognize*

Uncertainty causes your software to react/behave in ways unintended
- This should worry you as a software engineer!

<!--
- Robots crash and people die
- Video games crash and people trash your game online
-->

![bg cover opacity:0.3 (a question mark)](img/pexels-filirovska-4913769.jpg)

<!-- _footer: Photo by Julia Filirovska from Pexels: https://www.pexels.com/photo/misted-window-with-question-mark-4913769/ -->

---

# Consider...

You are programming a robot

<div class="container">
  <div class="col">
    <ul>
      <li>A camera lens gets scratched</li>
      <li>A sensor gets bumped and becomes misaligned</li>
      <li>A typo is entered into a config file</li>
    </ul>
    <b>How does that impact the robot's goals?</b>
  </div>

  <div class="col-right">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/svovLytCkMw?si=GbgPbsBMpvcl0JiJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
</div>

<!-- 
what is the uncertainty here?
-->


---

# Defining uncertainty

Interestingly, there are a plethora of ways to describe uncertainty depending on your domain.  I fall in the []:

| **Type** | **Description** | 
| ----------- | ----------- | 
| **Known known** | We **know** the source **and** how much impact it will have |
| **Unknown known** | We **don't know** the source but do **know** its impact |
| **Known Unknown** | We **know** the source but **don't know** its impact |
| **Unknown unknown** | We **don't know** the source and **don't know** its impact |

Or, **aleatory** (inherent randomness/noise) and **epistemic** (lack of knowledge) uncertainties []

<!-- _footer: . -->
<!-- could also go the aleatory (inherent randomness/noise) and epistemic (lack of knowledge) route as well -->

---

# Defining uncertainty

<!-- _footer: . -->

<div class="container">
<div class="col">
<p>This leads us to identifying the:</p>
<ul>
<li><strong>Sources of uncertainty</strong></li>
<li><strong>Impact of uncertainty</strong></li>
</ul>
</div>
<div class="col">
<img alt="Sources of uncertainty" src="img/fase4games-keynote/ragnarok-sources.png" />
<p class="reference">Genome for remote data mirroring application with Ragnarok genetic algorithm []</p>
</div>
</div>


It is <mark>humanly impossible</mark> to enumerate all possible combinations of each



<!--
can we find the most impactful or put the system into a good enough state
-->

---

<!-- _footer: . -->

# Examples of uncertainty

Safety-critical systems
- Unexpected weather
- Human interaction
- System misconfiguration

Video games
- Network issues (also works for above)
- Human interaction
- System misconfiguration

![top-right w:300 (roomba cat)](https://media.tenor.com/BXaKWj76ZScAAAAM/cat-cats.gif)


*Formal methods for quantification exist as well via probability analysis, statistical modeling, etc.* [Uncertainty Quantification, Soize]

---

# How can we handle it from a software engineering perspective?

- Run-time monitoring **
- Verification and validation []
- Machine learning []
- Agentic monitors [SELAUR: Self Evolving LLM Agent via Uncertainty-aware Rewards, https://arxiv.org/pdf/2606.03662]

---

# Software engineering and uncertainty

<!-- _footer: . -->

Generating and monitoring problems:

- Robot with random sensor failures/degradations
- Remote data mirroring with severed links

Experiencing:

- Unsatisfied requirements
- Violated invariants
- Poor performance

![bottom-corner (drone scatter plot) w:350](img/fase4games-keynote/drone-scatter.png)

<div style="z-index:99 !important; background-color:#eee !important; position:absolute !important; bottom: 20px !important; right: 70px !important; font-size: 0.9rem !important">Scatter plot of drone position over multiple runs []</div>

<!-- plot of drone position over multiple runs. green is success. uncertainty is the environmet layout -->
---

# Software engineering and uncertainty - How do we know?

<!-- _footer: Background photo by Mahoney Fotos from Pexels: https://www.pexels.com/photo/close-up-of-tree-logs-lying-in-a-forest-20442681/ -->

![bg cover opacity:0.1 (https://www.pexels.com/photo/close-up-of-tree-logs-lying-in-a-forest-20442681/)](img/pexels-mahoneyfotos-20442681.logs.jpg)

Post-analysis with logs, but *often performed prior to release*
- Logs can get <mark>big</mark>

<hr size="1" />

Run-time monitoring - though incurs additional overhead 

*Lightweight* satisfaction monitoring *at run time* -- utility functions []
- **Satisfaction**: requirement or goal's performance is *acceptable*
- Derive mathematical functions for each requirement/goal to assess performance


---

# Utility functions

<!-- _footer: . -->

$Goal_a$: [Maintain] >= 30\% $battery_{perc}$
<!-- $util_{a}$ = $1.0~if~battery_{perc}~>=~30\%~else~0.0$ -->
$$
util_{a} = \begin{cases} 
    1.0 & \text{if } battery_{perc} \ge 30\% \\
    0.0 & \text{else} 
\end{cases} 
$$

<hr size="1" />

$R_1$: At least 60% of the walkable areas of game map must be accessible.

$$
util_{R1} = \begin{cases} 
    \frac{x - 0.6}{0.4} & \text{if } |cells_{walkable}| \ge |cells| * 0.6 \\
    0.0 & \text{else} 
\end{cases} 
$$


<hr size="1" />

Normalize on [0.0, 1.0] - 0.0 is a <span style="color:red !important">violation</span>, 1.0 is <span style="color:green !important">satisfaction</span>, (0.0, 1.0) is *degree of satisfaction*

<!-- can be used to make decisions -->


---

# Fuzzy logic to support flexibility

<!-- _footer: . -->

Typical requirements are **brittle**
- No room to tolerate *transient* failures

**Consider**: 
<div class="container" style="background:#eee !important; border: 1px solid #000 !important; margin-bottom: 0.5em !important">
<div class="col" style="border-right: 1px solid #000 !important">
[Maintain] >= 30% battery 
</div>
<div class="col">
[Achieve] >= 30% +/- 5% battery
</div>
</div>

KAOS goal notation [] -- 
- [Maintain] is an invariant
- [Achieve] is a non-invariant

---

# RELAX specification language []

<!-- _footer: . -->

Introduce fuzzy-logic membership functions to requirements that can be *temporarily* unsatisfied
- E.g., return to charging station when battery percentage is `AS CLOSE AS POSSIBLE TO` 30% (triangle)

<div style="text-align:center !important">
  <img width=700 src="img/fase4games-keynote/autorelax.png" /> <br />
  Encoding a candidate solution in AutoRELAX (left shoulder) [ramirez2012]
</div>

<!-- left shoulder : as few as possible -->

---


# Search-based software engineering (SSBSE)


background
will show sbst/ragnarok/valkyrie later

---

# An SSBSE example (self-adaptive systems)

1. Breaking the system
2. Fixing the system

### Utility functions 

- Fitness calculations

---

<div class="over-img">
<h1 style="text-align: center !important">Leaving the safety-critical space</h1>
</div>

![bg (generative-gi 1)](https://efredericks.github.io/assets/img/GenerativeGI/random/img-22.png)
![bg (generative-gi 2)](https://efredericks.github.io/assets/img/GenerativeGI/no-clear-single/img-10051.png)
![bg (generative-gi 3)](https://efredericks.github.io/assets/img/GenerativeGI/clear-lexicase/img-10096-1.png)

<!-- _footer:. -->

---

# GenerativeGI []

Using evolutionary computation and software engineering to create glitch art

- Many-objective search with Lexicase selection

- Fitness proxies for aesthetic preference
 
  - Maximizing pixel differences in images
  - Maximizing negative space
  - Maximizing diversity of drawing techniques
  - ...

<!--
* learned that pixel differences are useless
* move to ML
-->

---


# Uncertainty in the art space

*Wasn't the focus of the work, however...*

<div class="container">
<div class="col">
<ul>
<li>Use of external libraries</li>
  <ul>
  <li>E.g., <code>pixel-sort</code>, <code>scikit-learn</code> libraries</li>
  </ul>
<li>Architecture differences between machines</li>
<li>Fitness measures</li>
</ul>
</div>
<div class="col">
fitness fxn
</div>
</div>

<!-- translates nicely to games domain -->

  

---

# Contextualizing for games

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
&nbsp;

<!-- # Examples! -->

![bg opacity:0.5 (noita)](img/noita-map.png)
![bg opacity:0.5 (boi)](https://d3kjluh73b9h9o.cloudfront.net/optimized/3X/6/0/60a6fc5ce76e78c2226541bb949e9e7b6bc73b71_2_690x391.jpeg)

<!-- _footer: . -->

---

# Requirements monitoring

Leverage software sensors to monitor performance

<div class="over-img">
<h3 style="padding:1em !important">
We spent all that time deriving requirements and design documents, we might as well keep using them!
</h3>
</div>

---

# What are some good things to monitor?

1. Could consider *all* requirements
- May be cost prohibitive (memory, time, etc.) 

2. Identify requirements that can be used for run-time adjustments
- Or self-adaptation...


---

# Consider: software testing 

## Or, things we *should* be doing already

- Unit/integration/regression/system/acceptance/.../ testing

Are those one-off tests or can we re-use them?
- Much like requirements specs, test specs are great targets for run-time reuse
  - Especially if you consider that run-time uncertainty *might* get caught by those artifacts

---

# Software testing (esoteric) 

<!-- promised you esoteric in the title -->

Search-based fuzz testing 

Mutation testing

---

# RELAXation as a target for evolution

(gif of p5 scene)

---

# Genetic improvement []

Automatically optimizing a program
- Source code (code transplantation) []
- Behavior trees
- Stack-based opcodes

(image of code patch)

![bg right w:450](img/gptp-screenshots/bt.png)

---

### Sample outputs (enemy program opcodes) []

<strong>Enemy:</strong> <code class="small-code">WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,AIM,WAIT_20,FIRE_ONE</code>

<strong>Enemy:</strong> <code class="small-code">WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,AIM,WAIT_20,FIRE_ONE,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_8,FIRE_ALL,WAIT_40,WAIT_20,RADIAL_4,FIRE_ALL,WAIT_40</code>


<!-- _footer: . -->
<!-- lovely example of GP bloat -->

---

### Sample outputs (room generation) []

| | | |
| ----------- | ----------- | ---- |
| ![w:400](img/gptp-screenshots/screen.36diff.png) | ![w:400](img/gptp-screenshots/screen.45diff.png) | ![w:400](img/gptp-screenshots/screen.50diff.png)
| Difficulty: 0.36 | Difficulty: 0.45 | Difficulty: 0.50

---

---

# Future areas 

where can we go from here img

Focusing on the SE areas of improvement:

- Leverage run-time monitors for adapting to gameplay and/or performance metrics
  - E.g., Shadow of Mordor antagonists, tweak performance envelope for different machine specs

- The third thing that is second!

- Agentic monitors for continuous improvement
  - E.g., mimic players to catch latent bugs
    - Though, keep them out of the creative space

---

# Discussion



---

# A pitch!

![bg opacity:0.1 (Schloss Dagstuhl)](https://www.dagstuhl.de/_Resources/Persistent/d/b/9/2/db92ac4a61b2c6a364b7b0d8ef618dc5ad8819cd/_01_DSC00749_1_Didas%20KopieDG1.jpg)

I am currently working on a Dagstuhl seminar proposal.  If you would like to be included as a participant, please fill out the survey here!

(QR code)

---

# Thank you!

![bg opacity:0.1 (thank you)](img/pexels-towfiqu-barbhuiya-3440682-11341894.jpg)

<!-- _footer:Photo by Towfiqu barbhuiya from Pexels: https://www.pexels.com/photo/cursive-text-on-a-paper-11341894/ -->

---

# References

[] Goodling, A. and Schneider, C. and Fredericks, E. M. and Hariri, R. Antagonistic Development via Intentional Software Churn. To Appear in the Proceedings of the 2026 ASEE National Conference.

---

# But first, **how** do we make a game map?

![bg left w:500 (lttp)](https://assetsio.gnwcdn.com/A-Link-to-the-Past-Map-Header1-05292020.jpg)

![bg left w:500 (sunless skies)](img/sunless_skies.jpeg)

(and, what does the data structure look like?)

<!-- _footer: . -->

---

# Any reason for not doing it by hand?

![bg left w:500](https://img.itch.zone/aW1hZ2UvMjg3NjgvNjcwOTk1LnBuZw==/original/tg4IqL.png)
![bg right w:500](https://api.arcade.academy/en/2.6.17/_images/use_tileset.png)

---

<!-- # Examples! -->

![bg (noita)](img/noita-map.png)
![bg (boi)](https://d3kjluh73b9h9o.cloudfront.net/optimized/3X/6/0/60a6fc5ce76e78c2226541bb949e9e7b6bc73b71_2_690x391.jpeg)

---

# Procedural Content Generation (PCG)

What is PCG?
- Algorithmically-placing content!

Why is PCG?
- Save the developer/designer time and effort!
  - One would think...

Why bother talking about this?
- I recently sent out a paper on it and thought you might find it interesting
- Plus, useful for gamejam things

---

# Basic concept

Use math/algorithms to place content intelligently
- Dungeons, items, etc.

Noise functions:
- Calculate a noise value based on inputs and configurations
- Your job is to map that value to something useful

![bg cover (minecraft) opacity:0.2](https://minecraft.wiki/images/thumb/Overworld_1.18.png/600px-Overworld_1.18.png?9499d)


---

# For example - Perlin noise

Typically, returns a value in [-1.0, 1.0], though p5js uses [0.0, 1.0]

For example (in p5):
`let n = noise(x * 0.01, y * 0.01);`

- `n = [0.0, 0.5] -- (x, y) -> water`
- `n = (0.5, 0.6] -- (x, y) -> beach`
- `n = (0.6, 0.9] -- (x, y) -> grass`
- `n = (0.9, 1.0] -- (x, y) -> rock`

You do *effectively* the same in any language/editor!

There are other noise functions!  Worley noise, Simplex noise, etc.

---

# How does noise generate this?

![bg cover (minecraft) opacity:0.5](https://minecraft.wiki/images/thumb/Overworld_1.18.png/600px-Overworld_1.18.png?9499d)

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
- **Wave function collapse** ->
- ...

![bg right (wfc)](https://bfnightly.bracketproductions.com/c33-s8.gif)

> There's a cellular automata implementation in the demo - instead of building your map in `setup` try calling `game_map = CA();`