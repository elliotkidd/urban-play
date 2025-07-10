import { PageBuilder } from "@/components/pagebuilder";
import SanityImage from "@/components/sanity-image";
import { Button } from "@/components/ui/Button";
import { sanityFetch } from "@/lib/sanity/live";
import {
  BlogIndexPage,
  blogIndexPageQuery,
} from "@/lib/sanity/queries/documents";
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
      <h1 className="sr-only">{title}</h1>
      {featuredBlog && (
        <section className="mb-fluid-xs">
          {featuredBlog.image && (
            <>
              <div className="relative h-[80dvh] w-full overflow-hidden py-fluid-xs flex items-end">
                <SanityImage
                  src={featuredBlog.image}
                  className="object-cover absolute inset-0 w-full h-full"
                />
                <div className="relative z-10 wrapper flex w-full justify-between items-end">
                  <div className="prose prose-white">
                    <div className="text-xs text-white">
                      <p className="opacity-50 m-0">Date</p>
                      <p className="mt-0">
                        {featuredBlog.publishedAt
                          ? new Date(
                              featuredBlog.publishedAt,
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "Date unavailable"}
                      </p>
                    </div>
                    <h2 className="text-balance mb-0">{featuredBlog.title}</h2>
                  </div>

                  <div className="gap-2 hidden lg:flex">
                    <Link href={featuredBlog.slug}>
                      <Button as="span">Read Article</Button>
                    </Link>
                  </div>
                </div>
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
