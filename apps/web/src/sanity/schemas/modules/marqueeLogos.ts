import { PiSlideshow as icon } from "react-icons/pi";
import { defineField } from "sanity";

export default defineField({
  name: "marqueeLogos",
  title: "Marquee Logos",
  type: "document",
  //@ts-ignore
  icon,
  groups: [
    { title: "Content", name: "content", default: true },
    { title: "Settings", name: "settings" },
  ],
  fields: [
    defineField({
      name: "settings",
      title: "Settings",
      type: "moduleSettings",
      group: "settings",
    }),

    defineField({
      name: "items",
      title: "Items",
      type: "array",
      group: "content",
      of: [
        {
          name: "logo",
          title: "Logo",
          type: "imageWithAlt",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare({ title, items }) {
      return {
        title: `${items.length} Logos`,
        subtitle: "Marquee Logos",
      };
    },
  },
});
