---
layout: post
title: GenerativeGI - Project Writeup
description: project overview and images
# image: assets/img/z-is-for-zero.png
# responsiveImage:
#   - src: assets/img/300.png
#     size: 300
#   - src: assets/img/600.png
#     size: 600
#   - src: assets/img/z-is-for-zero.png
#     size: 900
type: blog
# play:
#     - name: YouTube
#       url: https://www.youtube.com/
#     - name: SoundCloud
#       url: https://soundcloud.com/
# buy:
#   - url: https://backfromvoid.bandcamp.com/track/if-i-want-you-to
#     name: BandCamp
# embed_player:
#   type: bandcamp
#   src: track=2250182265/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/
carousels:
  - images: # random
    - image: /assets/img/GenerativeGI/random/img-6.png
    - image: /assets/img/GenerativeGI/random/img-22.png
    - image: /assets/img/GenerativeGI/random/img-46.png
    - image: /assets/img/GenerativeGI/random/img-62.png
    - image: /assets/img/GenerativeGI/random/img-64.png
    - image: /assets/img/GenerativeGI/random/img-67.png
    - image: /assets/img/GenerativeGI/random/img-71.png
    - image: /assets/img/GenerativeGI/random/img-94.png
    - image: /assets/img/GenerativeGI/random/img-94-1.png
    - image: /assets/img/GenerativeGI/random/img-98.png
  - images: # single no clear
    - image: /assets/img/GenerativeGI/no-clear-single/img-10047.png
    - image: /assets/img/GenerativeGI/no-clear-single/img-10050.png
    - image: /assets/img/GenerativeGI/no-clear-single/img-10051.png
    - image: /assets/img/GenerativeGI/no-clear-single/img-10057.png
    - image: /assets/img/GenerativeGI/no-clear-single/img-10063.png
    - image: /assets/img/GenerativeGI/no-clear-single/img-10066.png
    - image: /assets/img/GenerativeGI/no-clear-single/img-10080.png
    - image: /assets/img/GenerativeGI/no-clear-single/img-10095.png
    - image: /assets/img/GenerativeGI/no-clear-single/img-10097.png
    - image: /assets/img/GenerativeGI/no-clear-single/img-10099.png
  - images: # single clear
    - image: /assets/img/GenerativeGI/clear-single/img-10045.png
    - image: /assets/img/GenerativeGI/clear-single/img-10048.png
    - image: /assets/img/GenerativeGI/clear-single/img-10059.png
    - image: /assets/img/GenerativeGI/clear-single/img-10059-1.png
    - image: /assets/img/GenerativeGI/clear-single/img-10068.png
    - image: /assets/img/GenerativeGI/clear-single/img-10074.png
    - image: /assets/img/GenerativeGI/clear-single/img-10076.png
    - image: /assets/img/GenerativeGI/clear-single/img-10087.png
    - image: /assets/img/GenerativeGI/clear-single/img-10087-1.png
    - image: /assets/img/GenerativeGI/clear-single/img-10093.png
  - images:  # lexicase no clear
    - image: /assets/img/GenerativeGI/no-clear-lexicase/img-10019.png
    - image: /assets/img/GenerativeGI/no-clear-lexicase/img-10058.png
    - image: /assets/img/GenerativeGI/no-clear-lexicase/img-10062.png
    - image: /assets/img/GenerativeGI/no-clear-lexicase/img-10068.png
    - image: /assets/img/GenerativeGI/no-clear-lexicase/img-10078.png
    - image: /assets/img/GenerativeGI/no-clear-lexicase/img-10084.png
    - image: /assets/img/GenerativeGI/no-clear-lexicase/img-10088.png
    - image: /assets/img/GenerativeGI/no-clear-lexicase/img-10090.png
    - image: /assets/img/GenerativeGI/no-clear-lexicase/img-10092.png
    - image: /assets/img/GenerativeGI/no-clear-lexicase/img-10099.png
  - images:  # lexicase clear
    - image: /assets/img/GenerativeGI/clear-lexicase/img-10056.png
    - image: /assets/img/GenerativeGI/clear-lexicase/img-10073.png
    - image: /assets/img/GenerativeGI/clear-lexicase/img-10085.png
    - image: /assets/img/GenerativeGI/clear-lexicase/img-10088.png
    - image: /assets/img/GenerativeGI/clear-lexicase/img-10092.png
    - image: /assets/img/GenerativeGI/clear-lexicase/img-10095.png
    - image: /assets/img/GenerativeGI/clear-lexicase/img-10096-1.png
    - image: /assets/img/GenerativeGI/clear-lexicase/img-10096.png
    - image: /assets/img/GenerativeGI/clear-lexicase/img-10099-1.png
    - image: /assets/img/GenerativeGI/clear-lexicase/img-10099.png
