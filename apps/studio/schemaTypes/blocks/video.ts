import { Video } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import {
  colorPickerField,
  imageField,
  sectionHeaderField,
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
    sectionHeaderField,

    defineField({
      ...vimeoField,
    }),
    defineField({
      type: "url",
      name: "videoURL",
      title: "Youtube/Vimeo URL",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
          allowRelative: false,
        }).custom((value) => {
          if (!value) return true; // Allow empty values

          const vimeoPageRegex =
            /^(https?:\/\/)?(www\.)?(vimeo\.com\/)(\d{1,10})(\/[a-zA-Z0-9\-_]+)?(\?.*)?$/;
          const youtubeRegex =
            /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)(&.*)?$/;

          return (
            vimeoPageRegex.test(value as string) ||
            youtubeRegex.test(value as string) ||
            "Please enter a valid Vimeo or Youtube page URL"
          );
        }),
    }),
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
