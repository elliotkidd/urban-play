import { Award } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { sectionSettings } from "../common";

export const awardsAccordion = defineType({
  name: "awardsAccordion",
  type: "object",
  icon: Award,
  groups: SECTION_GROUPS,
  fields: [
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
      subtitle: "Awards Accordion",
    }),
  },
});
