import { Newspaper as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { sectionHeaderField, sectionSettings } from "../common";

export const featuredPosts = defineType({
  name: "featuredPosts",
  title: "Featured Posts",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    sectionHeaderField,
    defineField({
      name: "posts",
      title: "Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blog" }] }],
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
      subtitle: "Featured Post",
    }),
  },
});
