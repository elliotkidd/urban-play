import { defineField } from "sanity";

import { GROUP } from "../utils/constant";
import { PathnameFieldComponent } from "../components/slug-field-component";
import { createSlug, isUnique } from "../utils/slug";

export const slugField = defineField({
  name: "slug",
  type: "slug",
  title: "URL",
  group: GROUP.MAIN_CONTENT,
  components: {
    field: PathnameFieldComponent,
  },
  options: {
    source: "title",
    slugify: createSlug,
    isUnique,
  },
  validation: (Rule) => Rule.required(),
});

export const richTextField = defineField({
  name: "richText",
  type: "richText",
});

export const buttonsField = defineField({
  name: "buttons",
  type: "array",
  of: [{ type: "button" }],
});

export const pageBuilderField = defineField({
  name: "pageBuilder",
  group: GROUP.MAIN_CONTENT,
  type: "pageBuilder",
});

export const sectionHeaderField = defineField({
  name: "sectionHeader",
  type: "object",
  group: GROUP.MAIN_CONTENT,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    buttonsField,
  ],
});

export const iconField = defineField({
  name: "icon",
  title: "Icon",
  options: {
    storeSvg: true,
    providers: ["fi"],
  },
  type: "iconPicker",
});

export const colorPickerField = defineField({
  name: "colorScheme",
  title: "Color Scheme",
  type: "reference",
  to: [{ type: "colorScheme" }],
  group: GROUP.SETTINGS,
  validation: (Rule) => Rule.required(),
});

export const annotationField = defineField({
  name: "annotations",
  title: "Annotations",
  type: "array",
  group: GROUP.MAIN_CONTENT,
  of: [
    {
      name: "annotation",
      title: "Annotation",
      type: "object",
      fields: [
        { name: "top", title: "Top", type: "string" },
        { name: "bottom", title: "Bottom", type: "string" },
      ],
      preview: {
        select: {
          title: "top",
          subtitle: "bottom",
        },
        prepare: ({ title, subtitle }) => ({
          title,
          subtitle,
        }),
      },
    },
  ],
});

export const marginSettingsFields = [
  defineField({
    name: "removeMarginTop",
    title: "Remove Margin Top",
    type: "boolean",
    initialValue: false,
    group: GROUP.SETTINGS,
  }),
  defineField({
    name: "removeMarginBottom",
    title: "Remove Margin Bottom",
    type: "boolean",
    initialValue: false,
    group: GROUP.SETTINGS,
  }),
];

export const hideOnField = defineField({
  name: "hideOn",
  title: "Hide On",
  type: "array",
  of: [{ type: "reference", to: [{ type: "page" }] }],
  group: GROUP.SETTINGS,
});

export const sectionSettings = [
  ...marginSettingsFields,
  colorPickerField,
  defineField({
    name: "smallWrapper",
    title: "Small Wrapper?",
    type: "boolean",
    initialValue: false,
    group: GROUP.SETTINGS,
  }),
  hideOnField,
];
