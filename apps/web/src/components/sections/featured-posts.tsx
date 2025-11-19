import { FeaturedPostsProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";
import { PostTileType } from "@/lib/sanity/queries/fragments";
import PostTile from "../post-tile";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";

export default function FeaturedPostsSection({
  sectionHeader,
  posts,
  smallWrapper,
}: FeaturedPostsProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge(
        "wrapper space-y-fluid-md",
        smallWrapper && "wrapper--small",
      )}
    >
      <SectionHeader {...sectionHeader} />
      {posts && posts.length > 0 && (
        <div className="grid grid-cols-1 gap-fluid-md md:grid-cols-2 lg:grid-cols-4 lg:gap-fluid-xs">
          {posts.map((post: PostTileType, i: number) => {
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
    </motion.div>
  );
}
