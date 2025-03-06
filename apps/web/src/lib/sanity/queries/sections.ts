import { q, Selection, TypeFromSelection } from "groqd";
import { RICHTEXT_BLOCKS } from "./richText";
import { IMAGE_FRAGMENT, TESTIMONY_FRAGMENT, TILE_FRAGMENT } from "./fragments";
import { BUTTON_FRAGMENT } from "./link";

const REMOVE_MARGIN_FRAGMENTS = {
  removeMarginTop: q.boolean(),
  removeMarginBottom: q.boolean(),
} satisfies Selection;

const SECTION_HEADER_FRAGMENT = {
  _type: q.literal("sectionHeader"),
  title: q.string(),
  buttons: q(`buttons[]`, { isArray: true }).grab(BUTTON_FRAGMENT).nullable(),
} satisfies Selection;

export type SectionHeaderProps = TypeFromSelection<
  typeof SECTION_HEADER_FRAGMENT
>;

const COLOR_FRAGMENT: Selection = {
  rgb: q("rgb").grab({
    b: q.number(),
    g: q.number(),
    r: q.number(),
  }),
} satisfies Selection;

const COLOR_SCHEME_FRAGMENT: Selection = {
  name: q.string(),
  background: q("background").grab(COLOR_FRAGMENT).nullable(),
  text: q("text").grab(COLOR_FRAGMENT).nullable(),
  primaryButton: q("primaryButton").grab(COLOR_FRAGMENT).nullable(),
  secondaryButton: q("secondaryButton").grab(COLOR_FRAGMENT).nullable(),
  navBarBackground: q("navBarBackground").grab(COLOR_FRAGMENT).nullable(),
  navBarText: q("navBarText").grab(COLOR_FRAGMENT).nullable(),
} satisfies Selection;

export type ColorSchemeFragment = TypeFromSelection<
  typeof COLOR_SCHEME_FRAGMENT
>;

const HERO_FRAGMENT = {
  _type: q.literal("heroSection"),
  _key: q.string(),
  title: q.string(),
  richText: q(`richText[]`, { isArray: true })
    .select(RICHTEXT_BLOCKS)
    .nullable(),
  image: q("image").grab(IMAGE_FRAGMENT),
  colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  ...REMOVE_MARGIN_FRAGMENTS,
} satisfies Selection;

export type HeroProps = TypeFromSelection<typeof HERO_FRAGMENT>;

const PARAGRAPH_FRAGMENT = {
  _type: q.literal("paragraph"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  annotations: q(`annotations[]`, { isArray: true })
    .grab({
      top: q.string(),
      bottom: q.string(),
      _key: q.string(),
    })
    .nullable(),
  richText: q(`richText[]`, { isArray: true })
    .select(RICHTEXT_BLOCKS)
    .nullable(),
  colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  ...REMOVE_MARGIN_FRAGMENTS,
} satisfies Selection;

export type ParagraphProps = TypeFromSelection<typeof PARAGRAPH_FRAGMENT>;

const SOLUTIONS_CAROUSEL_FRAGMENT = {
  _type: q.literal("solutionsCarousel"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  solutions: q("*", { isArray: true })
    .filterByType("solution")
    .slice(0, 5)
    .grab({
      _id: q.string(),
      _key: q.string(),
      title: q.string(),
      image: q("image").grab(IMAGE_FRAGMENT),
      description: q.string(),
    }),
  colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  ...REMOVE_MARGIN_FRAGMENTS,
} satisfies Selection;

export type SolutionsCarouselProps = TypeFromSelection<
  typeof SOLUTIONS_CAROUSEL_FRAGMENT
>;

const FEATURED_PROJECTS_FRAGMENT = {
  _type: q.literal("featuredProjects"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  projects: q("*", { isArray: true })
    .filterByType("project")
    .slice(0, 5)
    .grab(TILE_FRAGMENT),
  colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  ...REMOVE_MARGIN_FRAGMENTS,
} satisfies Selection;

export type FeaturedProjectsProps = TypeFromSelection<
  typeof FEATURED_PROJECTS_FRAGMENT
>;

const ICON_MARQUEE_FRAGMENT = {
  _type: q.literal("iconMarquee"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  icons: q("icons[]", { isArray: true }).grab(IMAGE_FRAGMENT),
  ...REMOVE_MARGIN_FRAGMENTS,
} satisfies Selection;

export type IconMarqueeProps = TypeFromSelection<typeof ICON_MARQUEE_FRAGMENT>;

const TESTIMONIES_FRAGMENT = {
  _type: q.literal("testimonies"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  testimonies: q("*", { isArray: true })
    .filterByType("testimony")
    .grab(TESTIMONY_FRAGMENT),
  ...REMOVE_MARGIN_FRAGMENTS,
} satisfies Selection;

export type TestimoniesProps = TypeFromSelection<typeof TESTIMONIES_FRAGMENT>;

const FEATURED_POSTS_FRAGMENT = {
  _type: q.literal("featuredPost"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  posts: q("*", { isArray: true })
    .filterByType("blog")
    .slice(0, 2)
    .grab({ ...TILE_FRAGMENT, description: q.string() }),
  ...REMOVE_MARGIN_FRAGMENTS,
} satisfies Selection;

export type FeaturedPostsProps = TypeFromSelection<
  typeof FEATURED_POSTS_FRAGMENT
>;

const CTA_FRAGMENT = {
  _type: q.literal("cta"),
  _key: q.string(),
  richText: q(`richText[]`, { isArray: true })
    .select(RICHTEXT_BLOCKS)
    .nullable(),
  title: q.string(),
  buttons: q(`buttons[]`, { isArray: true }).grab(BUTTON_FRAGMENT).nullable(),
  colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  ...REMOVE_MARGIN_FRAGMENTS,
} satisfies Selection;

export type CTAProps = TypeFromSelection<typeof CTA_FRAGMENT>;

const SECTIONS_LIST_SELECTION = {
  "_type == 'hero'": HERO_FRAGMENT,
  "_type == 'paragraph'": PARAGRAPH_FRAGMENT,
  "_type == 'solutionsCarousel'": SOLUTIONS_CAROUSEL_FRAGMENT,
  "_type == 'featuredProjects'": FEATURED_PROJECTS_FRAGMENT,
  "_type == 'iconMarquee'": ICON_MARQUEE_FRAGMENT,
  "_type == 'testimonies'": TESTIMONIES_FRAGMENT,
  "_type == 'featuredPosts'": FEATURED_POSTS_FRAGMENT,
  "_type == 'cta'": CTA_FRAGMENT,
};

export const SECTIONS_FRAGMENT: any = q("pageBuilder[]", {
  isArray: true,
})
  .select(SECTIONS_LIST_SELECTION)
  .nullable();
