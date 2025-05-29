import { TextQuoteIcon as icon } from "lucide-react";
import { defineField, defineType } from "sanity";
import { blocksToText } from "../../utils/blocksToText";
import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import {
  annotationField,
  buttonsField,
  richTextField,
  sectionSettings,
} from "../common";

export const paragraph = defineType({
  name: "paragraph",
  title: "Paragraph",
  icon,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    defineField({
      name: "topText",
      title: "Top Text",
      type: "richText",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      ...buttonsField,
      group: GROUP.MAIN_CONTENT,
    }),
    annotationField,
    defineField({
      ...richTextField,
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "largeSpacing",
      title: "Large Spacing",
      type: "boolean",
      initialValue: false,
      group: GROUP.SETTINGS,
    }),
    defineField({
      name: "annotationDirection",
      title: "Annotation Direction",
      type: "string",
      initialValue: "vertical",
      options: {
        list: [
          { title: "Vertical", value: "vertical" },
          { title: "Horizontal", value: "horizontal" },
        ],
      },
      group: GROUP.SETTINGS,
    }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      title: "topText",
      subtitle: "richText",
    },
    prepare: ({ title, subtitle }) => ({
      title: blocksToText(title),
      subtitle: `Paragraph Section - ${blocksToText(subtitle)}`,
    }),
  },
});
