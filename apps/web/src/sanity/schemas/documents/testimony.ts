import { PiUser as icon } from "react-icons/pi";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimony",
  title: "Testimony",
  type: "document",
  icon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
    }),
    defineField({
      name: "company",
      type: "string",
      title: "Company",
    }),
    defineField({
      name: "quote",
      type: "text",
      title: "Quote",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
  ],
  preview: {
    select: {
      media: "image",
      name: "name",
      company: "company",
    },
    prepare(selection) {
      const { media, name, company } = selection;

      return {
        media,
        title: name,
        subtitle: company,
      };
    },
  },
});
