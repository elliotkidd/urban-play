import type {
  ImageWithHotspotProps,
  ImageWithProductHotspotsProps,
  SpotProps,
} from "@/lib/sanity/queries/sections";
import SanityImage from "../sanity-image";
import { AnimatePresence, motion } from "motion/react";
import {
  type Dispatch,
  Fragment,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-is-mobile";

function Slide({
  image,
  hotspots,
  _key,
  activeHotspot,
  setActiveHotspot,
}: ImageWithHotspotProps & {
  activeHotspot: number | null;
  setActiveHotspot: Dispatch<SetStateAction<number | null>>;
}) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      key={_key}
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        {!isMobile &&
          Array.isArray(hotspots) &&
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
    </motion.div>
  );
}

export default function HotspotImageCarousel({
  images,
}: ImageWithProductHotspotsProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const isMobile = useIsMobile();
  const [activeHotspot, setActiveHotspot] = useState<number | null>(
    isMobile ? 0 : null,
  );

  useEffect(() => {
    console.log(activeHotspot);
    console.log(images[currentIndex].hotspots.length);
  }, [activeHotspot]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % images.length);
  //     setActiveHotspot(null);
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, [images]);

  return (
    <div className="wrapper">
      {/* <div className="relative aspect-video rounded-xl overflow-hidden">
        <AnimatePresence>
          {images.map(
            (item: ImageWithHotspotProps, index: number) =>
              currentIndex === index && (
                <Slide
                  {...item}
                  activeHotspot={activeHotspot}
                  setActiveHotspot={setActiveHotspot}
                />
              ),
          )}
        </AnimatePresence>
        <div className="absolute bottom-0 right-0 flex gap-2 p-4">
          {images.map(({ _key }, index) => (
            <div
              key={`timer-${_key}-${index}`}
              onClick={() => {
                setCurrentIndex(index);
                setActiveHotspot(null);
              }}
              className="h-1 w-[82px] flex-1 rounded-full overflow-hidden bg-white/20 cursor-pointer"
            >
              {currentIndex > index && (
                <div className="h-full w-full bg-white" />
              )}
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
      </div>
      {isMobile && (
        <div className="gap-2 p-4 bg-text mt-4 rounded-lg text-white">
          {images[currentIndex].hotspots.map(
            ({ x, y, _key, solution, description }, index: number) =>
              currentIndex === index && (
                <Fragment key={`hotspot-${_key}-${index}`}>
                  <div className="w-full aspect-video overflow-hidden rounded-lg relative">
                    <SanityImage
                      src={images[currentIndex].image}
                      alt={images[currentIndex].image.alt ?? ""}
                      className="w-full h-full object-cover"
                      style={{
                        transform: `scale(5)`,
                        transformOrigin: `${x}% ${y}%`,
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
                              (index - 1) %
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
                              (index + 1) %
                                images[currentIndex].hotspots.length,
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
                      href={solution.slug ?? ""}
                      className="text-white underline block"
                    >
                      {solution.title}
                    </Link>
                    <p className="text-white text-sm mb-4">{description}</p>
                  </div>
                </Fragment>
              ),
          )}
        </div>
      )} */}
    </div>
  );
}
