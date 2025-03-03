import { LinkIcon as icon } from "@sanity/icons";
import { defineField } from "sanity";

export default defineField({
  name: "navItem",
  title: "Navigation Item",
  type: "object",
  // @ts-ignore
  icon,
  fields: [
    defineField({
      name: "navigationItemUrl",
      type: "link",
      title: "Navigation Item",
    }),
    defineField({
      name: "text",
      type: "string",
      title: "Navigation Text",
      description:
        "Defaults to the title of the linked document if internal link is selected.",
    }),
    defineField({
      name: "navigationItemChildren",
      type: "array",
      title: "Children",
      of: [{ type: "navItem" }],
    }),
  ],
  preview: {
    select: {
      title: "text",
      linkTitle: "navigationItemUrl.internalLink.title",
      linkType: "navigationItemUrl.linkType",
    },
    prepare(selection) {
      const { title, linkTitle, linkType } = selection;
      return {
        title: title ? title : linkTitle,
        subtitle: linkType == "internal" ? "Internal" : "External",
      };
    },
  },
});
