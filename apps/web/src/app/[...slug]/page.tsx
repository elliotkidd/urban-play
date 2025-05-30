import { notFound } from "next/navigation";

import { PageBuilder } from "@/components/pagebuilder";
import { client } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import { querySlugPagePaths } from "@/lib/sanity/query";
import { getMetaData } from "@/lib/seo";
import { pageQuery } from "@/lib/sanity/queries/documents";

async function fetchSlugPageData(slug: string) {
  return await sanityFetch({
    query: pageQuery.query,
    params: { slug: `/${slug}` },
  });
}

async function fetchSlugPagePaths() {
  const slugs = await client.fetch(querySlugPagePaths);
  const paths: { slug: string[] }[] = [];
  for (const slug of slugs) {
    if (!slug) continue;
    const parts = slug.split("/").filter(Boolean);
    paths.push({ slug: parts });
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugString = slug.join("/");
  const { data: pageData } = await fetchSlugPageData(slugString);
  if (!pageData) {
    return getMetaData({});
  }
  return getMetaData(pageData);
}

export async function generateStaticParams() {
  return await fetchSlugPagePaths();
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugString = slug.join("/");
  const { data: pageData } = await fetchSlugPageData(slugString);

  if (!pageData) {
    return notFound();
  }

  const { title, pageBuilder, _id, _type } = pageData ?? {};

  return !Array.isArray(pageBuilder) || pageBuilder?.length === 0 ? (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white text-center p-4">
      <h1 className="text-2xl font-semibold mb-4 capitalize">{title}</h1>
      <p className="text-text mb-6">This page has no content blocks yet.</p>
    </div>
  ) : (
    <PageBuilder pageBuilder={pageBuilder} id={_id} type={_type} />
  );
}
