export function fadeIn(el, dur = 0.3) {
  gsap.set(el, { display: "flex", opacity: 0 });
  gsap.to(el, { opacity: 1, duration: dur });
}

export function fadeOut(el, dur = 0.3) {
  gsap.to(el, {
    opacity: 0,
    duration: dur,
    onComplete: () => gsap.set(el, { display: "none" }),
  });
}

export function slideDown(el, dur = 0.3) {
  el.style.display = "block";
  gsap.fromTo(
    el,
    { height: 0, overflow: "hidden" },
    {
      height: "auto",
      duration: dur,
      ease: "power1.inOut",
      onComplete: () => {
        el.style.height = "";
        el.style.overflow = "";
      },
    },
  );
}

export function slideUp(el, dur = 0.3) {
  gsap.to(el, {
    height: 0,
    overflow: "hidden",
    duration: dur,
    ease: "power1.inOut",
    onComplete: () => {
      el.style.display = "none";
      el.style.height = "";
      el.style.overflow = "";
    },
  });
}
