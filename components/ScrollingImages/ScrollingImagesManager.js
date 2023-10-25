import { debounce } from "lodash";
import ScrollingImage from "./ScrollingImage";

class ScrollingImagesManager {
  raf = null;
  then = Date.now();
  prevTouchY = null;
  scrollY = 0;
  opacity = 0;

  constructor(container) {
    this.container = container;
    this.update = this.update.bind(this);
    this.animate = this.animate.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.images = [...container.querySelectorAll("img")].map(
      (image) => new ScrollingImage(image)
    );
    this.totalHeight =
      this.images.reduce((total, image) => {
        return total + image.height;
      }, 0) +
      this.images.length * 48; // padding
    this.raf = requestAnimationFrame(this.animate);
    window.addEventListener("wheel", this.onWheel, { passive: true });
    window.addEventListener("touchmove", this.onTouchMove, { passive: true });
    window.addEventListener("touchend", this.onTouchEnd, { passive: true });
    window.addEventListener("resize", debounce(this.onResize.bind(this), 99));
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
        this.images.length * 48; // padding
    });
  }

  onTouchMove(e) {
    const MAX = 20;
    if (this.prevTouchY !== null) {
      let deltaY = e.touches[0].clientY - this.prevTouchY;
      if (deltaY < -MAX) deltaY = -MAX;
      if (deltaY > MAX) deltaY = MAX;
      this.scrollY += deltaY * 0.15;
    }

    this.prevTouchY = e.touches[0].clientY;
  }

  onTouchEnd(e) {
    this.prevTouchY = null;
  }

  onWheel(e) {
    this.scrollY -= e.deltaY * 0.008;
  }

  update() {
    const delta = Date.now() - this.then;
    this.then = Date.now();
    const correction = Math.min(delta / 16.66, 4);

    this.scrollY *= 1.0 - 0.06 * correction;
    if (Math.abs(this.scrollY) < 0.001) {
      this.scrollY = 0;
    }

    this.opacity += Math.abs(this.scrollY) * 0.0075;
    this.opacity *= 1.0 - 0.02 * correction;
    this.container.style.opacity = Math.min(this.opacity, 1);

    this.images.forEach((image) => {
      image.update(delta * -0.025 + this.scrollY, this.totalHeight);
    });
  }

  animate() {
    this.update();
    this.raf = requestAnimationFrame(this.animate);
  }
}

export default ScrollingImagesManager;
