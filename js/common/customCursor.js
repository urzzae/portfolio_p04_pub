const mouseCursor = document.querySelector(".cursor");

if (mouseCursor) {
  window.addEventListener("mousemove", function (e) {
    mouseCursor.style.left = e.clientX + "px";
    mouseCursor.style.top = e.clientY + "px";
  });
}
