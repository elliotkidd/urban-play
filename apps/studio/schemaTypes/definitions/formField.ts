import { FormInput as icon } from "lucide-react";
import { defineField, defineType } from "sanity";

interface ValidationContextDocument {
  fields?: Array<{
    name: string;
    type?: string;
  }>;
}
// Validation options by field type
export const validationTypesByFieldType = {
  checkbox: ["minSelectedCount", "maxSelectedCount", "custom"],
  color: ["custom"],
  date: ["minDate", "maxDate", "custom"],
  "datetime-local": ["minDate", "maxDate", "custom"],
  email: ["pattern", "custom"],
  file: ["maxSize", "fileType", "custom"],
  hidden: ["custom"],
  number: ["min", "max", "custom"],
  // password: ['minLength', 'pattern', 'custom'],
  radio: ["custom"],
  range: ["min", "max", "step", "custom"],
  select: ["custom"],
  signature: ["custom"],
  tel: ["pattern", "custom"],
  text: ["minLength", "maxLength", "pattern", "custom"],
  textarea: ["minLength", "maxLength", "custom"],
  time: ["custom"],
  url: ["pattern", "custom"],
  name: ["custom"],
  address: ["custom"],
  richText: ["custom"],
};
export const formFieldType = defineType({
  name: "formField",
  title: "Form Field",
  type: "object",
  icon,
  fields: [
    defineField({
      name: "type",
      title: "Field Type",
      type: "string",
      options: {
        list: Object.keys(validationTypesByFieldType).map((type) => {
          const title = (fieldType: string) => {
            switch (fieldType) {
              case "datetime-local":
                return "Date & Time";
              case "textarea":
                return "Text Area";
              case "tel":
                return "Phone Number";
              default:
                return fieldType.charAt(0).toUpperCase() + fieldType.slice(1);
            }
          };
          return { title: title(type), value: type };
        }),
      },
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.min(1).max(2),
    }),
    defineField({
      name: "label",
      title: "Field Label",
      type: "string",
    }),
    defineField({
      name: "name",
      title: "Field Name",
      type: "string",
      description:
        "Must start with a letter and contain only letters, numbers, underscores, or hyphens. Must be unique within the form.",
      validation: (Rule) =>
        Rule.required().custom((name, context) => {
          if (!name) {
            return "Required";
          }
          // Check format (HTML ID/name rules)
          if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name)) {
            return "Field name must start with a letter and contain only letters, numbers, underscores, or hyphens";
          }

          // Check uniqueness across all fields
          const doc = context.document as ValidationContextDocument;
          const allFieldNames = doc?.fields?.map((field) => field.name) || [];

          // Count occurrences of this name
          const nameCount = allFieldNames.filter((n) => n === name).length;

          // If we find more than one occurrence (including current field), it's not unique
          if (nameCount > 1) {
            return "Field names must be unique within the form";
          }

          // Check for reserved names
          const reservedNames = [
            "action",
            "method",
            "enctype",
            "target",
            "accept-charset",
            "autocomplete",
            "novalidate",
            "reset",
          ];
          if (reservedNames.includes(name.toLowerCase())) {
            return "This name is reserved for HTML form attributes. Please choose a different name.";
          }

          return true;
        }),
    }),
    defineField({
      name: "required",
      title: "Required",
      type: "boolean",
      initialValue: false,
    }),
    // defineField({
    //   name: 'validation',
    //   title: 'Validation Rules',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'object',
    //       fields: [
    //         defineField({
    //           name: 'type',
    //           title: 'Validation Type',
    //           type: 'string',

    //           hidden: ({parent}) => !parent?.type,
    //           options: {
    //             // TODO: I think this needs to be a custom input component?
    //             // list: ({parent}) => (parent?.type ? validationTypesByFieldType[parent.type] : []),
    //             list: [],
    //           },
    //         }),
    //         defineField({
    //           name: 'value',
    //           title: 'Value',
    //           type: 'string',
    //         }),
    //         defineField({
    //           name: 'message',
    //           title: 'Error Message',
    //           type: 'string',
    //         }),
    //       ],
    //     },
    //   ],
    // }),
    defineField({
      name: "choices",
      title: "Choices",
      type: "array",
      hidden: ({ parent }) => {
        return !["select", "radio", "checkbox"].includes(parent?.type);
      },
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "options",
      title: "Field Options",
      type: "object",
      hidden: ({ parent }) => {
        return ["select", "radio", "checkbox", "signature"].includes(
          parent?.type,
        );
      },
      fields: [
        defineField({
          name: "placeholder",
          title: "Placeholder",
          type: "string",
        }),
        defineField({
          name: "defaultValue",
          title: "Default Value",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "fileOptions",
      title: "File Options",
      type: "object",
      hidden: ({ parent }) => parent?.type !== "file",
      fields: [
        defineField({
          name: "accept",
          title: "Accepted File Types",
          type: "string",
          description:
            "Comma-separated list of file types (e.g., '.pdf,.doc,.docx' or 'image/*')",
        }),
        defineField({
          name: "maxSize",
          title: "Maximum File Size (MB)",
          type: "number",
          validation: (Rule) => Rule.min(0),
        }),
      ],
    }),
    defineField({
      name: "richText",
      title: "Rich Text Content",
      type: "richText",
      hidden: ({ parent }) => parent?.type !== "richText",
    }),
  ],
  preview: {
    select: {
      label: "label",
      name: "name",
      type: "type",
    },
    prepare({ label, name, type }) {
      return {
        title: label || name,
        subtitle: type,
      };
    },
  },
});
