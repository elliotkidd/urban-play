import { blocksToText } from "../../utils/blocksToText";
import { defineArrayMember } from "sanity";
import { defineField } from "sanity";
import { Text, ListCollapse, SeparatorHorizontal } from "lucide-react";

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
      preview: {
        select: {
          title: "aspectRatio",
          media: "source",
        },
        prepare({ title, media }) {
          return {
            title: title.charAt(0).toUpperCase() + title.slice(1),
            subtitle: "Image",
            media,
          };
        },
      },
    }),
    defineArrayMember({
      type: "object",
      title: "Rich Text",
      name: "richTextBlock",
      icon: Text,
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
            title: "Rich Text",
            subtitle: blocksToText(title),
          };
        },
      },
    }),
    defineArrayMember({
      name: "accordion",
      type: "object",
      title: "Accordion",
      icon: ListCollapse,
      fields: [
        defineField({
          name: "title",
          type: "richText",
          title: "Title",
        }),
        defineField({
          name: "items",
          title: "Items",
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
        }),
      ],
      preview: {
        select: {
          title: "title",
          accordionItems: "items",
        },
        prepare({ title, accordionItems }) {
          return {
            title: blocksToText(title),
            subtitle: `Accordion - ${
              accordionItems.length > 0
                ? `${accordionItems.length} item${
                    accordionItems.length > 1 ? "s" : ""
                  }`
                : "No items"
            }`,
          };
        },
      },
    }),
    defineArrayMember({
      type: "object",
      title: "Text Between",
      name: "textBetweenBlock",
      icon: SeparatorHorizontal,
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
            title: blocksToText(title),
            subtitle: `Text Between - ${blocksToText(text)}`,
          };
        },
      },
    }),
    //defineArrayMember({ type: "mux.video", title: "Video", name: "video" }),
  ],
});
