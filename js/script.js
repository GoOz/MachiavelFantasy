// Elements
const menuButton = document.querySelector(".burger");
const nav = document.querySelector("nav");

// Events
menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
});
