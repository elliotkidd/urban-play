import { Video } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { colorPickerField, sectionSettings } from "../common";

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
      title: "Video",
      group: GROUP.MAIN_CONTENT,
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
