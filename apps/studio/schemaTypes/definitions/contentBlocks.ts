import { defineArrayMember } from "sanity";
import { defineField } from "sanity";

export const contentBlock = defineField({
  name: "contentBlock",
  title: "Content Block",
  type: "array",
  validation: (rule) => rule.min(1).max(1),
  of: [
    defineArrayMember({
      type: "object",
      title: "Image",
      name: "imageBlock",
      fields: [
        defineField({
          name: "source",
          title: "Source",
          type: "image",
        }),
        defineField({
          name: "aspectRatio",
          title: "Aspect Ratio",
          type: "string",
          options: {
            list: [
              { title: "Video", value: "video" },
              { title: "Square", value: "square" },
              { title: "Landscape", value: "landscape" },
              { title: "Portrait", value: "portrait" },
            ],
          },
          initialValue: "portrait",
        }),
      ],
    }),
    defineArrayMember({
      type: "object",
      title: "Rich Text",
      name: "richTextBlock",
      fields: [
        defineField({
          name: "richText",
          title: "Rich Text",
          type: "richText",
        }),
      ],
      preview: {
        select: {
          title: "richText",
        },
        prepare({ title }) {
          return {
            title: "Rich Text Block",
          };
        },
      },
    }),
    defineArrayMember({
      name: "accordion",
      type: "object",
      title: "Accordion",
      fields: [
        defineField({
          name: "title",
          type: "richText",
          title: "Title",
        }),
        defineField({
          name: "items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "heading",
                  type: "string",
                  title: "Heading",
                }),
                defineField({
                  name: "content",
                  type: "richText",
                  title: "Content",
                }),
              ],
            }),
          ],
          title: "Items",
        }),
      ],
      preview: {
        select: {
          title: "title",
          accordionItems: "items",
        },
        prepare({ title, accordionItems }) {
          return {
            title: title ?? "Untitled",
            subtitle: accordionItems.length > 0 ? "Accordion" : "No items",
          };
        },
      },
    }),
    defineArrayMember({
      type: "object",
      title: "Text Between",
      name: "textBetweenBlock",
      fields: [
        defineField({
          name: "title",
          type: "richText",
          title: "Title",
        }),
        defineField({
          name: "text",
          type: "richText",
          title: "Text",
        }),
      ],
      preview: {
        select: {
          title: "title",
          text: "text",
        },
        prepare({ title, text }) {
          return {
            title: title ?? "Untitled",
            subtitle: text ?? "No text",
          };
        },
      },
    }),
    //defineArrayMember({ type: "mux.video", title: "Video", name: "video" }),
  ],
});
