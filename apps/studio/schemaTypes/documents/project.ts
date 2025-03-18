import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { richTextField, slugField } from "../common";
import { seoFields } from "../../utils/seo-fields";
import { ogFields } from "../../utils/og-fields";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: GROUP.MAIN_CONTENT,
    }),
    slugField,
    defineField({
      name: "solutions",
      type: "array",
      of: [{ type: "reference", to: [{ type: "solution" }] }],
      title: "Solutions",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
      group: GROUP.MAIN_CONTENT,
      options: {
        collapsible: true,
      },
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "client",
      type: "string",
      title: "Client",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "construction",
      type: "string",
      title: "Construction",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "status",
      type: "string",
      title: "Status",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      ...richTextField,
      title: "Content",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "pageBuilder",
      type: "pageBuilder",
      title: "Page Builder",
      group: GROUP.MAIN_CONTENT,
    }),
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      media: "hero.image",
    },
    prepare: ({ title, media }) => {
      return {
        title,
        media,
      };
    },
  },
});
