import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";
import { GridProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { useRef } from "react";
import { type Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function Grid({ sectionHeader, items }: GridProps) {
  const swiperRef = useRef<SwiperType>();

  return (
    <motion.div
      {...sectionAnimationConfig}
      className="wrapper space-y-fluid-xl lg:space-y-fluid-xs"
    >
      <SectionHeader {...sectionHeader} />
      <div className="lg:grid-cols-4 sm:grid-cols-2 gap-fluid-xs hidden lg:grid">
        {items &&
          items.map((item) => (
            <motion.div
              key={item._key}
              className="bg-gray-100 rounded-lg overflow-hidden text-center"
            >
              <h3 className="bg-text text-background flex items-center justify-center font-bold text-lg leading-[120%] p-8 aspect-landscape">
                {item.heading}
              </h3>
              <div className="p-8 flex items-center justify-center aspect-landscape prose">
                <p className="">{item.description}</p>
              </div>
            </motion.div>
          ))}
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={4}
        modules={[Pagination, EffectFade, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          type: "bullets",
        }}
        speed={1000}
        loop
        effect="fade"
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className="relative mt-fluid-xl grid-swiper"
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {items &&
          items.map((item, index) => (
            <SwiperSlide
              key={item._key}
              className="overflow-hidden bg-background space-y-fluid-sm"
              style={{
                height: "auto",
              }}
            >
              <h4 className="text-[45px] leading-[95%] font-heading uppercase">
                {index + 1}.
              </h4>
              <h4 className="font-heading text-[45px] leading-[95%] uppercase">
                {item.heading}
              </h4>
              <p className="text-[18px] leading-[120%] text-body-copy">
                {item.description}
              </p>
            </SwiperSlide>
          ))}
      </Swiper>
    </motion.div>
  );
}
