"use client";

import SectionHeader from "../section-header";
import { SolutionsCarouselProps } from "@/lib/sanity/queries/sections";
import { useRef, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";

import { Swiper as SwiperType } from "swiper/types";
import { EffectFade, Controller, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import SanityImage from "../sanity-image";
import { Swiper, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";

export default function SolutionsCarouselSection({
  sectionHeader,
  solutions,
  smallWrapper,
}: SolutionsCarouselProps) {
  const mainSwiperRef = useRef<SwiperType>();
  const textSwiperRef = useRef<SwiperType>();
  const nextTextRef = useRef<SwiperType>();
  const nextImageRef = useRef<SwiperType>();
  const [mainSwiper, setMainSwiper] = useState<SwiperType>();

  return (
    <div
      className={twMerge(
        "wrapper py-fluid-xs",
        smallWrapper && "wrapper--small",
      )}
    >
      <SectionHeader {...sectionHeader} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 items-stretch">
        <div className="flex flex-col w-full justify-between">
          <Swiper
            modules={[EffectFade, Controller]}
            onBeforeInit={(swiper) => {
              textSwiperRef.current = swiper;
            }}
            effect="fade"
            slidesPerView={1}
            spaceBetween={0}
            speed={1000}
            loop
            style={{ width: "100%" }}
            allowTouchMove={false}
          >
            {solutions.map(({ _id, title, description }) => (
              <SwiperSlide key={_id} className="bg-background">
                <h3 className="h3">{title}</h3>
                <p className="max-w-p text-balance">{description}</p>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col w-full gap-2 items-start">
            <div className="w-48 flex ">
              <div className="w-full">
                <span className="text-xs normal-case font-bold mb-0 block leading-none opacity-40">
                  Next
                </span>
                <Swiper
                  effect="fade"
                  modules={[EffectFade, Controller]}
                  onBeforeInit={(swiper) => {
                    nextTextRef.current = swiper;
                  }}
                  initialSlide={1}
                  slidesPerView={1}
                  spaceBetween={0}
                  loop
                  speed={1000}
                  allowTouchMove={false}
                  style={{ width: "100%" }}
                >
                  {solutions.map(({ _id, title }) => (
                    <SwiperSlide key={_id} className="bg-background">
                      <h4 className="text-xs normal-case font-bold leading-none">
                        {title}
                      </h4>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="flex-0 flex">
                <button onClick={() => mainSwiperRef.current?.slidePrev()}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </button>
                <button onClick={() => mainSwiperRef.current?.slideNext()}>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <Swiper
              className="w-48 aspect-square rounded-lg overflow-hidden"
              modules={[Controller]}
              onBeforeInit={(swiper) => {
                nextImageRef.current = swiper;
              }}
              slidesPerView={1}
              spaceBetween={0}
              loop
              initialSlide={1}
              speed={1000}
              allowTouchMove={false}
              style={{ marginLeft: "0" }}
            >
              {solutions.map((solution: any) => (
                <SwiperSlide
                  key={`thumb-${solution._id}`}
                  className="relative aspect-landscape"
                >
                  <SanityImage
                    src={solution.image}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <Swiper
          className="aspect-landscape rounded-xl overflow-hidden"
          modules={[Autoplay, Controller]}
          slidesPerView={1}
          spaceBetween={0}
          loop
          onSwiper={(swiper) => {
            setMainSwiper(swiper);
            if (
              textSwiperRef.current &&
              nextTextRef.current &&
              nextImageRef.current
            ) {
              swiper.controller.control = [
                textSwiperRef.current,
                nextTextRef.current,
                nextImageRef.current,
              ];
            }
          }}
          onBeforeInit={(swiper) => {
            mainSwiperRef.current = swiper;
          }}
          speed={1000}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          style={{ width: "100%" }}
        >
          {solutions.map((solution: any) => (
            <SwiperSlide
              key={solution._id}
              className="relative aspect-landscape"
            >
              <SanityImage
                src={solution.image}
                className="w-full h-full object-cover absolute inset-0"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
