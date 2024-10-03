/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

export const urlEncode = (urlObj) => {
      return Object.entries(urlObj).join("&").replace(/,/g, "=").replace(/#/g, "%23");
}