"use client";

import { TileType } from "@/lib/sanity/queries/fragments";
import ProjectTile from "./project-tile";
import { forwardRef } from "react";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

type Props = {
  projects: TileType[];
  imageAspectRatio?: "portrait" | "landscape" | "square" | "video";
};

const ProjectsSwiper = forwardRef<SwiperType, Props>(
  ({ projects, imageAspectRatio = "square" }, ref) => {
    return (
      <div>
        <Swiper
          slidesPerView={4}
          spaceBetween={16}
          className="not-prose"
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
            1536: {
              slidesPerView: 4,
            },
          }}
          style={{
            overflow: "visible",
          }}
          onBeforeInit={(swiper) => {
            if (ref && typeof ref === "object") {
              ref.current = swiper;
            }
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project._id}>
              <ProjectTile
                project={project}
                imageAspectRatio={imageAspectRatio}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  },
);

ProjectsSwiper.displayName = "ProjectsSwiper";

export { ProjectsSwiper };
