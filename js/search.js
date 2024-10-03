/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";


// IMPORT...

import { ripple } from "./utils/ripple.js"; 
import { addEventOnElements } from "./utils/event.js"; 
import { segment } from "./segment_btn.js";
import { updateUrl } from "./utils/updateUrl.js";
import { urlDecode } from "./utils/urlDecode.js";

//-----------------------------------------------------------------------------------------------
//? Search view toggler in small devices...

const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const searchView = document.querySelector("[data-search-view]");

addEventOnElements(searchTogglers, "click", () => searchView.classList.toggle("show"));


//-----------------------------------------------------------------------------------------------------
//? Search clear...

const searchField = document.querySelector("[data-search-field]");
const searchClearBtn = document.querySelector("[data-search-clear-btn]");

searchClearBtn.addEventListener("click", () => searchField.value = "");


//-----------------------------------------------------------------------------------------------------
//? Search type...

const searchSegment = document.querySelector("[data-segment='search']");

const activeSegmentBtn = searchSegment.querySelector("[data-segment-btn].selected");

window.searchType = activeSegmentBtn.dataset.segmentValue;

segment(searchSegment, segmentValue => window.searchType = segmentValue);


//-----------------------------------------------------------------------------------------------------
//? Search Submit...

const searchBtn = document.querySelector("[data-search-btn]");

searchBtn.addEventListener("click", function(){
      const searchValue = searchField.value.trim();
      console.log(searchValue);

      if(searchValue) {
            updateSearchHistory(searchValue);
            window.filterObj.query = searchValue;
            updateUrl(window.filterObj, window.searchType)
      }
});

//? Submit search when press on "Enter" key...

searchField.addEventListener("keydown", (e) => {
      if( e.key === "Enter" && searchField.value.trim()) {
            searchBtn.click();
      }
})



//-----------------------------------------------------------------------------------------------------
// //? search History...

// //? Initial search History...

let searchHistory = { items: [] };

if(window.localStorage.getItem("searchPrevHistory")) {
      searchHistory = JSON.parse(window.localStorage.getItem("searchPrevHistory"));
} else {
      window.localStorage.setItem("searchPrevHistory", JSON.stringify(searchHistory));
}

// * If the searched value is already present in search list
// * then remove that one and add the search value at the beginning of the search list
// * This ensures that the most recent search is at the top of the history


// //? Update search History...

const updateSearchHistory = searchValue => {
      if(searchHistory.items.includes(searchValue)){
            searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
      }

      searchHistory.items.unshift(searchValue);

      window.localStorage.setItem("searchPrevHistory", JSON.stringify(searchHistory));

}


//-----------------------------------------------------------------------------------------------------
//? RENDER search history items in search list...

const searchList = document.querySelector("[data-search-list]");

const historyLen = searchHistory.items.length ;

for ( let i = 0; i< historyLen & i <= 5 ; i++ ) {
      const listItem = document.createElement("button");

      listItem.classList.add("list-item");
      listItem.innerHTML = `
            <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>

            <span class="body-large text">${searchHistory.items[i]}</span>

            <div class="state-layer"></div>
      `;

      ripple(listItem);

      listItem.addEventListener("click", function() {
            searchField.value = this.children[1].textContent;
            searchBtn.click();
      })

      searchList.appendChild(listItem);
}

//-----------------------------------------------------------------------------------------------------
//? Show searched value in search field after reload...

const /* {Object} */ search = urlDecode(window.location.search.slice(1)); 

if (search.query) {
      searchField.value = search.query;
}