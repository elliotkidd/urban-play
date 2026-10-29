import { ProjectsHeader } from "@/app/projects/components/ProjectsHeader";
import { BlogHeader } from "@/components/blog-header";
import Pagination from "@/components/Pagination";
import PostTile, { PostTileSkeleton } from "@/components/post-tile";
import { sanityFetch } from "@/lib/sanity/live";
import {
  blogByCategoryQuery,
  blogsQuery,
} from "@/lib/sanity/queries/documents";
import { PostTileType } from "@/lib/sanity/queries/fragments";

type CategoryType = {
  _type: string;
  _id: string;
  _key: string;
  title: string;
  slug: string;
};

async function fetchBlogPosts(
  indexFrom: number,
  indexTo: number,
): Promise<{ data: { blogs: PostTileType[]; total: number } }> {
  return await sanityFetch({
    query: blogsQuery,
    params: {
      indexFrom,
      indexTo,
    },
  });
}

async function fetchBlogPostsByTags(
  tags: string[] | string,
  indexFrom: number,
  indexTo: number,
): Promise<{ data: { blogs: PostTileType[]; total: number } }> {
  tags = Array.isArray(tags) ? tags : [tags];

  return await sanityFetch({
    query: blogByCategoryQuery,
    params: {
      tags,
      indexFrom,
      indexTo,
    },
  });
}

export function BlogGridSkeleton({
  title,
  categories,
}: {
  title: string;
  categories: CategoryType[];
}) {
  return (
    <>
      <BlogHeader title={title} categories={categories} />
      <div className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-y-fluid-lg mb-fluid">
        {Array.from({ length: 9 }).map((_, index) => (
          <PostTileSkeleton key={index} imageAspect="square" />
        ))}
      </div>
    </>
  );
}
async function BlogGrid({
  categories,
  title,
  tags,
  indexFrom,
  indexTo,
  perPage,
}: {
  categories: CategoryType[];
  title: string;
  tags: string[];
  indexTo: number;
  indexFrom: number;
  perPage: number;
}) {
  let response;

  tags
    ? (response = await fetchBlogPostsByTags(tags, indexFrom, indexTo))
    : (response = await fetchBlogPosts(indexFrom, indexTo));

  const { data: blogData } = response;
  if (!blogData) return null;

  const { blogs, total } = blogData;

  return (
    <>
      <BlogHeader title={title} categories={categories} />
      {blogs && blogs.length ? (
        <>
          <ul
            id="blog-grid"
            className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-y-fluid-lg mb-fluid"
          >
            {blogs &&
              blogs.length > 0 &&
              blogs.map((post: PostTileType) => (
                <li key={post._id}>
                  <PostTile key={post._id} post={post} image_aspect="square" />
                </li>
              ))}
          </ul>
          <Pagination total={total} perPage={perPage} />
        </>
      ) : (
        <div className="wrapper prose text-center">
          <h3 className="h3 font-heading uppercase">No posts!</h3>
        </div>
      )}
    </>
  );
}

export default BlogGrid;
