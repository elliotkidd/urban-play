import type { Selection } from "groqd";
import { q } from "groqd";

/*
|--------------------------------------------------------------------------
| Links Fragments
|--------------------------------------------------------------------------
*/
export const LINK_REFERENCE_FRAGMENT = q("to")
  .deref()
  .grab({
    _type: ["_type", q.string()],
    slug: ["slug.current", q.string()],
    title: q.string(),
  })
  .nullable();

export const INTERNAL_LINK_FRAGMENT = {
  _type: q.string(),
  anchor: q.string().nullable(),
  to: LINK_REFERENCE_FRAGMENT,
} satisfies Selection;

export const EXTERNAL_LINK_FRAGMENT = {
  link: q.string().nullable(),
  openInNewTab: q.boolean().nullable(),
} satisfies Selection;

export const LINK_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("link"),
  linkType: q.literal("internal").or(q.literal("external")),
  internalLink: q("internalLink").grab(INTERNAL_LINK_FRAGMENT),
  externalLink: q("externalLink").grab(EXTERNAL_LINK_FRAGMENT),
} satisfies Selection;

export const NESTED_NAVIGATION_FRAGMENT = {
  _key: q.string().nullable(),
  _type: q.literal("nestedNavigation"),
  childLinks: q("childLinks[]", { isArray: true }).grab(LINK_FRAGMENT),
  link: q("link").grab(LINK_FRAGMENT),
} satisfies Selection;

/*
|--------------------------------------------------------------------------
| List of Links
|--------------------------------------------------------------------------
*/
export const LINKS_LIST_SELECTION = {
  '_type == "navItem"': LINK_FRAGMENT,
  '_type == "nestedNavigation"': NESTED_NAVIGATION_FRAGMENT,
};

export const BUTTON_FRAGMENT = {
  _type: q.literal("button"),
  text: q.string(),
  link: q("link").grab(LINK_FRAGMENT),
  variant: q
    .literal("solid")
    .or(q.literal("outline"))
    .or(q.literal("inline"))
    .or(q.literal("accent"))
    .or(q.literal("underline")),
  width: q.literal("auto").or(q.literal("full")),
};
