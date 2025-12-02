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

      // Restart Lenis - use multiple attempts for mobile reliability
      // Always try to restart after route change (we stop it on navigation)
      const restartLenis = () => {
        if (!lenis) return;
        
        try {
          lenis.start();
          isStoppedRef.current = false;
        } catch (e) {
          // If start fails, it might already be running - that's okay
        }
      };

      // Try restarting after a short delay
      const timeoutId1 = setTimeout(restartLenis, 150);
      
      // Also try after a longer delay for mobile (view transitions can be slower)
      const timeoutId2 = setTimeout(restartLenis, 500);

      // Also try on next frame as fallback
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          restartLenis();
        });
      });

      previousPathname.current = pathname;

      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
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

