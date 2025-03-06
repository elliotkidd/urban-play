import { TestimoniesProps } from "@/lib/sanity/queries/sections";
import { Swiper, SwiperSlide } from "swiper/react";
import { TestimonyType } from "@/lib/sanity/queries/fragments";
import { SanityButtons } from "../sanity-buttons";
import { Autoplay, EffectFade } from "swiper/modules";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";

export default function TestimoniesSection({
  sectionHeader,
  testimonies,
}: TestimoniesProps) {
  const { title, buttons } = sectionHeader;

  const swiperRef = useRef<SwiperType>();

  return (
    <div className="wrapper py-fluid-xs space-y-fluid-lg overflow-hidden">
      <div className="flex flex-col w-full lg:flex-row lg:justify-between items-start prose mb-12">
        {title && (
          <h2 className="max-w-section-heading text-balance">{title}</h2>
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
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          speed={1000}
          slidesPerView={1}
          effect="fade"
          modules={[EffectFade, Autoplay]}
          className="overflow-visible featured-projects-swiper mb-fluid-lg"
          loop
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: false,
          // }}
        >
          {testimonies.map(
            ({ _id, author: { name, position }, quote }: TestimonyType, i) => {
              return (
                <SwiperSlide
                  key={_id + i}
                  className="space-y-fluid-lg bg-background flex flex-col items-start justify-between"
                  style={{ height: "auto", display: "flex" }}
                >
                  <blockquote className="max-w-section-heading text-balance uppercase font-black text-2xl leading-none">
                    {quote}
                  </blockquote>
                  <div className="leading-none">
                    <span className="block">{name}</span>
                    <span className="block opacity-40">{position}</span>
                  </div>
                </SwiperSlide>
              );
            },
          )}
        </Swiper>
      )}
      <div className="flex items-center justify-start gap-2">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="bg-primary-button text-white w-10 h-10 rounded-full flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="bg-primary-button text-white w-10 h-10 rounded-full flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
