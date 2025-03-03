import { defineField } from "sanity";

import blocksToText from "@/sanity/utils/blocksToText";

export default defineField({
  name: "form",
  title: "Form",
  type: "object",
  fields: [
    defineField({
      title: "Success Message",
      name: "successMessage",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "successMessage",
    },
    prepare({ title }) {
      return {
        title: blocksToText(title),
        subtitle: "Form",
      };
    },
  },
});
