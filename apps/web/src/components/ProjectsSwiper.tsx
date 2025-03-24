"use client";

import { TileType } from "@/lib/sanity/queries/fragments";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProjectTile from "./project-tile";
type Props = {
  projects: TileType[];
};

function ProjectsSwiper({ projects }: Props) {
  return (
    <Swiper
      slidesPerView={1.2}
      spaceBetween={32}
      breakpoints={{
        768: {
          slidesPerView: 2.2,
        },
        1024: {
          slidesPerView: 3.2,
        },
        1280: {
          slidesPerView: 4.2,
        },
      }}
      style={{ overflow: "visible" }}
    >
      {projects.map((project) => (
        <SwiperSlide key={project._id}>
          <ProjectTile project={project} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export default ProjectsSwiper;
