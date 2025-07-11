import { Cpu as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import {
  colorPickerField,
  sectionHeaderField,
  sectionSettings,
} from "../common";

export const process = defineType({
  name: "process",
  title: "Process",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    colorPickerField,
    sectionHeaderField,
    defineField({
      name: "steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "image", type: "image" }),
            defineField({ name: "heading", type: "string" }),
            defineField({ name: "description", type: "text" }),
          ],
        },
      ],
      description: "Add steps to the process",
      title: "Steps",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "showIndex",
      type: "boolean",
      title: "Show Index?",
      initialValue: false,
      group: GROUP.SETTINGS,
    }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      title: "sectionHeader.title",
      steps: "steps",
      media: "steps[0].image",
    },
    prepare: ({ title, steps, media }) => ({
      title: `Process${title ? `: ${title}` : ""}`,
      subtitle:
        steps && steps.length > 0 ? `${steps.length} steps` : "No steps",
      media,
    }),
  },
});
