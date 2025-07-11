import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { seoFields } from "../../utils/seo-fields";
import { ogFields } from "../../utils/og-fields";
import { PathnameFieldComponent } from "../../components/slug-field-component";
import { createSlug, isUnique } from "../../utils/slug";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: GROUPS,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "project" }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL",
      description:
        "The web address where people can find your blog post (automatically created from title)",
      group: GROUP.MAIN_CONTENT,
      components: {
        field: PathnameFieldComponent,
      },
      options: {
        source: "title",
        slugify: createSlug,
        isUnique,
      },
      validation: (Rule) => [
        Rule.required().error("A URL slug is required"),
        Rule.custom((value, context) => {
          if (!value?.current) return true;
          if (!value.current.startsWith("/projects/")) {
            return 'URL slug must start with "/projects/"';
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "solutions",
      type: "array",
      of: [{ type: "reference", to: [{ type: "solution" }] }],
      title: "Solutions",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      title: "Short Description",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "pageBuilder",
      type: "pageBuilder",
      title: "Page Builder",
      group: GROUP.MAIN_CONTENT,
    }),
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      media: "seoImage",
      solutions: "solutions",
    },
    prepare: ({ title, media, solutions }) => {
      return {
        title,
        media,
        subtitle: solutions?.map((solution: any) => solution.title).join(", "),
      };
    },
  },
});
