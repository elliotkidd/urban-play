"use client";

import { useState } from "react";
import "swiper/css";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";

import CarouselCursor from "./CarouselCursor";
import SanityImage from "./SanityImage";

export default function ImageCarousel({ items }) {
  const [hoverArea, setHoverArea] = useState<boolean>(false);
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  return (
    <>
      <div
        onMouseEnter={() => setHoverArea(true)}
        onMouseLeave={() => setHoverArea(false)}
        className="relative"
      >
        <Swiper
          className={twMerge("!h-screen cursor-none")}
          slidesPerView="auto"
          freeMode
          loop
          modules={[FreeMode, Autoplay]}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={10000}
          onTouchStart={() => setMouseDown(true)}
          onTouchEnd={() => setMouseDown(false)}
        >
          {items &&
            items.map((item, i) => {
              return (
                <SwiperSlide key={i} className="" style={{ width: "auto" }}>
                  <SanityImage src={item} className="object-cover" />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <CarouselCursor mouseDown={mouseDown} hoverArea={hoverArea} />
    </>
  );
}
