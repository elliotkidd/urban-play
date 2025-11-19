import { Minus as icon } from "lucide-react";
import { defineType } from "sanity";

import { SECTION_GROUPS } from "../../utils/constant";
import { colorPickerField, hideOnFields, sectionSettings } from "../common";

export const divider = defineType({
  name: "divider",
  type: "object",
  icon,
  groups: SECTION_GROUPS,
  fields: [...sectionSettings, colorPickerField, ...hideOnFields],
  preview: {
    prepare: () => ({
      title: "Divider",
    }),
  },
});
