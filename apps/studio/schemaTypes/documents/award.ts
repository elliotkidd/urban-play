import { Award as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "award",
  title: "Award",
  type: "document",
  icon,
  fields: [
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
      name: "awardType",
      title: "Award Type",
      type: "string",
    }),
  ],
});
