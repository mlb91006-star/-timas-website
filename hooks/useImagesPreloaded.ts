"use client";

import { useEffect, useState } from "react";

/**
 * Preloads a list of image URLs and reports true once every one has
 * settled (loaded or errored) — a single broken file never blocks this
 * forever. Pass a stable array reference (module-level constant or
 * useMemo); a new array identity every render restarts the preload.
 */
export function useImagesPreloaded(srcs: string[]): boolean {
  const [loaded, setLoaded] = useState(srcs.length === 0);

  useEffect(() => {
    if (srcs.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoaded(true);
      return;
    }

    let cancelled = false;
    let remaining = srcs.length;
    setLoaded(false);

    const settle = () => {
      remaining -= 1;
      if (remaining <= 0 && !cancelled) setLoaded(true);
    };

    const images = srcs.map((src) => {
      const img = new Image();
      img.onload = settle;
      img.onerror = settle;
      img.src = src;
      return img;
    });

    return () => {
      cancelled = true;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [srcs]);

  return loaded;
}
