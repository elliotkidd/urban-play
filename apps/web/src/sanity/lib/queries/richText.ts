import { Selection, q } from "groqd";

import { IMAGE_FRAGMENT } from "./fragments";
import {
  BUTTON_FRAGMENT,
  EXTERNAL_LINK_FRAGMENT,
  INTERNAL_LINK_FRAGMENT,
} from "./link";

export const INTERNAL_LINK_BLOCK_ANNOTATION_FRAGMENT = {
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

export const EXTERNAL_LINK_BLOCK_ANNOTATION_FRAGMENT = {
  _key: q.string(),
  _type: q.string(),
  linkType: q.literal("external"),
  externalLink: q("externalLink").grab({
    link: q.string().nullable(),
    openInNewTab: q.boolean().nullable(),
  }),
} satisfies Selection;

export const TESTIMONY_BLOCK_FRAGMENT = {
  _type: q.literal("testimonial"),
  _key: q.string(),
  _ref: q.string(),
  testimony: q('*[_type == "testimony" && _id == ^._ref][0]')
    .grab({
      _type: q.string(),
      name: q.string(),
      quote: q.string(),
      company: q.string(),
    })
    .nullable(),
} satisfies Selection;

export const BASE_BLOCK_FRAGMENT = {
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

export const BUTTON_BLOCK_FRAGMENT = {
  _key: q.string(),
  ...BUTTON_FRAGMENT,
} satisfies Selection;

export const BUTTON_GROUP_BLOCK_FRAGMENT = {
  _key: q.string(),
  _type: q.string(),
  buttons: q("buttons[]", { isArray: true }).grab(BUTTON_BLOCK_FRAGMENT),
};

export const IMAGE_BLOCK_FRAGMENT = {
  _key: q.string(),
  ...IMAGE_FRAGMENT,
  maxWidth: q.number().nullable(),
} satisfies Selection;

export const RICHTEXT_BLOCKS = {
  '_type == "block"': BASE_BLOCK_FRAGMENT,
  '_type == "button"': BUTTON_BLOCK_FRAGMENT,
  '_type == "imageWithAlt"': IMAGE_BLOCK_FRAGMENT,
  '_type == "buttonGroup"': BUTTON_GROUP_BLOCK_FRAGMENT,
  '_type == "testimonial"': TESTIMONY_BLOCK_FRAGMENT,
};
