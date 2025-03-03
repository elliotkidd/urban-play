import { TextQuoteIcon } from "lucide-react";
import { defineType } from "sanity";

import { SECTION_GROUPS } from "../../utils/constant";
import { richTextField, sectionHeaderField } from "../common";

export const paragraph = defineType({
  name: "paragraph",
  title: "Paragraph",
  icon: TextQuoteIcon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [sectionHeaderField, richTextField],
  preview: {
    select: {
      title: "sectionHeader.title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Paragraph Section",
    }),
  },
});
