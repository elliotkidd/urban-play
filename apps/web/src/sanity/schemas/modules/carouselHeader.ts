import { PiSlideshow as icon } from "react-icons/pi";
import { defineField } from "sanity";

import blocksToText from "@/sanity/utils/blocksToText";

export default defineField({
  title: "Carousel Header",
  name: "carouselHeader",
  type: "object",
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
      title: "Images",
      name: "images",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      group: "content",
    }),
    defineField({
      title: "Lead Text",
      name: "leadText",
      type: "text",
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
      title: "leadText",
      media: "images[0]",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        media,
        title,
        subtitle: `Carousel Header`,
      };
    },
  },
});
