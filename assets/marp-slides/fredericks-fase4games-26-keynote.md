---
marp: true
# theme: marp-black-white
# theme: neobeam-oldenbeam
theme: rose-pine
paginate: true
math: katex
footer: Fredericks | FaSE4Games'26 Keynote | Esoteric Software Engineering for Games

style: |
  table tr:nth-child(even) {
    background-color: #cccccc;
  }
  table tr:nth-child(odd) {
    background-color: #ffffff;
  }
  table th {
    background-color: #cccccc;
  }
---

<!-- 40+20 -->

<style> @import url('./cis241.css'); </style>

<!-- Description: Uncertainty can impact games given the numerous uncertainties involved, from supporting a wide range of hardware architectures and interfaces to managing unexpected human interactions.  The failure of systems in gaming due to uncertainty, whether a hard crash or a performance slowdown, can lead to player frustration and disengagement.  In this talk I will discuss approaches that my lab has explored for both discovering and managing uncertainty from a software engineering perspective that can be applied to games, from requirements monitoring at run time to search-based fuzz testing.  I'll also cover its applications in other domains such as safety-critical systems and algorithmic art to demonstrate the domain-independence of these techniques.  I'll end with a discussion of potential future directions that can be explored in the context of uncertainty and game development. -->

<!-- # Bridging Esoteric Software Engineering Practices to the Video Games Domain -->
<!-- # Opportunities for Esoteric Software Engineering Practices in Games -->
# Opportunities for Esoteric Software Engineering Practices for Managing Uncertainty in Games

### FaSE4Games Keynote (07/06/2026)

Erik Fredericks, frederer@gvsu.edu

