import { BlogHeader } from "@/components/blog-header";
import { PageBuilder } from "@/components/pagebuilder";
import Pagination from "@/components/Pagination";
import PostTile from "@/components/post-tile";
import SanityImage from "@/components/sanity-image";
import { Button } from "@/components/ui/Button";
import { sanityFetch } from "@/lib/sanity/live";
import {
  BlogIndexPage,
  blogIndexPageQuery,
  blogsQuery,
} from "@/lib/sanity/queries/documents";
import { PostTileType } from "@/lib/sanity/queries/fragments";
import { getMetaData } from "@/lib/seo";
import { getColorSchemeStyle } from "@/utils/utils";
import { Link } from "next-view-transitions";
import BlogGrid, { BlogGridSkeleton } from "../components/BlogGrid";
import { Suspense } from "react";

async function fetchBlogPage(): Promise<{ data: BlogIndexPage }> {
  return await sanityFetch({
    query: blogIndexPageQuery.query,
  });
}

export async function generateMetadata() {
  const { data } = await fetchBlogPage();
  if (!data) {
    return getMetaData({});
  }
  return getMetaData(data);
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; tags: string[] }>;
}) {
  const { data } = await fetchBlogPage();
  if (!data) return null;
  const {
    title,
    featuredBlog,
    solutions,
    colorScheme,
    pageBuilder,
    _id,
    _type,
  } = data ?? {};
  const { page, tags } = await searchParams;

  const POSTS_PER_PAGE = 8;

  const currentPage = parseInt(page, 10) || 1;

  const indexFrom = (currentPage - 1) * POSTS_PER_PAGE;
  const indexTo = indexFrom + POSTS_PER_PAGE;

  return (
    <main
      className="bg-background text-text"
      style={getColorSchemeStyle(colorScheme)}
    >
      {featuredBlog && (
        <section className="mb-fluid-lg">
          {featuredBlog.image && (
            <>
              <div className="relative h-[80dvh] w-full overflow-hidden">
                <SanityImage
                  src={featuredBlog.image}
                  className="object-cover absolute inset-0 w-full h-full"
                />
              </div>
              <div className="wrapper py-fluid-xs prose flex flex-col lg:flex-row justify-between gap-4 items-start">
                <h2 className="max-w-section-heading ">{featuredBlog.title}</h2>
                <Link href={featuredBlog.slug}>
                  <Button as="span">Read Article</Button>
                </Link>
              </div>
            </>
          )}
        </section>
      )}
      <Suspense
        fallback={
          <BlogGridSkeleton title={title ?? ""} solutions={solutions ?? []} />
        }
      >
        <BlogGrid
          solutions={solutions}
          title={title}
          tags={tags}
          indexFrom={indexFrom}
          indexTo={indexTo}
          perPage={POSTS_PER_PAGE}
        />
      </Suspense>
      <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />
    </main>
  );
}
