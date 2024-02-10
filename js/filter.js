"use strict";

import { menu } from "./menu.js";

export const filter = (filterWrapper, filterObj, callback) => {

      const /* Node element */ filterClearBtn = filterWrapper.querySelector("[data-filter-clear]");
      const /* Node element */ filterValue = filterWrapper.querySelector("[data-filter-value]");
      const /* Node element */ filerClip = filterWrapper.querySelector("[data-filter-clip]");
      const /* Node element */ filterColorField = filterWrapper.querySelector("[data-color-field]");
      const /* String */ filterKey = filterWrapper.dataset.filter;
      const /* Object */ newObj = filterObj;

      menu(filterWrapper, (filtersValue) => {
            filterValue.innerText = filtersValue;
            filerClip.classList.add("selected");

            newObj[filterKey] = filtersValue;
            callback(newObj);
      });

      filterClearBtn.addEventListener("click", () => {
            filerClip.classList.remove("selected");
            filterValue.innerText = filterValue.dataset.filterValue;

            delete newObj[filterKey];
            callback(newObj);
      });

      filterColorField?.addEventListener("change", function() {
            const /* String */ filtersValue = this.value.toLowerCase();

            filterValue.innerText = filtersValue;
            filerClip.classList.add("selected");

            newObj[filterKey] = filtersValue;
            callback(newObj);
      });
}