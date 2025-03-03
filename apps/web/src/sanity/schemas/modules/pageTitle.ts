import { PiTextAa as icon } from "react-icons/pi";
import { defineField } from "sanity";

import blocksToText from "@/sanity/utils/blocksToText";

export default defineField({
  title: "Page Title",
  name: "pageTitle",
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
    defineField({
      title: "Settings",
      name: "settings",
      type: "moduleSettings",
      group: "settings",
    }),
  ],
  preview: {
    select: {
      title: "richText",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        media,
        title: blocksToText(title),
        subtitle: `Page Title`,
      };
    },
  },
});
