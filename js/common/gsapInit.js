// GSAP + ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

const animFrom = {
  "fade-up": { opacity: 0, y: 40 },
  "fade-down": { opacity: 0, y: -40 },
  "fade-right": { opacity: 0, x: -40 },
  "fade-left": { opacity: 0, x: 40 },
  fade: { opacity: 0 },
  "zoom-in": { opacity: 0, scale: 0.82 },
  "flip-right": { opacity: 0, rotationY: -90, transformPerspective: 800 },
};

const easeMap = {
  "ease-out-back": "back.out(1.7)",
  "ease-out": "power2.out",
  linear: "none",
  "ease-in": "power2.in",
  "ease-in-out": "power2.inOut",
};

function initGsapAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll("[data-gsap]").forEach((el) => {
    const type = el.getAttribute("data-gsap");
    const delay = parseFloat(el.getAttribute("data-gsap-delay") || 0) / 1000;
    const duration =
      parseFloat(el.getAttribute("data-gsap-duration") || 600) / 1000;
    const easeName = el.getAttribute("data-gsap-ease") || "ease-out";
    const ease = easeMap[easeName] || "power2.out";
    const fromVars = animFrom[type];

    if (!fromVars) return;

    gsap.set(el, fromVars);

    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter() {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotationY: 0,
          duration,
          delay,
          ease,
        });
      },
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGsapAnimations);
} else {
  initGsapAnimations();
}
