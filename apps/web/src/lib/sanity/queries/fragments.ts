import { InferType, q, TypeFromSelection } from "groqd";
import { CUSTOM_URL_FRAGMENT, LINK_REFERENCE_FRAGMENT } from "./link";

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

export type ImageType = TypeFromSelection<typeof IMAGE_FRAGMENT>;

export const NAVIGATION_FRAGMENT: any = {
  _id: q.string(),
  title: q.string(),
  navigationItems: q("navigationItems[]", { isArray: true }).grab({
    _type: q.string(),
    _key: q.string(),
    text: q.string(),
    navigationItemUrl: q("navigationItemUrl").grab(CUSTOM_URL_FRAGMENT),
  }),
};

export const SOCIALS_FRAGMENT: any = {
  xUrl: q.string(),
  instagramUrl: q.string(),
  linkedInUrl: q.string(),
  githubUrl: q.string(),
};

export const SEO_FRAGMENT: any = {
  metaTitle: q.string(),
  metaDesc: q.string(),
  ogImage: q("ogImage.asset").deref().grabOne("url", q.string()),
  noIndex: q.boolean(),
  noFollow: q.boolean(),
};

export const TILE_FRAGMENT = {
  ...LINK_REFERENCE_FRAGMENT,
  image: q("hero.image").grab(IMAGE_FRAGMENT),
  description: q.string(),
  solutions: q("solutions[]", { isArray: true }).deref().grab({
    _id: q.string(),
    title: q.string(),
  }),
};

export type TileType = TypeFromSelection<typeof TILE_FRAGMENT>;

export const POST_TILE_FRAGMENT = {
  ...LINK_REFERENCE_FRAGMENT,
  image: q("image").grab(IMAGE_FRAGMENT),
  description: q.string(),
};

export type PostTileType = TypeFromSelection<typeof POST_TILE_FRAGMENT>;

export const TESTIMONY_FRAGMENT = {
  _id: q.string(),
  author: q("author").deref().grab({
    name: q.string(),
    position: q.string(),
  }),
  quote: q.string(),
};

export type TestimonyType = InferType<typeof TESTIMONY_FRAGMENT>;

const COLOR_FRAGMENT = {
  rgb: q("rgb").grab({
    b: q.number(),
    g: q.number(),
    r: q.number(),
  }),
};

export const COLOR_SCHEME_FRAGMENT = {
  name: q.string(),
  background: q("background").grab(COLOR_FRAGMENT).nullable(),
  text: q("text").grab(COLOR_FRAGMENT).nullable(),
  primaryButton: q("primaryButton").grab(COLOR_FRAGMENT).nullable(),
  secondaryButton: q("secondaryButton").grab(COLOR_FRAGMENT).nullable(),
  navBarBackground: q("navBarBackground").grab(COLOR_FRAGMENT).nullable(),
  navBarText: q("navBarText").grab(COLOR_FRAGMENT).nullable(),
};

export type ColorSchemeFragment = TypeFromSelection<
  typeof COLOR_SCHEME_FRAGMENT
>;
