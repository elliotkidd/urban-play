"use client";

import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { TypeFromSelection } from "groqd";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ACCORDION_FRAGMENT } from "@/sanity/lib/queries/sections";

import RichText from "../RichText";
import SanityImage from "../SanityImage";
import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof ACCORDION_FRAGMENT>;

// Add proper TypeScript interfaces
interface ProcessTextProps {
  children: React.ReactNode;
  setActiveImage: (index: number) => void;
  index: number;
}

interface ProcessImageProps {
  img: any; // Replace with proper Sanity image type
}

// Memoize image component
const ProcessImage = memo(function ProcessImage({ img }: ProcessImageProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute w-full overflow-hidden"
    >
      <SanityImage
        src={img}
        className="aspect-square w-full object-cover"
        height={800}
        width={800}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
      />
    </motion.div>
  );
});

interface AccordionItemProps {
  title: string;
  text: any; // Update with proper PortableText type
  image: any; // Update with proper Sanity image type
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isLast: boolean;
}

// New AccordionItem component
const AccordionItem = memo(function AccordionItem({
  title,
  text,
  image,
  isOpen,
  onToggle,
  isLast,
}: AccordionItemProps) {
  return (
    <div className="">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <h2 className="font-sans text-sm uppercase font-medium text-accent">
          {title}
        </h2>
        <span
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            className="fill-current text-contrast"
          >
            <path d="M10.4623 3.10619C11.6115 1.96212 12.5501 0.83643 14.0793 0.262098L14.0747 0.257504C14.8851 -0.0457437 15.8832 0.822646 15.5947 1.66347C15.0774 3.17052 13.8274 4.09864 12.7423 5.21973C11.5291 6.47407 10.3432 7.7422 9.24442 9.09762C8.59886 9.8925 7.00098 10.2647 6.43784 9.09762C5.61372 7.38841 4.30428 5.95947 2.98569 4.61783C2.17073 3.79079 0.385137 2.60537 0.179108 1.40157C0.0600681 0.703186 0.499598 0.266694 1.17263 0.193179C2.71098 0.0277716 4.60646 2.04483 5.59082 3.01889C5.90674 3.32673 6.21807 3.63982 6.52483 3.96144C7.5 5.5 9.24442 5.21973 9.94492 3.63458C10.1143 3.45998 10.2883 3.28079 10.4623 3.10619Z" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="py-5">
              <SanityImage
                src={image}
                className="block md:hidden aspect-square w-full object-cover mb-5"
                height={800}
                width={800}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              />

              <RichText value={text} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLast && (
        <svg
          className="w-full text-accent/20"
          viewBox="0 0 1360 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 9C177.809 9 346.708 3.55907 524.5 3C667.292 2.55099 818.689 5.16866 961.37 3.69136C1046.53 2.80958 1131.28 1.44444 1216.57 1.44444C1264.4 1.44444 1312.17 1 1360 1"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
});

// Main component with optimized rendering
export default function Accordion({ richText, items, settings }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const accordionItems = useMemo(
    () =>
      items?.map(({ image, title, text }, i) => ({
        image,
        title,
        text,
        index: i,
      })),
    [items],
  );

  return (
    <ModuleWrapper settings={settings}>
      <div className="wrapper grid w-full md:grid-cols-9 md:gap-16 ">
        <div className="hidden md:block md:col-span-4">
          <div className="relative aspect-square overflow-hidden">
            <AnimatePresence mode="wait">
              {accordionItems && (
                <ProcessImage img={accordionItems[activeIndex].image} />
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="w-full md:col-span-5 space-y-fluid-sm py-fluid">
          <div>
            <RichText value={richText} />
          </div>
          <div>
            {accordionItems?.map((item, index) => (
              <AccordionItem
                key={item.index}
                {...item}
                isOpen={activeIndex === item.index}
                onToggle={() => setActiveIndex(item.index)}
                isLast={index === accordionItems.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </ModuleWrapper>
  );
}
