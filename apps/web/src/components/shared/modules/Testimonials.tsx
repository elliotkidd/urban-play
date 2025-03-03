"use client";

import { TypeFromSelection } from "groqd";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/controller";
import "swiper/css/effect-fade";
import { Controller, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { TESTIMONIALS_FRAGMENT } from "@/sanity/lib/queries/sections";

import SanityImage from "../SanityImage";
import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof TESTIMONIALS_FRAGMENT>;

export default function Testimonials({ testimonials, settings }: Props) {
  const [imageSwiperInstance, setImageSwiperInstance] =
    useState<SwiperType | null>(null);
  const [quoteSwiperInstance, setQuoteSwiperInstance] =
    useState<SwiperType | null>(null);

  useEffect(() => {
    if (imageSwiperInstance && quoteSwiperInstance) {
      imageSwiperInstance.controller.control = quoteSwiperInstance;
      quoteSwiperInstance.controller.control = imageSwiperInstance;
    }
  }, [imageSwiperInstance, quoteSwiperInstance]);

  return (
    <ModuleWrapper settings={settings}>
      <div className="wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-fluid-sm">
          <Swiper
            className="justify-self-center self-center aspect-square w-full max-w-[280px] sm:max-w-md"
            onSwiper={setImageSwiperInstance}
            modules={[EffectFade, Controller]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1000}
            loop={true}
          >
            {testimonials &&
              testimonials.length > 0 &&
              testimonials.map(({ _id, image }, i: number) => {
                return (
                  <SwiperSlide key={`${_id}${i}`}>
                    {image && (
                      <div className="aspect-square relative">
                        <SanityImage
                          src={image}
                          height={600}
                          width={600}
                          className="absolute h-full w-full object-cover"
                          sizes="(min-width: 1024px) 33vw, 100vw"
                        />
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <div className="flex flex-col h-full space-y-4">
            <svg
              className="w-12 h-12"
              viewBox="0 0 56 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_171_1208)">
                <path
                  d="M29.9821 33.8959C29.1761 36.813 29.2312 39.9428 30.439 42.8126C31.5943 45.5591 33.0226 47.6622 35.4304 49.4713C37.3392 50.9049 40.0358 51.6453 42.4041 51.5666C48.4274 51.367 53.4135 45.9109 53.7417 39.9848C53.7706 39.948 53.7968 39.9139 53.8257 39.8771C54.9784 38.3858 55.7293 36.6266 55.9578 34.7624C56.4645 30.6611 52.2004 26.5756 48.8895 24.8794C44.7278 22.7474 39.4082 22.5977 35.5722 25.5437C35.4251 25.6566 35.2833 25.7721 35.1416 25.8876C35.2203 25.2234 35.3096 24.5853 35.412 23.9814C35.5932 22.9075 35.8216 21.8389 36.0737 20.7807C36.1997 20.2504 36.3389 19.7252 36.4833 19.2001C36.6487 18.5936 36.5384 17.9503 36.4229 17.3228C36.885 15.5242 37.628 13.5523 38.7466 12.2159C38.849 12.0924 39.3058 11.7695 38.8779 11.9979C39.3531 11.7432 39.7286 11.3651 40.0174 10.9135C40.301 10.4698 40.5977 10.0339 40.9049 9.60595C40.9311 9.57182 41.0073 9.47204 41.0729 9.3854C41.1753 9.25674 41.2803 9.13071 41.388 9.00468C41.6873 8.65021 42.0076 8.31676 42.3359 7.99118C42.5302 7.80213 42.735 7.62096 42.9424 7.44766C42.8137 7.57107 43.5279 7.04856 43.7143 6.94091C43.8246 6.8779 43.9375 6.82276 44.053 6.76499C44.2368 6.70723 44.6018 6.63634 44.7646 6.59958L44.7698 6.59958C44.8197 6.61796 45.0429 6.65472 45.2582 6.69936C45.4262 6.786 45.8227 6.96979 45.9934 7.07745C46.1772 7.23498 46.3531 7.40565 46.5238 7.57632C49.5091 10.5696 54.2721 5.69635 51.1187 2.98142C48.107 0.387275 44.2001 -0.471318 40.7132 1.8025C39.0748 2.86852 37.8276 4.32839 36.7091 5.91165C36.1997 6.63371 35.756 7.39778 35.3385 8.17497C34.6479 9.46154 35.1731 9.97092 34.5455 11.3415C34.0834 12.3524 33.6633 13.3869 33.2721 14.4267C33.0857 14.9229 32.9124 15.4244 32.7443 15.9259C32.7023 16.0546 32.6472 16.1596 32.6052 16.2331C32.4686 16.3854 32.3321 16.5403 32.2034 16.6978C31.3659 17.7192 31.1584 19.1975 30.867 20.4657C30.6018 21.6105 30.3865 22.7684 30.2053 23.9315C29.8482 26.2264 29.6277 28.4976 29.7458 30.8186C29.7931 31.7691 29.843 32.8351 29.9848 33.8854L29.9821 33.8959Z"
                  fill="#F4B7E6"
                />
                <path
                  d="M0.537805 33.3998C-0.268271 36.3169 -0.213136 39.4467 0.994666 42.3165C2.14995 45.063 3.57831 47.1661 5.98604 48.9752C7.89489 50.4088 10.5914 51.1492 12.9572 51.0705C18.983 50.8709 23.9665 45.4148 24.2974 39.4887C24.3262 39.4519 24.3525 39.4178 24.3814 39.3811C25.534 37.8871 26.285 36.1305 26.5134 34.2636C27.0202 30.1624 22.7561 26.0769 19.4452 24.3807C15.2835 22.2486 9.96391 22.099 6.12783 25.045C5.98079 25.1579 5.839 25.2734 5.69722 25.3889C5.77599 24.7246 5.86526 24.0866 5.96766 23.4827C6.14883 22.4088 6.37726 21.3402 6.62933 20.282C6.75536 19.7516 6.89452 19.2265 7.03893 18.7014C7.20434 18.0949 7.09407 17.4516 6.97854 16.824C7.44066 15.0255 8.18371 13.0536 9.30224 11.7171C9.40464 11.5937 9.86151 11.2708 9.43353 11.4992C9.90877 11.2445 10.2842 10.8664 10.5731 10.4148C10.8566 9.97108 11.1533 9.53522 11.4605 9.10723C11.4868 9.0731 11.5629 8.97333 11.6286 8.88668C11.731 8.75802 11.836 8.63199 11.9437 8.50596C12.243 8.1515 12.5607 7.81804 12.8915 7.49246C13.0858 7.30341 13.2906 7.12224 13.498 6.94894C13.3694 7.07235 14.0836 6.54985 14.27 6.44219C14.3803 6.37918 14.4932 6.32404 14.6087 6.26628C14.7925 6.20851 15.1575 6.13762 15.3203 6.10086L15.3255 6.10086C15.3754 6.11924 15.5986 6.156 15.8139 6.20064C15.9819 6.28728 16.3784 6.47108 16.5491 6.57873C16.7329 6.73627 16.9088 6.90694 17.0794 7.07761C20.0648 10.0709 24.8278 5.19764 21.6743 2.4827C18.6627 -0.111443 14.7557 -0.970037 11.2689 1.30378C9.63045 2.3698 8.38327 3.82967 7.26474 5.41294C6.75536 6.13499 6.31162 6.89906 5.89414 7.67625C5.2036 8.96282 5.72873 9.4722 5.10119 10.8428C4.63908 11.8537 4.21898 12.8882 3.82775 13.9279C3.64133 14.4242 3.46804 14.9257 3.29999 15.4272C3.25798 15.5558 3.20284 15.6609 3.16083 15.7344C3.0243 15.8867 2.88777 16.0416 2.75911 16.1991C1.92153 17.2205 1.7141 18.6988 1.42265 19.9669C1.15746 21.1117 0.942155 22.2696 0.760983 23.4328C0.403895 25.7276 0.183338 27.9988 0.301493 30.3199C0.348755 31.2704 0.398643 32.3364 0.54043 33.3867L0.537805 33.3998Z"
                  fill="#F4B7E6"
                />
              </g>
            </svg>
            <Swiper
              className="w-full flex-1 mb-4"
              onSwiper={setQuoteSwiperInstance}
              modules={[EffectFade, Controller]}
              effect="fade"
              speed={1000}
              loop={true}
            >
              {testimonials &&
                testimonials.map(({ _id, name, company, quote }, i: number) => {
                  return (
                    <SwiperSlide key={`${_id}${i}`} className="bg-primary">
                      <blockquote className="font-heading text-md lg:text-lg text-contrast mb-4 text-balance">
                        {quote}
                      </blockquote>
                      <h5 className="text-accent text-base font-normal">
                        {name}, {company}
                      </h5>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <div className="flex gap-2 z-[1] mt-auto">
              <button
                className="text-accent opacity-50 hover:opacity-100 disabled:cursor-not-allowed transition-opacity duration-500"
                onClick={() => {
                  quoteSwiperInstance?.slidePrev();
                }}
              >
                <svg
                  className="w-12 h-12 rotate-180"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_171_1204)">
                    <path
                      d="M28.1323 19.6301C28.9112 21.704 30.4379 22.977 31.9895 24.5355C32.2263 24.7715 32.4693 25.0074 32.7061 25.2372C27.1103 25.1006 21.4024 26.5535 15.8005 26.3859C13.7317 26.3238 13.2768 29.4968 15.3144 29.8942C21.1843 31.0367 27.2038 29.8259 33.1485 29.8755C32.7123 30.2916 32.2886 30.7138 31.8711 31.1422C30.55 32.4773 27.8145 35.0479 28.0388 37.1343C28.1385 38.047 28.7305 38.6431 29.6777 38.4817C31.3103 38.2023 32.9179 35.7806 34.0396 34.6754C35.8591 32.8871 37.7971 31.1112 40.1151 29.9935C41.6979 29.2298 41.1932 27.0627 40.1151 26.1872C38.2769 24.6969 36.557 23.0887 34.8559 21.4433C33.3354 19.9716 32.0767 18.2765 30.0328 17.5748C28.8925 17.1836 27.7148 18.5373 28.1261 19.6363L28.1323 19.6301Z"
                      fill="currentColor"
                    />
                  </g>
                  <circle
                    cx="28"
                    cy="28"
                    r="27"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <defs>
                    <clipPath id="clip0_171_1204">
                      <rect
                        width="21"
                        height="27.125"
                        fill="white"
                        transform="translate(13.9996 38.5001) rotate(-90)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button
                className="text-accent opacity-50 hover:opacity-100 disabled:cursor-not-allowed transition-opacity duration-500"
                onClick={() => {
                  quoteSwiperInstance?.slideNext();
                }}
              >
                <svg
                  className="w-12 h-12"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_171_1204)">
                    <path
                      d="M28.1323 19.6301C28.9112 21.704 30.4379 22.977 31.9895 24.5355C32.2263 24.7715 32.4693 25.0074 32.7061 25.2372C27.1103 25.1006 21.4024 26.5535 15.8005 26.3859C13.7317 26.3238 13.2768 29.4968 15.3144 29.8942C21.1843 31.0367 27.2038 29.8259 33.1485 29.8755C32.7123 30.2916 32.2886 30.7138 31.8711 31.1422C30.55 32.4773 27.8145 35.0479 28.0388 37.1343C28.1385 38.047 28.7305 38.6431 29.6777 38.4817C31.3103 38.2023 32.9179 35.7806 34.0396 34.6754C35.8591 32.8871 37.7971 31.1112 40.1151 29.9935C41.6979 29.2298 41.1932 27.0627 40.1151 26.1872C38.2769 24.6969 36.557 23.0887 34.8559 21.4433C33.3354 19.9716 32.0767 18.2765 30.0328 17.5748C28.8925 17.1836 27.7148 18.5373 28.1261 19.6363L28.1323 19.6301Z"
                      fill="currentColor"
                    />
                  </g>
                  <circle
                    cx="28"
                    cy="28"
                    r="27"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <defs>
                    <clipPath id="clip0_171_1204">
                      <rect
                        width="21"
                        height="27.125"
                        fill="white"
                        transform="translate(13.9996 38.5001) rotate(-90)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModuleWrapper>
  );
}
