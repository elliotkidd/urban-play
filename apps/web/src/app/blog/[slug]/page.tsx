import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Article, WithContext } from "schema-dts";

import Blog from "@/components/layouts/blog/Blog";
import { loadPost } from "@/sanity/loader/loadQuery";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import processMetadata from "@/utils/generateMetadata";

const BlogPreview = dynamic(
  () => import("@/components/layouts/blog/BlogPreview"),
);

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const slug = (await params).slug;
  const { data: page } = await loadPost(slug);
  return processMetadata(page);
}

export function generateStaticParams() {
  return generateStaticSlugs("post");
}

export default async function BlogSlugRoute({ params }: Props) {
  const slug = (await params).slug;

  const initial = await loadPost(slug);

  const isDraftMode = await draftMode();
  if (isDraftMode.isEnabled) {
    return <BlogPreview params={params} initial={initial} />;
  }

  const page = initial.data;

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: page.seo?.metaTitle || page.title || undefined,
    image: page.seo?.ogImage || undefined,
    description: page.seo?.metaDesc || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Blog data={page} />
    </>
  );
}
