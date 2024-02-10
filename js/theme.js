
"use strict";

// NODE ELEMENT

const $html = document.documentElement;

// boolean
let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if(sessionStorage.getItem("theme")) {
      $html.dataset.theme = sessionStorage.getItem("theme");
}else { 
      $html.dataset.theme = isDark ? "dark" : "light";
}

const changeTheme = function () {
      isDark = sessionStorage.getItem("theme");
      sessionStorage.setItem("theme", isDark === "light" ? "dark" : "light");
      $html.dataset.theme = sessionStorage.getItem("theme");
}

window.addEventListener("load", () => {
      const $themeBtn = document.querySelector("[data-theme-toggler]");

      $themeBtn.addEventListener("click", changeTheme);

});