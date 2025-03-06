import { defineField, defineType } from "sanity";

import { createRadioListLayout, isValidUrl } from "../../utils/helper";

const allLinkableTypes = [
  { type: "blog" },
  { type: "blogIndex" },
  { type: "page" },
];

export const customUrl = defineType({
  name: "customUrl",
  type: "object",
  fields: [
    defineField({
      name: "linkType",
      type: "string",
      options: createRadioListLayout(["internal", "external"]),
      initialValue: () => "external",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      description: "If checked, the link will open in a new tab.",
      initialValue: () => false,
    }),
    defineField({
      name: "external",
      type: "string",
      title: "URL",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (Rule) => [
        Rule.custom((value, { parent }) => {
          const type = (parent as { linkType?: string })?.linkType;
          if (type === "external") {
            if (!value) return "Url can't be empty";
            const isValid = isValidUrl(value);
            if (!isValid) return "Invalid URL";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "href",
      type: "string",
      initialValue: () => "#",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "internal",
      type: "reference",
      options: { disableNew: true },
      hidden: ({ parent }) => parent?.linkType !== "internal",
      to: allLinkableTypes,
      validation: (rule) => [
        rule.custom((value, { parent }) => {
          const linkType = (parent as { linkType?: string })?.linkType;
          if (linkType === "internal" && !value?._ref)
            return "internal can't be empty";
          return true;
        }),
      ],
    }),
  ],
  preview: {
    select: {
      externalUrl: "external",
      linkType: "linkType",
      internalUrl: "internal.slug.current",
      openInNewTab: "openInNewTab",
    },
    prepare({ externalUrl, linkType, internalUrl, openInNewTab }) {
      const url = linkType === "external" ? externalUrl : `/${internalUrl}`;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: `${linkType === "external" ? "External" : "Internal"} Link`,
        subtitle: `${truncatedUrl}${newTabIndicator}`,
      };
    },
  },
});
