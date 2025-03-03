import { PiTextAa as icon } from "react-icons/pi";
import { defineField } from "sanity";

export default defineField({
  title: "Paragraph",
  name: "paragraph",
  type: "object",
  // @ts-ignore
  icon,
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({
      name: "index",
      title: "Index",
      type: "number",
      group: "content",
    }),
    defineField({
      title: "Lead Paragraph",
      name: "leadParagraph",
      type: "text",
      group: "content",
    }),
    defineField({
      title: "Text",
      name: "text",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      title: "Settings",
      name: "settings",
      type: "moduleSettings",
      group: "settings",
    }),
  ],
  preview: {
    select: {
      title: "leadParagraph",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        media,
        title,
        subtitle: `Paragraph`,
      };
    },
  },
});
