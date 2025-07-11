import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import {
  colorPickerField,
  imageField,
  marginSettingsFields,
  richTextField,
} from "../common";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  icon: Star,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    colorPickerField,
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      ...richTextField,
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "mediaType",
      type: "string",
      title: "Media Type",
      group: GROUP.MAIN_CONTENT,
      initialValue: "image",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
    }),
    defineField({
      ...imageField,
      hidden: ({ parent }) => parent?.mediaType !== "image",
    }),
    defineField({
      name: "video",
      type: "file",
      title: "Video",
      group: GROUP.MAIN_CONTENT,
      hidden: ({ parent }) => parent?.mediaType !== "video",
      options: {
        accept: "video/*",
      },
    }),
    ...marginSettingsFields,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Hero Block",
    }),
  },
});
