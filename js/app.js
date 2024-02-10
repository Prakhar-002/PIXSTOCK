"use strict";

import { client } from "./api_configure.js";
import { photoCardMaker } from "./photo_card.js";
import { gridInit, updateGrid } from "./utils/masonry_grid.js";
import { videoCardMaker } from "./video_card.js";
import { collectionCardMaker } from "./collection_card.js";



const /* Node Element */ photoGrid = document.querySelector("[data-photo-grid]");

photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18)


client.photos.curated({ page : 1, per_page: 20 }, (data) => {
      // console.log(data);
      photoGrid.innerHTML = "";

      const photoGridObj = gridInit(photoGrid);

      data.photos.forEach(photo => {
            const photoCard =  photoCardMaker(photo);

            updateGrid(photoCard, photoGridObj.columnsHeight, photoGridObj.columns);
      });
});

//-----------------------------------------------------------------------------------
//? Render Popular video...

const /* Node Element */ videoGrid = document.querySelector("[data-video-grid]");

videoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18)

client.videos.popular({per_page: 20}, (data) => {

      videoGrid.innerHTML = "";

      const /** Object */ videoGridObj = gridInit(videoGrid);

      data.videos.forEach((video) => {
            const /** Node Element */ videoCard = videoCardMaker(video);

            updateGrid(videoCard, videoGridObj.columnsHeight, videoGridObj.columns);
      });

});

//--------------------------------------------------------------------------------------------
//? Render collections in home page...

const /* Node Elements */ collectionGrid = document.querySelector("[data-collection-grid]");

client.collections.featured({ per_page: 18 }, (data) => {

      data.collections.forEach((collection) => {

            const /* Node Elements */ collectionCard = collectionCardMaker(collection);

            collectionGrid.appendChild(collectionCard);

      })

});