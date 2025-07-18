import { Video } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import {
  colorPickerField,
  imageField,
  sectionSettings,
  vimeoField,
} from "../common";

export const video = defineType({
  name: "video",
  title: "Video",
  icon: Video,
  type: "object",
  groups: SECTION_GROUPS,
  fields: [
    colorPickerField,
    defineField({
      name: "video",
      type: "file",
      options: {
        accept: "video/*",
      },
      deprecated: {
        reason: "Please use vimeo URL instead",
      },
      title: "Video",
      group: GROUP.MAIN_CONTENT,
    }),
    vimeoField,
    defineField({
      ...imageField,
      title: "Cover Image",
    }),
    defineField({
      name: "contain",
      title: "Contain?",
      type: "boolean",
      group: GROUP.SETTINGS,
    }),
    ...sectionSettings,
  ],
  preview: {
    prepare: () => ({
      title: "Video",
    }),
  },
});
