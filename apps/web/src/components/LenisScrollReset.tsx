"use client";

import { useLenis } from "@/lib/lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Component that fixes the issue where clicking a link while Lenis is animating
 * causes the new page to load at the wrong scroll position.
 *
 * This component:
 * 1. Listens to link clicks and immediately stops Lenis animation
 * 2. Listens to route changes and resets scroll to top when navigation occurs
 * 3. Restarts Lenis after the new route has mounted
 */
export function LenisScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const isStoppedRef = useRef(false);

  // Stop Lenis immediately when a link is clicked (before navigation)
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      // Only handle internal links (not external links or anchors)
      if (link && link.href) {
        try {
          const url = new URL(link.href);
          // If it's a same-origin link (not external), stop Lenis
          if (
            url.origin === window.location.origin &&
            url.pathname !== window.location.pathname
          ) {
            if (lenis) {
              lenis.stop();
              lenis.scrollTo(0, { immediate: true });
              isStoppedRef.current = true;
            }
            window.scrollTo(0, 0);
          }
        } catch {
          // Invalid URL, ignore
        }
      }
    };

    document.addEventListener("click", handleLinkClick, true);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
    };
  }, [lenis]);

  // Reset scroll when pathname changes and restart Lenis after mount
  useEffect(() => {
    // Only reset if the pathname actually changed
    if (pathname !== previousPathname.current) {
      // Stop any ongoing Lenis animation
      if (lenis) {
        lenis.stop();
        // Immediately set scroll to top
        lenis.scrollTo(0, { immediate: true });
        isStoppedRef.current = true;
      }

      // Also set window scroll as a fallback
      window.scrollTo(0, 0);

      // Restart Lenis after the page has mounted
      // Use a small timeout to ensure the DOM is ready and view transitions are complete
      const timeoutId = setTimeout(() => {
        if (lenis && isStoppedRef.current) {
          lenis.start();
          isStoppedRef.current = false;
        }
      }, 100);

      // Update the ref for the next comparison
      previousPathname.current = pathname;

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [pathname, lenis]);

  return null;
}
