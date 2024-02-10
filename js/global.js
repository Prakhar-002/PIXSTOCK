"use strict";

// IMPORT

import { ripple } from "./utils/ripple.js"; 
import { addEventOnElements } from "./utils/event.js";
import { urlDecode } from "./utils/urlDecode.js";





// HEADER on-scroll-state

// NODE ELEMENT
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
      header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});


// ADD RIPPLE EFFECT...

const rippleElements = document.querySelectorAll("[data-ripple]"); 

rippleElements.forEach(rippleElem => ripple(rippleElem));



//? NAVBAR toggler for mobile user...

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navigation]");
const scrim = document.querySelector("[data-scrim]");

addEventOnElements(navTogglers, "click", function() {
      navbar.classList.toggle("show");
      scrim.classList.toggle("active");
});







// FILTER functionality...

window.filterObj = {} ;

// Show all filter option after reload...


if (window.location.search.slice(1)) {

      const search = urlDecode(window.location.search.slice(1));

      Object.entries(search).forEach((item) => {
            const /* String */ filterKey = item[0];
            const /* String */ filtersValue = item[1]; 
            window.filterObj[filterKey] = filtersValue;

            if (filterKey !== "query") {
                  const /* Node elements */ filterItem = document.querySelector(`[data-filter="${filterKey}"]`);
                  filterItem?.querySelector("[data-filter-clip]").classList.add("selected");

                  if (filterItem) {
                        filterItem.querySelector("[data-filter-value]").innerText = filtersValue;
                  }
            }
      });
}


// Initial Favorite object in local storage...

if (!window.localStorage.getItem("favorite")) {
      const favoriteObj = {
            photos : {},
            videos : {},
      }

      window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
}

// Page Transition...

window.addEventListener("loadstart", function () {
      document.body.style.opacity = "0";
});

window.addEventListener("DOMContentLoaded", function () {
      document.body.style.opacity = "1";
});









