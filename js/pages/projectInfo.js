// projectInfo.js
function keywordAnimate() {
  const keywords = document.querySelectorAll(".project_info_keyword .keyword");

  keywords.forEach((keyword) => {
    if (getComputedStyle(keyword).opacity === "1") {
      keyword
        .querySelectorAll(".shape")
        .forEach((shape) => shape.classList.add("running"));
    }
  });
}

keywordAnimate();
window.addEventListener("load", keywordAnimate);
window.addEventListener("scroll", keywordAnimate);
