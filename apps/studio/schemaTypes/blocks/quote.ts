import { Quote as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { colorPickerField, sectionSettings } from "../common";

export const quote = defineType({
  name: "quote",
  title: "Quote",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    colorPickerField,
    defineField({
      title: "Quote",
      name: "quote",
      type: "text",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      title: "Quote Author",
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      group: GROUP.MAIN_CONTENT,
    }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      title: "quote",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Quote",
    }),
  },
});
