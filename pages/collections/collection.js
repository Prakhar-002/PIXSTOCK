/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

import { client } from "../../js/api_configure.js";
import { collectionCardMaker } from "../../js/collection_card.js";



//------------------------------------------------
//? Render featured collection...


const /* {Node element} */ collectionGrid = document.querySelector("[data-collection-grid]");
const /* {Number} */ perPage = 36;
let /* {Number} */ currentPage = 1;
let /* {Number} */ totalPage = 0;


const loadCollection = function (page) {

      client.collections.featured({ per_page: perPage, page: page }, (data) => {

            totalPage = Math.ceil(data.total_results / perPage);

            data.collections.forEach((collection) => {

                  const /* {Node element} */ collectionCard = collectionCardMaker(collection);

                  collectionGrid.appendChild(collectionCard);

            });

            isLoaded = true;
            (currentPage >= totalPage) && (loader.style.display = "none");

      });

}

loadCollection(currentPage);


//------------------------------------------------
//? Load more collection...

const /* {Node element} */ loader = document.querySelector("[data-loader]");
let /* {boolean} */ isLoaded = false;

const loadMore = function (){
      if (loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded) {

            currentPage++;
            loadCollection(currentPage);
            isLoaded = false;

      }
}

window.addEventListener("scroll", loadMore)