"use client";

import { PostTileType } from "@/lib/sanity/queries/fragments";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PostTile from "./post-tile";

export function BlogSwiper({ posts }: { posts: PostTileType[] }) {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={16}
      className="not-prose"
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 3,
        },
        1536: {
          slidesPerView: 4,
        },
      }}
      style={{
        overflow: "visible",
      }}
    >
      {posts.map((post) => (
        <SwiperSlide key={post._id}>
          <PostTile post={post} image_aspect="portrait" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
