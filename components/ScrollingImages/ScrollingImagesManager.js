import { debounce } from "lodash";
import ScrollingImage from "./ScrollingImage";

class ScrollingImagesManager {
  raf = null;
  then = Date.now();
  prevTouchY = null;
  scrollY = 0;
  deltaY = 0;
  opacity = 0;
  easeDeltaYToZero = false;

  constructor(container) {
    this.container = container;
    this.update = this.update.bind(this);
    this.animate = this.animate.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.images = [...container.querySelectorAll("img")].map(
      (image) => new ScrollingImage(image)
    );
    this.totalHeight =
      this.images.reduce((total, image) => {
        return total + image.height;
      }, 0) +
      this.images.length * this.getGap(); // padding
    this.raf = requestAnimationFrame(this.animate);
    window.addEventListener("wheel", this.onWheel, { passive: true });
    window.addEventListener("touchmove", this.onTouchMove, { passive: true });
    window.addEventListener("touchstart", this.onTouchStart, { passive: true });
    window.addEventListener("touchend", this.onTouchEnd, { passive: true });
    window.addEventListener("resize", debounce(this.onResize.bind(this), 99));
    this.onEndInteraction = debounce(this.onEndInteraction.bind(this), 999);
  }

  getGap() {
    return parseInt(getComputedStyle(this.container).gap);
  }

  onEndInteraction() {
    this.container.style.opacity = 0;
  }

  onResize() {
    this.opacity = 0;
    this.prevTouchY = null;
    this.scrollY = 0;
    this.images.forEach((image) => image.onResize());
    requestAnimationFrame(() => {
      this.totalHeight =
        this.images.reduce((total, image) => {
          return total + image.height;
        }, 0) +
        this.images.length * this.getGap(); // padding
    });
  }

  onTouchStart() {
    this.deltaY = 0;
  }

  onTouchMove(e) {
    this.easeDeltaYToZero = true;
    const MAX = 100;
    this.container.style.opacity = 1;
    if (this.prevTouchY !== null) {
      this.deltaY = (e.touches[0].clientY - this.prevTouchY) * -1.1;
      if (this.deltaY < -MAX) this.deltaY = -MAX;
      if (this.deltaY > MAX) this.deltaY = MAX;
      this.scrollY += this.deltaY * 0.15;
    }

    this.prevTouchY = e.touches[0].clientY;
    this.container.style.opacity = 1;
  }

  onTouchEnd(e) {
    this.prevTouchY = null;
    this.onEndInteraction();
  }

  onWheel(e) {
    const MAX = 100;
    this.easeDeltaYToZero = false;
    this.deltaY = e.deltaY;
    if (this.deltaY < -MAX) this.deltaY = -MAX;
    if (this.deltaY > MAX) this.deltaY = MAX;

    this.scrollY -= this.deltaY * 0.008;
    this.container.style.opacity = 1;
    this.onEndInteraction();
  }

  update() {
    const delta = Date.now() - this.then;
    this.then = Date.now();
    const correction = Math.min(delta / 16.66, 4);

    this.scrollY *= 1.0 - 0.06 * correction;
    if (Math.abs(this.scrollY) < 0.001) {
      this.scrollY = 0;
    }

    // this.opacity += Math.abs(this.scrollY) * 0.015;
    // this.opacity = Math.min(this.opacity, 1);
    // this.opacity *= 1.0 - 0.25 * correction;
    // this.container.style.opacity = Math.min(this.opacity, 1);

    this.images.forEach((image) => {
      // image.update(delta * -0.025 + this.deltaY * -1, this.totalHeight);
      image.update(this.deltaY * -1, this.totalHeight);
    });
    // if (this.deltaY > 0) {
    //   this.container.style.opacity = 1;
    // } else {
    //   this.container.style.opacity = 0;
    // }

    if (this.easeDeltaYToZero) {
      this.deltaY += 0 - this.deltaY * 0.03;
    } else {
      this.deltaY = 0;
    }
  }

  animate() {
    this.update();
    this.raf = requestAnimationFrame(this.animate);
  }
}

export default ScrollingImagesManager;
