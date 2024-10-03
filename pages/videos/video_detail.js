/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

import { client } from "../../js/api_configure.js";
import { ripple } from "../../js/utils/ripple.js";
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

const /* Object */ favoriteVideos = JSON.parse(window.localStorage.getItem("favorite")).videos;
const /* Node Elements */ favoriteBtn = document.querySelector("[data-add-favorite]");
const /* String */ videoId = window.location.search.split("=")[1];

favoriteBtn.classList[favoriteVideos[videoId]? "add" : "remove"]("active");

favorite(favoriteBtn, "videos", videoId);

//------------------------------------------------------
//? Render detail data...


const /* Node Elements */ detailWrapper = document.querySelector("[data-detail-wrapper]");
const /* Node Elements */ downloadLink = document.querySelector("[data-download-link]");
const /* Node Elements */ downloadMenu = document.querySelector("[data-download-menu]");

client.videos.detail(videoId, (data) => {

      console.log(data);

      const {
            height,
            width,
            image,
            avg_color,
            user: { name : author },
            video_files
      } = data;

      const hdVideo = video_files.find((item) => item.quality === "hd");

      const { file_type, link } = hdVideo;

      downloadLink.href = link;

      video_files.forEach((item) => {
            const {
                  width,
                  height,
                  quality,
                  link
            } = item;

            downloadMenu.innerHTML += `
                  <a href="${link}" download class="menu-item" >
                        <span class="label-large text">${quality.toUpperCase()}</span>

                        <span class="label-large trailing-text">${width}*${height}</span>

                        <div class="state-layer"></div>
                  </a>
            `;


      });

      detailWrapper.innerHTML = `
            <div class="detail-banner" style="aspect-ratio: ${width} / ${height}; background-color: ${avg_color};">
                  <video poster="${image}" controls class="img-cover" data-video>
                        <source src="${link}" type="${file_type}">
                  </video>
            </div>

            <p class="title-small">Video by <span class="color-primary">${author}</span></p>
      `;


});
