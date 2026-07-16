import { slideDown, slideUp } from "../helpers/anim.js";

function init() {
  const titles = document.querySelectorAll(".recruit_board_article > .title_wrap");

  titles.forEach((title) => {
    title.addEventListener("click", () => {
      const content = title.nextElementSibling;
      const isOpen = title.classList.contains("active");

      titles.forEach((other) => {
        if (other === title) return;
        const otherContent = other.nextElementSibling;
        if (otherContent && otherContent.style.display !== "none") {
          other.classList.remove("active");
          otherContent.classList.remove("active");
          slideUp(otherContent);
        }
      });

      if (isOpen) {
        title.classList.remove("active");
        content.classList.remove("active");
        slideUp(content);
      } else {
        title.classList.add("active");
        content.classList.add("active");
        slideDown(content);
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
