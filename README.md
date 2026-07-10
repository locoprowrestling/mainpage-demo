LoCo Pro Wrestling homepage staging
-----------------------------------

This repo stages a fan-facing static homepage for LoCo Pro Wrestling.
It keeps the operational shape of the existing `mainpage` site while presenting
the brand as a live entertainment property: ticket path, event router, roster
spotlight, watch path, Longmont/Colorado community pride, and story context.

Production intent
-----------------

- Make the first screen answer what LoCo Pro is, where it happens, and what to
  do next.
- Keep ticket purchase one tap away without hiding videos, roster art, or event
  archives.
- Keep public copy aimed at LoCo Pro fans and the people of Longmont/Colorado;
  implementation, motion-system, and creator-facing strategy language belongs in
  internal docs only.
- Use motion as a reusable brand system for web pages, shorts, match cards, and
  event pages.
- Keep the site deployable as static HTML, CSS, JavaScript, images, and committed
  vendor libraries.

Active libraries
----------------

All runtime libraries are committed under `vendor/` so the page does not depend
on third-party CDNs:

- GSAP: hero entrance timeline and scroll reveals.
- Three.js: hero energy/light canvas.
- Motion DOM: interaction motion on cards.
- Lenis: smooth anchor scrolling.
- Lottie: vector seal accent behind the LoCo Pro mark.
- Barba: transition foundation for future multipage static routing.

Theatre.js remains an authoring/staging candidate rather than a direct runtime
dependency here. The package available in this workspace is better suited to a
bundled authoring workflow than direct unbundled static delivery.

Local verification
------------------

```sh
python3 -m http.server 4177
```

Then open:

```text
http://localhost:4177/
```

Build the Pages artifact:

```sh
./scripts/build-pages.sh . _site
```

Useful checks:

```sh
node --check app.js
git diff --check -- .
```

Production handoff checklist
----------------------------

- Replace staging URL assumptions with the final custom domain and add `CNAME`
  only when the target repo/domain is confirmed.
- Confirm the active ticket URL, current event, and venue copy before launch.
- Add real YouTube/social links when the target channels are finalized.
- Add analytics only after the privacy policy reflects the provider.
- Re-run desktop and mobile browser checks before promoting this over the
  existing homepage.
