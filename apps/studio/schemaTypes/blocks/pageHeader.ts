import { Crown } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import {
  colorPickerField,
  imageField,
  marginSettingsFields,
  richTextField,
} from "../common";
import { blocksToText } from "../../utils/blocksToText";

export const pageHeader = defineType({
  name: "pageHeader",
  title: "Page Header",
  icon: Crown,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
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
    colorPickerField,
    ...marginSettingsFields,
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "richText",
      media: "image",
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      media,
      subtitle: `Page Header - ${blocksToText(subtitle)}`,
    }),
  },
});
