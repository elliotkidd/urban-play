import { PiArrowsVertical as icon } from "react-icons/pi";
import { defineField } from "sanity";

import blocksToText from "@/sanity/utils/blocksToText";

export default defineField({
  title: "Vertical Process",
  name: "verticalProcess",
  type: "document",
  icon,
  groups: [
    { name: "content", title: "Content" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      title: "Steps",
      name: "steps",
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
      steps: "steps",
    },
    prepare(selection) {
      const { steps = [] } = selection;
      const titles = steps
        .map((step: { title: string }) => step.title)
        .filter(Boolean);

      return {
        title: titles.join(" → "),
        subtitle: `Vertical Process (${titles.length} steps)`,
      };
    },
  },
});
