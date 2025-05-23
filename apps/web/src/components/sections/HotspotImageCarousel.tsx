"use client";

import type {
  ImageWithHotspotProps,
  ImageWithProductHotspotsProps,
  SectionHeaderProps,
  SpotProps,
} from "@/lib/sanity/queries/sections";
import SanityImage from "../sanity-image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { sectionAnimationConfig } from "@/lib/motion";
import SectionHeader from "../section-header";

const SLIDE_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} satisfies Variants;

function SlideProgressBar({
  currentIndex,
  setCurrentIndex,
  images,
}: {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  images: ImageWithHotspotProps[];
}) {
  return (
    <div className="absolute bottom-0 right-0 flex gap-2 p-4">
      {images.map(({ _key }, index) => (
        <div
          key={`timer-${_key}-${index}`}
          onClick={() => {
            setCurrentIndex(index);
          }}
          className="h-1 w-[82px] flex-1 rounded-full overflow-hidden bg-white/20 cursor-pointer"
        >
          {currentIndex > index && <div className="h-full w-full bg-white" />}
          {currentIndex === index && (
            <motion.div
              className="h-full bg-white"
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
      />
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
              className={twMerge(
                "absolute z-10 lg:w-12 lg:h-12 w-6 h-6 flex items-center justify-center rounded-full cursor-pointer border",
                activeHotspot === index ? "border-white" : "border-transparent",
              )}
              style={{
                top: `${y}%`,
                left: `${x}%`,
              }}
            >
              <div className="lg:w-6 lg:h-6 w-4 h-4 bg-white rounded-full" />
            </motion.div>
          );
        })}
      {children}
    </>
  );
}

function DesktopSlide({ image, hotspots }: ImageWithHotspotProps) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <>
      <SanityImage
        src={image}
        alt={image.alt ?? ""}
        className="w-full h-full object-cover"
      />
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
              className={twMerge(
                "absolute z-10 lg:w-12 lg:h-12 w-6 h-6 flex items-center justify-center rounded-full cursor-pointer border",
                activeHotspot === index ? "border-white" : "border-transparent",
              )}
              style={{
                top: `${y}%`,
                left: `${x}%`,
              }}
            >
              <div className="lg:w-6 lg:h-6 w-4 h-4 bg-white rounded-full" />
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
                  className="absolute bottom-4 left-4 w-80 bg-navbar-background/20 rounded-lg backdrop-blur-lg p-2"
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
                        transform: `scale(5)`,
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
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images, currentIndex]);

  return (
    <motion.div {...sectionAnimationConfig} className="wrapper">
      <SectionHeader {...sectionHeader} className="my-fluid-xs" />
      <div className="relative aspect-video rounded-xl overflow-hidden mt-fluid-xs">
        <AnimatePresence mode="sync">
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
        <SlideProgressBar
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          images={images}
        />
      </div>
      {images[currentIndex].hotspots.map(
        (spot, index) =>
          activeHotspot === index && (
            <motion.div
              key={`hotspot-${spot._key}-${index}`}
              className="bg-nav-bar-background/20 rounded-lg backdrop-blur-lg p-4 mt-fluid-xs text-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full aspect-video overflow-hidden rounded-lg relative">
                <SanityImage
                  src={images[currentIndex].image}
                  alt={images[currentIndex].image.alt ?? ""}
                  className="w-full h-full object-cover"
                  style={{
                    transform: `scale(5)`,
                    transformOrigin: `${spot.x}% ${spot.y}%`,
                    transition: "transform 0.3s ease-out",
                  }}
                />
              </div>
              <div className="p-2 space-y-8">
                <div className="flex w-full justify-between gap-2">
                  <p className="text-xs">Solutions</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setActiveHotspot(
                          (index - 1 + images[currentIndex].hotspots.length) %
                            images[currentIndex].hotspots.length,
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
                        setActiveHotspot(
                          (index + 1) % images[currentIndex].hotspots.length,
                        )
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
                  className=" underline block"
                >
                  {spot.solution.title}
                </Link>
                <p className=" text-sm mb-4">{spot.description}</p>
              </div>
            </motion.div>
          ),
      )}
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images, currentIndex]);

  return (
    <motion.div {...sectionAnimationConfig} className="wrapper py-fluid-xs">
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <SectionHeader
          {...sectionHeader}
          className="p-fluid-sm relative z-10"
        />
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
                  <DesktopSlide {...item} />
                </motion.div>
              ),
          )}
        </AnimatePresence>
        <SlideProgressBar
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          images={images}
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

  // Return null on initial render to avoid hydration mismatch
  if (isMobile === undefined) {
    return null;
  }

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
