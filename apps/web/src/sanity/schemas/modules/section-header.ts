import { defineField, defineType } from "sanity";

export default defineType({
  name: "sectionHeader",
  title: "Section Header",
  type: "object",
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
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "leftText",
      title: "Left Text",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "rightText",
      title: "Right Text",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "settings",
      title: "Settings",
      type: "moduleSettings",
      group: "settings",
    }),
  ],
});
