import { ProcessProps } from "@/lib/sanity/queries/sections";
import { twMerge } from "tailwind-merge";
import SectionHeader from "../section-header";
import SanityImage from "../sanity-image";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon } from "lucide-react";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import type { Swiper as SwiperType } from "swiper";

function Process({
  steps,
  smallWrapper,
  sectionHeader,
  showIndex,
}: ProcessProps) {
  const swiperRef = useRef<SwiperType>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(currentIndex);
    }
  }, [currentIndex]);

  return (
    <div
      className={twMerge(
        "wrapper overflow-visible",
        smallWrapper && "wrapper--small",
      )}
    >
      <SectionHeader {...sectionHeader} />
      <div className="flex justify-end gap-2 mb-fluid-xs">
        <button
          className="w-10 h-10 rounded-full border flex justify-center items-center border-text/20 hover:border-text transition-all duration-500"
          disabled={currentIndex === 0}
          onClick={() => {
            setCurrentIndex(currentIndex - 1);
          }}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          className="w-10 h-10 rounded-full border flex justify-center items-center border-text/20 hover:border-text transition-all duration-500"
          disabled={currentIndex === steps.length - 1}
          onClick={() => {
            setCurrentIndex(currentIndex + 1);
          }}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          1024: {
            slidesPerView: "auto",
          },
        }}
        spaceBetween={16}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.activeIndex);
        }}
        style={{
          overflow: "visible",
        }}
      >
        {steps.map((step, i) => (
          <SwiperSlide
            key={step._key}
            className="bg-nav-bar-background/20 rounded-lg flex flex-col lg:flex-row gap-fluid-sm lg:aspect-video lg:max-w-[981px] p-fluid-sm lg:p-0"
            style={{ width: "100%", display: "flex" }}
          >
            <div className="lg:p-2 flex-none aspect-portrait order-last lg:order-first">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <SanityImage
                  src={step.image}
                  className="w-full h-full absolute inset-0 object-cover"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col lg:h-full lg:justify-between max-w-lg space-y-fluid-sm lg:space-y-fluid lg:pr-fluid-sm lg:py-fluid-sm">
              <h3 className="text-lg font-bold">
                {showIndex && (
                  <span className="opacity-30 mr-1">
                    {i > 9 ? i + 1 : `0${i + 1}`}
                  </span>
                )}
                {step.heading}
              </h3>
              <p className="text-[16px] leading-[20px] text-body-copy">
                {step.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default Process;
