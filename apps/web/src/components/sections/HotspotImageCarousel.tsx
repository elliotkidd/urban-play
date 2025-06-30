"use client";

import type {
  ImageWithHotspotProps,
  ImageWithProductHotspotsProps,
  SectionHeaderProps,
  SpotProps,
} from "@/lib/sanity/queries/sections";
import SanityImage from "../sanity-image";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { customEase, sectionAnimationConfig } from "@/lib/motion";
import SectionHeader from "../section-header";
import { cn } from "@/lib/utils";
import { SanityButtons } from "../sanity-buttons";

const SLIDE_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} satisfies Variants;

function SlideProgressBar({
  currentIndex,
  activeHotspot,
  setCurrentIndex,
  setActiveHotspot,
  images,
  className,
  varyColour = false,
}: {
  currentIndex: number;
  activeHotspot?: number | null;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setActiveHotspot: Dispatch<SetStateAction<number | null>>;
  images: ImageWithHotspotProps[];
  className?: string;
  varyColour?: boolean;
}) {
  return (
    <div className={cn("flex justify-center gap-2 p-4", className)}>
      {images.map(({ _key }, index) => (
        <div
          key={`timer-${_key}-${index}`}
          onClick={() => {
            setCurrentIndex(index);
            setActiveHotspot(null);
          }}
          className={cn(
            "h-1 w-10 lg:w-[82px] rounded-full overflow-hidden bg-white/20 cursor-pointer transition-colors duration-500",
            varyColour && activeHotspot !== null
              ? "bg-background/20"
              : "bg-text/20",
            !varyColour && "bg-white/40",
          )}
        >
          {currentIndex > index && (
            <div
              className={cn(
                "h-full w-full bg-white transition-colors duration-500",
                varyColour && activeHotspot !== null
                  ? "bg-background"
                  : "bg-text",
                !varyColour && "bg-white",
              )}
            />
          )}
          {currentIndex === index && (
            <motion.div
              className={cn(
                "h-full bg-white transition-colors duration-500",
                varyColour && activeHotspot !== null
                  ? "bg-background"
                  : "bg-text",
                !varyColour && "bg-white",
              )}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 10, ease: "linear" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function SlideBase({
  image,
  hotspots,
  setActiveHotspot,
  activeHotspot,
  children = null,
}: ImageWithHotspotProps & {
  setActiveHotspot: (index: number | null) => void;
  activeHotspot: number | null;
  children?: React.ReactNode;
}) {
  return (
    <>
      <SanityImage
        src={image}
        alt={image.alt ?? ""}
        className="w-full h-full object-cover"
        width={1440}
        height={1024}
      />
      {Array.isArray(hotspots) &&
        hotspots.length > 0 &&
        hotspots.map((spot: SpotProps, index: number) => {
          const { x, y, _key } = spot;
          return (
            <div
              key={`hotspot-${_key}-${index}`}
              onClick={() =>
                setActiveHotspot(activeHotspot === index ? null : index)
              }
              className={twMerge(
                "absolute z-10 lg:w-12 lg:h-12 w-6 h-6 flex items-center justify-center rounded-full cursor-pointer border hover:border-white transition-colors duration-500",
                activeHotspot === index ? "border-white" : "border-transparent",
              )}
              style={{
                top: `${y}%`,
                left: `${x}%`,
              }}
            >
              <div className="lg:w-6 lg:h-6 w-4 h-4 bg-white rounded-full" />
            </div>
          );
        })}
      {children}
    </>
  );
}

function DesktopSlide({
  image,
  hotspots,
  activeHotspot,
  setActiveHotspot,
}: ImageWithHotspotProps & {
  activeHotspot: number | null;
  setActiveHotspot: (index: number | null) => void;
}) {
  return (
    <>
      <SanityImage
        src={image}
        alt={image.alt ?? ""}
        className="w-full h-full object-cover"
        width={1440}
        height={1024}
      />
      <div className="absolute inset-0 bg-black/20  h-full w-full pointer-events-none" />
      {Array.isArray(hotspots) &&
        hotspots.length > 0 &&
        hotspots.map((spot: SpotProps, index: number) => {
          const { x, y, _key } = spot;
          return (
            <motion.div
              key={`hotspot-${_key}-${index}`}
              onClick={() =>
                setActiveHotspot(activeHotspot === index ? null : index)
              }
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                ease: customEase,
                delay: (index + 1) * 0.3,
              }}
              className={twMerge(
                "absolute z-10 lg:w-12 lg:h-12 w-6 h-6 flex items-center justify-center rounded-full cursor-pointer border hover:border-white transition-[border-color, opacity] duration-500",
                activeHotspot === index ? "border-white" : "border-transparent",
                activeHotspot !== null &&
                  activeHotspot !== index &&
                  "opacity-50",
              )}
              style={{
                top: `${y}%`,
                left: `${x}%`,
              }}
            >
              <div className="lg:w-6 lg:h-6 w-4 h-4 bg-white rounded-full drop-shadow-lg" />
            </motion.div>
          );
        })}
      <AnimatePresence>
        {Array.isArray(hotspots) &&
          hotspots.length > 0 &&
          hotspots.map(
            (spot: SpotProps, index: number) =>
              index === activeHotspot && (
                <motion.div
                  key={`hotspot-${spot._key}-${index}`}
                  className="absolute bottom-4 left-4 w-[400px] bg-navbar-background/20 rounded-lg backdrop-blur-lg p-2 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full aspect-video overflow-hidden rounded-lg relative">
                    <SanityImage
                      src={image}
                      alt={image.alt ?? ""}
                      className="w-full h-full object-cover"
                      style={{
                        transform: `scale(4)`,
                        transformOrigin: `${spot.x}% ${spot.y}%`,
                        transition: "transform 0.3s ease-out",
                      }}
                    />
                  </div>
                  <div className="p-2 space-y-8">
                    <div className="flex w-full justify-between gap-2">
                      <p className="text-white text-xs">Solutions</p>
                      <div className="flex gap-2 text-white">
                        <button
                          onClick={() =>
                            setActiveHotspot(
                              (index - 1 + hotspots.length) % hotspots.length,
                            )
                          }
                        >
                          <svg
                            width="5"
                            height="10"
                            viewBox="0 0 5 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.5 9L0.593741 5.09374L4.5 1.18748"
                              stroke="currentColor"
                              strokeWidth="0.781252"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            setActiveHotspot((index + 1) % hotspots.length)
                          }
                        >
                          <svg
                            width="6"
                            height="10"
                            viewBox="0 0 6 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.09375 1L5.00001 4.90626L1.09375 8.81252"
                              stroke="currentColor"
                              strokeWidth="0.781252"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <Link
                      href={spot.solution.slug ?? ""}
                      className="text-white underline block"
                    >
                      {spot.solution.title}
                    </Link>
                    <p className="text-white text-sm mb-4">
                      {spot.description}
                    </p>
                  </div>
                </motion.div>
              ),
          )}
      </AnimatePresence>
    </>
  );
}

function MobileHotspotImageCarousel({
  images,
  sectionHeader,
}: {
  images: ImageWithHotspotProps[];
  sectionHeader: SectionHeaderProps;
}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  useEffect(() => {
    if (activeHotspot === null) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setActiveHotspot(null);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [images, currentIndex, activeHotspot]);

  return (
    <motion.div {...sectionAnimationConfig} className="wrapper">
      <SectionHeader {...sectionHeader} className="my-fluid-xs" />
      <div className="rounded-xl overflow-hidden mt-fluid-xs">
        <div
          className={cn(
            "aspect-video relative overflow-hidden transition-[border-radius] duration-500",
            activeHotspot === null && "rounded-xl",
          )}
        >
          <AnimatePresence>
            {images.map(
              (item, index) =>
                currentIndex === index && (
                  <motion.div
                    variants={SLIDE_VARIANTS}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={item._key}
                    className="absolute inset-0"
                  >
                    <SlideBase
                      {...item}
                      setActiveHotspot={setActiveHotspot}
                      activeHotspot={activeHotspot}
                    />
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>

        <div
          className={cn(
            "transition-colors duration-500",
            activeHotspot !== null
              ? "bg-text text-background"
              : "bg-background text-text",
          )}
        >
          <SlideProgressBar
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            images={images}
            varyColour
            activeHotspot={activeHotspot}
            setActiveHotspot={setActiveHotspot}
          />

          <AnimatePresence mode="wait">
            {activeHotspot !== null && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.75, ease: customEase }}
              >
                <div className="p-[30px] space-y-[100px]">
                  <div className="flex w-full justify-between items-center gap-2">
                    <p className="text-sm">Solutions</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setActiveHotspot(
                            (activeHotspot -
                              1 +
                              images[currentIndex].hotspots.length) %
                              images[currentIndex].hotspots.length,
                          )
                        }
                        className="bg-background rounded-full flex w-10 h-10 items-center justify-center text-text"
                      >
                        <svg
                          width="5"
                          height="10"
                          viewBox="0 0 5 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.5 9L0.593741 5.09374L4.5 1.18748"
                            stroke="currentColor"
                            strokeWidth="0.781252"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          setActiveHotspot(
                            (activeHotspot + 1) %
                              images[currentIndex].hotspots.length,
                          )
                        }
                        className="bg-background rounded-full flex w-10 h-10 items-center justify-center text-text"
                      >
                        <svg
                          width="6"
                          height="10"
                          viewBox="0 0 6 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.09375 1L5.00001 4.90626L1.09375 8.81252"
                            stroke="currentColor"
                            strokeWidth="0.781252"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    {images[currentIndex].hotspots.map(
                      (spot, index) =>
                        index === activeHotspot && (
                          <motion.div
                            key={`hotspot-${spot._key}-${index}`}
                            className="space-y-[100px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Link
                              href={spot.solution.slug ?? ""}
                              className="text-xl font-bold leading-[120%] block"
                            >
                              {spot.solution.title}
                            </Link>
                            <p className=" text-sm mb-4">{spot.description}</p>
                          </motion.div>
                        ),
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function DesktopHotspotImageCarousel({
  images,
  sectionHeader,
}: {
  images: ImageWithHotspotProps[];
  sectionHeader: SectionHeaderProps;
}) {
  const { title, buttons } = sectionHeader;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  useEffect(() => {
    if (activeHotspot === null) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setActiveHotspot(null);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [images, currentIndex, activeHotspot]);

  return (
    <motion.div {...sectionAnimationConfig} className="wrapper py-fluid-xs">
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <div
          className={twMerge(
            "flex flex-col w-full lg:flex-row lg:justify-between items-start gap-fluid-xs p-fluid-sm relative z-10",
          )}
        >
          {title && (
            <h2 className="max-w-[750px] text-4xl leading-[95%] font-heading text-balance text-white">
              {title}
            </h2>
          )}
          {buttons && (
            <SanityButtons
              buttons={buttons}
              buttonSize="default"
              className="flex items-center gap-2"
            />
          )}
        </div>
        <AnimatePresence mode="sync">
          {images.map(
            (item: ImageWithHotspotProps, index: number) =>
              currentIndex === index && (
                <motion.div
                  key={item._key}
                  className="absolute inset-0"
                  variants={SLIDE_VARIANTS}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 1 }}
                >
                  <DesktopSlide
                    {...item}
                    activeHotspot={activeHotspot}
                    setActiveHotspot={setActiveHotspot}
                  />
                </motion.div>
              ),
          )}
        </AnimatePresence>

        <SlideProgressBar
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          images={images}
          className="absolute bottom-0 right-0"
          setActiveHotspot={setActiveHotspot}
        />
      </div>
    </motion.div>
  );
}

export default function HotspotImageCarousel({
  images,
  sectionHeader,
}: ImageWithProductHotspotsProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <MobileHotspotImageCarousel
          images={images}
          sectionHeader={sectionHeader}
        />
      ) : (
        <DesktopHotspotImageCarousel
          images={images}
          sectionHeader={sectionHeader}
        />
      )}
    </>
  );
}
