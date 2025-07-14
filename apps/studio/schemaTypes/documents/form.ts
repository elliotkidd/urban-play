import { FormInput as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const form = defineType({
  name: "form",
  title: "Form",
  type: "document",
  icon,
  fields: [
    defineField({
      name: "title",
      title: "Form Title",
      type: "string",
      description: "Internal title for the form",
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: "id",
      title: "Form ID",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fields",
      title: "Form Fields",
      type: "array",
      of: [{ type: "formField" }],
    }),
    defineField({
      name: "submitButton",
      title: "Submit Button",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Button Text",
          type: "string",
          initialValue: "Submit",
        }),
      ],
    }),
    defineField({
      name: "successAction",
      title: "On Success Action",
      type: "object",
      description:
        "What should happen after the form is successfully submitted?",
      fields: [
        defineField({
          name: "type",
          title: "Action Type",
          type: "string",
          options: {
            list: [
              { title: "Show Message", value: "message" },
              { title: "Redirect to Page", value: "redirect" },
            ],
          },
          initialValue: "message",
        }),
        defineField({
          name: "message",
          title: "Success Message",
          type: "richText",
          description: "Message to display when the form is submitted",
          hidden: ({ parent }) => parent?.type !== "message",
        }),
        defineField({
          name: "redirectUrl",
          title: "Redirect URL",
          type: "url",
          description: "URL to redirect to after form submission",
          hidden: ({ parent }) => parent?.type !== "redirect",
        }),
      ],
    }),
    defineField({
      name: "responseEmail",
      title: "Response Email",
      type: "object",
      fields: [
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          description: "Name of email field to send the response to",
        }),
        defineField({
          name: "subject",
          title: "Subject",
          type: "string",
          description: "Subject of the response email",
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          description: "Body of the response email (HTML supported)",
          rows: 10,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Form",
      };
    },
  },
});
