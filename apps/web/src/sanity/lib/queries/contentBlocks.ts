import { q } from "groqd";

import { IMAGE_FRAGMENT } from "./fragments";
import { RICHTEXT_BLOCKS } from "./richText";

export const FEATURE_LIST_FRAGMENT = {
  _type: q.literal("featureList"),
  _key: q.string(),
  points: q("points.points[]", { isArray: true }).grab({
    heading: q.string(),
    text: q.string(),
  }),
};

export const IMAGE_BLOCK_FRAGMENT = {
  _type: q.literal("imageWithAlt"),
  _key: q.string(),
  source: q("source").grab(IMAGE_FRAGMENT),
  aspectRatio: q
    .literal("square")
    .or(q.literal("video"))
    .or(q.literal("landscape"))
    .or(q.literal("portrait")),
};

export const TEAM_BLOCK_FRAGMENT = {
  _type: q.literal("team"),
  _key: q.string(),
  members: q(`members[]`, { isArray: true })
    .deref()
    .grab({
      _id: q.string(),
      name: q.string(),
      role: q.string().nullable(),
      avatar: q("avatar").grab(IMAGE_FRAGMENT).nullable(),
      bio: q.string(),
    }),
};

export const RICHTEXT_CONTENT_BLOCK_FRAGMENT = {
  _type: q.literal("richText"),
  _key: q.string(),
  richText: q("richText[]", { isArray: true }).select(RICHTEXT_BLOCKS),
};

export const VIDEO_BLOCK_FRAGMENT = {
  _type: q.literal("video"),
  _key: q.string(),
  videoId: q("asset->playbackId"),
};

export const ACCORDION_BLOCK_FRAGMENT = {
  _type: q.literal("accordionBlock"),
  _key: q.string(),
  items: q("items[]", { isArray: true }).grab({
    heading: q.string(),
    text: q("text[]", { isArray: true }).select(RICHTEXT_BLOCKS),
  }),
};

export const FORM_FRAGMENT = {
  _type: q.literal("form"),
  _key: q.string(),
  successMessage: q("successMessage[]", { isArray: true }).select(
    RICHTEXT_BLOCKS,
  ),
};

export const CONTENT_BLOCK_SELECTIONS_LIST = {
  "_type == 'imageWithAlt'": IMAGE_BLOCK_FRAGMENT,
  "_type == 'featureList'": FEATURE_LIST_FRAGMENT,
  "_type == 'richText'": RICHTEXT_CONTENT_BLOCK_FRAGMENT,
  "_type == 'video'": VIDEO_BLOCK_FRAGMENT,
  "_type == 'team'": TEAM_BLOCK_FRAGMENT,
  "_type == 'accordionBlock'": ACCORDION_BLOCK_FRAGMENT,
  "_type == 'form'": FORM_FRAGMENT,
};
