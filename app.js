import * as THREE from "./vendor/three/three.module.js";
import { animate } from "./vendor/framer-motion/dom-mini.mjs";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

initLenis();
initBarba();
initHeroTimeline();
initThreeCanvas();
initLottieSeal();
initMotionCards();

function initLenis() {
  if (reduceMotion || !window.Lenis) return;
  const lenis = new window.Lenis({ lerp: 0.085, smoothWheel: true, anchors: true });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

function initBarba() {
  if (!window.barba || !window.gsap) return;
  window.barba.init({
    prevent: () => true,
    transitions: [{
      name: "locopro-static-wipe",
      once() {
        window.gsap.fromTo(
          ".page-wipe",
          { x: "-120vw", autoAlpha: 1 },
          { x: "120vw", autoAlpha: 0, duration: 0.7, ease: "power3.out" }
        );
      },
      leave(data) {
        return window.gsap.to(".page-wipe", { x: 0, autoAlpha: 1, duration: 0.32, ease: "power2.in" });
      },
      enter() {
        return window.gsap.to(".page-wipe", { x: "120vw", autoAlpha: 0, duration: 0.42, ease: "power3.out" });
      },
    }],
  });
}

function initHeroTimeline() {
  if (!window.gsap) return;
  const gsap = window.gsap;
  gsap.set([".eyebrow", "h1", ".hero__lede", ".hero__actions", ".hero__ledger", ".hero__poster"], { autoAlpha: 0 });
  gsap.set(".roster-stack__person", { y: 46, autoAlpha: 0 });
  gsap.set(".hero__mark", { scale: 0.74, rotate: -8 });
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.to(".eyebrow", { autoAlpha: 1, y: -6, duration: 0.42 })
    .to("h1", { autoAlpha: 1, x: 0, duration: 0.72 }, "-=0.12")
    .to(".hero__lede", { autoAlpha: 1, y: -8, duration: 0.5 }, "-=0.34")
    .to(".hero__actions", { autoAlpha: 1, y: -6, duration: 0.45 }, "-=0.24")
    .to(".hero__ledger", { autoAlpha: 1, y: -8, duration: 0.42 }, "-=0.22")
    .to(".hero__poster", { autoAlpha: 1, duration: 0.2 }, "-=0.8")
    .to(".hero__mark", { scale: 1, rotate: 0, duration: 0.68 }, "-=0.32")
    .to(".roster-stack__person", { autoAlpha: 1, y: 0, duration: 0.74, stagger: 0.1 }, "-=0.34");

  const revealTargets = document.querySelectorAll(".feature-card, .event-card, .portrait-rail article, .timeline article, .final-cta__box");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      gsap.to(entry.target, { autoAlpha: 1, y: 0, duration: 0.54, ease: "power3.out" });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16 });
  revealTargets.forEach((target) => {
    gsap.set(target, { autoAlpha: 0, y: 26 });
    observer.observe(target);
  });
}

function initThreeCanvas() {
  const canvas = document.querySelector("#hero-canvas");
  if (!canvas || reduceMotion) return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 8;

  const group = new THREE.Group();
  scene.add(group);

  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xf3c854, transparent: true, opacity: 0.42 });
  const redMaterial = new THREE.MeshBasicMaterial({ color: 0xd92532, transparent: true, opacity: 0.36 });
  const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x0f9b54, transparent: true, opacity: 0.3 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.018, 8, 160), ringMaterial);
  ring.scale.set(2.7, 0.7, 1);
  group.add(ring);

  for (let i = 0; i < 34; i += 1) {
    const material = i % 3 === 0 ? redMaterial : greenMaterial;
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.035, 1.2 + (i % 5) * 0.13, 0.02), material);
    beam.position.x = -7 + i * 0.42;
    beam.position.y = Math.sin(i * 1.5) * 1.5;
    beam.rotation.z = -0.95 + (i % 4) * 0.08;
    group.add(beam);
  }

  function resize() {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function tick(ms) {
    const seconds = ms / 1000;
    ring.rotation.z = seconds * 0.2;
    group.rotation.z = Math.sin(seconds * 0.35) * 0.06;
    ringMaterial.opacity = 0.25 + Math.sin(seconds * 2.2) * 0.1;
    redMaterial.opacity = 0.28 + Math.sin(seconds * 3.1) * 0.08;
    greenMaterial.opacity = 0.22 + Math.cos(seconds * 2.8) * 0.06;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(tick);
}

function initLottieSeal() {
  const container = document.querySelector("#lottie-seal");
  if (!container || !window.lottie) return;
  window.lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: !reduceMotion,
    autoplay: !reduceMotion,
    animationData: {
      v: "5.9.0",
      fr: 30,
      ip: 0,
      op: 120,
      w: 220,
      h: 220,
      nm: "LoCo radial seal",
      ddd: 0,
      assets: [],
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 4,
          nm: "outer ring",
          sr: 1,
          ks: {
            o: { a: 0, k: 100 },
            r: { a: 1, k: [{ t: 0, s: [-12] }, { t: 120, s: [24] }] },
            p: { a: 0, k: [110, 110, 0] },
            a: { a: 0, k: [0, 0, 0] },
            s: { a: 1, k: [{ t: 0, s: [82, 82, 100] }, { t: 60, s: [110, 110, 100] }, { t: 120, s: [82, 82, 100] }] }
          },
          shapes: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [162, 162] } },
            { ty: "st", c: { a: 0, k: [0.953, 0.785, 0.329, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 8 }, lc: 2, lj: 2 },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
          ],
          ip: 0,
          op: 120,
          st: 0,
          bm: 0
        }
      ]
    },
  });
}

function initMotionCards() {
  document.querySelectorAll("[data-motion-card]").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      animate(card, { y: -8, scale: 1.015 }, { duration: 0.22, easing: "ease-out" });
    });
    card.addEventListener("mouseleave", () => {
      animate(card, { y: 0, scale: 1 }, { duration: 0.24, easing: "ease-out" });
    });
  });
}
