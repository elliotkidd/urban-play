import { defineField, defineType } from "sanity";
import { GROUP, GROUPS } from "../../utils/constant";

export const solution = defineType({
  name: "solution",
  title: "Solution",
  type: "document",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required(),
    }),
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
