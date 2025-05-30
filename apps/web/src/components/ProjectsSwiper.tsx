"use client";

import { TileType } from "@/lib/sanity/queries/fragments";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ProjectTile from "./project-tile";
type Props = {
  projects: TileType[];
  imageAspectRatio: "portrait" | "landscape" | "square" | "video";
};

function ProjectsSwiper({ projects, imageAspectRatio }: Props) {
  return (
    <Splide
      options={{
        type: "slide",
        perPage: 4,
        gap: "1rem",
        arrows: false,
        pagination: false,
        drag: true,
        trimSpace: false,
        perMove: 1,
        breakpoints: {
          768: {
            perPage: 1,
          },
          1024: {
            perPage: 2,
          },
          1280: {
            perPage: 3,
          },
        },
      }}
      className="not-prose"
    >
      {projects.map((project) => (
        <SplideSlide key={project._id}>
          <ProjectTile project={project} imageAspectRatio={imageAspectRatio} />
        </SplideSlide>
      ))}
    </Splide>
  );
}
export default ProjectsSwiper;
