import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ScrollingImages.module.scss";
import useWindowSize from "../../lib/useWindowSize";
import ScrollingImagesManager from "./ScrollingImagesManager";

const Image = ({ url, metadata, width }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      onLoad={() => setIsLoaded(true)}
      className={styles.image}
      src={`${url}?w=${width}`}
      data-aspect-ratio={metadata.dimensions.aspectRatio}
      style={{
        aspectRatio: `${metadata.dimensions.aspectRatio}/1`,
        opacity: isLoaded ? 1 : 0,
      }}
    />
  );
};

const ScrollingImages = ({ images }) => {
  const { width, orientation } = useWindowSize();

  const quantize = (n, q) => Math.floor(n / q) * q;

  const imageWidth = useMemo(() => {
    if (orientation === "p")
      return quantize(Math.ceil(width * 0.75) * window.devicePixelRatio, 100);
    return quantize(Math.ceil(width * 0.33) * window.devicePixelRatio, 100);
  }, [width]);
  const containerRef = useRef(null);

  useEffect(() => {
    new ScrollingImagesManager(containerRef.current);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {images.map(({ _key, asset }) => (
        <Image key={_key} {...asset} width={imageWidth} />
      ))}
    </div>
  );
};

export default ScrollingImages;
