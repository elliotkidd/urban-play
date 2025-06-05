"use client";

import Link from "next/link";
import { PartnersRolloverProps } from "@/lib/sanity/queries/sections";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SanityImage from "../sanity-image";
import { twMerge } from "tailwind-merge";

export default function PartnersRollover({ partners }: PartnersRolloverProps) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <>
      <div className="wrapper relative flex flex-col items-center py-fluid-xl">
        {partners.map(({ slug, _id, title, image }, i: number) => (
          <Link
            href={slug}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="text-center relative w-full text-4xl block font-black uppercase tracking-tight leading-none font-heading py-2"
            key={_id}
          >
            <AnimatePresence>
              {hover === i && (
                <motion.div
                  initial={{ scale: 0, rotate: 0, x: "-50%", y: "-50%" }}
                  animate={{
                    scale: 1,
                    rotate: Math.random() * 40 - 20,
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
                    src={image}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <span
              className={twMerge(
                "relative transition-opacity duration-500",
                hover !== null && hover !== i && "opacity-20",
                hover === i && "z-20",
              )}
            >
              {title}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
