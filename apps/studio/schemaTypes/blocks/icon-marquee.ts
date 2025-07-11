import { MoveHorizontal as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import {
  colorPickerField,
  sectionHeaderField,
  sectionSettings,
} from "../common";

export const iconMarquee = defineType({
  name: "iconMarquee",
  title: "Icon Marquee",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    colorPickerField,
    sectionHeaderField,
    defineField({
      name: "icons",
      type: "array",
      of: [{ type: "image" }],
      description: "Add icons (.svg, .png) to the marquee",
      title: "Icons",
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
      subtitle: "Icon Marquee",
    }),
  },
});
