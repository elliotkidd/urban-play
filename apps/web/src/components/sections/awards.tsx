"use client";

import { AwardsAccordionProps } from "@/lib/sanity/queries/sections";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "motion/react";

const itemVariants = {
  hidden: {
    opacity: 0,
  },
  show: (i: number) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
    },
  }),
  exit: {
    opacity: 0,
  },
};

export function AwardsSection({
  title,
  awards,
  categories,
  smallWrapper,
}: AwardsAccordionProps) {
  return (
    <div className={twMerge("wrapper", smallWrapper && "wrapper--small")}>
      <div className="flex flex-col lg:flex-row justify-between prose mb-fluid-sm">
        <h2 className="">{title}</h2>
        {awards && awards.length > 0 && (
          <div className="flex gap-8 list-none lg:mr-8 not-prose text-xs">
            <div className="leading-none ">
              <p className="mb-1 opacity-40">Total Awards</p>
              <p className="">{awards.length}</p>
            </div>
            <div className="leading-none">
              <p className="mb-1 opacity-40">Categories</p>
              <p className="">{categories}</p>
            </div>
          </div>
        )}
      </div>
      <ul className="grid lg:grid-cols-5 gap-x-fluid-sm gap-y-fluid-sm">
        <AnimatePresence mode="wait">
          {awards.map(({ _id, year, title, forText }, i) => (
            <motion.li
              key={_id}
              whileInView="show"
              custom={i}
              initial="hidden"
              exit="exit"
              variants={itemVariants}
            >
              <span className=" opacity-40 text-xs mb-1">{year}</span>
              <h3 className="font-bold leading-tight">{forText}</h3>
              <p className="opacity-50 leading-none font-bold">{title}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
