import { InferType } from "groqd";

import { POSTS_PER_PAGE } from "@/sanity/constants";
import {
  postsByCategoryQuery,
  postsQuery,
} from "@/sanity/lib/queries/documents";

import PostsGrid from "./components/PostsGrid";

type Props = {
  posts:
    | InferType<typeof postsQuery>["posts"]
    | InferType<typeof postsByCategoryQuery>["posts"];
  isLastPage: boolean;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  loadMoreRoute: string;
};

export default function BlogListRoute({
  posts,
  isLastPage,
  totalPages,
  currentPage,
  hasNextPage,
  loadMoreRoute,
}: Props) {
  if (!posts) return null;

  return (
    <section className="mb-fluid mt-fluid-sm">
      <div className="wrapper">
        <PostsGrid
          initialPosts={posts}
          isLastPage={isLastPage}
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          loadMoreRoute={loadMoreRoute}
        />
      </div>
    </section>
  );
}
