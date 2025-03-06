import { defineField, defineType } from "sanity";

export const solution = defineType({
  name: "solution",
  title: "Solution",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
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
