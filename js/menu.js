/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

import { addEventOnElements } from "./utils/event.js";

export const menu = function (menuWrapper, callback) {
      const /* Node Element */ menu = menuWrapper.querySelector("[data-menu]");
      const /* Node List */ menuTogglers = menuWrapper.querySelectorAll("[data-menu-toggler]");
      const /* Node List */ menuItems = menuWrapper.querySelectorAll("[data-menu-item]");

      addEventOnElements(menuTogglers, "click", () => {
            menu.classList.toggle("expanded");
      });

      addEventOnElements(menuItems, "click", function() {
            menu.classList.remove("expanded");
            if (callback) {
                  callback(this.dataset.menuItem);
            }
      });

}