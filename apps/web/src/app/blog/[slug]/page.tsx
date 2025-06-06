import { notFound } from "next/navigation";

import { sanityFetch } from "@/lib/sanity/live";
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
import Header from "./components/Header";

async function fetchBlogSlugPageData(
  slug: string,
): Promise<{ data: BlogSlugPageType }> {
  return await sanityFetch({
    query: blogSlugPageQuery.query,
    params: { slug: `/blog/${slug}` },
  });
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
    indexData: { colorScheme },
    relatedBlogs,
  } = data ?? {};

  return (
    <>
      <article
        className="bg-background pb-fluid-lg"
        style={getColorSchemeStyle(colorScheme)}
      >
        <Header
          image={image}
          title={title}
          description={description}
          colourScheme={colorScheme}
        />
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
          <RichText richText={richText ?? []} className="blog-post--content" />
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
