import ProjectGridClient from "./ProjectGridClient";
import {
  projectsBySolutionQuery,
  projectsQuery,
} from "@/lib/sanity/queries/documents";
import { log } from "console";
import { sanityFetch } from "@/lib/sanity/live";
import Pagination from "@/components/Pagination";
import { PostTileSkeleton } from "@/components/post-tile";
import { PROJECT_GRID_COL_SPANS } from "@/utils/utils";

type SolutionType = {
  _type: string;
  _id: string;
  _key: string;
  title: string;
  slug: string;
};

async function fetchProjects(indexFrom: number, indexTo: number) {
  return await sanityFetch({
    query: projectsQuery,
    params: {
      indexFrom,
      indexTo,
    },
  });
}

async function fetchProjectsBySolution(
  indexFrom: number,
  indexTo: number,
  tags: string[] | string,
) {
  tags = Array.isArray(tags) ? tags : [tags];
  return await sanityFetch({
    query: projectsBySolutionQuery,
    params: {
      indexFrom,
      indexTo,
      tags,
    },
  });
}

export function ProjectsGridSkeleton() {
  return (
    <div className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-4 gap-y-fluid mb-fluid">
      {Array.from({ length: 12 }).map((_, index) => (
        <PostTileSkeleton
          key={index}
          imageAspect={
            index % 11 === 0
              ? "square"
              : index % 11 === 1
                ? "landscape"
                : "portrait"
          }
          className={PROJECT_GRID_COL_SPANS[index % 11]}
        />
      ))}
    </div>
  );
}

export async function ProjectsGrid({
  tags,
  indexFrom,
  indexTo,
  perPage,
}: {
  solutions: SolutionType[];
  title: string;
  tags: string[];
  indexTo: number;
  indexFrom: number;
  perPage: number;
}) {
  let response;

  tags
    ? (response = await fetchProjectsBySolution(indexFrom, indexTo, tags))
    : (response = await fetchProjects(indexFrom, indexTo));

  const { data } = response ?? {};
  if (!data) return null;

  const { projects, total } = data ?? {};

  return (
    <>
      {projects.length > 0 ? (
        <>
          <ProjectGridClient projects={projects} />
          <Pagination total={total} perPage={perPage} />
        </>
      ) : (
        <div className="wrapper prose text-center">
          <h3 className="h3 font-heading uppercase">No projects!</h3>
        </div>
      )}
    </>
  );
}
