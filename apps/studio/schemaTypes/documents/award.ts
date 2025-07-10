import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { Award as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const award = defineType({
  name: "award",
  title: "Award",
  type: "document",
  icon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "award" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "forText",
      title: "For",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      forText: "forText",
    },
    prepare({ title, year, forText }) {
      return {
        title: `${title}`,
        subtitle: `${year} - ${forText}`,
      };
    },
  },
});
