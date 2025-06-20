"use client";

import Link from "next/link";
import { PartnersRolloverProps } from "@/lib/sanity/queries/sections";
import { useState, useMemo, memo, useRef } from "react";
import { AnimatePresence, motion, MotionValue, useSpring } from "motion/react";
import SanityImage from "../sanity-image";
import { twMerge } from "tailwind-merge";
import { SPRING_OPTIONS } from "@/lib/motion";

// Memoized partner item component
const PartnerItem = memo(
  ({
    partner,
    index,
    hover,
    onHover,
    top,
  }: {
    partner: PartnersRolloverProps["partners"][0];
    index: number;
    hover: number | null;
    onHover: (index: number | null) => void;
    top: MotionValue<number>;
  }) => {
    const isHovered = hover === index;
    const linkRef = useRef<HTMLAnchorElement>(null);

    const handleMouseEnter = () => {
      onHover(index);
      if (linkRef.current) {
        const rect = linkRef.current.getBoundingClientRect();
        const t = rect.top + rect.height / 2; // Midway point of the link
        top.set(t);
      }
    };

    return (
      <Link
        ref={linkRef}
        href={partner.slug}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => onHover(null)}
        className="text-center relative w-full text-4xl block font-black uppercase tracking-tight leading-none font-heading py-2"
        key={partner._id}
      >
        <span
          className={twMerge(
            "relative transition-opacity duration-500",
            !isHovered && hover !== null && "opacity-20",
            isHovered && "z-20",
          )}
        >
          {partner.title}
        </span>
      </Link>
    );
  },
);

PartnerItem.displayName = "PartnerItem";

export default function PartnersRollover({ partners }: PartnersRolloverProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const top = useSpring(0, SPRING_OPTIONS);

  // Memoize the random rotation to prevent recalculation on re-renders
  const rotation = useMemo(() => Math.random() * 20 - 10, []);

  return (
    <div className="wrapper relative flex flex-col items-center py-fluid-xl">
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0, x: "-50%", y: "-50%" }}
            animate={{
              scale: 1,
              rotate: rotation,
              x: "-50%",
              y: "-50%",
              opacity: 1,
              transition: {
                visualDuration: 0.5,
                type: "spring",
                //...SPRING_OPTIONS,
              },
            }}
            exit={{ scale: 0, opacity: 0, rotate: 0, x: "-50%", y: "-50%" }}
            style={{
              position: "fixed",
              top: top,
              left: "50%",
            }}
            className="w-[18rem] aspect-portrait rounded-xl overflow-hidden z-10 pointer-events-none"
          >
            {partners[hoveredIndex].image && (
              <SanityImage
                src={partners[hoveredIndex].image}
                width={600}
                height={700}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {partners.map((partner, index) => (
        <PartnerItem
          key={partner._id}
          partner={partner}
          index={index}
          hover={hoveredIndex}
          onHover={setHoveredIndex}
          top={top}
        />
      ))}
    </div>
  );
}
