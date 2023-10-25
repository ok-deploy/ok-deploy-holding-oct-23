class ScrollingImage {
  ignoreSetPosition = false;
  constructor(image) {
    this.image = image;
    const rect = this.image.getBoundingClientRect();
    this.position = rect.y;
    this.height = rect.height;
  }

  update(velocity, totalHeight) {
    this.position += velocity;
    if (this.position < -this.height) {
      this.position += totalHeight;
    } else if (this.position > window.innerHeight) {
      this.position -= totalHeight;
    }
    this.setPosition();
  }

  onResize() {
    this.image.style.position = "";
    this.image.style.transform = "";
    this.ignoreSetPosition = true;
    requestAnimationFrame(() => {
      const rect = this.image.getBoundingClientRect();
      this.position = rect.y;
      this.height = rect.height;
      this.ignoreSetPosition = false;
    });
  }

  setPosition() {
    if (this.ignoreSetPosition) return;
    this.image.style.position = "absolute";
    this.image.style.top = "0px";
    this.image.style.left = "50%";
    this.image.style.willChange = "transform";
    this.image.style.pointerEvents = "none";
    this.image.style.transform = `translate(-50%, ${this.position}px)`;
  }
}

export default ScrollingImage;
