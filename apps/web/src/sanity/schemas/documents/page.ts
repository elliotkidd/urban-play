import { PiFile as icon } from "react-icons/pi";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon,
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "seo",
      title: "SEO",
    },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    // Title
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    // Slug
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "modules",
      title: "Modules",
      type: "modules",
      group: "content",
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "dontRender",
      title: "Do Not Render",
      type: "boolean",
      description:
        "Toggle if this document is used for rendering content within a singleton document such as the homepage or blog index, this will avoid it rendering a page in its own right",
      group: "settings",
    }),
  ],

  preview: {
    select: {
      seoImage: "seo.image",
      title: "title",
      slug: "slug",
    },
    prepare(selection) {
      const { seoImage, title, slug } = selection;

      return {
        media: seoImage,
        title,
        subtitle: `${slug.current}`,
      };
    },
  },
});
