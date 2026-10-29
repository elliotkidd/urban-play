import ProjectGridClient from "./ProjectGridClient";
import {
  projectsQuery,
  projectsBySolutionQuery,
} from "@/lib/sanity/queries/documents";
import { sanityFetch } from "@/lib/sanity/live";
import { PostTileSkeleton } from "@/components/post-tile";

type SolutionType = {
  _type: string;
  _id: string;
  _key: string;
  title: string;
  slug: string;
};

async function fetchProjects() {
  return await sanityFetch({
    query: projectsQuery,
    params: {},
  });
}

async function fetchProjectsBySolution(tags: string[] | string) {
  tags = Array.isArray(tags) ? tags : [tags];
  return await sanityFetch({
    query: projectsBySolutionQuery,
    params: {
      tags,
    },
  });
}

export function ProjectsGridSkeleton() {
  return (
    <div className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-fluid mb-fluid">
      {Array.from({ length: 9 }).map((_, index) => (
        <PostTileSkeleton key={index} imageAspect="square" />
      ))}
    </div>
  );
}

export async function ProjectsGrid({ tags }: { tags: string[] }) {
  let response;

  tags
    ? (response = await fetchProjectsBySolution(tags))
    : (response = await fetchProjects());

  const { data } = response ?? {};
  if (!data) return null;

  const { projects } = data ?? {};

  return (
    <>
      {projects && projects.length > 0 ? (
        <>
          <ProjectGridClient projects={projects} />
        </>
      ) : (
        <div className="wrapper prose text-center">
          <h3 className="h3 font-heading uppercase">No projects!</h3>
        </div>
      )}
    </>
  );
}
