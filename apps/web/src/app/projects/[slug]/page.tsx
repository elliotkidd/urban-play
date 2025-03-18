import { PageBuilder } from "@/components/pagebuilder";
import { RichText } from "@/components/richtext";
import { HeroBlock } from "@/components/sections/hero";
import { sanityFetch } from "@/lib/sanity/live";
import {
  type ProjectPage,
  projectPageQuery,
} from "@/lib/sanity/queries/documents";
import { getColorSchemeStyle } from "@/utils/utils";
import { notFound } from "next/navigation";

async function fetchProjectPageData(slug: string) {
  return await sanityFetch({
    query: projectPageQuery.query,
    params: { slug: `/${slug}` },
  });
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

  console.log(relatedProjects);

  return (
    <main className="bg-background text-text">
      {hero && (
        <section style={getColorSchemeStyle(hero.colorScheme)}>
          <HeroBlock {...hero} />
        </section>
      )}

      <div className="wrapper py-fluid-xs">
        <div className="flex w-full flex-col gap-2 lg:flex-row justify-between prose mb-fluid-lg">
          <p className="lead max-w-section-heading">{description}</p>
          <div className="">
            <span>{client}</span>
            <span>{construction}</span>
            <span>{status}</span>
          </div>
        </div>
        {richText && <RichText richText={richText} className="max-w-p-lg" />}
      </div>
      <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />
    </main>
  );
}

export default ProjectPage;
