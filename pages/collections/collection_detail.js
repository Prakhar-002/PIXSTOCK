/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCardMaker } from "../../js/photo_card.js";
import { videoCardMaker } from "../../js/video_card.js";
import { urlDecode } from "../../js/utils/urlDecode.js";


//-------------------------------------------------------------
//? Render collections...


const /* {Node element} */ collectionGrid = document.querySelector("[data-collection-grid]");
const /* {Node Elements} */ title = document.querySelector("[data-title]");
const /* Object */ collectionGridObj = gridInit(collectionGrid);
const /* Number */ perPage = 30;
let /* Number */ currentPage = 1;
let /* Number */ totalPage = 0;
// const /* Array */ collectionEntries = window.location.search.slice(1).replace(/%20/g, " ").split("&").map(i => i.split("="));
const /* Object */ collectionObj = urlDecode(window.location.search.slice(1));

title.textContent = `${collectionObj.title} Collections`;
document.title = `${collectionObj.title} Collections`;

const loadCollection = function (page) {

      client.collections.detail(collectionObj.collectionId, { per_page: perPage, page: page }, (data) => {

            totalPage =Math.ceil(data.total_results  / perPage);

            data.media.forEach((item) => {

                  let /* {Node Element} */ card;

                  switch (item.type.toLowerCase()) {
                        case "photo": 
                              card = photoCardMaker(item);
                              break; 
                        case "video":
                              card = videoCardMaker(item);
                              break;
                  }

                  updateGrid(card, collectionGridObj.columnsHeight, collectionGridObj.columns);

                  isLoader = true;

                  if (currentPage >= totalPage) {
                        loader.style.display = "none";
                  }

            });

      })

}

loadCollection(currentPage);

//--------------------------------------------------------------------------------
//? Load more Collection...

const /* Node Elements */ loader = document.querySelector("[data-loader]");

let /*Boolean */ isLoader = true;

window.addEventListener("scroll", function() {

      if (loader.getBoundingClientRect().top < (this.window.innerHeight * 2) && currentPage <= totalPage && isLoader) {
            currentPage++;
            loadCollection(currentPage);
            isLoader = false;
      }
});
