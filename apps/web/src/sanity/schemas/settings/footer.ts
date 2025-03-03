import { defineField, defineType } from "sanity";

export default defineType({
  name: "settingsFooter",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "newsletter",
      title: "Newsletter",
      type: "blockContent",
    }),
    defineField({
      title: "Footer Menu",
      name: "footerMenu",
      type: "reference",
      to: [{ type: "navigation" }],
    }),
    defineField({
      title: "Legal Menu",
      name: "legalMenu",
      type: "reference",
      to: [{ type: "navigation" }],
    }),

    defineField({
      name: "colorScheme",
      title: "Color Scheme",
      type: "reference",
      to: [{ type: "colorScheme" }],
    }),
  ],
});
