import { PiArrowElbowRight as icon } from "react-icons/pi";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  icon,
  fields: [
    defineField({
      name: "source",
      title: "From",
      type: "string",
      validation: (Rule) => Rule.required().error("A source is required"),
    }),
    defineField({
      name: "destination",
      title: "To",
      type: "string",
      validation: (Rule) => Rule.required().error("A destination is required"),
    }),
    defineField({
      name: "permanent",
      title: "Permanent",
      type: "boolean",
      initialValue: () => true,
    }),
  ],
  preview: {
    select: {
      to: "destination",
      from: "source",
      permanent: "permanent",
    },
    prepare({ from, to, permanent }) {
      return {
        title: from && to ? `${from} → ${to}` : " ",
        subtitle: permanent ? "Permanent" : "",
      };
    },
  },
});
