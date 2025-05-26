"use server";

import { sanityFetch } from "@/lib/sanity/live";
import { Projects, projectsQuery } from "@/lib/sanity/queries/documents";
import { ProjectsGrid } from "../components/ProjectsGrid";

async function fetchProjects(): Promise<{ data: Projects }> {
  return await sanityFetch({
    query: projectsQuery.query,
  });
}

export default async function ProjectsPage() {
  const { data } = await fetchProjects();
  if (!data) return null;

  return <ProjectsGrid projects={data} />;
}
