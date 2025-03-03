import { q } from "groqd";

import { LINK_FRAGMENT } from "./link";

export const IMAGE_FRAGMENT = {
  _ref: q("asset").grabOne("_ref", q.string()),
  _type: q.literal("image"),
  alt: q("asset").deref().grabOne("altText", q.string()).nullable(),
  asset: q("asset").deref().grab({
    _id: q.string(),
    url: q.string(),
  }),
  crop: q
    .object({
      bottom: q.number(),
      left: q.number(),
      right: q.number(),
      top: q.number(),
    })
    .nullable(),
  hotspot: q.object({
    height: q.number(),
    width: q.number(),
    x: q.number(),
    y: q.number(),
  }),
  height: q("asset").deref().grabOne("metadata.dimensions.height", q.number()),
  width: q("asset").deref().grabOne("metadata.dimensions.width", q.number()),
  id: q("asset").deref().grabOne("assetId", q.string()),
  type: q("asset").deref().grabOne("mimeType", q.string()),
  aspectRatio: q("asset")
    .deref()
    .grabOne("metadata.dimensions.aspectRatio", q.number()),
  lqip: q("asset").deref().grabOne("metadata.lqip", q.string()),
} as const;

export const NAVIGATION_FRAGMENT = {
  _id: q.string(),
  title: q.string(),
  navigationItems: q("navigationItems[]", { isArray: true }).grab({
    _type: q.string(),
    _key: q.string(),
    text: q.string(),
    navigationItemUrl: q("navigationItemUrl").grab(LINK_FRAGMENT),
  }),
};

export const SOCIALS_FRAGMENT = {
  xUrl: q.string(),
  instagramUrl: q.string(),
  linkedInUrl: q.string(),
  githubUrl: q.string(),
};

export const SEO_FRAGMENT = {
  metaTitle: q.string(),
  metaDesc: q.string(),
  ogImage: q("ogImage.asset").deref().grabOne("url", q.string()),
  noIndex: q.boolean(),
  noFollow: q.boolean(),
};
