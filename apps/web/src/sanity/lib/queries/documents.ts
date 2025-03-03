import { q } from "groqd";

import { COLOR_SCHEME_FRAGMENT } from "./color";
import {
  IMAGE_FRAGMENT,
  NAVIGATION_FRAGMENT,
  SEO_FRAGMENT,
  SOCIALS_FRAGMENT,
} from "./fragments";
import { BUTTON_FRAGMENT } from "./link";
import { RICHTEXT_BLOCKS } from "./richText";
import { SECTIONS_FRAGMENT } from "./sections";
import { POST_TILE_FRAGMENT, PROJECT_TILE_FRAGMENT } from "./tiles";

// export const redirectsQuery = q('*').filterByType('redirect').grab({
//     source: ,
//     destination: ,
//     permanent:
// })

export const homePageQuery = q("*")
  .filterByType("settingsGeneral")
  .slice(0)
  .grab({
    home: q("homepage")
      .deref()
      .grab({
        _id: q.string(),
        title: q.string(),
        modules: SECTIONS_FRAGMENT,
        seo: q("seo").grab(SEO_FRAGMENT),
      }),
  });

export const errorPageQuery = q("*")
  .filterByType("settingsGeneral")
  .slice(0)
  .grab({
    errorPage: q("errorPage")
      .deref()
      .grab({
        _id: q.string(),
        title: q.string(),
        modules: SECTIONS_FRAGMENT,
        seo: q("seo").grab(SEO_FRAGMENT),
      }),
  });

export const postsPageQuery = q("*")
  .filterByType("postsIndex")
  .slice(0)
  .grab({
    _type: q.literal("postsIndex"),
    title: q.string(),
    richText: q("richText[]", { isArray: true }).select(RICHTEXT_BLOCKS),
    modules: SECTIONS_FRAGMENT,
    categories: q("*")
      .filterByType("postCategory")
      .filter('count(*[_type == "post" && references(^._id)]) > 0')
      .grab({
        _type: q.literal("postCategory"),
        title: q.string(),
        slug: ["slug.current", q.string()],
      }),
    seo: q("seo").grab(SEO_FRAGMENT),
    colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  });

export const categoryPageQuery = q("*")
  .filterByType("postCategory")
  .filter("slug.current == $slug")
  .slice(0)
  .grab({
    _type: q.literal("postCategory"),
    title: q.string(),
    slug: ["slug.current", q.string()],
    richText: q("richText").select(RICHTEXT_BLOCKS).nullable(),
    seo: q("seo").grab(SEO_FRAGMENT),
  });

export const pagesBySlugQuery = q("*")
  .filterByType("page")
  .filter("slug.current == $slug && dontRender != true")
  .slice(0)
  .grab({
    _type: q.literal("page"),
    _id: q.string(),
    title: q.string(),
    slug: ["slug.current", q.string()],
    modules: SECTIONS_FRAGMENT,
    seo: q("seo").grab(SEO_FRAGMENT),
    dontRender: q.boolean(),
  });

export const postsBySlugQuery = q("*")
  .filterByType("post")
  .filter("slug.current == $slug")
  .slice(0)
  .grab({
    ...POST_TILE_FRAGMENT,
    body: q("body[]", { isArray: true }).select(RICHTEXT_BLOCKS).nullable(),
    related: q("*")
      .filterByType("post")
      .filter("slug.current != $slug")
      .filter("count(categories[@._ref in ^.^.categories[]._ref]) > 0")
      .order("publishedAt desc, _createdAt desc")
      .slice(0, 2)
      .grab(POST_TILE_FRAGMENT),
    seo: q("seo").grab(SEO_FRAGMENT),
    colorScheme: q("*")
      .filterByType("postsIndex")
      .slice(0)
      .grab({
        colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
      }),
  });

export const postsQuery = q("").grab({
  posts: q('*[_type == "post"] | order(publishedAt desc)[$start...$end]').grab(
    POST_TILE_FRAGMENT,
  ),
  total: q('count(*[_type == "post"])'),
  page: q("*")
    .filterByType("postsIndex")
    .slice(0)
    .grab({
      title: q.string(),
      richText: q("richText").select(RICHTEXT_BLOCKS).nullable(),
      colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
      categories: q("categories[]", { isArray: true })
        .deref()
        .grabOne("title")
        .nullable(),
      seo: q("seo").grab(SEO_FRAGMENT),
    }),
});

export const postsByCategoryQuery = q("").grab({
  posts: q(
    '*[_type == "post" && $slug in categories[]->slug.current] | order(orderRank)[$start...$end]',
  ).grab(POST_TILE_FRAGMENT),
  total: q('count(*[_type == "post" && $slug in categories[]->slug.current])'),
  page: q("*")
    .filterByType("postCategory")
    .filter("slug.current == $slug")
    .slice(0)
    .grab({
      title: q.string(),
      slug: ["slug.current", q.string()],
      seo: q("seo").grab(SEO_FRAGMENT),
    }),
});

export const generalSettingsQuery = q("*")
  .filterByType("settingsGeneral")
  .slice(0)
  .grab(SOCIALS_FRAGMENT);

export const headerQuery = q("*")
  .filterByType("settingsHeader")
  .slice(0)
  .grab({
    desktopMenu: q("desktopMenu").deref().grab(NAVIGATION_FRAGMENT),
    buttons: q("buttons[]", { isArray: true }).grab(BUTTON_FRAGMENT),
    mobileMenu: q("mobileMenu").deref().grab(NAVIGATION_FRAGMENT),
  });

export const footerQuery = q("*")
  .filterByType("settingsFooter")
  .slice(0)
  .grab({
    newsletter: q("newsletter[]", { isArray: true })
      .select(RICHTEXT_BLOCKS)
      .nullable(),
    footerMenu: q("footerMenu").deref().grab(NAVIGATION_FRAGMENT),
    legalMenu: q("legalMenu").deref().grab(NAVIGATION_FRAGMENT),
    acknowlegement: q.string(),
    colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  });

export const sitemapQuery = q("*")
  .filter("defined(slug.current) && seo.noIndex != true && dontRender != true")
  .order("_createdAt desc")
  .grab({
    _type: q.string(),
    slug: q("slug.current"),
    createdAt: q("_createdAt"),
    updatedAt: q("_updatedAt"),
  });

export const revalidateReferencesQuery = q("*")
  .filter("references($_id)")
  .grab({
    _id: q.string(),
    _type: q.string(),
    slug: q("slug.current"),
  });
