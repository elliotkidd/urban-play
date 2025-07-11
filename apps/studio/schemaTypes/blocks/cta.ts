import { PhoneIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import {
  buttonsField,
  colorPickerField,
  imageField,
  richTextField,
  sectionSettings,
} from "../common";
import { GROUP, SECTION_GROUPS } from "../../utils/constant";

export const cta = defineType({
  name: "cta",
  type: "object",
  icon: PhoneIcon,
  groups: SECTION_GROUPS,
  fields: [
    colorPickerField,
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The large text that is the primary focus of the block",
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
    defineField({ ...richTextField, group: GROUP.MAIN_CONTENT }),
    defineField({ ...buttonsField, group: GROUP.MAIN_CONTENT }),
    ...sectionSettings,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "CTA Block",
    }),
  },
});
