import { BookImage } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import {
  colorPickerField,
  marginSettingsFields,
  richTextField,
} from "../common";

export const imageBanner = defineType({
  name: "imageBanner",
  title: "Image Banner",
  icon: BookImage,
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
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "containImage",
      title: "Contain Image?",
      type: "boolean",
      group: GROUP.SETTINGS,
    }),
    colorPickerField,
    ...marginSettingsFields,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Image Banner",
    }),
  },
});
