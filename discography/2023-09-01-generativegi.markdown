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
  - images: 
    - image: /assets/img/GenerativeGI/img-46.png
    - image: /assets/img/GenerativeGI/img-35.png
    - image: /assets/img/GenerativeGI/img-36.png
    - image: /assets/img/GenerativeGI/img-37.png
    - image: /assets/img/GenerativeGI/img-39.png
    - image: /assets/img/GenerativeGI/img-48.png
  - images: 
    - image: /assets/img/GenerativeGI/img-46.png
    - image: /assets/img/GenerativeGI/img-35.png
    - image: /assets/img/GenerativeGI/img-36.png
    - image: /assets/img/GenerativeGI/img-37.png
    - image: /assets/img/GenerativeGI/img-39.png
    - image: /assets/img/GenerativeGI/img-48.png
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

**Note - our journal submission is under review**

## GenerativeGI

## Genetic Improvement

## Techniques

Here are all the techniques we included in the experiment.  You can find the Python code for all of them within the repo within `techniques.py`.  

### Circle Packing

### Dithering

### Drunkard's Walk

### Flow Field

### Pixel Sort

### Stipple

### Cellular Automata

### RGB Shift

### Noisemap

---

Here are some of the best (note: ones that I mainly liked) and thought would be worth presenting.  Each of the specific runs get their own carousel of images and you can click on each to go to the full size image.  Sadly they're only 1000x1000, otherwise the experiments would have taken a *long* time to run.

I randomly selected images to show off the outputs - there is no rhyme or reason other than looking for *different* or *interesting* images.

## Random

These results were from simply randomizing GenerativeGI without any guidance or evolution.  Still resulted in very neat outputs, however a lot more 'blank space' can be seen in the full dataset.

  {% include carousel.html height="50" unit="%" duration="7" number="3" %}

## Single-Objective (Clear)

  {% include carousel.html height="50" unit="%" duration="7" number="1" %}

  {% include carousel.html height="50" unit="%" duration="7" number="2" %}

## Single-Objective (No Clear)

## Lexicase (Clear)

  {% include carousel.html height="50" unit="%" duration="7" number="5" %}

## Lexicase (No Clear)

  {% include carousel.html height="50" unit="%" duration="7" number="4" %}