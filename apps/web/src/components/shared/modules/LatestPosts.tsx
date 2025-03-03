"use client";

import { TypeFromSelection } from "groqd";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { LATEST_POSTS_FRAGMENT } from "@/sanity/lib/queries/sections";

import RichText from "../RichText";
import PostCard from "../cards/PostCard";
import ButtonGroup from "../navigation/ButtonGroup";
import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof LATEST_POSTS_FRAGMENT>;

export default function LatestPosts({
  richText,
  settings,
  latestPosts,
  buttons,
  posts,
}: Props) {
  const postsToShow = posts || latestPosts;

  const [postSwiperInstance, setPostSwiperInstance] =
    useState<SwiperType | null>(null);

  return (
    <ModuleWrapper settings={settings} className="overflow-hidden">
      <div className="wrapper space-y-fluid-sm overflow-visible">
        <div className="justify-between flex items-end">
          <div className="relative max-w-5xl gap-6">
            <RichText value={richText} />
          </div>
          <div>
            <div className="flex gap-2 z-[1] mt-auto">
              <button
                className="text-accent opacity-50 hover:opacity-100 disabled:cursor-not-allowed transition-opacity duration-500"
                onClick={() => {
                  postSwiperInstance?.slidePrev();
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
                  postSwiperInstance?.slideNext();
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
        <Swiper
          onSwiper={setPostSwiperInstance}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          breakpoints={{
            768: {
              slidesPerView: 1.25,
            },
          }}
          className="w-full !overflow-visible"
        >
          {postsToShow?.map((post, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <PostCard post={post} index={index} large />
            </SwiperSlide>
          ))}
        </Swiper>
        {buttons && (
          <ButtonGroup
            className="flex flex-wrap items-center justify-center gap-2"
            buttons={buttons}
          />
        )}
      </div>
    </ModuleWrapper>
  );
}
