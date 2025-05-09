import { defineArrayMember, defineField } from "sanity";
import {
  FormCheckboxFieldPreview,
  FormInputFieldPreview,
  FormRadioGroupFieldPreview,
  FormSelectFieldPreview,
  FormTextAreaFieldPreview,
} from "../components/FormFieldPreview";

const INPUT_TYPES: string[] = [
  "text",
  "email",
  "number",
  "tel",
  "url",
  "search",
  "password",
  "textarea",
  "select",
  "checkbox",
  "radio",
  "submit",
  "reset",
  "button",
  "image",
  "file",
  "color",
  "date",
  "time",
  "datetime-local",
  "month",
  "week",
];

const commonInputFields = [
  defineField({
    name: "label",
    title: "Label",
    type: "string",
  }),
  defineField({
    name: "name",
    title: "Name",
    type: "string",
  }),
  defineField({
    name: "columns",
    title: "Columns",
    type: "number",
    initialValue: 1,
    options: { list: [1, 2], layout: "radio", direction: "horizontal" },
  }),
];

const requiredField = defineField({
  name: "required",
  title: "Required",
  type: "boolean",
  initialValue: false,
});

const placeholderField = defineField({
  name: "placeholder",
  title: "Placeholder",
  type: "string",
});

const orientationField = defineField({
  name: "orientation",
  title: "Orientation",
  type: "string",
  initialValue: "vertical",
  options: {
    list: ["vertical", "horizontal"],
    layout: "radio",
    direction: "horizontal",
  },
});

const formFieldPreview = {
  title: "label",
  subtitle: "name",
  columns: "columns",
};

const valuePairsPreview = {
  ...formFieldPreview,
  options: "options",
};

const formInputField = defineArrayMember({
  name: "input",
  title: "Input",
  type: "object",
  components: {
    preview: FormInputFieldPreview,
  },
  fields: [
    ...commonInputFields,
    placeholderField,
    requiredField,
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      initialValue: "text",
      options: {
        list: INPUT_TYPES,
      },
    }),
  ],
  preview: {
    select: {
      ...formFieldPreview,
      type: "type",
    },
  },
});

const formTextAreaField = defineArrayMember({
  name: "textArea",
  title: "Text Area",
  type: "object",
  fields: [
    ...commonInputFields,
    placeholderField,
    requiredField,
    defineField({
      name: "rows",
      title: "Rows",
      type: "number",
    }),
  ],
  preview: {
    select: formFieldPreview,
  },
  components: {
    preview: FormTextAreaFieldPreview,
  },
});

const radioAndSelectFields = [
  ...commonInputFields,
  requiredField,
  defineField({
    name: "options",
    title: "Options",
    type: "array",
    of: [
      {
        type: "object",
        fields: [
          { name: "label", title: "Label", type: "string" },
          { name: "value", title: "Value", type: "string" },
        ],
      },
    ],
  }),
];

const formRadioGroupField = defineArrayMember({
  name: "radioGroup",
  title: "Radio Group",
  type: "object",
  components: {
    // @ts-ignore
    preview: FormRadioGroupFieldPreview,
  },
  preview: {
    select: valuePairsPreview,
  },
  fields: [...radioAndSelectFields, orientationField],
});

const checkboxGroupField = defineArrayMember({
  name: "checkboxGroup",
  title: "Checkbox Group",
  type: "object",
  components: {
    // @ts-ignore
    preview: FormCheckboxFieldPreview,
  },
  fields: [
    ...commonInputFields,
    orientationField,
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
            { name: "required", title: "Required", type: "boolean" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: valuePairsPreview,
  },
});

const formSelectField = defineArrayMember({
  name: "select",
  title: "Select",
  type: "object",
  fields: [...radioAndSelectFields],
  components: {
    //@ts-ignore
    preview: FormSelectFieldPreview,
  },
  preview: {
    select: valuePairsPreview,
  },
});

export const formField = defineField({
  name: "form",
  title: "Form",
  type: "array",
  of: [
    formInputField,
    formTextAreaField,
    formRadioGroupField,
    checkboxGroupField,
    formSelectField,
  ],
});
