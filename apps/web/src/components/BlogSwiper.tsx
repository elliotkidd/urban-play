"use client";

import { PostTileType } from "@/lib/sanity/queries/fragments";
import { Swiper, SwiperSlide } from "swiper/react";
import PostTile from "./post-tile";

import "swiper/css";

export function BlogSwiper({ posts }: { posts: PostTileType[] }) {
  return (
    <Swiper
      slidesPerView={1.2}
      spaceBetween={32}
      breakpoints={{
        768: {
          slidesPerView: 2.2,
        },
        1024: {
          slidesPerView: 3.2,
        },
        1280: {
          slidesPerView: 4.2,
        },
      }}
      style={{ overflow: "visible" }}
      className="not-prose"
    >
      {posts.map((post) => (
        <SwiperSlide key={post._id}>
          <PostTile post={post} image_aspect="portrait" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
