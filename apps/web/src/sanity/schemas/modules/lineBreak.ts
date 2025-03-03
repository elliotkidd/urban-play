import { PiMinus as icon } from "react-icons/pi";
import { defineField } from "sanity";

export default defineField({
  title: "Line Break",
  name: "lineBreak",
  type: "object",
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
      title: "Title",
      name: "title",
      description: "Sanity Preview Only",
      type: "string",
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
      title: "title",
    },
    prepare({ title }) {
      return {
        title: `Line Break`,
        subtitle: title,
      };
    },
  },
});
