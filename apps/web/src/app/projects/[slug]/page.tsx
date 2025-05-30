import { PageBuilder } from "@/components/pagebuilder";
import ProjectsSwiper from "@/components/ProjectsSwiper";
import { sanityFetch } from "@/lib/sanity/live";
import {
  type ProjectPage,
  projectPageQuery,
} from "@/lib/sanity/queries/documents";
import { getMetaData } from "@/lib/seo";
import { notFound } from "next/navigation";

async function fetchProjectPageData(slug: string) {
  return await sanityFetch({
    query: projectPageQuery.query,
    params: { slug: `/projects/${slug}` },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetchProjectPageData(slug);
  if (!data) {
    return getMetaData({});
  }
  return getMetaData(data);
}

async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await fetchProjectPageData(slug);

  if (!data) notFound();

  const { title, pageBuilder, relatedProjects, _id, _type } = data ?? {};

  return (
    <main className="bg-background text-text">
      <h1 className="sr-only">{title}</h1>
      <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />

      {relatedProjects && (
        <section className="overflow-hidden mt-fluid-lg">
          <div className="wrapper py-fluid-xs">
            <div className="prose mb-fluid-sm">
              <h2 className="">More Projects</h2>
            </div>
            <ProjectsSwiper
              projects={relatedProjects}
              imageAspectRatio="portrait"
            />
          </div>
        </section>
      )}
    </main>
  );
}

export default ProjectPage;
