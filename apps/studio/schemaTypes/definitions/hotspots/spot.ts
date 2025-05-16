import { defineField } from "sanity";

export const spot = defineField({
  name: "spot",
  title: "Spot",
  type: "object",
  fieldsets: [{ name: "position", options: { columns: 2 } }],
  fields: [
    defineField({
      name: "solution",
      title: "Solution",
      type: "reference",
      to: [{ type: "solution" }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "x",
      type: "number",
      readOnly: true,
      fieldset: "position",
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: "y",
      type: "number",
      readOnly: true,
      fieldset: "position",
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
  ],
  preview: {
    select: {
      description: "description",
      title: "solution.title",
      x: "x",
      y: "y",
    },
    prepare(selection) {
      const { description, title, x, y } = selection;
      return {
        title,
        subtitle: description ? `${description}` : undefined,
      };
    },
  },
});
