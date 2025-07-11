import { defineField, defineType } from "sanity";
import { GROUP, GROUPS } from "../../utils/constant";
import { colorPickerField, sectionSettings } from "../common";
import { List as icon } from "lucide-react";

const partnersRollover = defineType({
  name: "partnersRollover",
  title: "Partners Rollover",
  type: "object",
  icon,
  groups: GROUPS,
  fields: [
    colorPickerField,
    ...sectionSettings,
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [{ type: "reference", to: [{ type: "page" }] }],
      group: GROUP.MAIN_CONTENT,
    }),
  ],
  preview: {
    select: {
      partners: "partners",
    },
    prepare: ({ partners }) => ({
      title: "Partners Menu",
      subtitle: `${partners.length} partners`,
    }),
  },
});

export default partnersRollover;
