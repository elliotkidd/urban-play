import { CogIcon as icon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "settingsHeader",
  title: "Header",
  type: "document",
  // @ts-ignore
  icon,
  fields: [
    defineField({
      title: "Desktop Menu",
      name: "desktopMenu",
      type: "reference",
      to: [{ type: "navigation" }],
    }),
    defineField({
      title: "Mobile Menu",
      name: "mobileMenu",
      type: "reference",
      to: [{ type: "navigation" }],
    }),
    defineField({
      title: "Buttons",
      name: "buttons",
      type: "buttonGroup",
    }),
  ],
});
