import { Selection, q } from "groqd";

export const COLOR_FRAGMENT = {
  rgb: q("rgb").grab({
    b: q.number(),
    g: q.number(),
    r: q.number(),
  }),
} satisfies Selection;

export const COLOR_SCHEME_FRAGMENT = {
  name: q.string(),
  primary: q("primary").grab(COLOR_FRAGMENT).nullable(),
  contrast: q("contrast").grab(COLOR_FRAGMENT).nullable(),
  accent: q("accent").grab(COLOR_FRAGMENT).nullable(),
  complimentary: q("complimentary").grab(COLOR_FRAGMENT).nullable(),
} satisfies Selection;
