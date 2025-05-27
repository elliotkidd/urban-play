"use client";

import ProjectTile from "@/components/project-tile";
import { ImageType, TileType } from "@/lib/sanity/queries/fragments";

export const COL_SPANS = [
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

export default function ProjectGridClient({
  projects,
}: {
  projects: (TileType & { seoImage: ImageType })[];
}) {
  return (
    <ul className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-4 gap-y-fluid mb-fluid">
      {projects.length > 0 &&
        projects.map((project, index) => (
          <ProjectTile
            key={`${project._id}-${index}-project-tile`}
            project={project}
            className={COL_SPANS[index]}
            index={index}
            showDescription
            staggerDelay={0}
            imageAspectRatio={
              index % 11 === 0
                ? "square"
                : index % 11 === 1
                  ? "landscape"
                  : "portrait"
            }
          />
        ))}
    </ul>
  );
}
