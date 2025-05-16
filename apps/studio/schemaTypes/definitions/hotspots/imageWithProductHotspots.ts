import { ImageIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const imageWithProductHotspots = defineField({
  icon: ImageIcon,
  name: "imageWithProductHotspots",
  title: "Image with product hotspots",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      options: { hotspot: true },
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productHotspots",
      title: "Product hotspots",
      type: "productHotspots",
    }),
  ],
  preview: {
    select: {
      hotspots: "productHotspots",
      image: "image",
    },
    prepare(selection) {
      const { hotspots, image } = selection;
      return {
        media: image,
        title:
          hotspots.length > 0
            ? `${hotspots.length} hotspot${hotspots.length > 1 ? "s" : ""}`
            : undefined,
      };
    },
  },
});
