import { FaPalette } from "react-icons/fa";
import { StringRule, defineField, defineType } from "sanity";

import { ColorSchemeMedia } from "@/sanity/components/ColorScheme";

export default defineType({
  name: "colorScheme",
  title: "Color schemes",
  type: "document",
  __experimental_formPreviewTitle: false,
  icon: FaPalette,
  preview: {
    select: {
      title: "name",
      primary: "primary",
      contrast: "contrast",
    },
    prepare({ title, primary, contrast }: any) {
      return {
        title,
        subtitle: "Color scheme",
        media: ColorSchemeMedia({ primary, contrast }),
      };
    },
  },
  fields: [
    defineField({
      name: "name",
      title: "Scheme name",
      type: "string",
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: "primary",
      title: "Primary color",
      type: "colorPicker",
    }),
    defineField({
      name: "contrast",
      title: "Contrast color",
      type: "colorPicker",
    }),
    defineField({
      name: "accent",
      title: "Accent color",
      type: "colorPicker",
    }),
    defineField({
      name: "complimentary",
      title: "Complimentary color",
      type: "colorPicker",
    }),
  ],
});
