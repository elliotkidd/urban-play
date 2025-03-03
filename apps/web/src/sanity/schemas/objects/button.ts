import { HiCursorClick as icon } from "react-icons/hi";
import { defineField } from "sanity";

export default defineField({
  name: "button",
  title: "Button",
  type: "object",
  icon,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({
      name: "text",
      type: "string",
      title: "Text",
      group: "content",
    }),
    defineField({
      name: "link",
      type: "link",
      title: "Link",
      group: "content",
    }),
  ],
});
