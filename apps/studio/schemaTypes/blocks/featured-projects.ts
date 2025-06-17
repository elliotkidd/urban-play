import { Hammer as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { sectionHeaderField, sectionSettings } from "../common";

export const featuredProjects = defineType({
  name: "featuredProjects",
  title: "Featured Projects",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    sectionHeaderField,
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      group: GROUP.MAIN_CONTENT,
      of: [{ type: "reference", to: [{ type: "project" }] }],
      validation: (Rule) => Rule.min(3).max(6),
    }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      title: "sectionHeader.title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Featured Projects",
    }),
  },
});
