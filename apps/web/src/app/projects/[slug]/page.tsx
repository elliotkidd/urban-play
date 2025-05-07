import { PageBuilder } from "@/components/pagebuilder";
import ProjectsSwiper from "@/components/ProjectsSwiper";
import { RichText } from "@/components/richtext";
import { HeroBlock } from "@/components/sections/hero";
import { sanityFetch } from "@/lib/sanity/live";
import {
  type ProjectPage,
  projectPageQuery,
} from "@/lib/sanity/queries/documents";
import { getMetaData } from "@/lib/seo";
import { getColorSchemeStyle } from "@/utils/utils";
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

  const {
    title,
    hero,
    description,
    richText,
    client,
    construction,
    status,
    pageBuilder,
    relatedProjects,
    _id,
    _type,
  } = data ?? {};

  return (
    <main className="bg-background text-text">
      <h1 className="sr-only">{title}</h1>
      {hero && (
        <section
          style={getColorSchemeStyle(hero.colorScheme)}
          className="text-text"
        >
          <HeroBlock {...hero} />
        </section>
      )}

      <div className="wrapper py-fluid-xs">
        <div className="flex w-full flex-col gap-2 lg:flex-row justify-between prose mb-fluid-lg">
          <p className="lead max-w-section-heading">{description}</p>
          <div className="not-prose grid grid-cols-2 mr-fluid text-xs leading-none">
            <span className="opacity-50 block">Client</span>
            <span className="block">{client}</span>
            <span className="opacity-50 block">Construction</span>
            <span className="block">{construction}</span>
            <span className="opacity-50 block">Status</span>
            <span className="block">{status}</span>
          </div>
        </div>
        {richText && <RichText richText={richText} className="max-w-p-lg" />}
      </div>
      <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />

      {relatedProjects && (
        <section className="overflow-hidden mt-fluid-lg">
          <div className="wrapper py-fluid-xs">
            <div className="prose mb-fluid-sm">
              <h2 className="">More Projects</h2>
            </div>
            <ProjectsSwiper projects={relatedProjects} />
          </div>
        </section>
      )}
    </main>
  );
}

export default ProjectPage;
