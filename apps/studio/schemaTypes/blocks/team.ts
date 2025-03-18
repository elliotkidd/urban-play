import { Users2 } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { sectionSettings } from "../common";

export const team = defineType({
  name: "team",
  type: "object",
  icon: Users2,
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
    defineField({
      name: "teamMembers",
      type: "array",
      title: "Team Members",
      group: GROUP.MAIN_CONTENT,
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "author" }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title: title ?? "Untitled",
      subtitle: "Team",
    }),
  },
});
