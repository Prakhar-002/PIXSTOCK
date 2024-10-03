/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { segment } from "../../js/segment_btn.js";
import { photoCardMaker } from "../../js/photo_card.js";
import { videoCardMaker } from "../../js/video_card.js";





//------------------------------------------------------
//? favorite segment button...


const /* {NodeElement} */ favoriteSegment = document.querySelector("[data-segment='favorite']");
let /* {String} */ favType = "photos";

segment(favoriteSegment, segmentValue => {
      favType = segmentValue;

      favGrid.innerHTML = "";
      favGridObj = gridInit(favGrid);
      loadFav(favType, favGridObj);
});

//------------------------------------------------------
//? Load favorite item...



const /* {NodeElement} */  favGrid = document.querySelector("[data-fav-grid]");
let favGridObj = gridInit(favGrid);
const favData = JSON.parse(window.localStorage.getItem("favorite"));


const loadFav = function (type, favGridItem) {

      Object.values(favData[type]).forEach(item => {

            let /* {Node element} */ card;

            switch(type) {
                  case "photos":
                        card = photoCardMaker(item);
                        break;
                  case "videos":
                        card = videoCardMaker(item);
                        break;
            }

            updateGrid(card, favGridItem.columnsHeight, favGridItem.columns)


      }); 

}

loadFav(favType, favGridObj)
