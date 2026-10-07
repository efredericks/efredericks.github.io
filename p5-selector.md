---
layout: default
title: 
permalink: /p5-selector/
---

<div class="parent-flex-container">
  <div id="canvas-container" class="child-div">
  </div>
  <div id="script-author"></div>
</div>

<div id="script-note"></div>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    // Get the sketch name from the URL (?sketch=matrix)
    const urlParams = new URLSearchParams(window.location.search);
    const sketchName = urlParams.get('sketch');

    // pick a random sketch to show on load
    let author_urls = {
        "Erik Fredericks": "https://efredericks.github.io",
    };
    let js_map = {
        'colored-squares': 0,
        'sega2026': 1,
        'checkered': 2,
        'simplex': 3,
        'cosine': 4,
        'rule-particles': 5,
        'circle-packing-and-flow-fields': 6,
        'calvin-and-hobbes-starfield': 7,
    };
    let js_files = [
        // 'fredericks-sega-1.js',

        { script: "fredericks-sega-2.js", author: "Erik Fredericks", tag:"Random colored squares with vaporwave color palette" },
        { script: "fredericks-sega-3.js", author: "Erik Fredericks", tag:"SEGA2026 workshop", note: "<a target='_blank' href='https://sega-workshop.github.io/2026/'>SEGA 2026</a>" },
        { script: "fredericks-sega-4.js", author: "Erik Fredericks", tag:"Checkered patterns rotated and dithered" },
        { script: "fredericks-sega-5.js", author: "Erik Fredericks", tag:"Animated simplex noise" },
        { script: "fredericks-banner-6.js", author: "Erik Fredericks", tag:"Messy cosine waves" },
        { script: "fredericks-banner-7-ruleparticles.js", author: "Erik Fredericks", tag:"Rule-driven particles" },
        { script: "fredericks-flow-avoid.js", author: "Erik Fredericks", tag: "Circle packing and flow fields", note: "Double click to reset noise/zoom." },
        { script: "fredericks-c_and_h-starfield.js", author: "Erik Fredericks", tag: "Animated Calvin and Hobbes night sky", note: "Click to reset background." },
        // { script: "fredericks-truchet-animated.js", author: "Erik Fredericks", tag: "Animated Truchet tiles", note: "Click to reset background." },
        // { script: "fredericks-eyes.js", author: "Erik Fredericks", tag: "👁️"},
    ];

    let index = Math.floor(Math.random() * js_files.length);
    if (sketchName) {
        if (sketchName in js_map) index = js_map[sketchName];
    }

    const the_file = js_files[index].script;
    const scriptElement = document.createElement("script");
    scriptElement.src = `{{ site.baseurl }}/assets/js/sketches/${the_file}`;
    document.body.appendChild(scriptElement);

    let author = js_files[index].author;
    let author_url = author_urls[author];
    let author_tag = js_files[index].tag;
    let script_url = `{{ site.baseurl }}/assets/js/sketches/${the_file}`;
    let script_note = js_files[index].note;
    document.getElementById(
        "script-author"
    ).innerHTML = `<a href='${script_url}' target='_blank'>${author_tag}</a>`;

    if (script_note) {
        document.getElementById(
        "script-note"
        ).innerHTML = script_note;
    }
  });
</script>