import { sanityFetch } from "@/lib/sanity/live";
import { projectsQuery } from "@/lib/sanity/queries/documents";
import ProjectsGrid from "../components/ProjectsGrid";

async function fetchProjects() {
  return await sanityFetch({
    query: projectsQuery.query,
  });
}

// export async function generateMetadata() {
//   const { data } = await fetchProjects();
//   if (!data) {
//     return getMetaData({});
//   }
//   return getMetaData(data);
// }

export default async function ProjectsPage() {
  const { data } = await fetchProjects();
  if (!data) return null;

  return <ProjectsGrid projects={data} />;
}
