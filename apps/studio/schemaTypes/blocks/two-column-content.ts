import { Columns2 as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { sectionSettings } from "../common";

export const twoColumnContent = defineType({
  name: "twoColumnContent",
  title: "Two Column Content",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    defineField({
      name: "columnRatio",
      title: "Column Ratio",
      type: "string",
      options: {
        list: [
          { title: "25/75", value: "2575" },
          { title: "50/50", value: "5050" },
          { title: "75/25", value: "7525" },
        ],
        direction: "horizontal",
        layout: "radio",
      },
      group: GROUP.SETTINGS,
    }),
    defineField({
      title: "Left Column",
      name: "left",
      type: "contentBlock",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      title: "Right Column",
      name: "right",
      type: "contentBlock",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "alignCentre",
      title: "Align Centre",
      type: "boolean",
      group: GROUP.SETTINGS,
    }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      leftType: "left[0]._type",
      rightType: "right[0]._type",
      leftMedia: "left[0].source",
      rightMedia: "right[0].source",
    },
    prepare: ({ leftType, rightType, leftMedia, rightMedia }) => {
      return {
        title: "Two Column Content",
        subtitle: `${leftType ?? "Left: Unknown"} / ${rightType ?? "Right: Unknown"}`,
        media: leftMedia || rightMedia,
      };
    },
  },
});
