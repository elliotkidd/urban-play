import { PiArticle as icon } from "react-icons/pi";
import { defineArrayMember, defineField } from "sanity";

import blocksToText from "@/sanity/utils/blocksToText";

export default defineField({
  title: "Latest Posts",
  name: "latestPosts",
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
      title: "Rich Text",
      name: "richText",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      title: "Buttons",
      name: "buttons",
      type: "buttonGroup",
      group: "content",
    }),
    defineField({
      name: "posts",
      title: "Posts",
      type: "array",
      of: [
        defineArrayMember({
          name: "post",
          title: "Post",
          type: "reference",
          to: [{ type: "post" }],
        }),
      ],
      group: "content",
      description:
        "Select the posts you want to display or leave blank to display the latest posts.",
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
      title: "richText",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        media,
        title: blocksToText(title),
        subtitle: `Latest Posts`,
      };
    },
  },
});
