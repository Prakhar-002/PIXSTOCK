/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

export const addEventOnElements = function(elements, eventType, callback) {
      elements.forEach(element => {
            element.addEventListener(eventType, callback);
      });
}
