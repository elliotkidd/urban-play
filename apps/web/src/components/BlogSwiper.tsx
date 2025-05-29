"use client";

import { PostTileType } from "@/lib/sanity/queries/fragments";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import PostTile from "./post-tile";

export function BlogSwiper({ posts }: { posts: PostTileType[] }) {
  return (
    <Splide
      options={{
        type: "slide",
        perPage: 4,
        gap: "1rem",
        arrows: false,
        pagination: false,
        drag: true,
        trimSpace: false,
        perMove: 1,
        breakpoints: {
          768: {
            perPage: 1,
          },
          1024: {
            perPage: 2,
          },
          1280: {
            perPage: 3,
          },
        },
      }}
      className="not-prose"
    >
      {posts.map((post) => (
        <SplideSlide key={post._id}>
          <PostTile post={post} image_aspect="portrait" />
        </SplideSlide>
      ))}
    </Splide>
  );
}
