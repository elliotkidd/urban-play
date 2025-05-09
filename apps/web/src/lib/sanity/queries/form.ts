import { InferType } from "groqd";

import { TypeFromSelection } from "groqd";

import { q } from "groqd";

const FORM_COMMON_FRAGMENT = {
  _key: q.string(),
  label: q.string(),
  placeholder: q.string(),
  required: q.boolean(),
  columns: q.number(),
  name: q.string(),
};

const INPUT_FRAGMENT = {
  ...FORM_COMMON_FRAGMENT,
  _type: q.literal("input"),
};

export type InputProps = TypeFromSelection<typeof INPUT_FRAGMENT>;

const TEXT_AREA_FRAGMENT = {
  ...FORM_COMMON_FRAGMENT,
  _type: q.literal("textArea"),
  rows: q.number(),
};

export type TextAreaProps = TypeFromSelection<typeof TEXT_AREA_FRAGMENT>;

const RADIO_GROUP_FRAGMENT = {
  ...FORM_COMMON_FRAGMENT,
  _type: q.literal("radioGroup"),
  orientation: q.literal("vertical").or(q.literal("horizontal")),
  options: q("options[]", { isArray: true }).grab({
    label: q.string(),
    value: q.string(),
  }),
};

export type RadioGroupProps = TypeFromSelection<typeof RADIO_GROUP_FRAGMENT>;

const VALUE_PAIR_FRAGMENT = {
  label: q.string(),
  value: q.string(),
};

const CHECKBOX_FRAGMENT = {
  ...VALUE_PAIR_FRAGMENT,
  required: q.boolean(),
};

export type CheckboxProps = TypeFromSelection<typeof CHECKBOX_FRAGMENT>;

const CHECKBOX_GROUP_FRAGMENT = {
  ...FORM_COMMON_FRAGMENT,
  _type: q.literal("checkboxGroup"),
  orientation: q.literal("vertical").or(q.literal("horizontal")),
  options: q("options[]", { isArray: true }).grab(CHECKBOX_FRAGMENT),
};

export type CheckboxGroupProps = TypeFromSelection<
  typeof CHECKBOX_GROUP_FRAGMENT
>;

const SELECT_FRAGMENT = {
  ...FORM_COMMON_FRAGMENT,
  _type: q.literal("select"),
  options: q("options[]", { isArray: true }).grab(VALUE_PAIR_FRAGMENT),
};

export type SelectProps = TypeFromSelection<typeof SELECT_FRAGMENT>;

export const FORM_SELECTION = {
  "_type == 'input'": INPUT_FRAGMENT,
  "_type == 'textArea'": TEXT_AREA_FRAGMENT,
  "_type == 'radioGroup'": RADIO_GROUP_FRAGMENT,
  "_type == 'checkboxGroup'": CHECKBOX_GROUP_FRAGMENT,
  "_type == 'select'": SELECT_FRAGMENT,
  default: { ...FORM_COMMON_FRAGMENT, _type: q.string() },
};

export const FORM_FRAGMENT = q("form[]", { isArray: true }).select(
  FORM_SELECTION,
);

export type FormProps = InferType<typeof FORM_FRAGMENT>;
