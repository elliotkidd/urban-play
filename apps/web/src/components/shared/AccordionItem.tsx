"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { PiCaretDown } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

interface Props {
  heading: string;
  children: React.ReactNode;
  className?: string;
  index: number;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

export default function AccordionItem({
  children,
  heading,
  className,
  index,
  activeIndex,
  setActiveIndex,
}: Props) {
  const toggle = () => {
    if (activeIndex == index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  const isOpen = index === activeIndex;

  return (
    <div className={twMerge(`relative overflow-hidden border-b`, className)}>
      <div
        onClick={toggle}
        className={
          "flex w-full cursor-pointer items-center justify-between py-4"
        }
      >
        <h4 className="mb-0 text-lg tracking-tighter">{heading}</h4>
        <motion.span
          className="mr-2"
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <PiCaretDown className="h-6 w-6" />
        </motion.span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="py-4">{children}</div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
