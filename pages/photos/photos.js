/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCardMaker } from "../../js/photo_card.js";
import { updateUrl } from "../../js/utils/updateUrl.js";
import { urlDecode } from "../../js/utils/urlDecode.js";
import { filter } from "../../js/filter.js";


//--------------------------------------------------------------------------
//? Show filter bar if searched anything...

const /* {Node element} */ filterBar = document.querySelector("[data-filter-bar]");

if (filterBar) {
      filterBar.style.display = window.location.search ? "flex" : "none";
}

//-------------------------
//? INIT FILTER...

const /* NodeList */ filterWrappers = document.querySelectorAll("[data-filter]");

filterWrappers.forEach((filterWrapper) => {
      filter(filterWrapper, window.filterObj, (newObj) => {
            window.filterObj = newObj;
            updateUrl(newObj, "photos");
      });
});

// Render curated or searched photos
// If search something then render search photos
// Otherwise render curated photos  

const /* {Node Elements} */ photoGrid = document.querySelector("[data-photo-grid]");

const /* {Node Elements} */ title = document.querySelector("[data-title]");
const /* Object */ photoGridObj = gridInit(photoGrid);
const /* Number */ perPage = 30;
let /* Number */ currentPage = 1;
let /* Number */ totalPage = 0;
const /* String */ searchUrl = window.location.search.slice(1);
let /* Object */ searchObj = searchUrl && urlDecode(searchUrl);
const /* String */ titleName = searchObj ? `${searchObj.query} Photos` : "Curated Photos" ;

title.textContent = titleName;
document.titleName = titleName;

//? Render all photos

const renderPhotos = function (currentPage) {

      client.photos[searchObj ?"search" : "curated"]({ ...searchObj, per_page: perPage, page: currentPage }, (data) => {

            totalPage =Math.ceil(data.total_results  / perPage);

            data.photos.forEach(photo => {

                  const photoCard = photoCardMaker(photo);

                  updateGrid(photoCard, photoGridObj.columnsHeight, photoGridObj.columns);

            });

            // when photos loaded...
            isLoader = true;

            // when no more photo found , hide loader...
            if (currentPage >= totalPage) {
                  loader.style.display = "none";
            }


      });

}

renderPhotos(currentPage);

//--------------------------------------------------------------------------------
//? Load more pages...

const /* Node Elements */ loader = document.querySelector("[data-loader]");

let /*Boolean */ isLoader = true;

window.addEventListener("scroll", function() {

      if (loader.getBoundingClientRect().top < (this.window.innerHeight * 2) && currentPage <= totalPage && isLoader) {
            currentPage++;
            renderPhotos(currentPage);
            isLoader = false;
      }
});
