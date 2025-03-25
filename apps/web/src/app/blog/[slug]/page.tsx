import { notFound } from "next/navigation";

import { client } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import { queryBlogPaths } from "@/lib/sanity/query";
import { getMetaData } from "@/lib/seo";
import SanityImage from "@/components/sanity-image";
import { RichText } from "@/components/richtext";
import {
  type BlogSlugPageType,
  blogSlugPageQuery,
} from "@/lib/sanity/queries/documents";
import { PageBuilder } from "@/components/pagebuilder";

async function fetchBlogSlugPageData(
  slug: string,
): Promise<{ data: BlogSlugPageType }> {
  return await sanityFetch({
    query: blogSlugPageQuery.query,
    params: { slug: `/blog/${slug}` },
  });
}

async function fetchBlogPaths() {
  const slugs = await client.fetch(queryBlogPaths);
  const paths: { slug: string }[] = [];
  for (const slug of slugs) {
    if (!slug) continue;
    const [, , path] = slug.split("/");
    if (path) paths.push({ slug: path });
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetchBlogSlugPageData(slug);
  if (!data) return getMetaData({});
  return getMetaData(data);
}

// export async function generateStaticParams() {
//   return await fetchBlogPaths();
// }

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetchBlogSlugPageData(slug);
  if (!data) return notFound();

  const {
    _id,
    _type,
    title,
    publishedAt,
    description,
    image,
    richText,
    authors,
    pageBuilder,
  } = data ?? {};

  console.log(authors);

  return (
    <div className="">
      <article>
        <h1 className="sr-only">{title}</h1>

        {image && (
          <div className="mb-12">
            <SanityImage src={image} className="h-screen w-full" />
          </div>
        )}
        <section className="prose grid lg:grid-cols-4 wrapper mb-fluid-lg">
          <p className="lead max-w-section-heading lg:col-span-3">
            {description}
          </p>
          <div className="">
            <p className="grid grid-cols-3 text-xs">
              <span className="opacity-50">Date</span>
              <span className="col-span-2">
                {publishedAt
                  ? new Date(publishedAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Date unavailable"}
              </span>
            </p>
            <p className="grid grid-cols-3 text-xs">
              <span className="opacity-50">Author</span>
              <span className="col-span-2">
                {authors &&
                  authors.length > 0 &&
                  authors.map((author) => author.name).join(", ")}
              </span>
            </p>
          </div>
        </section>

        <div className="wrapper wrapper--small">
          <RichText richText={richText ?? []} />
        </div>
      </article>

      <PageBuilder pageBuilder={pageBuilder ?? []} type={_type} id={_id} />

      {/* <aside className="hidden lg:block">
        <div className="sticky top-4 rounded-lg ">
          <TableOfContent richText={richText} />
        </div>
      </aside> */}
    </div>
  );
}
