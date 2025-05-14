import { RichText } from "@/components/richtext";
import { HeroBlock } from "@/components/sections/hero";
import { getColorSchemeStyle } from "@/utils/utils";
import { PageBuilder } from "@/components/pagebuilder";
import { projectIndexPageQuery } from "@/lib/sanity/queries/documents";
import { sanityFetch } from "@/lib/sanity/live";
import Link from "next/link";
import { getMetaData } from "@/lib/seo";
import PageHeader from "@/components/sections/PageHeader";

async function fetchProjectsIndexPageData() {
  return await sanityFetch({
    query: projectIndexPageQuery.query,
  });
}

export async function generateMetadata() {
  const { data } = await fetchProjectsIndexPageData();
  if (!data) {
    return getMetaData({});
  }
  return getMetaData(data);
}

export default async function ProjectsIndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await fetchProjectsIndexPageData();

  if (!data) return null;

  const {
    header,
    pageBuilder,
    description,
    solutions,
    colorScheme,
    _id,
    _type,
  } = data ?? {};

  return (
    <main
      className="bg-background text-text"
      style={getColorSchemeStyle(colorScheme)}
    >
      <section
        style={getColorSchemeStyle(header.colorScheme)}
        className="relative bg-background text-text overflow-hidden h-screen flex items-center"
      >
        <PageHeader {...header} />
      </section>
      <section className="lg:min-h-p-section mb-fluid-lg">
        <div className="wrapper flex flex-col lg:flex-row gap-fluid-sm justify-between py-fluid-xs">
          <RichText richText={description} className="max-w-p" />
          <div className="flex gap-2 max-w-xl flex-wrap lg:justify-end">
            <Link
              href="/projects"
              className="block px-4 py-2 bg-nav-bar-background/20 rounded-lg transition-colors"
            >
              All
            </Link>
            {solutions &&
              solutions.map(({ title, _id, slug }) => (
                <Link
                  key={_id}
                  href={`/projects/solution${slug}`}
                  className="block px-4 py-2 bg-nav-bar-background/20 rounded-lg transition-colors"
                >
                  {title}
                </Link>
              ))}
          </div>
        </div>
      </section>
      {children}
      <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />
    </main>
  );
}
