import { TestimoniesProps } from "@/lib/sanity/queries/sections";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { SanityButtons } from "../sanity-buttons";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

export default function TestimoniesSection({
  sectionHeader,
  testimonies,
  smallWrapper,
}: TestimoniesProps) {
  const { title, buttons } = sectionHeader;
  const swiperRef = useRef<SwiperType>();

  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge(
        "wrapper py-fluid-xs space-y-fluid overflow-hidden",
        smallWrapper && "wrapper--small",
      )}
    >
      <div className="flex flex-col w-full lg:flex-row lg:justify-between items-start mb-12 gap-fluid">
        {title && (
          <h2 className="max-w-section-heading text-balance text-lg font-bold normal-case">
            {title}
          </h2>
        )}
        {buttons && (
          <SanityButtons
            buttons={buttons}
            className="flex items-center gap-2"
          />
        )}
      </div>
      {testimonies && testimonies.length > 0 && (
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onAfterInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="overflow-visible featured-projects-swiper mb-fluid-lg"
        >
          {testimonies.map((testimony: any, i: number) => {
            const {
              _id,
              author: { name, position },
              quote,
            } = testimony;
            return (
              <SwiperSlide
                key={_id + i}
                className="space-y-fluid bg-background flex flex-col items-start justify-between"
                style={{ height: "auto", display: "flex" }}
              >
                <blockquote className="max-w-section-heading text-balance font-bold text-lg leading-none">
                  {quote}
                </blockquote>
                <div className="leading-none">
                  <span className="block">{name}</span>
                  <span className="block opacity-40">{position}</span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      <div className="flex items-center justify-start gap-2 text-text">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="bg-transparent border border-text/20 hover:border-text transition-colors duration-300 text-white w-10 h-10 rounded-full flex items-center justify-center"
        >
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.27734 11.3164L1.21408 5.99998L6.27734 0.683557"
              stroke="currentColor"
              strokeWidth="1.01265"
            />
          </svg>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="bg-transparent border border-text/20 hover:border-text transition-colors duration-300 text-white w-10 h-10 rounded-full flex items-center justify-center"
        >
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.945312 0.683594L6.00857 6.00002L0.945312 11.3164"
              stroke="currentColor"
              strokeWidth="1.01265"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
