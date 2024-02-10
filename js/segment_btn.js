"use strict";

// IMPORT

import { addEventOnElements } from "./utils/event.js";


export const  segment = function ( segmentElm, callback ) {

      const segmentBtnS =  segmentElm.querySelectorAll("[data-segment-btn]");

      let lastSelectedSegmentBtn = segmentElm.querySelector("[data-segment-btn].selected");

      addEventOnElements(segmentBtnS, "click", function() {
            lastSelectedSegmentBtn.classList.remove("selected");
            this.classList.add("selected");
            lastSelectedSegmentBtn = this;
            callback(this.dataset.segmentValue);
      });

}