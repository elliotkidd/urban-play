import { PiMegaphone as icon } from "react-icons/pi";
import { defineField } from "sanity";

import blocksToText from "@/sanity/utils/blocksToText";

export default defineField({
  title: "Call To Action",
  name: "callToAction",
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
      title: "Heading",
      name: "heading",
      type: "string",
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
      title: "Settings",
      name: "settings",
      type: "moduleSettings",
      group: "settings",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      richText: "richText",
      media: "image",
    },
    prepare(selection) {
      const { heading, richText, media } = selection;
      return {
        media,
        title: heading ? heading : blocksToText(richText),
        subtitle: `Call To Action`,
      };
    },
  },
});
