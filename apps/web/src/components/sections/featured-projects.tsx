import { FeaturedProjectsProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";
import ProjectTile from "../project-tile";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";

import {
  opacityStaggerChildrenConfig,
  sectionAnimationConfig,
  STAGGER_DELAY,
} from "@/lib/motion";

import { ProjectsSwiper } from "../ProjectsSwiper";

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
        <ProjectsSwiper projects={projects.slice(2)} />
      )}
    </motion.div>
  );
}
