import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { IconCarat } from "../Icon";

export default function CarouselCursor({ hoverArea, mouseDown }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { capture: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove, {
        capture: true,
      });
    };
  }, []);

  useEffect(() => {
    if (hoverArea) {
      x.set(cursorPosition.x);
      y.set(cursorPosition.y);
    }
  }, [cursorPosition, x, y, hoverArea]);

  return (
    <AnimatePresence mode="wait">
      {hoverArea && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { type: "spring", duration: 0.5, stiffness: 300 },
          }}
          style={{
            top: y,
            left: x,
          }}
          className={twMerge(
            "text-label pointer-events-none fixed z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden text-nowrap rounded-full px-4 py-2 uppercase text-black md:flex",
            !mouseDown
              ? "bg-accent text-black"
              : "border border-accent bg-black text-accent",
          )}
        >
          <IconCarat direction="left" />
          drag
          <IconCarat direction="right" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
