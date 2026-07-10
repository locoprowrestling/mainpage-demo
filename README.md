LoCo Pro Wrestling mainpage demo
--------------------------------

This is a proof-of-concept fork of the production `mainpage` static site.

The goal is to test a more cinematic LoCo Pro Wrestling homepage while staying
compatible with GitHub Pages. GitHub Pages cannot run a Node/Express backend,
but it can serve static HTML, CSS, JavaScript modules, images, and committed
vendor libraries. This repo therefore has no production server requirement.

Concept direction
-----------------

Vibe: **Championship Control Room**

- Reference: a local wrestling poster wall beside a production switcher.
- First emotion: energized.
- Collision: show-night fight graphics plus practical event-directory utility.
- Avoid: generic purple startup gradients, crypto-style hero art, and pages that
  hide the wrestlers behind abstract decoration.

Active libraries
----------------

All library files are committed under `vendor/` so the demo is CDN-free:

- GSAP: hero entrance timeline and scroll reveals.
- Three.js: hero energy/light canvas.
- Motion DOM: interaction motion on cards.
- Lenis: smooth anchor scrolling.
- Lottie: vector seal accent behind the LoCo Pro mark.
- Barba: static page-transition foundation for future multipage routing.

Theatre.js is intentionally not loaded in this public static page. It is useful
as an authoring/staging tool, but the runtime package in this workspace is
CommonJS-shaped and better suited to a bundled workflow than direct GitHub Pages
delivery.

Run locally
-----------

```sh
python3 -m http.server 4177
```

Then open:

```text
http://localhost:4177/
```

Build for GitHub Pages
----------------------

```sh
./scripts/build-pages.sh . _site
```

The workflow in `.github/workflows/deploy-pages.yml` runs the same command on
push to `main`.

Deployment note
---------------

The production `mainpage` repo uses `CNAME` for `mainpage.locopro.pw`. This demo
repo intentionally does not include a `CNAME`, so it can publish as a GitHub
Pages project site such as:

```text
https://locoprowrestling.github.io/mainpage-demo/
```
