import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { seoFields } from "../../utils/seo-fields";
import { ogFields } from "../../utils/og-fields";
import { createSlug } from "../../utils/slug";
import { isUnique } from "../../utils/slug";

export const projectIndex = defineType({
  name: "projectIndex",
  title: "Project Index",
  type: "document",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "title",
        slugify: createSlug,
        isUnique: isUnique,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "header",
      title: "Header",
      type: "pageHeader",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "richText",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "pageBuilder",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "colorScheme",
      title: "Color Scheme",
      type: "reference",
      to: [{ type: "colorScheme" }],
      group: GROUP.SETTINGS,
    }),
    ...seoFields,
    ...ogFields,
  ],
});
