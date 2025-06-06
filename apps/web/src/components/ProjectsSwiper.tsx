"use client";

import { TileType } from "@/lib/sanity/queries/fragments";
import ProjectTile from "./project-tile";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  projects: TileType[];
  imageAspectRatio?: "portrait" | "landscape" | "square" | "video";
};

function ProjectsSwiper({ projects, imageAspectRatio = "square" }: Props) {
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
}

export default ProjectsSwiper;
