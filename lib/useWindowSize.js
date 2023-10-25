import { useState, useEffect } from "react";
import { debounce as _debounce } from "lodash";

const isClient = typeof window !== "undefined";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
    orientation: isClient && window.innerWidth > window.innerHeight ? "l" : "p",
  });

  useEffect(() => {
    const onResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        orientation: window.innerWidth > window.innerHeight ? "l" : "p",
      });
    };

    onResize();
    const onResizeDebounced = _debounce(onResize, 222);
    window.addEventListener("resize", onResizeDebounced);

    return () => {
      onResizeDebounced.cancel();
      window.removeEventListener("resize", onResizeDebounced);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
