import { PiArrowsOutLineVertical as icon } from "react-icons/pi";
import { defineField } from "sanity";

import blocksToText from "@/sanity/utils/blocksToText";

export default defineField({
  title: "Accordion",
  name: "accordion",
  type: "document",
  icon,
  groups: [
    { name: "content", title: "Content" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      title: "Rich Text",
      name: "richText",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      title: "Items",
      name: "items",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            {
              title: "Image",
              name: "image",
              type: "imageWithAlt",
            },
            {
              title: "Title",
              name: "title",
              type: "string",
            },
            {
              title: "Text",
              name: "text",
              type: "blockContent",
            },
          ],
          preview: {
            select: {
              media: "image",
              title: "title",
              text: "text",
            },
            prepare(selection) {
              const { media, title, text } = selection;
              return {
                media,
                title,
                subtitle: blocksToText(text),
              };
            },
          },
        },
      ],
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
      richText: "richText",
      items: "items",
    },
    prepare(selection) {
      const { richText, items = [] } = selection;
      const titles = items
        .map((item: { title: string }) => item.title)
        .filter(Boolean);

      return {
        title: blocksToText(richText),
        subtitle: `Accordion (${titles.length} steps)`,
      };
    },
  },
});
