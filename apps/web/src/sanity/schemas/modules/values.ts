import { PiTextAa as icon } from "react-icons/pi";
import { defineField } from "sanity";

export default defineField({
  title: "Values",
  name: "values",
  type: "object",
  // @ts-ignore
  icon,
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              title: "Image",
              name: "image",
              type: "imageWithAlt",
            }),
            defineField({
              title: "Heading",
              name: "heading",
              type: "string",
            }),
            defineField({
              title: "Text",
              name: "text",
              type: "text",
            }),
          ],
          preview: {
            select: {
              image: "image",
              heading: "heading",
              text: "text",
            },
            prepare({ heading, text, image }) {
              return {
                title: heading,
                subtitle: text,
                media: image,
              };
            },
          },
        },
      ],
      group: "content",
    }),
    defineField({
      title: "Settings",
      name: "settings",
      type: "moduleSettings",
      group: "settings",
    }),
  ],
  preview: {
    select: {
      values: "values",
    },
    prepare(selection) {
      const { values = [] } = selection;
      const headings = values
        .map((value: { heading: string }) => value.heading)
        .filter(Boolean);

      return {
        title: headings.join(", "),
        subtitle: `Values (${headings.length} values)`,
      };
    },
  },
});
