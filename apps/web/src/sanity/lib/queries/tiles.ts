import { q } from "groqd";

import { IMAGE_FRAGMENT } from "./fragments";

export const POST_TILE_FRAGMENT = {
  _type: q.literal("postTile"),
  _id: q.string(),
  title: q.string(),
  slug: q("slug.current"),
  mainImage: q("mainImage").grab(IMAGE_FRAGMENT).nullable(),
  publishedAt: q.date().nullable(),
  categories: q("categories[]", { isArray: true })
    .deref()
    .grab({
      _type: q.literal("postCategory"),
      title: q.string(),
      slug: ["slug.current", q.string()],
    })
    .nullable(),
  excerpt: q.string(),
};

export const PROJECT_TILE_FRAGMENT = {
  _type: q.literal("project"),
  _id: q.string(),
  title: q.string(),
  attribution: q.string(),
  mainImage: q("mainImage").grab(IMAGE_FRAGMENT),
  mainVideo: q("mainVideo.asset")
    .deref()
    .grabOne("playbackId", q.string())
    .nullable(),
  publishedAt: q.date(),
  slug: q("slug.current"),
  tagline: q.string(),
  categories: q("categories[]", { isArray: true })
    .deref()
    .grab({
      title: q.string(),
      slug: ["slug.current", q.string()],
      _id: q.string(),
    }),
};
