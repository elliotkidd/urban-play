"use client";

import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { TypeFromSelection } from "groqd";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { VERTICAL_PROCESS_FRAGMENT } from "@/sanity/lib/queries/sections";

import RichText from "../RichText";
import SanityImage from "../SanityImage";
import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof VERTICAL_PROCESS_FRAGMENT>;

// Add proper TypeScript interfaces
interface ProcessTextProps {
  children: React.ReactNode;
  setActiveImage: (index: number) => void;
  index: number;
}

interface ProcessImageProps {
  img: any; // Replace with proper Sanity image type
}

// Memoize child components
const ProcessText = memo(function ProcessText({
  children,
  setActiveImage,
  index,
}: ProcessTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  // Only trigger image changes on desktop
  const handleInView = useCallback(() => {
    if (isInView && window.innerWidth >= 768) {
      // md breakpoint
      setActiveImage(index);
    }
  }, [isInView, index, setActiveImage]);

  useEffect(() => {
    handleInView();
  }, [handleInView]);

  return (
    <div className="flex items-center py-8 md:py-fluid-md md:justify-center md:min-h-screen">
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5 }}
        className="prose w-full"
      >
        {children}
      </motion.div>
    </div>
  );
});

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
      <SanityImage src={img} className="aspect-square w-full object-cover" />
    </motion.div>
  );
});

// Main component with optimized rendering
export default function VerticalProcess({ steps, settings }: Props) {
  const [activeImage, setActiveImage] = useState<number>(-1);

  // Memoize steps to prevent unnecessary re-renders
  const processSteps = useMemo(
    () =>
      steps?.map(({ image, title, text }, i) => ({
        image,
        title,
        text,
        index: i,
      })),
    [steps],
  );

  return (
    <ModuleWrapper settings={settings}>
      <div className="wrapper grid w-full md:grid-cols-9 md:gap-16">
        <div className="hidden md:block md:col-span-4">
          {/* Desktop sticky images */}
          <div className="sticky top-8 flex h-screen items-center overflow-hidden">
            {processSteps?.map(({ image, index }) => (
              <AnimatePresence key={index} mode="wait">
                {activeImage === index && <ProcessImage img={image} />}
              </AnimatePresence>
            ))}
          </div>
        </div>
        <div className="w-full md:col-span-5">
          {processSteps?.map(({ image, title, text, index }) => (
            <ProcessText
              key={index}
              setActiveImage={setActiveImage}
              index={index}
            >
              {/* Mobile image - show all images without animation */}
              <div className="mb-6 flex justify-center md:hidden">
                <SanityImage
                  src={image}
                  className="aspect-square object-cover"
                />
              </div>
              <h2 className="font-sans inline-block mb-4 text-sm uppercase font-medium relative text-accent">
                {title}
              </h2>
              <RichText value={text} />
            </ProcessText>
          ))}
        </div>
      </div>
    </ModuleWrapper>
  );
}
