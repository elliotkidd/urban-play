import { InferType, q } from "groqd";
import { PAGE_HEADER_FRAGMENT, SECTIONS_FRAGMENT } from "./sections";
import {
  COLOR_SCHEME_FRAGMENT,
  IMAGE_FRAGMENT,
  POST_TILE_FRAGMENT,
  TILE_FRAGMENT,
} from "./fragments";
import { RICHTEXT_BLOCKS } from "./richText";
import {
  BUTTON_FRAGMENT,
  CUSTOM_URL_FRAGMENT,
  LINK_REFERENCE_FRAGMENT,
  NAVBAR_COLUMNS_SELECTION,
} from "./link";

export const homePageQuery = q("*")
  .filterByType("homePage")
  .slice(0)
  .grab({
    _id: q.string(),
    _type: q.literal("homePage"),
    title: q.string(),
    pageBuilder: SECTIONS_FRAGMENT,
  });

export const pageQuery = q("*")
  .filterByType("page")
  .filter(`slug.current == $slug`)
  .slice(0)
  .grab({
    _type: q.literal("page"),
    _id: q.string(),
    title: q.string(),
    slug: q.slug("slug"),
    pageBuilder: SECTIONS_FRAGMENT,
  });

export const projectIndexPageQuery = q("*")
  .filterByType("projectIndex")
  .slice(0)
  .grab({
    _id: q.string(),
    _type: q.literal("projectIndex"),
    title: q.string(),
    description: q.string(),
    solutions: q("*", { isArray: true })
      .filterByType("solution")
      .grab({
        _id: q.string(),
        title: q.string(),
        slug: q.slug("slug"),
      }),
    header: q("header").grab(PAGE_HEADER_FRAGMENT),
    pageBuilder: SECTIONS_FRAGMENT,
    colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  });

export const projectsQuery = q("*").filterByType("project").grab(TILE_FRAGMENT);

export const projectsQueryBySolution = q("*")
  .filterByType("project")
  .filter(`$slug in solutions[]->slug.current`)
  .grab(TILE_FRAGMENT);

export type ProjectIndexPage = InferType<typeof projectIndexPageQuery>;
export type Projects = InferType<typeof projectsQuery>;

export const projectPageQuery = q("*")
  .filterByType("project")
  .filter(`slug.current == $slug`)
  .slice(0)
  .grab({
    _type: q.literal("project"),
    _id: q.string(),
    title: q.string(),
    slug: q.slug("slug"),
    header: q("header").grab(PAGE_HEADER_FRAGMENT),
    description: q.string(),
    richText: q("richText[]").select(RICHTEXT_BLOCKS),
    image: q("image").grab(IMAGE_FRAGMENT),
    client: q.string(),
    construction: q.string(),
    status: q.string(),
    pageBuilder: SECTIONS_FRAGMENT,
    colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
    relatedProjects: q("*", { isArray: true })
      .filterByType("project")
      .grab(TILE_FRAGMENT),
  });

export type ProjectPage = InferType<typeof projectPageQuery>;

const FOOTER_LINK_FRAGMENT = {
  _key: q.string(),
  name: q.string(),
  url: q("url").grab(CUSTOM_URL_FRAGMENT),
};

export type FooterLinkProps = InferType<typeof FOOTER_LINK_FRAGMENT>;

const FOOTER_COLUMN_FRAGMENT = {
  _key: q.string(),
  title: q.string(),
  links: q("links[]", { isArray: true }).grab(FOOTER_LINK_FRAGMENT),
};

export type FooterColumnProps = InferType<typeof FOOTER_COLUMN_FRAGMENT>;

export const footerQuery = q("*")
  .filterByType("footer")
  .slice(0)
  .grab({
    _id: q.string(),
    _type: q.literal("footer"),
    subtitle: q.string(),
    columns: q("columns[]", { isArray: true })
      .filterByType("footerColumn")
      .grab(FOOTER_COLUMN_FRAGMENT),
    colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
    pageBuilder: SECTIONS_FRAGMENT,
    settings: q("*")
      .filterByType("settings")
      .slice(0)
      .grab({
        siteTitle: q.string(),
        contactDetails: q("contactDetails").grab({
          _key: q.string(),
          name: q.string(),
          phone: q.string(),
          address: q.string(),
        }),
        socialLinks: q("socialLinks").grab({
          linkedin: q.string(),
          facebook: q.string(),
          instagram: q.string(),
          twitter: q.string(),
          youtube: q.string(),
        }),
      }),
  });

