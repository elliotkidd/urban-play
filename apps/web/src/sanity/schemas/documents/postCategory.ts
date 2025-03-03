import { PiTagSimple as icon } from "react-icons/pi";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "postCategory",
  title: "Post Category",
  type: "document",
  icon,
  groups: [
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "imageWithAlt",
      group: "content",
    }),
    defineField({
      name: "seo",
      title: "Seo",
      type: "seo",
      group: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
      slug: "slug",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, slug, media } = selection;
      return { media, title, subtitle: `/` + slug.current };
    },
  },
});
