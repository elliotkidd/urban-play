import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { slugField } from "../common";

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
      name: "image",
      type: "image",
      title: "Image",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "solutions",
      type: "array",
      of: [{ type: "reference", to: [{ type: "solution" }] }],
      title: "Solutions",
      group: GROUP.MAIN_CONTENT,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare: ({ title, media }) => ({
      title,
      media,
    }),
  },
});
