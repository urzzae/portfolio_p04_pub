import { fadeIn, fadeOut } from "../helpers/anim.js";

function init() {
  let gnbScrollTop = 0;
  const delta = 50;

  function onScroll() {
    const scrollTop = window.scrollY;

    scrollCheck();
    noFixed();

    if (Math.abs(gnbScrollTop - scrollTop) <= delta) return;

    const header = document.querySelector("#header");
    const quickmenu = document.querySelector(".quickmenu_wrap");
    const stickyNav = document.querySelector(".project_sticky_nav");

    if (gnbScrollTop < 300) {
      header?.classList.remove("scroll-up");
      stickyNav?.classList.remove("scroll-up");
    }
    if (scrollTop > gnbScrollTop && gnbScrollTop > 300) {
      header?.classList.remove("scroll-up");
      header?.classList.add("scroll-down");
      quickmenu?.classList.add("scroll-down");
      stickyNav?.classList.remove("scroll-up");
      stickyNav?.classList.add("scroll-down");
    }
    if (scrollTop < gnbScrollTop) {
      header?.classList.remove("scroll-down");
      header?.classList.add("scroll-up");
      quickmenu?.classList.add("scroll-down");
      stickyNav?.classList.remove("scroll-down");
      stickyNav?.classList.add("scroll-up");
    }

    gnbScrollTop = scrollTop;
  }

  window.addEventListener("load", onScroll);
  window.addEventListener("scroll", onScroll);

  const quickmenuControl = document.querySelector(".quickmenu_control");
  const quickmenu = document.querySelector(".quickmenu");
  quickmenuControl?.addEventListener("click", (e) => {
    e.preventDefault();
    quickmenuControl.classList.toggle("active");
    quickmenu.classList.toggle("open");
  });
  document.querySelectorAll(".quickmenu_item").forEach((item) => {
    item.addEventListener("click", () => {
      quickmenuControl?.classList.remove("active");
      quickmenu?.classList.remove("open");
    });
  });

  document.querySelectorAll("a.scrollevent").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.hash);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  const burger = document.querySelector(".menu_mobile .hamburger_toggle");
  const headerContainer = document.querySelector(".header_container");
  const menuMobile = document.querySelector(".menu_mobile");
  burger?.addEventListener("click", () => {
    headerContainer.classList.toggle("mobile");
    menuMobile.classList.toggle("open");
    document.body.classList.toggle("prevent-scroll", menuMobile.classList.contains("open"));
  });
}

function scrollCheck() {
  const header = document.querySelector("#header");
  const quickmenu = document.querySelector(".quickmenu_wrap");
  const stickyNav = document.querySelector(".project_sticky_nav");

  if (window.scrollY === 0) {
    header?.classList.remove("scroll-up");
    quickmenu?.classList.remove("scroll-down");
    stickyNav?.classList.remove("scroll-up");
    document.body.classList.add("scroll-zero");
    document.body.classList.remove("scroll-has");
  } else {
    document.body.classList.add("scroll-has");
    document.body.classList.remove("scroll-zero");
  }
}

function noFixed() {
  const footer = document.querySelector("#footer");
  if (!footer) return;

  const interactive = document.querySelector(".interactive");
  const quickmenu = document.querySelector(".quickmenu_wrap");
  const stickyNav = document.querySelector(".project_sticky_nav");

  const footerHeight =
    footer.offsetHeight + (interactive ? interactive.offsetHeight : 0);
  const stopPoint =
    document.documentElement.scrollHeight - window.innerHeight - footerHeight;

  if (window.scrollY >= stopPoint) {
    quickmenu?.classList.add("no-fixed");
    stickyNav?.classList.add("hidden");
  } else {
    quickmenu?.classList.remove("no-fixed");
    stickyNav?.classList.remove("hidden");
  }
}

window.popOpen = function popOpen(layerName) {
  const layer = document.getElementById("pop_" + layerName);
  if (!layer) return;
  document.body.classList.add("prevent-scroll");
  fadeIn(layer);
};
window.popClose = function popClose(layerName) {
  const layer = document.getElementById("pop_" + layerName);
  if (!layer) return;
  document.body.classList.remove("prevent-scroll");
  fadeOut(layer);
};

window.alertOpen = function alertOpen(layerName) {
  const layer = document.getElementById("alert_" + layerName);
  if (!layer) return;
  document.body.classList.add("prevent-scroll");
  fadeIn(layer);
};
window.alertClose = function alertClose(layerName) {
  const layer = document.getElementById("alert_" + layerName);
  if (!layer) return;
  document.body.classList.remove("prevent-scroll");
  fadeOut(layer);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
