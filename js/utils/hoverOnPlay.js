"use strict";



export const hoverOnPlay = function (card) {

      const cardVideo = card.querySelector("[data-video]");

      const cardBadge = card.querySelector("[data-card-badge]");

      let isPlaying = false;

      let /* Function */ playTimeOut;

      card.addEventListener("pointerover", function () {
            playTimeOut = setTimeout(() => {
                  cardBadge.style.display = "none";

                  cardVideo.play().then((res) => {
                        isPlaying = true;
                  }).catch((err) => {
                        isPlaying = false;
                  })
            }, (500));

            card.addEventListener("pointerout", function() {

                  playTimeOut && clearTimeout(playTimeOut);

                  cardBadge.style.display = "grid";

                  if (isPlaying) {
                        cardVideo.pause();
                  }

            });
      });

}