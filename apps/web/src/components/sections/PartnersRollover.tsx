"use client";

import Link from "next/link";
import { PartnersRolloverProps } from "@/lib/sanity/queries/sections";
import { useState, useMemo, memo } from "react";
import { AnimatePresence, motion } from "motion/react";
import SanityImage from "../sanity-image";
import { twMerge } from "tailwind-merge";

// Memoized partner item component
const PartnerItem = memo(
  ({
    partner,
    index,
    hover,
    onHover,
  }: {
    partner: PartnersRolloverProps["partners"][0];
    index: number;
    hover: number | null;
    onHover: (index: number | null) => void;
  }) => {
    // Memoize the random rotation to prevent recalculation on re-renders
    const rotation = useMemo(() => Math.random() * 40 - 20, []);

    const isHovered = hover === index;

    return (
      <Link
        href={partner.slug}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        className="text-center relative w-full text-4xl block font-black uppercase tracking-tight leading-none font-heading py-2"
        key={partner._id}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scale: 0, rotate: 0, x: "-50%", y: "-50%" }}
              animate={{
                scale: 1,
                rotate: rotation,
                x: "-50%",
                y: "-50%",
                transition: {
                  duration: 0.5,
                },
              }}
              exit={{ scale: 0, rotate: 0, x: "-50%", y: "-50%" }}
              className="absolute w-[18rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-portrait rounded-xl overflow-hidden z-10 pointer-events-none"
            >
              <SanityImage
                src={partner.image}
                width={600}
                height={700}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
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

  return (
    <div className="wrapper relative flex flex-col items-center py-fluid-xl">
      {partners.map((partner, index) => (
        <PartnerItem
          key={partner._id}
          partner={partner}
          index={index}
          hover={hoveredIndex}
          onHover={setHoveredIndex}
        />
      ))}
    </div>
  );
}
