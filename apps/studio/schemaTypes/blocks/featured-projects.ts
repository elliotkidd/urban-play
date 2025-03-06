import { Hammer as icon } from "lucide-react";
import { defineType } from "sanity";

import { SECTION_GROUPS } from "../../utils/constant";
import {
  colorPickerField,
  marginSettingsFields,
  sectionHeaderField,
} from "../common";

export const featuredProjects = defineType({
  name: "featuredProjects",
  title: "Featured Projects",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [sectionHeaderField, colorPickerField, ...marginSettingsFields],
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