---

<hr size="1" />

- [Project repo](https://github.com/GI2023-GenerativeGI/GI2023/tree/ASE-GI-Extension){:target="\_blank"}

- [Original GI2023 workshop paper (🥇 best paper award recipient)](/publications/fredericks_GI_2023.pdf){:target="\_blank"}

- [Full dataset](https://zenodo.org/record/8170436){:target="\_blank"}

<hr size="1" />

# Project Overview

This page is a short little overview of <code>GenerativeGI</code>, a project that brings together generative art (making art with code) and genetic improvement (fixing code with search algorithms).  The idea of this post is to mainly present a bit of insight on the project itself and show off some of our favorite outputs.

Note - this is intentionally brief/reductive.  The [full paper](/publications/fredericks_GI_2023.pdf){:target="\_blank"} has all the details in lovely, dry, academic tones.

**Note - our journal submission is under review**

## GenerativeGI

GenerativeGI is a Python-based technique for using genetic improvement (GI) to string together a series of generative art techniques to create something new, the idea being that a generative artist wants to spend less time fiddling with parameters as that can be a time-consuming process.  In the interest of brevity, all techniques are described within the [README file of our public repo](https://github.com/GI2023-GenerativeGI/GI2023/tree/ASE-GI-Extension#techniques){:target="\_blank"}.

## Genetic Improvement

GI is an evolutionary computation-based technique for automatically improving the source code of programs.  Basically, a GI technique will try to search for the best possible combination of lines of source code that results in an optimal program (GI encodes the software as the genome).  

For this work, we consider the source code to be a series of generative art techniques, each of which can accept parameters to vary their input.  The GI process then attempts to find the "best" way to combine techniques and parameters to create a glitch art aesthetic.

---

Here are some of the best (note: ones that I mainly liked) and thought would be worth presenting.  Each of the specific runs get their own carousel of images and you can click on each to go to the full size image.  Sadly they're only 1000x1000, otherwise the experiments would have taken a *long* time to run.

I randomly selected images to show off the outputs - there is no rhyme or reason other than looking for *different* or *interesting* images.

## Random

These results were from simply randomizing GenerativeGI without any guidance or evolution.  Still resulted in very neat outputs, however a lot more 'blank space' can be seen in the full dataset.

  {% include carousel.html height="50" unit="%" duration="15" number="1" %}

## Single-Objective (Clear)

This experiment focused on a single objective for optimization - pixel differences via [root-mean-square (RMS) difference analysis](https://en.wikipedia.org/wiki/Root-mean-square_deviation){:target="\_blank"} (i.e., a mathematical calculation of how "different" are two images from each other).  Additionally, the canvas object was cleared prior to evolutionary operations to provide a clean slate each time a new child was created.  Interestingly, the final outputs were typically very similar per-replicate (as opposed to random and Lexicase) as the single fitness objective guided the search towards a common set of solutions.

  {% include carousel.html height="50" unit="%" duration="15" number="3" %}

## Single-Objective (No Clear)

This experiment is the same as above (RMS difference), however the canvas object is not cleared to simulate a "pass-it-on" style of art where techniques overlap.

  {% include carousel.html height="50" unit="%" duration="15" number="2" %}

## Lexicase (Clear)

This experiment runs the full Lexicase selection algorithm with all five fitness functions active: pairwise RMS difference, [pairwise Chebyshev difference](https://en.wikipedia.org/wiki/Chebyshev_distance){:target="\_blank"}, minimizing the length of the genome, maximizing the diversity of techniques in each genome, and maximizing the amount of negative space within an image (targeting 70% negative space).

  {% include carousel.html height="50" unit="%" duration="15" number="5" %}

## Lexicase (No Clear)

Same as above, however the canvas is not cleared again to allow techniques to build upon each other throughout evolution.

  {% include carousel.html height="50" unit="%" duration="15" number="4" %}