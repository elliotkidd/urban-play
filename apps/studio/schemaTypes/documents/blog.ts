import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";
import { PathnameFieldComponent } from "../../components/slug-field-component";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export const blog = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  groups: GROUPS,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "blog" }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "text",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => [
        rule
          .min(140)
          .warning(
            "The meta description should be at least 140 characters for optimal SEO visibility in search results",
          ),
        rule
          .max(160)
          .warning(
            "The meta description should not exceed 160 characters as it will be truncated in search results",
          ),
      ],
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
          if (!value.current.startsWith("/blog/")) {
            return 'URL slug must start with "/blog/"';
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
      title: "Published At",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "solutions",
      type: "array",
      of: [{ type: "reference", to: [{ type: "solution" }] }],
      title: "Solutions",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "richText",
      type: "richText",
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
      media: "image",
      isPrivate: "seoNoIndex",
      slug: "slug.current",
    },
    prepare: ({ title, media, slug, isPrivate }) => ({
      title,
      media,
      subtitle: `${isPrivate ? "Private" : "Public"}:- ${slug}`,
    }),
  },
});
