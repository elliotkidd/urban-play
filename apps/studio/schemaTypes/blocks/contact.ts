import { defineField, defineType } from "sanity";
import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { sectionSettings } from "../common";
import { Mail as icon } from "lucide-react";
import { formField } from "../form";

export const contact = defineType({
  name: "contact",
  title: "Contact",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({ ...formField, group: GROUP.MAIN_CONTENT }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Contact",
    }),
  },
});
