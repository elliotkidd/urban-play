import Pagination from "@/components/Pagination";
import PostTile from "@/components/post-tile";
import { sanityFetch } from "@/lib/sanity/live";
import { blogsQuery } from "@/lib/sanity/queries/documents";
import { PostTileType } from "@/lib/sanity/queries/fragments";

const COL_SPANS = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-8",
  "lg:col-span-4",
];

const IMAGE_ASPECTS: ("portrait" | "square" | "landscape")[] = [
  "portrait",
  "portrait",
  "square",
  "portrait",
  "portrait",
  "portrait",
  "landscape",
  "square",
];

async function fetchBlogPosts(
  indexFrom: number,
  indexTo: number,
): Promise<{ data: { blogs: PostTileType[]; total: number } }> {
  return await sanityFetch({
    query: blogsQuery.slice(indexFrom, indexTo).query,
  });
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;

  // const POSTS_PER_PAGE = COL_SPANS.length;
  const POSTS_PER_PAGE = 2;

  const indexFrom = (currentPage - 1) * POSTS_PER_PAGE;
  const indexTo = indexFrom + POSTS_PER_PAGE;

  const { data } = await fetchBlogPosts(indexFrom, indexTo);
  if (!data) return null;

  const { blogs, total } = data;

  return (
    <>
      {blogs && blogs.length ? (
        <>
          <ul className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-4 gap-y-8 lg:gap-y-fluid-lg mb-fluid">
            {blogs &&
              blogs.length > 0 &&
              blogs.map((post: PostTileType, index: number) => (
                <li key={post._id} className={COL_SPANS[index % 11]}>
                  <PostTile
                    key={post._id}
                    post={post}
                    image_aspect={IMAGE_ASPECTS[index % 11]}
                  />
                </li>
              ))}
          </ul>
          <Pagination total={total} perPage={POSTS_PER_PAGE} />
        </>
      ) : (
        <div className="wrapper prose text-center">
          <h3 className="h3 font-heading uppercase">No posts!</h3>
        </div>
      )}
    </>
  );
}
