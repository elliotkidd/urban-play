import { twMerge } from "tailwind-merge";
import SanityImage from "../sanity-image";
import SectionHeader from "../section-header";
import { ImageMarqueeProps } from "@/lib/sanity/queries/sections";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperType } from "swiper";
import "swiper/css";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function ImageMarqueeSection({
  sectionHeader,
  images,
  smallWrapper,
}: ImageMarqueeProps) {
  const swiperRef = useRef<SwiperType>();

  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge(
        "wrapper py-fluid-xs",
        smallWrapper && "wrapper--small",
      )}
    >
      {sectionHeader && <SectionHeader {...sectionHeader} />}
      <div className="flex justify-end gap-2 mb-fluid-xs">
        <button
          className="w-10 h-10 rounded-full border flex justify-center items-center border-text/20 hover:border-text transition-all duration-500"
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          className="w-10 h-10 rounded-full border flex justify-center items-center border-text/20 hover:border-text transition-all duration-500"
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={16}
        loop={true}
        style={{ overflow: "visible" }}
        className="h-[200px] lg:h-[468px]"
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {images &&
          images.length > 0 &&
          images.map((image, index) => {
            return (
              <SwiperSlide
                key={index}
                style={{
                  width: "auto",
                  aspectRatio: image.aspectRatio,
                }}
                className="rounded-lg overflow-hidden"
              >
                <SanityImage src={image} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </motion.div>
  );
}
