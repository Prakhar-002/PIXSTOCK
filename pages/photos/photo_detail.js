/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

import { client } from "../../js/api_configure.js";
import { ripple } from "../../js/utils/ripple.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCardMaker } from "../../js/photo_card.js";
import { menu } from "../../js/menu.js";
import { favorite } from "../../js/favorite.js";

//------------------------------------------------------
//? ADD RIPPLE EFFECT...

const rippleElements = document.querySelectorAll("[data-ripple]"); 

rippleElements.forEach(rippleElem => ripple(rippleElem));



//------------------------------------------------------
//? Page Transition...

window.addEventListener("loadstart", function () {
      document.body.style.opacity = "0";
});

window.addEventListener("DOMContentLoaded", function () {
      document.body.style.opacity = "1";
});


//------------------------------------------------------
//? Menu toggler

const /* Node element */ menuWrappers = document.querySelectorAll("[data-menu-wrapper]");

menuWrappers.forEach((menuWrapper) => {
      menu(menuWrapper);
});

//------------------------------------------------------
//? Add to Favorite...

const /* Object */ favoritePhotos = JSON.parse(window.localStorage.getItem("favorite")).photos;
const /* Node Elements */ favoriteBtn = document.querySelector("[data-add-favorite]");
const /* String */ photoId = window.location.search.split("=")[1];

favoriteBtn.classList[favoritePhotos[photoId]? "add" : "remove"]("active");

favorite(favoriteBtn, "photos", photoId);

//------------------------------------------------------
//? Render detail data...


const /* Node Elements */ detailWrapper = document.querySelector("[data-detail-wrapper]");
const /* Node Elements */ downloadLink = document.querySelector("[data-download-link]");
const /* Node Elements */ downloadMenu = document.querySelector("[data-download-menu]");

client.photos.detail(photoId, (data) => {

      const {
            avg_color,
            alt,
            height,
            width,
            photographer,
            src
      } = data;

      downloadLink.href = src.original;

      Object.entries(src).forEach((item) => {
            const [key, value]  = item;

            downloadMenu.innerHTML += `
                  <a href="${value}" download class="menu-item" data-ripple data-menu-item>
                        <span class="label-large text">${key}</span>

                        <div class="state-layer"></div>
                  </a>
            `;


      });

      detailWrapper.innerHTML = `
            <figure class="detail-banner" style="aspect-ratio: ${width} / ${height}; background-color: ${avg_color};">
                  <img src="${src.large2x}" 
                  width=" ${width}" 
                  height=" ${height}" 
                  alt="${alt}" 
                  class="img-cover">
            </figure>

            <p class="title-small">Photograph by <span class="color-primary">${photographer}</span></p>

      `;


      const /* Node element */ detailImg = detailWrapper.querySelector("img");

      detailImg.style.opacity = 0;

      detailImg.addEventListener("load", function() {

            this.animate( {
                  opacity:1
            }, { duration: 400, fill: "forwards" });

            if (alt) {
                  client.photos.search({ query: alt, page: 1, per_page: 45 }, (data) => {
                        loadSimilar(data);
                  });
            } else {
                  loader.style.display = "none";
                  photoGrid.innerHTML = `<p class="no-similar">No similar photo found.</p>`
            }

      });
});

//------------------------------------------------------
//? Load Similar photo...

const /* NodeElement */ photoGrid = document.querySelector("[data-photo-grid]");
const /* Object */ photoGridObj = gridInit(photoGrid);
const /* NodeElement */ loader = document.querySelector("[data-loader]");



const loadSimilar = function (data) {

      data.photos.forEach((photo) => {
            const /* NOde element */ card = photoCardMaker(photo);

            updateGrid(card, photoGridObj.columnsHeight, photoGridObj.columns);

            loader.style.display = "none";
      });

}