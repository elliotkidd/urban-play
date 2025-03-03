import { defineField } from "sanity";

export default defineField({
  title: "Image w/ Alt Text",
  name: "imageWithAlt",
  type: "image",
  options: {
    hotspot: true,
    aiAssist: {
      imageDescriptionField: "alt",
    },
  },
  fields: [
    defineField({
      title: "Alt Text",
      name: "alt",
      type: "string",
      description: "Important for SEO & accessibility",
    }),
  ],
});
