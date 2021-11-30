const mainNav = document.querySelector(".header");
window.onscroll = function () {
  windowScroll();
};
function windowScroll() {
  const header = document.querySelector(".header__menu-btn");
  if (header.classList.contains("header__menu-btn--active")) {
  } else
    mainNav.classList.toggle(
      "header--active",
      mainNav.scrollTop > 50 || document.documentElement.scrollTop > 50
    );
}

document.querySelector(".header__menu-btn").onclick = function () {
  document
    .querySelector(".header__menu-btn")
    .classList.toggle("header__menu-btn--active");
  document.querySelector(".header").classList.toggle("header--active");
  document
    .querySelector(".menu__items")
    .classList.toggle("menu__items--active");
};

document.querySelector(".menu__item-link").onclick = function () {
  document
    .querySelector(".menu__item-link")
    .classList.remove("menu__item-link--active");
};
document.querySelector(".menu__item-link").onclick = function () {
  document.querySelector(this).add("menu__item-link--active");
  document
    .querySelector(".header__menu-btn")
    .classList.toggle("header__menu-btn--active");
  document
    .querySelector(".menu__items")
    .classList.toggle("menu__items--active");
};

function checkCookies() {
  let cookieDate = localStorage.getItem("cookieDate");
  let cookieNotification = document.querySelector(".footer__cookie");
  let cookieBtn = cookieNotification.querySelector(".footer__cookie-argee");
  if (!cookieDate || +cookieDate + 31536000000 < Date.now()) {
    cookieNotification.classList.remove("footer__cookie--disable");
  }
  cookieBtn.addEventListener("click", function () {
    localStorage.setItem("cookieDate", Date.now());
    cookieNotification.classList.add("footer__cookie--disable");
  });
}
checkCookies();


