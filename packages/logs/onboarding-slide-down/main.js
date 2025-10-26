const btn = document.getElementById("toggle");
const panel = document.querySelector(".panel");
btn?.addEventListener("click", () => {
  const open = panel?.classList.toggle("open");
  panel?.setAttribute("aria-hidden", String(!open));
});
