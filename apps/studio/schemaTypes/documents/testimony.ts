import { Quote } from "lucide-react";
import { defineField, defineType } from "sanity";

export const testimony = defineType({
  name: "testimony",
  type: "document",
  icon: Quote,
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text" }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
  ],
  preview: {
    select: {
      title: "author.name",
      subtitle: "quote",
    },
    prepare: ({ title, subtitle }) => ({
      title: title ?? "Untitled",
      subtitle,
    }),
  },
});