> [https://efredericks.github.io](https://efredericks.github.io)


<!-- ![bg cover opacity:0.2 (looping perlin noise)](https://necessarydisorder.wordpress.com/wp-content/uploads/2017/11/agif3opt.gif) -->

![bottom-corner w:200 (website qr code)](img/qrcode_efredericks.github.io.png)

---

<!-- _footer: . -->

<h1><mark>Acknowledgements</mark></h1>

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
- Inducing performance slowdowns
- Crashes!
- Causing requirements violations, test case failures, etc.

![bg cover opacity:0.3 (an angry user)](img/pexels-vantik93-16876741.jpg)


<!-- _footer: Photo by Михаил Крамор from Pexels: https://www.pexels.com/photo/angry-girl-sitting-at-desk-in-classroom-16876741/ -->

---

# Why is this interesting to you specifically?

<!-- I'm not pitching you a career's worth of work but rather opportunities for future work
- And things I find interesting anyway -->

What we'll be talking about :

- Recognizing and quantifying uncertainty
- Techniques for managing uncertainty
- Potential future options in this area 

Also:

- Things *I* find interesting, perhaps you will as well!

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

![bottom-corner w:200 (website qr code)](img/fase4games-keynote/qrcode_sigbovik.org.png)
  
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
- Deviates from your requirements!
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
or impact its reqs?  what do the people see?
-->


---

# Defining uncertainty

Interestingly, there are a plethora of ways to describe uncertainty depending on your domain [].

| **Type** | **Description** | 
| ----------- | ----------- | 
| **Known known** | We **know** the source **and** how much impact it will have |
| **Unknown known** | We **don't know** the source but do **know** its impact |
| **Known Unknown** | We **know** the source but **don't know** its impact |
| **Unknown unknown** | We **don't know** the source and **don't know** its impact |


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


It is <mark>humanly impossible</mark> to enumerate all possible combinations of each []



<!--
can we find the most impactful or put the system into a good enough state
-->

---

<!-- _footer: . -->

# Examples of uncertainty

Safety-critical systems
* Unexpected weather
* Human interaction
* System misconfiguration

Video games
* Network issues (also works for above)
* Human interaction
* System misconfiguration

![top-right w:300 (roomba cat)](https://media.tenor.com/BXaKWj76ZScAAAAM/cat-cats.gif)


*Formal methods for quantification exist as well via probability analysis, statistical modeling, etc.* [Uncertainty Quantification, Soize]

---

# How can we handle it from a software engineering perspective?

- Verification and validation []
- Machine learning [] and neuroevolution []
- Agentic monitors [SELAUR: Self Evolving LLM Agent via Uncertainty-aware Rewards, https://arxiv.org/pdf/2606.03662]

&nbsp;

- Search-based software engineering **
- Run-time monitoring **

---

# Software engineering and uncertainty

<!-- _footer: . -->

Monitoring for problems:

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

- *Lightweight* satisfaction monitoring *at run time* -- utility functions []
  - **Satisfaction**: requirement or goal's performance is *acceptable*
  - Derive mathematical functions for each requirement/goal to assess performance


---

# Utility functions []

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

# Adding flexibility

<!-- _footer: . -->

Typical requirements are **brittle**
- No room to tolerate *transient* failures

**Consider**: 
<div class="container" style="background:#eee !important; border: 1px solid #000 !important; margin-bottom: 0.5em !important">
<div class="col" style="border-right: 1px solid #000 !important">
[Maintain] >= 30% battery 
</div>
<div class="col">
[Achieve] >= 30% &plusmn; 5% battery
</div>
</div>

KAOS goal notation []:
- [Maintain] is an **invariant**
- [Achieve] is a **non-invariant** &rarr; *can temporarily tolerate failure!*

<!-- goal: higher level of abstraction -->

---

# KAOS goal example

<!-- _footer: . -->

<div style="text-align:center !important">
  <img width=800 src="img/fase4games-keynote/kaos.png" />
</div>

<p class="reference">KAOS goal model describing multi-agent system in game [Streasick].</p>

<!-- lots of maintains - brittle! -->
---

# RELAX specification language []

<!-- _footer: . -->

Introduce fuzzy-logic membership functions to requirements that can be *temporarily* unsatisfied
- E.g., return to charging station when battery percentage is `AS CLOSE AS POSSIBLE TO` 30% (triangle function)

<div style="text-align:center !important">
  <img width=700 src="img/fase4games-keynote/autorelax.png" />
</div>
<p class="reference">Encoding a candidate solution in AutoRELAX (left shoulder) [ramirez2012]</p>

<!-- left shoulder : as few as possible -->

---

# Current takeaways

<!-- _footer: GIF: The Muppet Movie - Movin Right Along -->
<!-- ![top-corner (movin right along)](img/fase4games-keynote/movin-right-along.webp) -->

<!-- _footer: . -->

<!-- 
a lot of human/socio-centric works out there, not as much in terms of SE 
- regardless of how you plan (requirements, fuzzy logic, formal models), do it!
-->

<div class="container">
<div class="col">
<p><b>Plan for</b> and <b>proactively mitigate</b> uncertainty
<p>- Does it matter for games?</p>
</div>
<div class="col">
<div style="text-align:center !important">
  <img width=300 alt="providentia dfd" src="img/fase4games-keynote/rm-cover.png" /> 
  <p class="reference">Risk Management for Video Game Professionals Cover []</p>
</div>
</div>
<div class="col">
<div style="text-align:center !important">
  <img width=300 alt="providentia dfd" src="img/fase4games-keynote/rm-toc.png" /> <br />
  <p class="reference">Risk Management for Video Game Professionals TOC []</p>
</div>

</div>
</div>

---

# How can we take all of *this* (gestures broadly at previous slides) and put it together?

---

# Search-based software engineering (SSBSE)

<!-- _footer: . -->

<div class="container">
<div class="col">
<p>Evolutionary computation [] for optimizing solutions for SE problems:
<br /><br />E.g.:</p>
<ul>
<li>Optimizing test case prioritization</li>
<li>Generating fuzz test data</li>
<li>Improving requirements satisfaction</li>
</ul>
</div>
<div class="col">
<div style="text-align:center !important">
  <img width=600 alt="providentia dfd" src="img/fase4games-keynote/providentia-dfd.png" /> <br />
  <!-- <img width=300 alt="crossover and mutation" src="img/fase4games-keynote/crossover-mutation.png" /> <br /> -->
  <p class="reference">Providentia data flow diagram [providentia]</p>
</div>

</div>
</div>

<!-- if you have a hammer ... -->

---

# Evolutionary computation (briefly)

Search heuristic that aims to generate an *optimal* solution to a *difficult* problem

**Requirements**

- Solution representation
- Fitness measure

Iterate until your solution is *good enough* or you run out of time!

Can go beyond with diversity [], multi/many-objective optimization [], etc.

![bg opacity:0.1 (dna strand)](https://www.yourgenome.org/wp-content/uploads/2023/10/10-shutterstock_572718040-1920x1120.jpg.webp)

<!-- _footer: Background image: https://www.yourgenome.org/theme/what-is-dna/ -->


---

# An SSBSE example (self-adaptive systems)

1. Breaking the system
    * Run a genetic algorithm to cause the system to **violate as many requirements as possible**
2. Fixing the system
    * Run another genetic algorithm to **optimize the system's configuration** to resolve the violations from (1)

* **Utility functions** used to monitor performance and serve as a fitness function 

---

# An SSBSE example 

<!-- _footer: . -->

<div class="container">
<div class="col">
  <img width=400 src="img/fase4games-keynote/ragnarok.png" />
  <p class="reference">Comparison of Remote Data Mirroring invariant goal violations between Ragnarok (GA-1) and random search [].</p>
</div>
<div class="col">
  <img width=400 src="img/fase4games-keynote/valkyrie.png" />
  <p class="reference">Comparison of average fitness values between Veritas (GA-2) and random search [fredericks2016auto].</p>
</div>
</div>

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
<li>Fitness and aesthetic measures</li>
</ul>
</div>
<div class="col">
<img alt="Fitness functions" src="img/fase4games-keynote/gengi-fitness-fxns.png" />
<p class="reference">GenerativeGI subset of fitness functions [].</p>
</div>
</div>

<!-- translates nicely to games domain -->


---

![bg (generative-gi 1)](https://efredericks.github.io/assets/img/GenerativeGI/random/img-22.png)
![bg (generative-gi 2)](https://efredericks.github.io/assets/img/GenerativeGI/no-clear-single/img-10051.png)
![bg (generative-gi 3)](https://efredericks.github.io/assets/img/GenerativeGI/clear-lexicase/img-10096-1.png)


<!-- more up on my website 
pixel sorting
circle packing + thresholding
watercolor potentially
-->

  

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
<!-- ![bg opacity:0.5 (boi)](https://d3kjluh73b9h9o.cloudfront.net/optimized/3X/6/0/60a6fc5ce76e78c2226541bb949e9e7b6bc73b71_2_690x391.jpeg) -->
![bg cover opacity:0.4 (binding of isaac)](https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUyYzF0d3QwYnpwMGE0dHU0d3dmeGE5NGE1N2EzOTFzM2swYzhnY3dmciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/idcipQ8abT4hq/giphy.gif)

<!-- _footer: . -->

---

<!-- pick your favorite approach -->

# Things we *should* care about

One person indie game or AAA juggernaut, we should follow **proper documentation and testing procedures**

- Design documents
- Requirements elicitation and derivation
- Software testing at all levels

![bg right w:500 (software development lifecycle)](https://storage.ghost.io/c/e2/c8/e2c8c380-908a-4cb3-bbde-7d4cd9649d5f/content/images/2019/08/image-23.png)

<!-- _footer: Image c/o https://datarob.com/essentials-software-development-life-cycle/ -->

---

# Gaming-specific concerns

<!-- _footer: Noita gif: a "simple" 2D game" -->

<!-- some computers can barely handle this 2D game -->

(Probably arguable, but...) a game is just another software product with some *special concerns*:

- Users with varying hardware architectures
- Graphics fidelity and system performance
- Multiplayer issues 
...

![bg right w:500](https://media1.tenor.com/m/4dGcFqwB9CsAAAAd/noita-nolla-games.gif)


---

# A (random) selection of prior FaSE4Games inclusions

- Unit test generation using large language models for unity game development (Paduraru *et al*. 2024)

- A data-driven analysis of player personalities for different game genres (Li *et al*. 2024)

- Automated bug frame retrieval from gameplay videos using vision-language models (Lu *et al*.  2024)

- Many-objective neuroevolution for testing games (Feldmeier *et al*. 2025)

<!-- interesting to see all the techniques being applied to the SE side of things -->

--- 

# Looking forward

![bg opacity:0.3 (looking forward)](img/fase4games-keynote/pexels-mikez-143714.lookingahead.jpg)

<!-- _footer: Photo by Michael Zittel: https://www.pexels.com/photo/gray-and-black-tower-viewer-near-green-grass-field-and-beach-under-blue-white-and-gray-clouds-143714/ -->

---

# Run-time requirements monitoring

Leverage software sensors to monitor performance

<div class="over-img">
<h3 style="padding:1em !important">
We spent all that time deriving requirements and design documents, we might as well keep using them!
</h3>
</div>

<!--
I came out of the automotive industry -- documents were checked into revision control and never used again after their initial use was done
-->

---

<style scoped>
  ol li {
    margin-bottom: 1em;
  }
</style>

# What are some good things to monitor?



<div class="container">
<div class="col">
<p>This leads us to identifying useful artifacts:</p>
<ol>
  <li>Could consider <i>all</i> requirements or a <i>subset</i> of necessary requirement
  <ul>
    <li>May be cost prohibitive (memory, time, etc.)</li>
    </ul>
  </li>
  <li>Identify requirements that can be used for run-time adjustments
  <ul>
      <li>Or self-adaptation...</li>
      </ul>
  </li>
  <li>Include test cases to provide <i>fine-grained</i> feedback</li>
</ol>
</div>
<div class="col">
<img alt="MAPE-T" src="img/fase4games-keynote/mape-t.png" />
<p class="reference">Proposed Monitor-Analyze-Plan-Execute-Test (MAPE-T) loop [fredericks2013towards].</p>
</div>
</div>

---

# Consider: moving traditional software testing to run time

<!-- ## Or, things we *should* be doing already -->

Unit/integration/regression/system/acceptance/.../ testing

Are those one-off tests or can we re-use them?
- Much like requirements specs, test specs are great targets for run-time reuse
  - Especially if you consider that run-time uncertainty *might* get caught by those artifacts

---

# Software testing (esoteric) 

<!-- promised you esoteric in the title -->

Run-time testing [fredericks2019]

Search-based fuzz testing [fredericks-burden]

Mutation testing [not a me!]

Neuroevolution for testing [already present]!

![bg right w:600 (run-time testing loop)](img/fase4games-keynote/rt-test.png)

---

# RELAXation as a target for evolution

![bg right (RELAX dungeon)](img/fase4games-keynote/relax-dungeon.gif)

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


# Future areas 

<!-- _footer: . -->

![top-corner w:200 opacity:0.3 (filter: where do we go from here)](https://i.discogs.com/cutUpbupBsfiEv8xYflZLl8YEwoGXF5m7HVYithjP84/rs:fit/g:sm/q:90/h:320/w:317/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ5OTY3/Ni0xMjMwMzQzMjM2/LmpwZWc.jpeg)

Focusing on the SE areas of improvement:

- Leverage run-time monitors for adapting to gameplay and/or performance metrics
  - E.g., Shadow of Mordor antagonists, tweak performance envelope for different machine specs

- Use artificial life for evolution of game environments and agents [avida, cooke] 
  - Life ... finds a way!

- Agentic monitors for continuous improvement
  - E.g., mimic players to catch latent bugs
    - Though, keep them out of the creative space

---

# Dream project

Everything **fully evolved** and yet:

- Cohesive across game
- Clearly communicative to player
- Enjoyable!

![bg right (evoworld)](img/evoworld.gif)

---

# A pitch!

<!-- _footer: . -->

![bg opacity:0.1 (Schloss Dagstuhl)](https://www.dagstuhl.de/_Resources/Persistent/d/b/9/2/db92ac4a61b2c6a364b7b0d8ef618dc5ad8819cd/_01_DSC00749_1_Didas%20KopieDG1.jpg)

I am currently working on a Dagstuhl seminar proposal centered around SE and games.  If you would like to be included as a participant, please fill out the survey here!

<div style="text-align:center !important">
  <img width=350 alt="QR code"src="img/fase4games-keynote/qrcode_docs.google.com.png" /> <br />
  <p class="reference">Survey for Dagstuhl inclusion.</p>
</div>

---

# Thank you!

![bg opacity:0.1 (thank you)](img/pexels-towfiqu-barbhuiya-3440682-11341894.jpg)

<!-- _footer:Photo by Towfiqu barbhuiya from Pexels: https://www.pexels.com/photo/cursive-text-on-a-paper-11341894/ -->

---

# Discussion



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

<li>[] Goodling, A., Schneider, C., Fredericks, E. M., and Hariri, R. (2026). Antagonistic Development via Intentional Software Churn. To appear in the Proceedings of the 2026 ASEE National Conference.</li>
<li>[] Fredericks, E. M., Bobeldyk, D., & Moore, J. M. (2026). Every Map an Evolution, Every Room a Generation: Co-Evolution in a Procedurally-Generated Video Game. To appear in Genetic Programming Theory and Practice XXIII. Singapore: Springer Nature Singapore.</li>
<li>[] Bowers, K. M., Fredericks, E. M., Hariri, R. H., & Cheng, B. H. C. (2020). Providentia: Using search-based heuristics to optimize satisficement and competing concerns between functional and non-functional objectives in self-adaptive systems. Journal of Systems and Software, 162, 110497.</li>
<li>[] Fredericks, E. M., Diller, A. C., & DeVries, B. (2026).  Managing Dermal Reference Guides in the Face of Software Evolution via a CI/CD Pipeline. In 26th ACH Special Interest Group on Harry Quadragesimal Bovik (SIGBOVIK). Association for Computational Heresy (ACH).</li>
<li>[] Fredericks, E. M., DeVries, B., & Hariri, R. (2026). Databending as a Target for Genetic Improvement. To Be Published in the 2026 15th International Workshop on Genetic Improvement (GI).</li>
<li>[] Fredericks, E. M., Jacobs, M., & DeVries, B. (2024). Towards a Metamorphic Testing Architecture for Software-Defined Drone Systems. 2024 11th International Conference on Software Defined Systems (SDS), 170–177. https://doi.org/10.1109/SDS64317.2024.10883896</li>
<li>[] DeVries, B., & Fredericks, E. M. (2024). Triggering Adaptation via Contextual Metamorphic Relations. 2024 IEEE 24th International Conference on Software Quality, Reliability and Security (QRS), 105–114.</li>
<li>[] Fredericks, E. M., & Burden, S. (2024). Towards Fuzz Testing a Procedurally-Generated Video Game. To Appear in the Proceedings of the 2024 ASEE North Central Section Conference (ASEE NCS).</li>
<li>[] Fredericks, E. M., Bowers, K. M., & Hariri, R. H. (2019). On incorporating search-based heuristics into real-world systems. 2019 IEEE/ACM 12th International Workshop on Search-Based Software Testing (SBST), 11–12.</li>
<li>[] Fredericks, E. M., Gerostathopoulos, I., Krupitzer, C., & Vogel, T. (2019). Planning as optimization: Dynamically discovering optimal configurations for runtime situations. 2019 IEEE 13th International Conference on Self-Adaptive and Self-Organizing Systems (SASO), 1–10.</li>
<li>[] Fredericks, E. M., & Moore, J. M. (2020). Search@ Home: A Commercial Off-the-Shelf Environment for Investigating Optimization Problems. International Symposium on Search Based Software Engineering, 171–177. </li>

<li>[] Wickham, L. (2026). Risk Management for Video Game Professionals: Navigating Uncertainty in Game Development. CRC Press.</li>
</ul>

---

[] Chua Chow, C., & Sarin, R. K. (2002). Known, unknown, and unknowable uncertainties. Theory and Decision, 52(2), 127-138.
[] Attenberg, J., Ipeirotis, P., & Provost, F. (2015). Beat the machine: Challenging humans to find a predictive model's “unknown unknowns”. Journal of Data and Information Quality (JDIQ), 6(1), 1-17.
[] Lakkaraju, H., Kamar, E., Caruana, R., & Horvitz, E. (2017, February). Identifying unknown unknowns in the open world: Representations and policies for guided exploration. In Proceedings of the AAAI Conference on Artificial Intelligence (Vol. 31, No. 1).