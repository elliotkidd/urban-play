import { Quote as icon } from "lucide-react";
import { defineType } from "sanity";

import { SECTION_GROUPS } from "../../utils/constant";
import { sectionHeaderField, sectionSettings } from "../common";

export const testimonies = defineType({
  name: "testimonies",
  title: "Testimonies",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [sectionHeaderField, ...sectionSettings],
  preview: {
    select: {
      title: "sectionHeader.title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Testimonies",
    }),
  },
});
