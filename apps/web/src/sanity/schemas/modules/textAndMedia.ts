import { PiImage as icon } from "react-icons/pi";
import { defineField } from "sanity";

import blocksToText from "@/sanity/utils/blocksToText";

export default defineField({
  title: "Text & Media",
  name: "textAndMedia",
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
      title: "Image",
      name: "image",
      type: "imageWithAlt",
      group: "content",
    }),
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
      title: "Flip Order",
      name: "flipOrder",
      type: "boolean",
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
        subtitle: `Text & Image`,
      };
    },
  },
});
