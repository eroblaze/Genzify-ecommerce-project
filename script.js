const cart = document.querySelector(".cart");
const close_cart = document.querySelector(".close_cart");

cart.addEventListener("click", () => {
  document.querySelector(".cart_menu").classList.add("slide");
});

close_cart.addEventListener("click", () => {
  document.querySelector(".cart_menu").classList.remove("slide");
});
