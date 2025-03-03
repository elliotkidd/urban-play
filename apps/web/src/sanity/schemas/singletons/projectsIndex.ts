import { PiSquaresFourDuotone as icon } from "react-icons/pi";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectsIndex",
  title: "Projects Index",
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
      title: "Rich Text",
      name: "richText",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      title: "Buttons",
      name: "buttons",
      type: "buttonGroup",
      group: "content",
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
        subtitle: `Projects Index`,
      };
    },
  },
});
