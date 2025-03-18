import { MoveHorizontal as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { sectionSettings } from "../common";

export const imageMarquee = defineType({
  name: "imageMarquee",
  title: "Image Marquee",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image" }],
      description: "Add images to the marquee",
      title: "Images",
      group: GROUP.MAIN_CONTENT,
    }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      images: "images",
      media: "images[0]",
    },
    prepare: ({ images, media }) => ({
      title: "Image Marquee",
      subtitle: images.length > 0 ? `${images.length} images` : "No images",
      media,
    }),
  },
});
