import { Selection, q } from "groqd";

import { COLOR_SCHEME_FRAGMENT } from "./color";
import { CONTENT_BLOCK_SELECTIONS_LIST } from "./contentBlocks";
import { IMAGE_FRAGMENT } from "./fragments";
import { BUTTON_FRAGMENT, LINK_FRAGMENT } from "./link";
import { RICHTEXT_BLOCKS } from "./richText";
import { POST_TILE_FRAGMENT, PROJECT_TILE_FRAGMENT } from "./tiles";

export const SECTION_SETTINGS_FRAGMENT = q("settings")
  .grab({
    colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
    paddingTop: q.boolean(),
    paddingBottom: q.boolean(),
    hidden: q.boolean(),
    uid: q.string(),
  })
  .nullable();

export const PARAGRAPH_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("paragraph"),
  index: q.number(),
  leadParagraph: q.string().nullable(),
  text: q(`text[]`, { isArray: true }).select(RICHTEXT_BLOCKS).nullable(),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const CTA_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("callToAction"),
  heading: q.string(),
  backgroundImage: q("bgImage").grab(IMAGE_FRAGMENT).nullable(),
  richText: q(`richText[]`, { isArray: true })
    .filter()
    .select(RICHTEXT_BLOCKS)
    .nullable(),
  buttons: q("buttons[]", { isArray: true }).grab(BUTTON_FRAGMENT),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const HOME_HERO_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("homeHero"),
  bgVideo: ["bgVideo.asset->playbackId", q.string()],
  bgImage: q("bgImage").grab(IMAGE_FRAGMENT),
  heading: q.string(),
  richText: q(`richText[]`, { isArray: true })
    .select(RICHTEXT_BLOCKS)
    .nullable(),
  buttons: q("buttons[]", { isArray: true }).grab(BUTTON_FRAGMENT),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const PAGE_TITLE_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("pageTitle"),
  title: q.string(),
  richText: q(`richText[]`, { isArray: true })
    .select(RICHTEXT_BLOCKS)
    .nullable(),
  buttons: q("buttons[]", { isArray: true }).grab(BUTTON_FRAGMENT),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const LATEST_POSTS_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("latestPosts"),
  richText: q(`richText[]`, { isArray: true })
    .select(RICHTEXT_BLOCKS)
    .nullable(),
  buttons: q("buttons[]", { isArray: true }).grab(BUTTON_FRAGMENT),
  posts: q(`posts[]`, { isArray: true }).deref().grab(POST_TILE_FRAGMENT),
  latestPosts: q("*", { isArray: true })
    .filterByType("post")
    .order("publishedAt desc, _createdAt desc")
    .slice(0, 4)
    .grab(POST_TILE_FRAGMENT),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const FEATURED_PROJECTS_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("featuredProjects"),
  index: q.number(),
  title: q.string(),
  projects: q(`projects[]`, { isArray: true })
    .deref()
    .grab(PROJECT_TILE_FRAGMENT),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const ACCORDION_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("accordion"),
  richText: q(`richText[]`, { isArray: true })
    .select(RICHTEXT_BLOCKS)
    .nullable(),
  items: q("items[]", { isArray: true }).grab({
    _key: q.string(),
    _type: q.literal("accordionItem"),
    image: q("image").grab(IMAGE_FRAGMENT).nullable(),
    title: q.string(),
    text: q(`text[]`, { isArray: true }).select(RICHTEXT_BLOCKS),
  }),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const TEXT_AND_MEDIA_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("textAndMedia"),
  image: q("image").grab(IMAGE_FRAGMENT).nullable(),
  richText: q(`richText[]`, { isArray: true })
    .select(RICHTEXT_BLOCKS)
    .nullable(),
  flipOrder: q.boolean(),
  buttons: q("buttons[]", { isArray: true }).grab(BUTTON_FRAGMENT),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const RICH_TEXT_MODULE_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("richTextModule"),
  richText: q(`richText[]`, { isArray: true })
    .select(RICHTEXT_BLOCKS)
    .nullable(),
  centerText: q.boolean(),
  buttons: q("buttons[]", { isArray: true }).grab(BUTTON_FRAGMENT),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const TEAM_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("team"),
  index: q.number(),
  title: q.string(),
  team: q(`team[]`, { isArray: true })
    .deref()
    .grab({
      _id: q.string(),
      name: q.string(),
      role: q.string().nullable(),
      avatar: q("avatar").grab(IMAGE_FRAGMENT).nullable(),
      bio: q.string(),
    })
    .nullable(),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const TESTIMONIALS_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("testimonials"),
  testimonials: q(`testimonials[]`, { isArray: true })
    .deref()
    .grab({
      _id: q.string(),
      name: q.string(),
      company: q.string().nullable(),
      image: q("image").grab(IMAGE_FRAGMENT).nullable(),
      quote: q.string(),
    })
    .nullable(),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const CONTACT_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("contact"),
  blocks: q("blocks[]", { isArray: true }).grab({
    _key: q.string(),
    heading: q.string(),
    image: q("image").grab(IMAGE_FRAGMENT),
    link: q("link").grab(LINK_FRAGMENT),
  }),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const MARQUEE_LOGOS_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("marqueeLogos"),
  items: q("items[]", { isArray: true }).grab(IMAGE_FRAGMENT),
  settings: SECTION_SETTINGS_FRAGMENT,
};

