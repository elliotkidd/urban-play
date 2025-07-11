import { ImageIcon, ImagesIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, SECTION_GROUPS } from "../../utils/constant";
import { colorPickerField, marginSettingsFields } from "../common";

const imageLinkCard = defineField({
  name: "imageLinkCard",
  type: "object",
  icon: ImageIcon,
  groups: SECTION_GROUPS,
  fields: [
    colorPickerField,
    defineField({
      name: "title",
      title: "Card Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Card Image",
      type: "image",
      description: "Add an image or illustration for this card",
    }),
    defineField({
      name: "url",
      title: "Link URL",
      type: "customUrl",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare: ({
      title,
      media,
      externalUrl,
      urlType,
      internalUrl,
      openInNewTab,
    }) => {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: title || "Untitled Card",
        subtitle: url ? ` • ${truncatedUrl}${newTabIndicator}` : "",
        media,
      };
    },
  },
});

export const imageLinkCards = defineType({
  name: "imageLinkCards",
  type: "object",
  icon: ImagesIcon,
  title: "Image Link Cards",
  groups: SECTION_GROUPS,
  fields: [
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [imageLinkCard],
      group: GROUP.MAIN_CONTENT,
    }),
    colorPickerField,
    ...marginSettingsFields,
  ],
  preview: {
    select: {
      title: "title",
      cards: "cards",
    },
    prepare: ({ title, cards = [] }) => ({
      title: title || "Image Link Cards",
      subtitle: `${cards.length} card${cards.length === 1 ? "" : "s"}`,
    }),
  },
});
