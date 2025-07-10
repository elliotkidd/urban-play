"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRef } from "react";
import { ProjectsSwiper } from "../ProjectsSwiper";
import { type Swiper as SwiperType } from "swiper";

export function RelatedProjects({
  relatedProjects,
}: {
  relatedProjects: any[];
}) {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <section className="overflow-hidden mt-fluid-lg">
      <div className="wrapper pt-fluid-xs pb-fluid-xl">
        <div className="prose mb-fluid-sm flex flex-col gap-fluid-sm justify-between lg:flex-row">
          <h2 className="">More Projects</h2>
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
        </div>

        <ProjectsSwiper
          projects={relatedProjects}
          imageAspectRatio="portrait"
          ref={swiperRef}
        />
      </div>
    </section>
  );
}
