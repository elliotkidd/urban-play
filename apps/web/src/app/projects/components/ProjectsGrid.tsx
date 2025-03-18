import ProjectTile from "@/components/project-tile";
import { TileType } from "@/lib/sanity/queries/fragments";

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

async function ProjectsGrid({ projects }: { projects: TileType[] }) {
  if (!projects) return null;

  return (
    <ul className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
      {projects.length > 0 &&
        projects.map((project, index) => (
          <li key={project._id} className={COL_SPANS[index]}>
            <ProjectTile
              project={project}
              imageAspectRatio={
                index % 11 === 0
                  ? "square"
                  : index % 11 === 1
                    ? "landscape"
                    : "portrait"
              }
            />
          </li>
        ))}
    </ul>
  );
}
export default ProjectsGrid;