export const LINEBREAK_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("lineBreak"),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const CAROUSEL_HEADER_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("carouselHeader"),
  settings: SECTION_SETTINGS_FRAGMENT,
  images: q("images[]", { isArray: true }).grab(IMAGE_FRAGMENT),
  leadText: q.string(),
} satisfies Selection;

export const TWO_COLUMN_CONTENT_FRAGMENT = {
  _key: q.string(),
  _type: q.string(),
  settings: SECTION_SETTINGS_FRAGMENT,
  index: q.number(),
  columnRatio: q.literal("2575").or(q.literal("5050")).or(q.literal("7525")),
  left: q("left[]", { isArray: true }).select(CONTENT_BLOCK_SELECTIONS_LIST),
  right: q("right[]", { isArray: true }).select(CONTENT_BLOCK_SELECTIONS_LIST),
} satisfies Selection;

export const SPOTLIGHT_PROJECT_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("spotlightProject"),
  project: q("project").deref().grab(PROJECT_TILE_FRAGMENT),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const VALUE_FRAGMENT = {
  _key: q.string(),
  image: q("image").grab(IMAGE_FRAGMENT),
  heading: q.string(),
  text: q.string(),
} satisfies Selection;

export const VALUES_SECTION_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("values"),
  values: q("values[]", { isArray: true }).grab(VALUE_FRAGMENT),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const SECTION_HEADER_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("sectionHeader"),
  title: q.string(),
  leftText: q(`leftText[]`, { isArray: true }).select(RICHTEXT_BLOCKS),
  rightText: q(`rightText[]`, { isArray: true }).select(RICHTEXT_BLOCKS),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export const VERTICAL_PROCESS_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("verticalProcess"),
  steps: q("steps[]", { isArray: true }).grab({
    image: q("image").grab(IMAGE_FRAGMENT),
    title: q.string(),
    text: q(`text[]`, { isArray: true }).select(RICHTEXT_BLOCKS),
  }),
  settings: SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

const SECTIONS_LIST_SELECTION = {
  "_type == 'paragraph'": PARAGRAPH_FRAGMENT,
  "_type == 'callToAction'": CTA_FRAGMENT,
  "_type == 'homeHero'": HOME_HERO_FRAGMENT,
  "_type == 'pageTitle'": PAGE_TITLE_FRAGMENT,
  "_type == 'latestPosts'": LATEST_POSTS_FRAGMENT,
  "_type == 'featuredProjects'": FEATURED_PROJECTS_FRAGMENT,
  "_type == 'textAndMedia'": TEXT_AND_MEDIA_FRAGMENT,
  "_type == 'richTextModule'": RICH_TEXT_MODULE_FRAGMENT,
  "_type == 'team'": TEAM_FRAGMENT,
  "_type == 'testimonials'": TESTIMONIALS_FRAGMENT,
  "_type == 'contact'": CONTACT_FRAGMENT,
  "_type == 'marqueeLogos'": MARQUEE_LOGOS_FRAGMENT,
  "_type == 'lineBreak'": LINEBREAK_FRAGMENT,
  "_type == 'carouselHeader'": CAROUSEL_HEADER_FRAGMENT,
  "_type == 'twoColumnContent'": TWO_COLUMN_CONTENT_FRAGMENT,
  "_type == 'spotlightProject'": SPOTLIGHT_PROJECT_FRAGMENT,
  "_type == 'values'": VALUES_SECTION_FRAGMENT,
  "_type == 'sectionHeader'": SECTION_HEADER_FRAGMENT,
  "_type == 'verticalProcess'": VERTICAL_PROCESS_FRAGMENT,
  "_type == 'accordion'": ACCORDION_FRAGMENT,
};

export const SECTIONS_FRAGMENT = q("modules[]", { isArray: true })
  .select(SECTIONS_LIST_SELECTION)
  .nullable();
