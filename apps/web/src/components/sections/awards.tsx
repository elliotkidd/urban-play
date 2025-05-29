"use client";

import { AwardsAccordionProps } from "@/lib/sanity/queries/sections";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";
import { Button } from "@/components/ui/Button";

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.6,
      visualDuration: 0.35,
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
  const [currentPage, setCurrentPage] = useState(0);
  const awardsPerPage = 15;
  const totalPages = Math.ceil(awards.length / awardsPerPage);

  const paginatedAwards = awards.slice(
    currentPage * awardsPerPage,
    (currentPage + 1) * awardsPerPage,
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };
  return (
    <div
      className={twMerge(
        "wrapper py-fluid-sm",
        smallWrapper && "wrapper--small",
      )}
    >
      <div className="flex flex-col lg:flex-row justify-between prose mb-fluid-sm">
        <h2 className="">{title}</h2>
        {awards && awards.length > 0 && (
          <div className="flex gap-8 list-none lg:mr-8 not-prose text-xs">
            <div className="leading-none ">
              <Button
                size="sm"
                variant="ghost"
                onClick={handlePrevPage}
                className="p-0 text-xl font-bold opacity-20 hover:opacity-100 transition-opacity duration-500 disabled:invisible mb-fluid-xs"
                disabled={currentPage === 0}
              >
                Prev
              </Button>
              <p className="mb-1 opacity-40">Total Awards</p>
              <p className="">{awards.length}</p>
            </div>
            <div className="leading-none">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleNextPage}
                className="p-0 text-xl font-bold opacity-20 hover:opacity-100 transition-opacity duration-500 disabled:invisible mb-fluid-xs"
                disabled={currentPage === totalPages - 1}
              >
                Next
              </Button>
              <p className="mb-1 opacity-40">Categories</p>
              <p className="">{categories}</p>
            </div>
          </div>
        )}
      </div>
      <ul className="grid lg:grid-cols-5 gap-x-fluid-sm gap-y-fluid-sm">
        <AnimatePresence mode="wait">
          {paginatedAwards.map(({ _id, year, title, forText }, i) => (
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
