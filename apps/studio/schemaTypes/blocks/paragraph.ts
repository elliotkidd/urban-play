import { TextQuoteIcon as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import {
  annotationField,
  colorPickerField,
  marginSettingsFields,
  richTextField,
  sectionHeaderField,
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
    colorPickerField,
    ...marginSettingsFields,
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