export type FooterType = InferType<typeof footerQuery>;

export const navBarQuery = q("*")
  .filterByType("navbar")
  .filter("_id =='navbar'")
  .slice(0)
  .grab({
    _id: q.string(),
    columns: q("columns[]", { isArray: true }).select(NAVBAR_COLUMNS_SELECTION),
    buttons: q("buttons[]", { isArray: true }).grab(BUTTON_FRAGMENT),
    defaultColorScheme: q("defaultColorScheme")
      .deref()
      .grab(COLOR_SCHEME_FRAGMENT),
  });

export type NavBarType = InferType<typeof navBarQuery>;

export const blogIndexPageQuery = q("*")
  .filterByType("blogIndex")
  .slice(0)
  .grab({
    _id: q.string(),
    _type: q.literal("blogIndex"),
    title: q.string(),
    solutions: q("*", { isArray: true })
      .filterByType("solution")
      .grab(LINK_REFERENCE_FRAGMENT),
    featuredBlog: q("featured").deref().grab(POST_TILE_FRAGMENT),
    pageBuilder: SECTIONS_FRAGMENT,
    colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  });

export type BlogIndexPage = InferType<typeof blogIndexPageQuery>;

export const blogsQuery = `{
  "blogs": *[_type == "blog"][$indexFrom...$indexTo] {
    _id,
    title,
    "slug": slug.current,
    image {
      "_ref": image.asset._ref,
      "_type": "image",
      "alt": asset->altText,
      asset-> {
        _id,
        url,
      },
      crop {
        bottom,
        left,
        right,
        top,
      },
      hotspot {
        height,
        width,
        x,
        y
      },
      "height": asset->metadata.dimensions.height,
      "width": asset->metadata.dimensions.width,
      "id": asset->assetId,
      "type": asset->mimeType,
      "aspectRatio": asset->metadata.dimensions.aspectRatio,
      "lqip": asset->metadata.lqip
    },
    description,
    "publishedAt": publishedAt
  },
  "total": count(*[_type == "blog"])
}`;

export const blogBySolutionQuery = `{
  "blogs": *[_type == "blog" && solutions[]->slug.current == $slug][$indexFrom...$indexTo] {
   _id,
    title,
    "slug": slug.current,
    image {
      "_ref": image.asset._ref,
      "_type": "image",
      "alt": asset->altText,
      asset-> {
        _id,
        url,
      },
      crop {
        bottom,
        left,
        right,
        top,
      },
      hotspot {
        height,
        width,
        x,
        y
      },
      "height": asset->metadata.dimensions.height,
      "width": asset->metadata.dimensions.width,
      "id": asset->assetId,
      "type": asset->mimeType,
      "aspectRatio": asset->metadata.dimensions.aspectRatio,
      "lqip": asset->metadata.lqip
    },
    description,
    "publishedAt": publishedAt
  },
  "total": count(*[_type == "blog" && solutions[]->slug.current == $slug])
}`;

export const blogSlugPageQuery = q("*")
  .filterByType("blog")
  .filter(`slug.current == $slug`)
  .slice(0)
  .grab({
    _type: q.literal("blog"),
    _id: q.string(),
    title: q.string(),
    slug: q.slug("slug"),
    image: q("image").grab(IMAGE_FRAGMENT),
    richText: q("richText[]").select(RICHTEXT_BLOCKS),
    description: q.string(),
    publishedAt: q.string(),
    authors: q("authors[]", { isArray: true })
      .deref()
      .grab({
        _id: q.string(),
        name: q.string(),
        image: q("image").grab(IMAGE_FRAGMENT),
      }),
    pageBuilder: SECTIONS_FRAGMENT,
  });

export type BlogSlugPageType = InferType<typeof blogSlugPageQuery>;
