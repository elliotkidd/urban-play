"use client";

import { useEffect, useRef, useState } from "react";

// Autoplaying background video that only starts downloading as it nears the
// viewport. A plain <video autoPlay> downloads the whole file on page load,
// even when it's at the bottom of the page and never seen.
export function LazyVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50% 0px" },
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={isNearViewport ? src : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
