import { FeaturedPostsProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";
import { Swiper, SwiperSlide } from "swiper/react";
import { TileType } from "@/lib/sanity/queries/fragments";
import PostTile from "../post-tile";
import { twMerge } from "tailwind-merge";

export default function FeaturedPostsSection({
  sectionHeader,
  posts,
  smallWrapper,
}: FeaturedPostsProps) {
  return (
    <div
      className={twMerge(
        "wrapper py-fluid-xs space-y-fluid-lg overflow-hidden",
        smallWrapper && "wrapper--small",
      )}
    >
      <SectionHeader {...sectionHeader} />
      {posts && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post: TileType, i: number) => {
            return (
              <PostTile
                key={post._id + i}
                post={post}
                image_aspect={i === 2 ? "square" : "portrait"}
                className={i == 2 ? "lg:col-span-2" : ""}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
