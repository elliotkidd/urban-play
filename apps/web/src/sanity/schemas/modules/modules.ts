import { defineArrayMember, defineField } from "sanity";

export default defineField({
  name: "modules",
  title: "Modules",
  type: "array",
  options: {
    insertMenu: {
      filter: true,
      showIcons: true,
      views: [
        {
          name: "grid",
          previewImageUrl: (schemaTypeName) =>
            `/public/images/sanity-preview/${schemaTypeName}.png`,
        },
        { name: "list" },
      ],
    },
  },
  of: [
    defineArrayMember({ type: "homeHero" }),
    defineArrayMember({ type: "paragraph" }),
    defineArrayMember({ type: "pageTitle" }),
    defineArrayMember({ type: "richTextModule" }),
    defineArrayMember({ type: "textAndMedia" }),
    defineArrayMember({ type: "latestPosts" }),
    defineArrayMember({ type: "callToAction" }),
    defineArrayMember({ type: "team" }),
    defineArrayMember({ type: "testimonials" }),
    defineArrayMember({ type: "contact" }),
    defineArrayMember({ type: "lineBreak" }),
    defineArrayMember({ type: "marqueeLogos" }),
    defineArrayMember({ type: "values" }),
    defineArrayMember({ type: "sectionHeader" }),
    defineArrayMember({ type: "verticalProcess" }),
    defineArrayMember({ type: "accordion" }),
  ],
});
