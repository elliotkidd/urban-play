import { InferType } from "groqd";

import { TypeFromSelection } from "groqd";

import { q } from "groqd";
import { RICHTEXT_BLOCKS } from "./richText";

// const FORM_COMMON_FRAGMENT = {
//   _key: q.string(),
//   label: q.string(),
//   placeholder: q.string(),
//   required: q.boolean(),
//   columns: q.number(),
//   name: q.string(),
// };

// const INPUT_FRAGMENT = {
//   ...FORM_COMMON_FRAGMENT,
//   _type: q.literal("input"),
// };

// export type InputProps = TypeFromSelection<typeof INPUT_FRAGMENT>;

// const TEXT_AREA_FRAGMENT = {
//   ...FORM_COMMON_FRAGMENT,
//   _type: q.literal("textArea"),
//   rows: q.number(),
// };

// export type TextAreaProps = TypeFromSelection<typeof TEXT_AREA_FRAGMENT>;

// const RADIO_GROUP_FRAGMENT = {
//   ...FORM_COMMON_FRAGMENT,
//   _type: q.literal("radioGroup"),
//   orientation: q.literal("vertical").or(q.literal("horizontal")),
//   options: q("options[]", { isArray: true }).grab({
//     label: q.string(),
//     value: q.string(),
//   }),
// };

// export type RadioGroupProps = TypeFromSelection<typeof RADIO_GROUP_FRAGMENT>;

// const VALUE_PAIR_FRAGMENT = {
//   label: q.string(),
//   value: q.string(),
// };

// const CHECKBOX_FRAGMENT = {
//   ...VALUE_PAIR_FRAGMENT,
//   required: q.boolean(),
// };

// export type CheckboxProps = TypeFromSelection<typeof CHECKBOX_FRAGMENT>;

// const CHECKBOX_GROUP_FRAGMENT = {
//   ...FORM_COMMON_FRAGMENT,
//   _type: q.literal("checkboxGroup"),
//   orientation: q.literal("vertical").or(q.literal("horizontal")),
//   options: q("options[]", { isArray: true }).grab(CHECKBOX_FRAGMENT),
// };

// export type CheckboxGroupProps = TypeFromSelection<
//   typeof CHECKBOX_GROUP_FRAGMENT
// >;

// const SELECT_FRAGMENT = {
//   ...FORM_COMMON_FRAGMENT,
//   _type: q.literal("select"),
//   options: q("options[]", { isArray: true }).grab(VALUE_PAIR_FRAGMENT),
// };

// export type SelectProps = TypeFromSelection<typeof SELECT_FRAGMENT>;

// export const FORM_SELECTION = {
//   "_type == 'input'": INPUT_FRAGMENT,
//   "_type == 'textArea'": TEXT_AREA_FRAGMENT,
//   "_type == 'radioGroup'": RADIO_GROUP_FRAGMENT,
//   "_type == 'checkboxGroup'": CHECKBOX_GROUP_FRAGMENT,
//   "_type == 'select'": SELECT_FRAGMENT,
//   default: { ...FORM_COMMON_FRAGMENT, _type: q.string() },
// };

export const FORM_FIELD_FRAGMENT = {
  _type: q.literal("formField"),
  label: q.string(),
  name: q.string(),
  type: q.string(),
  required: q.boolean(),
  columns: q.number().min(1).max(2),

  choices: q("choices[]", { isArray: true }).grab({
    label: q.string(),
    value: q.string(),
  }),
  options: q("options").grab({
    placeholder: q.string(),
    defaultValue: q.string(),
  }),
  richText: q("richText[]", { isArray: true }).select(RICHTEXT_BLOCKS),
  fileOptions: q("fileOptions").grab({
    accept: q.string(),
    maxSize: q.number(),
  }),
};

export type FormFieldProps = TypeFromSelection<typeof FORM_FIELD_FRAGMENT>;

export const FORM_FRAGMENT = q("form")
  .deref()
  .grab({
    title: q.string(),
    id: q("id").grabOne("current", q.string()),
    fields: q("fields[]", { isArray: true }).grab({
      _key: q.string(),
      ...FORM_FIELD_FRAGMENT,
    }),
    recipients: q("*")
      .filterByType("settings")
      .grabOne("formEmailRecipients[]")
      .grab({
        email: q.string(),
        name: q.string(),
      }),
    successAction: q("successAction").grab({
      type: q.literal("redirect").or(q.literal("message")),
      redirectUrl: q.string(),
      message: q("message[]", { isArray: true }).select(RICHTEXT_BLOCKS),
    }),
    submitButtonText: q("submitButton").grabOne("text", q.string()),
    message: q("message", { isArray: true }).select(RICHTEXT_BLOCKS),
  });

export type FormProps = InferType<typeof FORM_FRAGMENT>;
