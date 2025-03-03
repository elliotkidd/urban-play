"use client";

import { InferType } from "groqd";
import { useState } from "react";

import PostCard from "@/components/shared/cards/PostCard";
import LoadMore from "@/components/shared/navigation/LoadMore";
import Pagination from "@/components/shared/navigation/Pagination";
import {
  postsByCategoryQuery,
  postsQuery,
} from "@/sanity/lib/queries/documents";

interface PostsGridProps {
  initialPosts:
    | InferType<typeof postsQuery>["posts"][]
    | InferType<typeof postsByCategoryQuery>["posts"];
  isLastPage: boolean;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  loadMoreRoute: string;
  altGrid?: boolean;
}

export default function PostsGrid({
  initialPosts,
  isLastPage: initialIsLastPage,
  currentPage,
  totalPages,
  hasNextPage,
  loadMoreRoute,
}: PostsGridProps) {
  const [page, setPage] = useState(currentPage);
  const [allPosts, setAllPosts] = useState<
    (
      | InferType<typeof postsQuery>["posts"]
      | InferType<typeof postsByCategoryQuery>["posts"]
    )[]
  >(Array.isArray(initialPosts) ? initialPosts : [initialPosts]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(initialIsLastPage);

  async function loadMoreProjects() {
    if (isLoading || page >= totalPages) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await fetch(`${loadMoreRoute}&page=${nextPage}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const result = await response.json();

      if (!result.data?.posts || !Array.isArray(result.data.posts)) {
        console.error("Invalid response format:", result);
        return;
      }

      setAllPosts((prev) => [...prev, ...result.data.posts]);
      setPage(nextPage);
      if (nextPage >= totalPages) {
        setIsLastPage(true);
      }
    } catch (error) {
      console.error("Error loading more projects:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section>
        <ul className="grid grid-cols-1 gap-fluid-xs max-w-7xl mx-auto">
          {allPosts.length > 0 ? (
            allPosts.map((post, i) => (
              <li key={post._id}>
                <PostCard post={post} index={i} large />
              </li>
            ))
          ) : (
            <div className="flex h-40 items-center justify-center text-center">
              <span className="text-lg text-gray-500">No Posts!</span>
            </div>
          )}
        </ul>
      </section>
      <LoadMore
        pageIndex={page}
        isLastPage={isLastPage}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onLoadMore={loadMoreProjects}
      />
    </>
  );
}
