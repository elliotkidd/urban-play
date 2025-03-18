import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { seoFields } from "../../utils/seo-fields";
import { ogFields } from "../../utils/og-fields";

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
      name: "hero",
      title: "Hero",
      type: "hero",
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
