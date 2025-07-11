import { q, Selection, TypeFromSelection, z } from "groqd";
import { RICHTEXT_BLOCKS } from "./richText";
import {
  COLOR_SCHEME_FRAGMENT,
  IMAGE_FRAGMENT,
  POST_TILE_FRAGMENT,
  TESTIMONY_FRAGMENT,
  TILE_FRAGMENT,
} from "./fragments";
import { FORM_FRAGMENT } from "./form";
import {
  BUTTON_FRAGMENT,
  CUSTOM_URL_FRAGMENT,
  LINK_REFERENCE_FRAGMENT,
} from "./link";

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

const SECTION_SETTINGS_FRAGMENT = {
  ...REMOVE_MARGIN_FRAGMENTS,
  colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  padding: q.string(),
  smallWrapper: q.boolean(),
  hideOn: q("hideOn[]", { isArray: true })
    .deref()
    .grab(LINK_REFERENCE_FRAGMENT)
    .nullable(),
} satisfies Selection;

const HERO_FRAGMENT = {
  _type: q.literal("heroSection"),
  _key: q.string(),
  title: q.string(),
  richText: q(`richText[]`, { isArray: true })
    .select(RICHTEXT_BLOCKS)
    .nullable(),
  image: q("image").grab(IMAGE_FRAGMENT).nullable(),
  video: q("video.asset").deref().grabOne("url", q.string()).nullable(),
  mediaType: q.literal("image").or(q.literal("video")),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type HeroProps = TypeFromSelection<typeof HERO_FRAGMENT>;

export const PAGE_HEADER_FRAGMENT = {
  _type: q.literal("pageHeader"),
  title: q.string(),
  richText: q(`richText[]`, { isArray: true })
    .select(RICHTEXT_BLOCKS)
    .nullable(),
  image: q("image").grab(IMAGE_FRAGMENT).nullable(),
  video: q("video.asset").deref().grabOne("url", q.string()).nullable(),
  mediaType: q.literal("image").or(q.literal("video")),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type PageHeaderProps = TypeFromSelection<typeof PAGE_HEADER_FRAGMENT>;

const PARAGRAPH_FRAGMENT = {
  _type: q.literal("paragraph"),
  _key: q.string(),
  topText: q(`topText[]`, { isArray: true }).select(RICHTEXT_BLOCKS).nullable(),
  buttons: q(`buttons[]`, { isArray: true }).grab(BUTTON_FRAGMENT).nullable(),
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
  largeSpacing: q.boolean(),
  annotationDirection: q
    .literal("vertical")
    .or(q.literal("horizontal"))
    .nullable(),
  downloadableFile: q("downloadableFile").grab({
    _type: q.literal("file"),
    _id: q.string(),
    url: q("asset").deref().grabOne("url", q.string()),
  }),
  recipients: q("*")
    .filterByType("settings")
    .grabOne("formEmailRecipients[]")
    .grab({
      email: q.string(),
      name: q.string(),
    }),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type ParagraphProps = TypeFromSelection<typeof PARAGRAPH_FRAGMENT>;

const SOLUTIONS_SECTION_FRAGMENT = {
  _type: q.literal("solutionsCarousel").or(q.literal("solutionsGrid")),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  solutions: q("solutions[]", { isArray: true })
    .deref()
    .grab({
      _id: q.string(),
      title: q.string(),
      slug: q.slug("slug"),
      image: q("image").grab(IMAGE_FRAGMENT),
      description: q.string(),
    }),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type SolutionsSectionProps = TypeFromSelection<
  typeof SOLUTIONS_SECTION_FRAGMENT
>;

const FEATURED_PROJECTS_FRAGMENT = {
  _type: q.literal("featuredProjects"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  projects: q("projects[]", { isArray: true }).deref().grab(TILE_FRAGMENT),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type FeaturedProjectsProps = TypeFromSelection<
  typeof FEATURED_PROJECTS_FRAGMENT
>;

const ICON_MARQUEE_FRAGMENT = {
  _type: q.literal("iconMarquee"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  icons: q("icons[]", { isArray: true }).grab(IMAGE_FRAGMENT),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type IconMarqueeProps = TypeFromSelection<typeof ICON_MARQUEE_FRAGMENT>;

const TESTIMONIES_FRAGMENT = {
  _type: q.literal("testimonies"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  testimonies: q("*", { isArray: true })
    .filterByType("testimony")
    .grab(TESTIMONY_FRAGMENT),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type TestimoniesProps = TypeFromSelection<typeof TESTIMONIES_FRAGMENT>;

const FEATURED_POSTS_FRAGMENT = {
  _type: q.literal("featuredPost"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  posts: q("posts[]", { isArray: true }).deref().grab(POST_TILE_FRAGMENT),
  ...SECTION_SETTINGS_FRAGMENT,
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
  image: q("image").grab(IMAGE_FRAGMENT).nullable(),
  video: q("video.asset").deref().grabOne("url", q.string()).nullable(),
  mediaType: q.literal("image").or(q.literal("video")),
  buttons: q(`buttons[]`, { isArray: true }).grab(BUTTON_FRAGMENT).nullable(),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type CTAProps = TypeFromSelection<typeof CTA_FRAGMENT>;

export const IMAGE_BANNER_FRAGMENT = {
  _type: q.literal("imageBanner"),
  _key: q.string(),
  title: q.string(),
  richText: q(`richText[]`, { isArray: true })
    .select(RICHTEXT_BLOCKS)
    .nullable(),
  containImage: q.boolean(),
  image: q("image").grab(IMAGE_FRAGMENT),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type ImageBannerProps = TypeFromSelection<typeof IMAGE_BANNER_FRAGMENT>;

const AWARDS_ACCORDION_FRAGMENT = {
  _type: q.literal("awardsAccordion"),
  _key: q.string(),
  title: q.string(),
  categories: q.number(),
  awards: q("*", { isArray: true })
    .filterByType("award")
    .order("orderRank")
    .grab({
      _id: q.string(),
      _key: q.string(),
      title: q.string(),
      forText: q.string(),
      year: q.string(),
    }),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type AwardsAccordionProps = TypeFromSelection<
  typeof AWARDS_ACCORDION_FRAGMENT
>;

const TEAM_FRAGMENT = {
  _type: q.literal("team"),
  _key: q.string(),
  title: q.string(),
  teamMembers: q("teamMembers[]", { isArray: true })
    .deref()
    .grab({
      _id: q.string(),
      _key: q.string(),
      name: q.string(),
      image: q("image").grab(IMAGE_FRAGMENT),
      position: q.string(),
      yearsExperience: q.number().min(0).max(60),
    }),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type TeamProps = TypeFromSelection<typeof TEAM_FRAGMENT>;

const IMAGE_BLOCK_FRAGMENT = {
  _type: q.literal("imageBlock"),
  _key: q.string(),
  image: q("source").grab(IMAGE_FRAGMENT),
  aspectRatio: q
    .literal("portrait")
    .or(q.literal("landscape"))
    .or(q.literal("square")),
} satisfies Selection;

export type ImageBlockProps = TypeFromSelection<typeof IMAGE_BLOCK_FRAGMENT>;

const RICH_TEXT_CONTENT_FRAGMENT = {
  _type: q.literal("richTextBlock"),
  _key: q.string(),
  richText: q(`richText[]`, { isArray: true })
    .select(RICHTEXT_BLOCKS)
    .nullable(),
} satisfies Selection;

export type RichTextContentProps = TypeFromSelection<
  typeof RICH_TEXT_CONTENT_FRAGMENT
>;

const ACCORDION_BLOCK_FRAGMENT = {
  _type: q.literal("accordion"),
  _key: q.string(),
  title: q(`title[]`, { isArray: true }).select(RICHTEXT_BLOCKS).nullable(),
  items: q("items[]", { isArray: true }).grab({
    _key: q.string(),
    heading: q.string(),
    content: q(`content[]`, { isArray: true })
      .select(RICHTEXT_BLOCKS)
      .nullable(),
  }),
} satisfies Selection;

export type AccordionBlockProps = TypeFromSelection<
  typeof ACCORDION_BLOCK_FRAGMENT
>;

const TEXT_BETWEEN_BLOCK_FRAGMENT = {
  _type: q.literal("textBetweenBlock"),
  _key: q.string(),
  title: q(`title[]`, { isArray: true }).select(RICHTEXT_BLOCKS).nullable(),
  text: q(`text[]`, { isArray: true }).select(RICHTEXT_BLOCKS).nullable(),
} satisfies Selection;

export type TextBetweenBlockProps = TypeFromSelection<
  typeof TEXT_BETWEEN_BLOCK_FRAGMENT
>;

const CONTENT_BLOCK_SELECTION = {
  "_type == 'imageBlock'": IMAGE_BLOCK_FRAGMENT,
  "_type == 'richTextBlock'": RICH_TEXT_CONTENT_FRAGMENT,
  "_type == 'accordion'": ACCORDION_BLOCK_FRAGMENT,
  "_type == 'textBetweenBlock'": TEXT_BETWEEN_BLOCK_FRAGMENT,
};

const TWO_COLUMN_CONTENT_FRAGMENT = {
  _type: q.literal("twoColumnContent"),
  _key: q.string(),
  left: q("left[]", { isArray: true }).select({
    ...CONTENT_BLOCK_SELECTION,
    default: {
      _key: q.string(),
      _type: q.string(),
    },
  }),
  right: q("right[]", { isArray: true }).select({
    ...CONTENT_BLOCK_SELECTION,
    default: {
      _key: q.string(),
      _type: q.string(),
    },
  }),
  alignCentre: q.boolean(),
  columnRatio: q.literal("5050").or(q.literal("2575")).or(q.literal("7525")),
  gap: q.string(),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type TwoColumnContentProps = TypeFromSelection<
  typeof TWO_COLUMN_CONTENT_FRAGMENT
>;

const IMAGE_LINK_CARD_FRAGMENT = {
  _id: q.string(),
  _key: q.string(),
  title: q.string(),
  image: q("image").grab(IMAGE_FRAGMENT),
  url: q("url").grab(CUSTOM_URL_FRAGMENT),
} satisfies Selection;

export type ImageLinkCardProps = TypeFromSelection<
  typeof IMAGE_LINK_CARD_FRAGMENT
>;

const IMAGE_LINK_CARDS = {
  _type: q.literal("imageLinkCards"),
  _key: q.string(),
  cards: q("cards[]", { isArray: true }).grab(IMAGE_LINK_CARD_FRAGMENT),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

const IMAGE_MARQUEE_FRAGMENT = {
  _type: q.literal("imageMarquee"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  images: q("images[]", { isArray: true }).grab(IMAGE_FRAGMENT),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type ImageMarqueeProps = TypeFromSelection<
  typeof IMAGE_MARQUEE_FRAGMENT
>;

const PROCESS_FRAGMENT = {
  _type: q.literal("process").or(q.literal("verticalProcess")),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  steps: q("steps[]", { isArray: true }).grab({
    _key: q.string(),
    heading: q.string(),
    description: q.string(),
    image: q("image").grab(IMAGE_FRAGMENT),
  }),
  showIndex: q.boolean(),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type ProcessProps = TypeFromSelection<typeof PROCESS_FRAGMENT>;

const FAQ_ACCORDION_FRAGMENT = {
  _type: q.literal("faqAccordion"),
  _key: q.string(),
  title: q.string(),
  faqs: q("*", { isArray: true })
    .filterByType("faq")
    .grab({
      _id: q.string(),
      title: q.string(),
      answer: q(`richText[]`, { isArray: true })
        .select(RICHTEXT_BLOCKS)
        .nullable(),
    }),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type FAQAccordionProps = TypeFromSelection<
  typeof FAQ_ACCORDION_FRAGMENT
>;

const QUOTE_FRAGMENT = {
  _type: q.literal("quote"),
  _key: q.string(),
  quote: q.string(),
  author: q("author").deref().grab({
    _id: q.string(),
    name: q.string(),
    position: q.string(),
  }),
} satisfies Selection;

export type QuoteProps = TypeFromSelection<typeof QUOTE_FRAGMENT>;

const SOCIAL_MEDIA_FRAGMENT = {
  _type: q.literal("socialMedia"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  images: q("images[]", { isArray: true }).grab(IMAGE_FRAGMENT),
  linkedInUrl: q("*")
    .filterByType("settings")
    .slice(0)
    .grabOne("socialLinks.linkedin", q.string()),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type SocialMediaProps = TypeFromSelection<typeof SOCIAL_MEDIA_FRAGMENT>;

const CONTACT_FRAGMENT = {
  _type: q.literal("contact"),
  _key: q.string(),
  title: q.string(),
  form: FORM_FRAGMENT,
  globalSettings: q("*")
    .filterByType("settings")
    .slice(0)
    .grab({
      socialLinks: q("socialLinks").grab({
        linkedin: q.string(),
        facebook: q.string(),
        instagram: q.string(),
        twitter: q.string(),
        youtube: q.string(),
      }),
      contactDetails: q("contactDetails").grab({
        _key: q.string(),
        name: q.string(),
        phone: q.string(),
        address: q.string(),
      }),
    }),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type ContactProps = TypeFromSelection<typeof CONTACT_FRAGMENT>;

export const VIDEO_FRAGMENT = {
  _type: q.literal("video"),
  _key: q.string(),
  video: q("video.asset").deref().grabOne("url", q.string()).nullable(),
  contain: q.boolean(),
  mediaType: q.literal("image").or(q.literal("video")),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type VideoSectionProps = TypeFromSelection<typeof VIDEO_FRAGMENT>;

const PARTNERS_ROLLOVER_FRAGMENT = {
  _type: q.literal("partnersRollover"),
  _key: q.string(),
  partners: q("partners[]", { isArray: true })
    .deref()
    .grab({
      ...LINK_REFERENCE_FRAGMENT,
      image: q("seoImage").grab(IMAGE_FRAGMENT),
    }),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type PartnersRolloverProps = TypeFromSelection<
  typeof PARTNERS_ROLLOVER_FRAGMENT
>;

const SPOT_FRAGMENT = {
  _type: q.literal("imageWithProductHotspots"),
  _key: q.string(),
  solution: q("solution")
    .deref()
    .grab({
      _id: q.string(),
      title: q.string(),
      slug: q.slug("slug"),
    }),
  description: q.string(),
  x: q.number(),
  y: q.number(),
} satisfies Selection;

export type SpotProps = TypeFromSelection<typeof SPOT_FRAGMENT>;

const IMAGE_WITH_HOTSPOT_FRAGMENT = {
  _type: q.literal("imageWithProductHotspots"),
  _key: q.string(),
  image: q("image").grab(IMAGE_FRAGMENT),
  hotspots: q("productHotspots[]", { isArray: true }).grab(SPOT_FRAGMENT),
} satisfies Selection;

export type ImageWithHotspotProps = TypeFromSelection<
  typeof IMAGE_WITH_HOTSPOT_FRAGMENT
>;

const IMAGE_WITH_PRODUCT_HOTSPOTS_FRAGMENT = {
  _type: q.literal("imageWithProductHotspots"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  images: q("images[]", { isArray: true }).grab(IMAGE_WITH_HOTSPOT_FRAGMENT),
  hotspots: q("hotspots[]", { isArray: true }).grab(SPOT_FRAGMENT),
  ...SECTION_SETTINGS_FRAGMENT,
} satisfies Selection;

export type ImageWithProductHotspotsProps = TypeFromSelection<
  typeof IMAGE_WITH_PRODUCT_HOTSPOTS_FRAGMENT
>;

const GRID_FRAGMENT = {
  _type: q.literal("grid"),
  _key: q.string(),
  sectionHeader: q("sectionHeader").grab(SECTION_HEADER_FRAGMENT),
  items: q("items[]", { isArray: true }).grab({
    _key: q.string(),
    heading: q.string(),
    description: q.string(),
  }),
} satisfies Selection;

export type GridProps = TypeFromSelection<typeof GRID_FRAGMENT>;

const SECTIONS_LIST_SELECTION = {
  "_type == 'hero'": HERO_FRAGMENT,
  "_type == 'paragraph'": PARAGRAPH_FRAGMENT,
  "_type == 'solutionsGrid'": SOLUTIONS_SECTION_FRAGMENT,
  "_type == 'featuredProjects'": FEATURED_PROJECTS_FRAGMENT,
  "_type == 'iconMarquee'": ICON_MARQUEE_FRAGMENT,
  "_type == 'testimonies'": TESTIMONIES_FRAGMENT,
  "_type == 'featuredPosts'": FEATURED_POSTS_FRAGMENT,
  "_type == 'cta'": CTA_FRAGMENT,
  "_type == 'imageBanner'": IMAGE_BANNER_FRAGMENT,
  "_type == 'awardsAccordion'": AWARDS_ACCORDION_FRAGMENT,
  "_type == 'team'": TEAM_FRAGMENT,
  "_type == 'twoColumnContent'": TWO_COLUMN_CONTENT_FRAGMENT,
  "_type == 'imageLinkCards'": IMAGE_LINK_CARDS,
  "_type == 'imageMarquee'": IMAGE_MARQUEE_FRAGMENT,
  "_type == 'process' || _type == 'verticalProcess'": PROCESS_FRAGMENT,
  "_type == 'faqsAccordion'": FAQ_ACCORDION_FRAGMENT,
  "_type == 'quote'": QUOTE_FRAGMENT,
  "_type == 'socialMedia'": SOCIAL_MEDIA_FRAGMENT,
  "_type == 'contact'": CONTACT_FRAGMENT,
  "_type == 'video'": VIDEO_FRAGMENT,
  "_type == 'pageHeader'": PAGE_HEADER_FRAGMENT,
  "_type == 'partnersRollover'": PARTNERS_ROLLOVER_FRAGMENT,
  "_type == 'hotspotImageCarousel'": IMAGE_WITH_PRODUCT_HOTSPOTS_FRAGMENT,
  "_type == 'grid'": GRID_FRAGMENT,
};

export const SECTIONS_FRAGMENT = q("pageBuilder[]", {
  isArray: true,
})
  .select({
    ...SECTIONS_LIST_SELECTION,
    default: {
      _key: q.string(),
      _type: q.string(),
      ...SECTION_SETTINGS_FRAGMENT,
    },
  })
  .nullable();
