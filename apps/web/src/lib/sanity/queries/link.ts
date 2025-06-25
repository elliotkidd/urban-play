import type { InferType, Selection, TypeFromSelection } from "groqd";
import { q } from "groqd";

/*
|--------------------------------------------------------------------------
| Links Fragments
|--------------------------------------------------------------------------
*/
export const LINK_REFERENCE_FRAGMENT = {
  _type: ["_type", q.string()],
  _id: q.string(),
  _key: q.string(),
  slug: q.slug("slug"),
  title: q.string(),
} satisfies Selection;

export type LinkReferenceType = TypeFromSelection<
  typeof LINK_REFERENCE_FRAGMENT
>;

export const EXTERNAL_LINK_FRAGMENT = {
  link: q.string().nullable(),
  openInNewTab: q.boolean().nullable(),
} satisfies Selection;

export const CUSTOM_URL_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("link"),
  openInNewTab: q.boolean(),
  href: q.select({
    "linkType == 'internal'": q("internal").deref().grabOne("slug.current"),
    "linkType == 'external'": q("external"),
  }),
} satisfies Selection;

export type CustomUrlType = TypeFromSelection<typeof CUSTOM_URL_FRAGMENT>;

/*
|--------------------------------------------------------------------------
| List of Links
|--------------------------------------------------------------------------
*/

export const BUTTON_FRAGMENT = {
  _key: q.string(),
  _type: q.literal("button"),
  text: q.string(),
  url: q("url").grab(CUSTOM_URL_FRAGMENT),
  variant: q
    .literal("solid")
    .or(q.literal("outline"))
    .or(q.literal("inline"))
    .or(q.literal("accent"))
    .or(q.literal("underline")),
} satisfies Selection;

export type ButtonType = TypeFromSelection<typeof BUTTON_FRAGMENT>;

export const NAVBAR_COLUMN_FRAGMENT = {
  _key: q.string(),
  _type: q.string(),
  title: q.string(),
  url: q("url").grab(CUSTOM_URL_FRAGMENT),
  links: q("links[]", { isArray: true }).grab({
    _key: q.string(),
    url: q("url").grab(CUSTOM_URL_FRAGMENT),
    name: q.string(),
  }),
} satisfies Selection;

export type NavBarColumnType = TypeFromSelection<typeof NAVBAR_COLUMN_FRAGMENT>;

export const NAVBAR_LINK_FRAGMENT = {
  _key: q.string(),
  _type: q.string(),
  name: q.string(),
  url: q("url").grab(CUSTOM_URL_FRAGMENT),
} satisfies Selection;

export type NavBarLinkType = TypeFromSelection<typeof NAVBAR_LINK_FRAGMENT>;

export const NAVBAR_COLUMNS_SELECTION = {
  "_type == 'navbarColumn'": NAVBAR_COLUMN_FRAGMENT,
  "_type == 'navbarLink'": NAVBAR_LINK_FRAGMENT,
};
