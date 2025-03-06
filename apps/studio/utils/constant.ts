import {
  BlockElementIcon,
  CogIcon,
  ComposeIcon,
  InlineElementIcon,
  InsertAboveIcon,
  SearchIcon,
} from "@sanity/icons";
import type { FieldGroupDefinition } from "sanity";

export const GROUP = {
  SEO: "seo",
  MAIN_CONTENT: "main-content",
  CARD: "card",
  RELATED: "related",
  OG: "og",
  SETTINGS: "settings",
};

export const GROUPS: FieldGroupDefinition[] = [
  // { name: CONST.MAIN_CONTENT, default: true },
  {
    name: GROUP.MAIN_CONTENT,
    icon: ComposeIcon,
    title: "Content",
    default: true,
  },
  { name: GROUP.SEO, icon: SearchIcon, title: "SEO" },
  {
    name: GROUP.OG,
    icon: InsertAboveIcon,
    title: "Open Graph",
  },
  {
    name: GROUP.CARD,
    icon: BlockElementIcon,
    title: "Card",
  },
  {
    name: GROUP.RELATED,
    icon: InlineElementIcon,
    title: "Related",
  },
];

export const SECTION_GROUPS = [
  {
    name: GROUP.MAIN_CONTENT,
    icon: ComposeIcon,
    title: "Content",
    default: true,
  },
  {
    name: GROUP.SETTINGS,
    icon: CogIcon,
    title: "Settings",
  },
];
