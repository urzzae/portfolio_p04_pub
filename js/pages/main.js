// main.js
let visualWrap;
let stickerItems;

const xOffsets = {
  sticker_1: "-5%",
  sticker_6: "5%",
};

function stickerAddClass() {
  const classes = [
    "fast",
    "slow",
    "fast",
    "slow",
    "fast",
    "slow",
    "fast",
    "slow",
  ];
  stickerItems.forEach(function (el) {
    const randomPosition = classes.splice(
      Math.floor(Math.random() * classes.length),
      1,
    )[0];
    el.classList.add(randomPosition);
  });
}

function stickerBounceMotion() {
  const wrapHeight = visualWrap.offsetHeight;

  stickerItems.forEach(function (el) {
    const startOffsetY = -wrapHeight * 0.6;
    const randomDuration = gsap.utils.random(1.2, 1.5);

    const stickerKey = Object.keys(xOffsets).find(function (key) {
      return el.classList.contains(key);
    });
    const startOffsetX = stickerKey ? xOffsets[stickerKey] : 0;

    gsap.set(el, { x: startOffsetX, y: startOffsetY, opacity: 0 });
    gsap.to(el, {
      y: 0,
      x: startOffsetX,
      opacity: 1,
      duration: randomDuration,
      ease: "bounce.out",
    });
  });
}

function stickerScrollMotion() {
  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const vw = window.innerWidth;
    const opacity = Math.max(0, 1 - scrollY / 800);

    stickerItems.forEach(function (el) {
      const isSlow = el.classList.contains("slow");
      const isLeft = el.classList.contains("left");
      const speedBase = isSlow ? 0.4 : 1.0;
      const moveSpeed = speedBase * (vw / 1920);
      const moveDirection = isLeft ? -1 : 1;

      gsap.to(el, {
        x: moveDirection * scrollY * moveSpeed,
        opacity: opacity,
        overwrite: true,
        duration: 0.3,
      });
    });
  });
}

function stickerDraggable() {
  Draggable.create(".sticker", {
    type: "x,y",
    bounds: ".main_visual",
    onRelease: function () {
      gsap.to(this.target, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.4)",
      });
    },
  });
}

function visualSlider() {
  let active = 0;
  const bullet = ["210버터", "210수퍼사이즈", "210연애시대"];

  document
    .querySelector(".swiper-pagination-visual .swiper-pagination-bullet-active")
    ?.classList.add("animate");

  new Swiper(".main_visual .main_visual_slide", {
    a11y: false,
    touchRatio: 0,
    direction: "vertical",
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination-visual",
      clickable: true,
      renderBullet: function (index, className) {
        return (
          '<div class="' +
          className +
          '"><div class="progressbar"></div><span>' +
          bullet[index] +
          "</span></div>"
        );
      },
    },
    on: {
      init: function () {
        document
          .querySelector(
            ".swiper-pagination-visual .swiper-pagination-bullet-active",
          )
          ?.classList.add("animate");
      },
      slideChangeTransitionStart: function () {
        document
          .querySelectorAll(
            ".swiper-pagination-visual .swiper-pagination-bullet",
          )
          .forEach((bulletEl) => bulletEl.classList.remove("animate"));
        active = this.realIndex;
        this.slides.forEach((element) => {
          element.classList.remove("animate");
        });
        this.slides[active].classList.add("animate");
        const bullets = document.querySelectorAll(
          ".swiper-pagination-visual .swiper-pagination-bullet",
        );
        bullets[active]?.classList.add("animate");
      },
    },
  });
}

function roller() {
  document
    .querySelectorAll(".main_project_item > .hover > .banner_wrap")
    .forEach((wrap) => {
      const banner = wrap.querySelector(".hover_banner");
      if (!banner) return;

      const clone = banner.cloneNode(true);
      banner.classList.add("original");
      clone.classList.add("clone");
      wrap.appendChild(clone);
    });
}

function rollerMouseover() {
  document.querySelectorAll(".main_project_item").forEach((item) => {
    const bgWrap = item.querySelector(".hover .bg_wrap");
    if (!bgWrap) return;

    const getRelativeY = (e) =>
      (e.pageY - (item.getBoundingClientRect().top + window.scrollY)) / 2;

    item.addEventListener("mouseenter", (e) => {
      bgWrap.classList.remove("up", "down");
      bgWrap.style.transform =
        getRelativeY(e) <= 50 ? "translate(0, -101%)" : "translate(0, 101%)";
      bgWrap.classList.add("slide");
    });

    item.addEventListener("mouseleave", (e) => {
      bgWrap.classList.remove("slide");
      bgWrap.style.transform = "translate(0%, 0%)";
      bgWrap.classList.add(getRelativeY(e) <= 50 ? "up" : "down");
    });
  });
}

function init() {
  visualWrap = document.querySelector(".main_visual_wrap");
  stickerItems = gsap.utils.toArray(".stickers > .sticker");

  visualSlider();
  stickerAddClass();
  stickerBounceMotion();
  stickerDraggable();
  stickerScrollMotion();
  roller();
  rollerMouseover();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
