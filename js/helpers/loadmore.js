// loadmore.js
import { fadeOut } from "./anim.js";

export function initLoadmore(itemSelector, step, onFinish) {
  const items = document.querySelectorAll(itemSelector);
  if (!items.length) return;

  document
    .querySelectorAll(itemSelector + ":nth-child(n + " + (step + 1) + ")")
    .forEach((item) => item.classList.add("is-hidden"));

  const button = document.querySelector(".loadmore_button");
  if (!button) return;

  button.addEventListener("click", () => {
    const hidden = document.querySelectorAll(itemSelector + ".is-hidden");

    Array.from(hidden)
      .slice(0, step)
      .forEach((item) => {
        item.classList.remove("is-hidden");
        item.classList.add("is-show");
      });

    if (document.querySelectorAll(itemSelector + ".is-hidden").length === 0) {
      const loadmore = document.querySelector(".loadmore");
      if (loadmore) fadeOut(loadmore);
      if (onFinish) onFinish();
    }
  });
}
