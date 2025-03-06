import type { Selection } from "groqd";
import { q } from "groqd";

/*
|--------------------------------------------------------------------------
| Links Fragments
|--------------------------------------------------------------------------
*/
export const LINK_REFERENCE_FRAGMENT: any = {
  _type: ["_type", q.string()],
  slug: q.slug("slug"),
  title: q.string(),
} satisfies Selection;

export const EXTERNAL_LINK_FRAGMENT: any = {
  link: q.string().nullable(),
  openInNewTab: q.boolean().nullable(),
} satisfies Selection;

export const CUSTOM_URL_FRAGMENT: any = {
  _key: q.string().nullable(),
  _type: q.literal("link"),
  linkType: q.literal("internal").or(q.literal("external")),
  openInNewTab: q.boolean(),
  internal: q("internal").deref().grab(LINK_REFERENCE_FRAGMENT),
  external: q.string().nullable(),
} satisfies Selection;

/*
|--------------------------------------------------------------------------
| List of Links
|--------------------------------------------------------------------------
*/

export const BUTTON_FRAGMENT: any = {
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
};

export const NAVBAR_COLUMN_FRAGMENT: any = {
  _key: q.string(),
  _type: q.string(),
  title: q.string(),
  url: q("url").grab(CUSTOM_URL_FRAGMENT),
  links: q("links[]", { isArray: true }).grab(CUSTOM_URL_FRAGMENT),
};

export const NAVBAR_LINK_FRAGMENT: any = {
  _key: q.string(),
  _type: q.string(),
  name: q.string(),
  url: q("url").grab(CUSTOM_URL_FRAGMENT),
} satisfies Selection;

const NAVBAR_COLUMNS_SELECTION = {
  "_type == 'navbarColumn'": NAVBAR_COLUMN_FRAGMENT,
  "_type == 'navbarLink'": NAVBAR_LINK_FRAGMENT,
};

export const navBarQuery: any = q("*")
  .filterByType("navbar")
  .filter("_id =='navbar'")
  .slice(0)
  .grab({
    _id: q.string(),
    columns: q("columns[]", { isArray: true }).select(NAVBAR_COLUMNS_SELECTION),
    buttons: q("buttons[]", { isArray: true }).grab(BUTTON_FRAGMENT),
  });
