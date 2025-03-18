import { TextQuoteIcon as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import {
  annotationField,
  richTextField,
  sectionHeaderField,
  sectionSettings,
} from "../common";

export const paragraph = defineType({
  name: "paragraph",
  title: "Paragraph",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    sectionHeaderField,
    annotationField,
    defineField({
      ...richTextField,
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
      subtitle: "Paragraph Block",
    }),
  },
});
