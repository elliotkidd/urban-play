import { defineField, defineType } from "sanity";
import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { colorPickerField, sectionSettings } from "../common";
import { Mail as icon } from "lucide-react";

export const contact = defineType({
  name: "contact",
  title: "Contact",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    colorPickerField,
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "form",
      title: "Form",
      type: "reference",
      to: [{ type: "form" }],
      group: GROUP.MAIN_CONTENT,
    }),
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
