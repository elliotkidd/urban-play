import { PiCastleTurret as icon } from "react-icons/pi";
import { defineField } from "sanity";

import blocksToText from "@/sanity/utils/blocksToText";

export default defineField({
  title: "Home Hero",
  name: "homeHero",
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
      name: "bgImage",
      title: "Background Image",
      type: "imageWithAlt",
      group: "content",
    }),
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
      title: "Settings",
      name: "settings",
      type: "moduleSettings",
      group: "settings",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      richText: "richText",
      media: "bgImage",
    },
    prepare(selection) {
      const { title, richText, media } = selection;
      return {
        media,
        title: title || blocksToText(richText),
        subtitle: `Home Hero`,
      };
    },
  },
});
