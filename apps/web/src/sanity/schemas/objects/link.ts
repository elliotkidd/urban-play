import { LinkIcon, MenuIcon } from "@sanity/icons";
import { defineField } from "sanity";

import { PAGE_REFERENCES } from "@/sanity/constants";

export const internalLinkObject = {
  type: "object",
  name: "internalLink",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "to",
      title: "To",
      type: "reference",
      to: PAGE_REFERENCES,
    }),
    defineField({
      name: "anchor",
      description: "The ID of the element to scroll to, without the #.",
      type: "string",
    }),
  ],
};

export const externalLinkObject = {
  type: "object",
  name: "externalLink",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "link",
      type: "string",
    }),
    defineField({
      name: "openInNewTab",
      type: "boolean",
    }),
  ],
};

export default defineField({
  name: "link",
  type: "object",
  title: "Link",
  // @ts-ignore
  icon: MenuIcon,
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      title: "Select the type of link",
      description:
        "External links go to other websites using the format `https://www.google.com`. Internal links are restricted to other pages in the SANITY database.",
      name: "linkType",
      type: "string",
      options: {
        list: [
          { title: "External", value: "external" },
          { title: "Internal", value: "internal" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'name',
    //   type: 'string',
    //   title: 'Name',
    //   validation: (Rule) => Rule.required(),
    // }),
    //@ts-ignore
    defineField({
      ...internalLinkObject,
      hidden: ({ parent }) => parent?.linkType !== "internal", // hidden if link type is not internal
    }),
    //@ts-ignore
    defineField({
      ...externalLinkObject,
      hidden: ({ parent }) => parent?.linkType !== "external",
    }),
  ],
  preview: {
    select: {
      linkType: "linkType",
      title: "name",
      href: "externalLink.link",
    },
    prepare: ({ linkType, title, href }) => ({
      title,
      subtitle: linkType === "external" ? href : "Internal Link",
    }),
  },
});
