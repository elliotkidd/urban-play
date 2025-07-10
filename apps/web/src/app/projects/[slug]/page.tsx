import { PageBuilder } from "@/components/pagebuilder";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
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
    <div className="bg-background text-text">
      <h1 className="sr-only">{title}</h1>
      <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />

      {relatedProjects && <RelatedProjects relatedProjects={relatedProjects} />}
    </div>
  );
}

export default ProjectPage;
