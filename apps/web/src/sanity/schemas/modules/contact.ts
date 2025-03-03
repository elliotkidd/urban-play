import { PiTextbox as icon } from "react-icons/pi";
import { defineField } from "sanity";

import blocksToText from "@/sanity/utils/blocksToText";

export default defineField({
  title: "Contact",
  name: "contact",
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
      title: "Blocks",
      name: "blocks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              type: "string",
              name: "heading",
              title: "Heading",
            }),
            defineField({
              type: "imageWithAlt",
              name: "image",
              title: "Image",
            }),
            defineField({
              type: "link",
              name: "link",
              title: "Link",
            }),
          ],
        },
      ],
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
      blocks: "blocks",
    },
    prepare(selection) {
      const { blocks } = selection;
      return {
        media: blocks[0].image,
        title: `Contact`,
        subtitle: `Contact ${blocks.length} Blocks`,
      };
    },
  },
});
