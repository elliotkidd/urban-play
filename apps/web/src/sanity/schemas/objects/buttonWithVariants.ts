import { HiCursorClick as icon } from "react-icons/hi";
import { defineField } from "sanity";

export default defineField({
  name: "buttonWithVariants",
  title: "Button",
  type: "object",
  icon,
  fields: [
    defineField({
      name: "text",
      type: "string",
      title: "Text",
    }),
    defineField({
      name: "link",
      type: "link",
      title: "Link",
    }),
    defineField({
      title: "Variant",
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Solid", value: "solid" },
          { title: "Outline", value: "outline" },
          { title: "Inline", value: "inline" },
          { title: "Accent", value: "accent" },
          { title: "Underline", value: "underline" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "solid",
    }),
    defineField({
      title: "Width",
      name: "width",
      type: "string",
      options: {
        list: [
          { title: "Auto", value: "auto" },
          { title: "Full", value: "full" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "auto",
    }),
  ],
});
