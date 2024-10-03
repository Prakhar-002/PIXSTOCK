/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { videoCardMaker } from "../../js/video_card.js";
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
            updateUrl(newObj, "videos");
      });
});

// Render Popular or searched video
// If search something then render search video
// Otherwise render Popular video  

const /* {Node Elements} */ videoGrid = document.querySelector("[data-video-grid]");

const /* {Node Elements} */ title = document.querySelector("[data-title]");
const /* Object */ videoGridObj = gridInit(videoGrid);
const /* Number */ perPage = 30;
let /* Number */ currentPage = 1;
let /* Number */ totalPage = 0;
const /* String */ searchUrl = window.location.search.slice(1);
let /* Object */ searchObj = searchUrl && urlDecode(searchUrl);
const /* String */ titleName = searchObj ? `${searchObj.query} Videos` : "Popular Videos" ;

title.textContent = titleName;
document.titleName = titleName;

//? Render all photos

const renderVideos = function (currentPage) {

      client.videos[searchObj ?"search" : "popular"]({ ...searchObj, per_page: perPage, page: currentPage }, (data) => {

            totalPage = Math.ceil(data.total_results  / perPage);

            data.videos.forEach(video => {

                  const videoCard = videoCardMaker(video);

                  if (!videoCard) {
                        // when no more video found , hide loader...
                        loader.style.display = "none";
                  }

                  updateGrid(videoCard, videoGridObj.columnsHeight, videoGridObj.columns);

            });

            // when videos loaded...
            isLoader = true;

            // when no more video found , hide loader...
            if (currentPage >= totalPage) {
                  loader.style.display = "none";
            }


      });

}

renderVideos(currentPage);

//--------------------------------------------------------------------------------
//? Load more videos...

const /* Node Elements */ loader = document.querySelector("[data-loader]");

let /*Boolean */ isLoader = true;

window.addEventListener("scroll", function() {

      if (loader.getBoundingClientRect().top < (this.window.innerHeight * 2) && currentPage <= totalPage && isLoader) {
            currentPage++;
            renderVideos(currentPage);
            isLoader = false;
      }
})
