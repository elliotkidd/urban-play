"use client";

import ProjectTile from "@/components/project-tile";
import { opacityStaggerChildrenConfig, STAGGER_DELAY } from "@/lib/motion";
import { TileType } from "@/lib/sanity/queries/fragments";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const COL_SPANS = [
  "lg:col-span-4",
  "lg:col-span-8",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
];

function ProjectsGridClient({ projects }: { projects: TileType[] }) {
  if (!projects) return null;

  return (
    <motion.ul
      {...opacityStaggerChildrenConfig}
      className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-4 gap-y-fluid"
    >
      {projects.length > 0 &&
        projects.map((project, index) => (
          <ProjectTile
            key={`${project._id}-${index}-project-tile`}
            project={project}
            className={COL_SPANS[index]}
            index={index}
            staggerDelay={STAGGER_DELAY}
            imageAspectRatio={
              index % 11 === 0
                ? "square"
                : index % 11 === 1
                  ? "landscape"
                  : "portrait"
            }
          />
        ))}
    </motion.ul>
  );
}
export const ProjectsGrid = dynamic(() => Promise.resolve(ProjectsGridClient), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
