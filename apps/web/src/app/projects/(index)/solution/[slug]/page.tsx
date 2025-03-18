import { sanityFetch } from "@/lib/sanity/live";
import ProjectsGrid from "../../../components/ProjectsGrid";
import { projectsQueryBySolution } from "@/lib/sanity/queries/documents";

async function fetchProjects(slug: string) {
  return await sanityFetch({
    query: projectsQueryBySolution.query,
    params: { slug: `/${slug}` },
  });
}

async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await fetchProjects(slug);
  if (!data) return null;

  return <ProjectsGrid projects={data} />;
}

export default SolutionPage;
