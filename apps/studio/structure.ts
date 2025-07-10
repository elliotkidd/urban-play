import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  Award,
  BookA,
  BookMarked,
  CogIcon,
  File,
  FileText,
  Grid2x2,
  Hammer,
  Lightbulb,
  type LucideIcon,
  MessageCircleQuestion,
  PaletteIcon,
  PanelBottomIcon,
  PanelTopDashedIcon,
  Quote,
  Settings2,
  User,
} from "lucide-react";
import type {
  StructureBuilder,
  StructureResolverContext,
} from "sanity/structure";

import type { SchemaType, SingletonType } from "./schemaTypes";
import { getTitleCase } from "./utils/helper";

type Base<T = SchemaType> = {
  id?: string;
  type: T;
  preview?: boolean;
  title?: string;
  icon?: LucideIcon;
};

type CreateSingleTon = {
  S: StructureBuilder;
} & Base<SingletonType>;

const createSingleTon = ({ S, type, title, icon }: CreateSingleTon) => {
  const newTitle = title ?? getTitleCase(type);
  return S.listItem()
    .title(newTitle)
    .icon(icon ?? File)
    .child(S.document().schemaType(type).documentId(type));
};

type CreateList = {
  S: StructureBuilder;
} & Base;

// This function creates a list item for a type. It takes a StructureBuilder instance (S),
// a type, an icon, and a title as parameters. It generates a title for the type if not provided,
// and uses a default icon if not provided. It then returns a list item with the generated or
// provided title and icon.

const createList = ({ S, type, icon, title, id }: CreateList) => {
  const newTitle = title ?? getTitleCase(type);
  return S.documentTypeListItem(type)
    .id(id ?? type)
    .title(newTitle)
    .icon(icon ?? File);
};

type CreateIndexList = {
  S: StructureBuilder;
  list: Base;
  index: Base<SingletonType>;
};

const createIndexList = ({ S, index, list }: CreateIndexList) => {
  const indexTitle = index.title ?? getTitleCase(index.type);
  const listTitle = list.title ?? getTitleCase(list.type);
  return S.listItem()
    .title(listTitle)
    .icon(index.icon ?? File)
    .child(
      S.list()
        .title(indexTitle)
        .items([
          S.listItem()
            .title(indexTitle)
            .icon(index.icon ?? File)
            .child(
              S.document()
                .views([S.view.form()])
                .schemaType(index.type)
                .documentId(index.type),
            ),
          S.documentTypeListItem(list.type)
            .title(`${listTitle}`)
            .icon(list.icon ?? File),
        ]),
    );
};

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  return S.list()
    .title("Content")
    .items([
      createIndexList({
        S,
        index: { type: "homePage", icon: BookA },
        list: { type: "page", title: "Pages" },
      }),
      S.divider(),
      createIndexList({
        S,
        index: { type: "projectIndex", icon: Grid2x2 },
        list: { type: "project", title: "Projects", icon: Hammer },
      }),
      createList({ S, type: "solution", title: "Solutions", icon: Lightbulb }),
      S.divider(),
      orderableDocumentListDeskItem({
        S,
        type: "award",
        title: "Awards",
        icon: Award,
        context,
      }),
      createList({
        S,
        type: "faq",
        title: "FAQs",
        icon: MessageCircleQuestion,
      }),
      createList({ S, type: "testimony", title: "Testimonies", icon: Quote }),
      S.divider(),
      createIndexList({
        S,
        index: { type: "blogIndex", icon: BookMarked },
        list: { type: "blog", title: "Blogs", icon: FileText },
      }),
      createList({ S, type: "author", title: "Authors", icon: User }),
      S.divider(),
      S.listItem()
        .title("Site Configuration")
        .icon(Settings2)
        .child(
          S.list()
            .title("Site Configuration")
            .items([
              createSingleTon({
                S,
                type: "navbar",
                title: "Navigation",
                icon: PanelTopDashedIcon,
              }),
              createSingleTon({
                S,
                type: "footer",
                title: "Footer",
                icon: PanelBottomIcon,
              }),
              createSingleTon({
                S,
                type: "settings",
                title: "Global Settings",
                icon: CogIcon,
              }),
              createList({
                S,
                type: "colorScheme",
                title: "Color Schemes",
                icon: PaletteIcon,
              }),
            ]),
        ),
    ]);
};
