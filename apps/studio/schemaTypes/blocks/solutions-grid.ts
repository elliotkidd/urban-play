import { Rows2 as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { sectionHeaderField, sectionSettings } from "../common";

export const solutionsGrid = defineType({
  name: "solutionsGrid",
  title: "Solutions Grid",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    sectionHeaderField,
    defineField({
      name: "solutions",
      title: "Solutions",
      type: "array",
      of: [{ type: "reference", to: [{ type: "solution" }] }],
      group: GROUP.MAIN_CONTENT,
    }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      title: "sectionHeader.title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Solutions Grid",
    }),
  },
});
