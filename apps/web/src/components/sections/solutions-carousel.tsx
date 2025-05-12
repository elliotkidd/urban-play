"use client";

import SectionHeader from "../section-header";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";

import SanityImage from "../sanity-image";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, easeOut, motion } from "motion/react";
import { customEase, sectionAnimationConfig } from "@/lib/motion";
import Link from "../link";

const imageVariants = {
  prev: {
    initial: { x: "-100%" },
    animate: { x: "0%", transition: { duration: 1, ease: "easeInOut" } },
    exit: { opacity: 0 },
  },
  next: {
    initial: { x: "100%" },
    animate: { x: "0%", transition: { duration: 1, ease: "easeInOut" } },
    exit: { opacity: 0 },
  },
};

export default function SolutionsCarouselSection({
  sectionHeader,
  solutions,
  smallWrapper,
}) {
  const [step, setStep] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(
    imageVariants.next,
  );
  const [timerProgress, setTimerProgress] = useState(0);

  const descriptionRef = useRef<HTMLDivElement>(null);

  const getDescriptionHeight = () => {
    var height = 0;

    if (descriptionRef && descriptionRef.current) {
      descriptionRef.current.childNodes.forEach((element) => {
        const htmlElement = element as HTMLElement;
        if (htmlElement.scrollHeight > height) {
          height = htmlElement.scrollHeight;
        }
      });

      descriptionRef.current.style.height = `${height}px`;
    }
  };

  useLayoutEffect(() => {
    getDescriptionHeight();

    window.addEventListener("resize", getDescriptionHeight);

    return () => {
      window.removeEventListener("resize", getDescriptionHeight);
    };
  }, []);

  useEffect(() => {
    const intervalDuration = 5000;
    const updateInterval = 50; // Update progress every 50ms for smooth animation
    let timer;
    let progressTimer;

    // Reset progress to 0 when step changes
    setTimerProgress(0);

    // Update progress animation
    progressTimer = setInterval(() => {
      setTimerProgress((prev) =>
        Math.min(prev + (updateInterval / intervalDuration) * 100, 100),
      );
    }, updateInterval);

    // Main timer for changing slides
    timer = setTimeout(() => {
      setAnimationDirection(imageVariants.next);
      setStep((prevStep) => (prevStep + 1) % solutions.length);
    }, intervalDuration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [step, solutions.length]);

  const goNext = () => {
    setAnimationDirection(imageVariants.next);
    setStep((prevStep) => (prevStep + 1) % solutions.length);
  };

  const goPrev = () => {
    setAnimationDirection(imageVariants.prev);
    setStep((prevStep) => (prevStep - 1 + solutions.length) % solutions.length);
  };

  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge(
        "wrapper py-fluid-xs",
        smallWrapper && "wrapper--small",
      )}
    >
      <SectionHeader {...sectionHeader} className="mb-fluid" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 items-stretch">
        <div className="flex flex-col w-full justify-between">
          <div className="relative" ref={descriptionRef}>
            <AnimatePresence mode="wait">
              {solutions.map(
                ({ _id, title, description, slug }, index) =>
                  index === step && (
                    <motion.div
                      key={_id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className={twMerge(
                        "bg-background absolute transition-opacity duration-1000",
                        step === index ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <Link href={`/what-we-do#${slug.slice(1)}`}>
                        <h3 className="h3 underline">{title}</h3>
                      </Link>
                      <p className="max-w-p text-balance">{description}</p>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
          <div className="hidden lg:flex flex-col w-full gap-2 items-start">
            <div className="w-48 flex justify-between items-center">
              <div className="w-full">
                <span className="text-xs normal-case font-bold mb-0 block leading-none opacity-40">
                  Next
                </span>
                <div className="relative" style={{ height: "var(--text-xs)" }}>
                  <AnimatePresence>
                    {solutions.map(
                      ({ _id, title }, index) =>
                        (step + 1) % solutions.length === index && (
                          <motion.h4
                            key={_id}
                            className="text-xs normal-case font-bold leading-none absolute"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                          >
                            {title}
                          </motion.h4>
                        ),
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex-0 flex items-center gap-2">
                <div className="relative w-5 h-5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    {/* Background circle */}
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.2"
                      strokeWidth="2"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="62.83"
                      strokeDashoffset={62.83 - (timerProgress / 100) * 62.83}
                      transform="rotate(-90 12 12)"
                    />
                  </svg>
                </div>
                <button onClick={goPrev}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </button>
                <button onClick={goNext}>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="w-48  relative aspect-square rounded-lg overflow-hidden">
              <AnimatePresence>
                {solutions.map(
                  (solution: any, index) =>
                    (step + 1) % solutions.length === index && (
                      <motion.div
                        key={solution._id}
                        initial={animationDirection.initial}
                        animate={animationDirection.animate}
                        exit={{
                          ...animationDirection.exit,
                          transition: { delay: 1 },
                        }}
                        transition={{ duration: 1 }}
                        className="w-full h-full object-cover absolute inset-0"
                      >
                        <SanityImage
                          src={solution.image}
                          className="w-full h-full object-cover absolute inset-0"
                        />
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="aspect-landscape rounded-xl overflow-hidden relative">
          <AnimatePresence>
            {solutions.map(
              (solution: any, index) =>
                step === index && (
                  <motion.div
                    key={solution._id}
                    initial={animationDirection.initial}
                    animate={animationDirection.animate}
                    exit={{
                      ...animationDirection.exit,
                      transition: { delay: 1 },
                    }}
                    transition={{ duration: 1 }}
                    className="w-full h-full object-cover absolute inset-0"
                  >
                    <SanityImage
                      src={solution.image}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
