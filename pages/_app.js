import "../styles/globals.scss";
import { useEffect } from "react";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const initFavicon = () => {
      const head = document.head || document.getElementsByTagName("head")[0];

      const changeFavicon = (src) => {
        const link = document.createElement("link");
        const oldLink = document.getElementById("dynamic-favicon");

        link.id = "dynamic-favicon";
        link.rel = "shortcut icon";
        link.href = src;
        if (oldLink) {
          head.removeChild(oldLink);
        }
        head.appendChild(link);
      };

      const loadedDataSrcs = {};
      let currentFavicon = 0;
      let loaded = 0;
      const COUNT = 6;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const loop = () => {
        currentFavicon++;
        if (currentFavicon >= COUNT) currentFavicon = 0;
        changeFavicon(loadedDataSrcs[currentFavicon]);
        setTimeout(() => requestAnimationFrame(loop), 222);
      };

      for (let i = 1; i <= COUNT; i++) {
        const loadImage = new Image();
        loadImage.src = `/favicon/fav${i}.png`;
        loadImage.onload = function () {
          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;

          ctx.drawImage(this, 0, 0);
          loadedDataSrcs[i - 1] = canvas.toDataURL("image/png");
          loaded++;

          if (loaded === COUNT) {
            requestAnimationFrame(loop);
          }
        };
      }
    };

    requestAnimationFrame(initFavicon);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
