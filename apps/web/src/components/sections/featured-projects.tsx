import { FeaturedProjectsProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";
import { Swiper, SwiperSlide } from "swiper/react";
import { TileType } from "@/lib/sanity/queries/fragments";
import ProjectTile from "../project-tile";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";

import {
  opacityStaggerChildrenConfig,
  sectionAnimationConfig,
  STAGGER_DELAY,
} from "@/lib/motion";

import "swiper/css";

export default function FeaturedProjectsSection({
  sectionHeader,
  projects,
  smallWrapper,
}: FeaturedProjectsProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge(
        "wrapper py-fluid-xs space-y-fluid lg:space-y-fluid-lg overflow-hidden",
        smallWrapper && "wrapper--small",
      )}
    >
      <SectionHeader {...sectionHeader} />
      <motion.ul
        {...opacityStaggerChildrenConfig}
        className="grid grid-cols-1 gap-x-4 gap-y-fluid lg:grid-cols-3"
      >
        {projects[0] && (
          <ProjectTile
            project={projects[0]}
            imageAspectRatio="square"
            index={0}
            staggerDelay={STAGGER_DELAY}
            showDescription
          />
        )}
        {projects[1] && (
          <ProjectTile
            project={projects[1]}
            imageAspectRatio="landscape"
            className="lg:col-span-2"
            index={1}
            staggerDelay={STAGGER_DELAY}
            showDescription
          />
        )}
      </motion.ul>
      {projects && projects.length > 2 && (
        <Swiper
          slidesPerView={1.2}
          spaceBetween={24}
          breakpoints={{
            768: {
              slidesPerView: 4.2,
            },
          }}
          direction="horizontal"
          className="overflow-visible featured-projects-swiper"
        >
          {projects.slice(2).map((project: TileType, i) => {
            return (
              <SwiperSlide key={project._id + i}>
                <ProjectTile
                  project={project}
                  index={i + 2}
                  staggerDelay={STAGGER_DELAY}
                  className="list-none"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </motion.div>
  );
}
