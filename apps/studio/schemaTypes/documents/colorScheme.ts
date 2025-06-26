import { PaletteIcon as icon } from "lucide-react";
import { type StringRule, defineField, defineType } from "sanity";

import { ColorSchemeMedia } from "../../components/ColorScheme";

export const colorScheme = defineType({
  name: "colorScheme",
  title: "Color schemes",
  type: "document",
  __experimental_formPreviewTitle: false,
  icon,
  preview: {
    select: {
      title: "name",
      background: "background",
      text: "text",
      primaryButton: "primaryButton",
      secondaryButton: "secondaryButton",
    },
    prepare({ title, background, text, primaryButton, secondaryButton }: any) {
      return {
        title,
        subtitle: "Color scheme",
        media: ColorSchemeMedia({
          background,
          text,
          primaryButton,
          secondaryButton,
        }),
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
      name: "background",
      title: "Background color",
      type: "colorPicker",
    }),
    defineField({
      name: "text",
      title: "Text color",
      type: "colorPicker",
    }),
    defineField({
      name: "primaryButton",
      title: "Primary button color",
      type: "colorPicker",
    }),
    defineField({
      name: "secondaryButton",
      title: "Secondary button color",
      type: "colorPicker",
    }),
    defineField({
      name: "navBarBackground",
      title: "Navbar background color",
      type: "colorPicker",
    }),
    defineField({
      name: "navBarText",
      title: "Navbar text color",
      type: "colorPicker",
    }),
  ],
});
