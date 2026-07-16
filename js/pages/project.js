import { initLoadmore } from "../helpers/loadmore.js";

function init() {
  initLoadmore(".project_item", 12);

  window.addEventListener("scroll", categoryFixed);

  const cursor = document.querySelector(".cursor");
  if (cursor) {
    document.querySelectorAll(".project_item_link").forEach((item) => {
      item.addEventListener("mouseover", () => cursor.classList.add("active"));
      item.addEventListener("mouseleave", () =>
        cursor.classList.remove("active"),
      );
    });
  }

  const categories = document.querySelectorAll(".category_list > li");
  categories.forEach((category) => {
    category.addEventListener("click", () => {
      categories.forEach((item) => item.classList.remove("active"));
      category.classList.add("active");
    });
  });
}

function categoryFixed() {
  const projectList = document.querySelector(".project_list");
  if (!projectList) return;

  const scrollTop = window.scrollY;
  const projectTop =
    projectList.getBoundingClientRect().top + window.scrollY + 50;
  const categoryBar = document.querySelector(".project_category");

  if (scrollTop >= projectTop) {
    categoryBar.classList.add("fixed");
    const headerDown = document
      .querySelector("#header")
      .classList.contains("scroll-down");
    document.querySelector(".project_category.fixed > .wrap").style.transform =
      headerDown ? "translateY(69px)" : "translateY(144px)";
  } else {
    categoryBar.classList.remove("fixed");
    document.querySelector(".project_category > .wrap").style.transform =
      "translateY(0px)";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
