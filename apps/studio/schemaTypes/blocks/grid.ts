import { Grid2X2 as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { sectionHeaderField, sectionSettings } from "../common";

export const grid = defineType({
  name: "grid",
  title: "Grid",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    sectionHeaderField,
    defineField({
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "heading", type: "string" }),
            defineField({ name: "description", type: "text" }),
          ],
        },
      ],
      title: "Items",
      group: GROUP.MAIN_CONTENT,
    }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      title: "sectionHeader.title",
      items: "items",
    },
    prepare: ({ title, items }) => ({
      title: `Grid ${title ? `- ${title}` : ""}`,
      subtitle:
        items && items.length > 0 ? `${items.length} items` : "No items",
    }),
  },
});
