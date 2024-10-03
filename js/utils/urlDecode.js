/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

export const urlDecode = (urlString) => {
      return Object.fromEntries(urlString.replace(/%23/g, "#").replace(/%20/g, " ").split("&").map(i => i.split("=")));
}