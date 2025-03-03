import { PiSquaresFourDuotone as icon } from "react-icons/pi";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "postsIndex",
  title: "Posts",
  type: "document",
  // @ts-ignore
  icon,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    // Title
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "richText",
      title: "Rich Text",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      title: "Modules",
      name: "modules",
      type: "modules",
      group: "content",
    }),
    defineField({
      name: "colorScheme",
      title: "Color Scheme",
      type: "reference",
      to: [{ type: "colorScheme" }],
    }),
    // SEO
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;

      return {
        title,
        subtitle: `Blog Index`,
      };
    },
  },
});
