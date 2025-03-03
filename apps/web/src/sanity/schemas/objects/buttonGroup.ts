import { LinkIcon as icon } from "@sanity/icons";
import { defineField } from "sanity";

export default defineField({
  name: "buttonGroup",
  title: "Button Group",
  type: "array",
  icon,
  of: [
    defineField({
      name: "button",
      title: "Button",
      type: "buttonWithVariants",
    }),
  ],
});
