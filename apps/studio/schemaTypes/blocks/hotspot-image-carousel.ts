import { InspectionPanel as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import {
  colorPickerField,
  sectionHeaderField,
  sectionSettings,
} from "../common";

export const hotspotImageCarousel = defineType({
  name: "hotspotImageCarousel",
  title: "Hotspot Image Carousel",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    colorPickerField,
    sectionHeaderField,
    defineField({
      name: "images",
      type: "array",
      of: [
        {
          type: "imageWithProductHotspots",
        },
      ],
      description: "Add images to the marquee",
      title: "Images",
      group: GROUP.MAIN_CONTENT,
    }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      images: "images",
      media: "images[0].image",
    },
    prepare: ({ images, media }) => ({
      title: "Hotspot Image Carousel",
      subtitle: images.length > 0 ? `${images.length} images` : "No images",
      media,
    }),
  },
});
