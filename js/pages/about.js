import { initLoadmore } from "../helpers/loadmore.js";

function init() {
  initLoadmore(".company_history_item", 6, () => {
    const timeline = document.querySelector(".company_history .timeline");
    const timelineActive = document.querySelector(".company_history .timeline_active");
    if (timeline) timeline.style.height = "100%";
    if (timelineActive) timelineActive.style.maxHeight = "100%";
  });

  new Swiper(".company_about_slide", {
    a11y: false,
    autoHeight: true,
    allowTouchMove: false,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    loopedSlides: 1,
    speed: 1500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".company_about_slide_pagination",
      clickable: true,
    },
  });

  const history = document.querySelector(".company_history > .wrap");
  const historyItems = document.querySelectorAll(".company_history > .wrap > ul > li");
  const timelineActive = document.querySelector(".timeline_active");
  if (!history) return;

  function updateHistory() {
    const midPoint = window.scrollY + window.innerHeight / 2;
    const historyTop = history.getBoundingClientRect().top + window.scrollY;

    if (midPoint >= historyTop) {
      timelineActive.style.height =
        (midPoint - historyTop + 50).toFixed(0) + "px";
    } else {
      timelineActive.style.height = "0px";
    }

    const firstItem = document.querySelector(".company_history_item");
    if (firstItem && getComputedStyle(firstItem).display === "none") return;

    historyItems.forEach((year) => {
      const yearTop = year.getBoundingClientRect().top + window.scrollY;
      year.classList.toggle("on", midPoint >= yearTop - 50);
    });
  }

  window.addEventListener("scroll", updateHistory);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
