import { PiAlignRight as icon } from "react-icons/pi";
import { defineField } from "sanity";

export default defineField({
  title: "Module Settings",
  name: "moduleSettings",
  type: "object",
  icon,
  fields: [
    defineField({
      name: "uid",
      type: "uid",
    }),
    defineField({
      title: "Color Scheme",
      name: "colorScheme",
      type: "reference",
      to: [{ type: "colorScheme" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paddingTop",
      title: "Remove Padding Top",
      type: "boolean",
    }),
    defineField({
      name: "paddingBottom",
      title: "Remove Padding Bottom?",
      type: "boolean",
    }),
    defineField({
      name: "hidden",
      title: "Hidden?",
      type: "boolean",
    }),
  ],
});
