import { defineField } from "sanity";

import blocksToText from "@/sanity/utils/blocksToText";

export default defineField({
  name: "richTextModule",
  title: "Rich Text Module",
  type: "object",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "richText",
      title: "Rich Text",
      group: "content",
      type: "blockContent",
    }),
    defineField({
      name: "centerText",
      title: "Center Text?",
      type: "boolean",
      group: "content",
    }),
    defineField({
      name: "settings",
      title: "Settings",
      type: "moduleSettings",
      group: "settings",
    }),
  ],
  preview: {
    select: {
      title: "richText",
    },
    prepare(selection) {
      return {
        title: blocksToText(selection.title),
        subtitle: "Rich Text Module",
      };
    },
  },
});
