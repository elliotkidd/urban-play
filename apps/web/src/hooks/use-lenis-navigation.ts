"use client";

import { useLenis } from "@/lib/lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Hook that handles Lenis scroll reset on navigation.
 * Call handleNavigation() in your link onClick handlers.
 * It stops Lenis animation, and scroll reset happens when route changes.
 */
export function useLenisNavigation() {
  const lenis = useLenis();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const isStoppedRef = useRef(false);

  // Reset scroll and restart Lenis when route changes
  useEffect(() => {
    if (pathname !== previousPathname.current) {
      // Reset scroll to top when route changes (during/after transition)
      requestAnimationFrame(() => {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
      });

      // Restart Lenis after a short delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        if (lenis && isStoppedRef.current) {
          lenis.start();
          isStoppedRef.current = false;
        }
      }, 100);

      previousPathname.current = pathname;

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [pathname, lenis]);

  // Only stop Lenis on click - don't scroll yet
  const handleNavigation = () => {
    if (lenis) {
      lenis.stop();
      isStoppedRef.current = true;
    }
  };

  return { handleNavigation };
}

