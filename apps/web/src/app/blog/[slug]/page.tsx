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
import { getColorSchemeStyle } from "@/utils/utils";
import { BlogSwiper } from "@/components/BlogSwiper";
import { ShareButtons } from "./components/ShareButtons";

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
    solutions,
    pageBuilder,
    colorScheme,
    relatedBlogs,
  } = data ?? {};

  console.log(relatedBlogs);

  return (
    <>
      <article
        className="bg-background pb-fluid-lg"
        style={getColorSchemeStyle(colorScheme)}
      >
        {/* <h1 className="sr-only">{title}</h1>

        {image && (
          <div className="mb-12">
            <SanityImage src={image} className="h-screen w-full" />
          </div>
        )} */}
        <section className="h-screen flex items-center relative prose overflow-hidden">
          {image && (
            <SanityImage
              src={image}
              className="w-full absolute inset-0 object-cover h-full"
              alt={title}
            />
          )}
          <div className="wrapper grid lg:grid-cols-2 gap-4 relative z-10 prose prose-white">
            <h1 className="uppercase text-3xl font-black font-heading">
              {title}
            </h1>
            <p className="lead max-w-p-lg mt-0">{description}</p>
          </div>
        </section>
        <section className="prose grid lg:grid-cols-4 wrapper pt-fluid-xs pb-fluid">
          <div className="lg:col-start-4 space-y-8">
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
            <div className="flex flex-wrap gap-2">
              {solutions &&
                solutions.length > 0 &&
                solutions.map(({ title, _id }) => (
                  <div
                    key={`solution-tag-${_id}`}
                    className="bg-nav-bar-background/20 text-text p-[15px] rounded-lg text-xs"
                  >
                    {title}
                  </div>
                ))}
            </div>
          </div>
        </section>

        <div className="wrapper wrapper--small">
          <RichText richText={richText ?? []} />
        </div>
      </article>

      <PageBuilder pageBuilder={pageBuilder ?? []} type={_type} id={_id} />
      <section
        style={getColorSchemeStyle(colorScheme)}
        className="bg-background text-text py-fluid-sm"
      >
        <div className="wrapper border-y border-nav-bar-background/20 py-fluid grid lg:grid-cols-2 gap-4 prose">
          <p className="lead">
            Love This Artice?
            <br />
            Share it around.
          </p>
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_WEB_URL ?? ""}/blog/${slug}`}
          />
        </div>
      </section>
      <section
        style={getColorSchemeStyle(colorScheme)}
        className="bg-background text-text pb-fluid overflow-hidden"
      >
        <div className="wrapper prose">
          <h2 className="h2">Similar Articles</h2>
          <BlogSwiper posts={relatedBlogs} />
        </div>
      </section>
    </>
  );
}
