import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { Suspense } from "react";

import Spinner from "@/components/Spinner";
import BlogIndex from "@/components/layouts/blog/BlogIndex";
import { loadPosts, loadPostsPage } from "@/sanity/loader/loadQuery";
import { POSTS_PER_PAGE } from "@/sanity/constants";
import processMetadata from "@/utils/generateMetadata";

export async function generateMetadata(): Promise<Metadata | undefined> {
  const { data: page } = await loadPostsPage();
  if (!page) notFound();
  return processMetadata(page);
}

export default async function BlogLayout() {
  const currentPage = 0;

  try {
    const { data } = await loadPosts(currentPage);
    if (
      !data ||
      !data.posts ||
      !Array.isArray(data.posts) ||
      data.posts.length === 0
    ) {
      return (
        <div className="container mx-auto px-4 py-8 text-center">
          <p>No posts found.</p>
          {JSON.stringify(data)}
        </div>
      );
    }
    const totalPages = Math.ceil((data.total as number) / POSTS_PER_PAGE);

    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <BlogIndex
          currentPage={currentPage}
          posts={data.posts}
          totalPages={totalPages}
          hasNextPage={currentPage < totalPages}
          isLastPage={currentPage === totalPages - 1}
          loadMoreRoute={`/api/fetch-posts?`}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading posts:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        <p>No posts found.</p>
      </div>
    );
  }
}
