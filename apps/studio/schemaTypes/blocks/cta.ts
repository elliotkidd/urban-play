import { PhoneIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import {
  buttonsField,
  colorPickerField,
  richTextField,
  sectionSettings,
} from "../common";
import { GROUP, SECTION_GROUPS } from "../../utils/constant";

export const cta = defineType({
  name: "cta",
  type: "object",
  icon: PhoneIcon,
  groups: SECTION_GROUPS,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The large text that is the primary focus of the block",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({ ...richTextField, group: GROUP.MAIN_CONTENT }),
    defineField({ ...buttonsField, group: GROUP.MAIN_CONTENT }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "CTA Block",
    }),
  },
});
