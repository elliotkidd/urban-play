import { q, Selection } from "groqd";
import { BUTTON_FRAGMENT } from "./link";
import { IMAGE_FRAGMENT } from "./fragments";

export const INTERNAL_LINK_BLOCK_ANNOTATION_FRAGMENT: any = {
  _key: q.string(),
  _type: q.string(),
  linkType: q.literal("internal"),
  internalLink: q("internalLink").grab({
    _type: q.string(),
    to: q("to")
      .deref()
      .grab({
        _type: q.string(),
        slug: [`slug.current`, q.string()],
      })
      .nullable(),
    anchor: q.string().nullable(),
  }),
} satisfies Selection;

export const EXTERNAL_LINK_BLOCK_ANNOTATION_FRAGMENT: any = {
  _key: q.string(),
  _type: q.string(),
  linkType: q.literal("external"),
  externalLink: q("externalLink").grab({
    link: q.string().nullable(),
    openInNewTab: q.boolean().nullable(),
  }),
} satisfies Selection;

export const BASE_BLOCK_FRAGMENT: any = {
  _key: q.string().optional(),
  _type: q.string(),
  children: q.array(
    q.object({
      _key: q.string(),
      _type: q.string(),
      marks: q.array(q.string()),
      text: q.string(),
    }),
  ),
  level: q.number().optional(),
  listItem: q.string().optional(),
  markDefs: q("markDefs[]", { isArray: true })
    .filter()
    .select({
      'linkType == "external"': EXTERNAL_LINK_BLOCK_ANNOTATION_FRAGMENT,
      'linkType == "internal"': INTERNAL_LINK_BLOCK_ANNOTATION_FRAGMENT,
      default: ["{...}", q.object({})],
    }),
  style: q.string().optional(),
} satisfies Selection;

export const BUTTON_BLOCK_FRAGMENT: any = {
  ...BUTTON_FRAGMENT,
} satisfies Selection;

export const BUTTON_GROUP_BLOCK_FRAGMENT: any = {
  _key: q.string(),
  _type: q.string(),
  buttons: q("buttons[]", { isArray: true }).grab(BUTTON_BLOCK_FRAGMENT),
};

export const IMAGE_BLOCK_FRAGMENT: any = {
  _key: q.string(),
  ...IMAGE_FRAGMENT,
  maxWidth: q.number().nullable(),
} satisfies Selection;

const VIDEO_BLOCK_FRAGMENT: any = {
  _key: q.string(),
  _type: q.string(),
  url: q.string(),
} satisfies Selection;

export const RICHTEXT_BLOCKS = {
  '_type == "block"': BASE_BLOCK_FRAGMENT,
  '_type == "image"': IMAGE_BLOCK_FRAGMENT,
  '_type == "buttonGroup"': BUTTON_GROUP_BLOCK_FRAGMENT,
  '_type == "video"': VIDEO_BLOCK_FRAGMENT,
};
