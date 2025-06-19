import { Instagram as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { sectionHeaderField, sectionSettings } from "../common";

export const socialMedia = defineType({
  name: "socialMedia",
  title: "Social Media",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    sectionHeaderField,
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      group: GROUP.MAIN_CONTENT,
      of: [{ type: "image" }],
    }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      title: "sectionHeader.title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Social Media",
    }),
  },
});
