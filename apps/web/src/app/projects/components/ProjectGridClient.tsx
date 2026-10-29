"use client";

import ProjectTile from "@/components/project-tile";
import { ImageType, TileType } from "@/lib/sanity/queries/fragments";

export default function ProjectGridClient({
  projects,
}: {
  projects: (TileType & { seoImage: ImageType })[];
}) {
  return (
    <div className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-fluid mb-fluid">
      {projects.length > 0 &&
        projects.map((project, index) => (
          <ProjectTile
            key={`${project._id}-${index}-project-tile`}
            project={project}
            index={index}
            showDescription
            staggerDelay={0}
            imageAspectRatio="square"
          />
        ))}
    </div>
  );
}
