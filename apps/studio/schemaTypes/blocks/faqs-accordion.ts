import { HelpCircle as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { colorPickerField, sectionSettings } from "../common";

export const faqsAccordion = defineType({
  name: "faqsAccordion",
  type: "object",
  icon,
  groups: SECTION_GROUPS,
  fields: [
    colorPickerField,
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The large text that is the primary focus of the block",
      validation: (Rule) => Rule.required(),
      group: GROUP.MAIN_CONTENT,
    }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title: title ?? "Untitled",
      subtitle: "FAQS Accordion",
    }),
  },
});
