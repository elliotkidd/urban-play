import type { PreviewProps } from "sanity";
import {
  Card,
  Stack,
  Text,
  TextInput,
  TextArea,
  Select,
  Radio,
  Flex,
  Checkbox,
} from "@sanity/ui";
import { log } from "node:console";

type FormPreviewProps = PreviewProps & {
  _type?: string;
  columns?: number;
  value?: {
    options?: { label: string; value: string }[];
  };
};

export function FormFieldWrapper(props: FormPreviewProps) {
  const { _type, title, subtitle, children } = props;
  return (
    <Card padding={3} radius={2} shadow={1}>
      <Stack space={3}>
        <Text weight="semibold" size={1}>
          {String(title || "Untitled")}
        </Text>
        {children}
        <Text size={0} muted>
          {String(subtitle || "")} {_type && `(${_type})`}
        </Text>
      </Stack>
    </Card>
  );
}

export function FormRadioGroupFieldPreview(
  props: FormPreviewProps & {
    options: { label: string; value: string }[];
  },
) {
  const { options } = props;
  return (
    <FormFieldWrapper {...props}>
      <Flex gap={4}>
        {options?.map((option: { label: string; value: string }, i: number) => {
          const { label, value } = option;
          return (
            <Flex align="center" gap={2} key={`i-${value}`}>
              <Radio readOnly checked={i === 0} />
              <Text>{label}</Text>
            </Flex>
          );
        })}
      </Flex>
    </FormFieldWrapper>
  );
}

export function FormInputFieldPreview(
  props: FormPreviewProps & { type?: string },
) {
  const { title, type } = props;

  return (
    <FormFieldWrapper {...props}>
      <TextInput
        disabled
        placeholder={String(title || "Input")}
        type={type as any}
        style={{ opacity: 0.7 }}
      />
    </FormFieldWrapper>
  );
}

export function FormTextAreaFieldPreview(
  props: FormPreviewProps & { rows?: number },
) {
  const { title, rows } = props;

  return (
    <FormFieldWrapper {...props}>
      <TextArea
        disabled
        rows={rows || 3}
        placeholder={String(title || "Text Area")}
        style={{ opacity: 0.7 }}
      />
    </FormFieldWrapper>
  );
}

export function FormCheckboxFieldPreview(
  props: FormPreviewProps & { options: { label: string; value: string }[] },
) {
  const { options } = props;
  return (
    <FormFieldWrapper {...props}>
      <Flex gap={4}>
        {options?.map((option: { label: string; value: string }, i: number) => {
          const { label, value } = option;
          return (
            <Flex align="center" gap={2} key={`i-${value}`}>
              <Checkbox
                readOnly
                checked={i % 3 === 0}
                indeterminate={i % 3 === 1}
              />
              <Text>{label}</Text>
            </Flex>
          );
        })}
      </Flex>
    </FormFieldWrapper>
  );
}

export function FormSelectFieldPreview(
  props: FormPreviewProps & { options: { label: string; value: string }[] },
) {
  const { options } = props;
  return (
    <FormFieldWrapper {...props}>
      <Select disabled>
        {options &&
          Array.isArray(options) &&
          options.map((option: { label: string; value: string }, i: number) => {
            const { label, value } = option;
            return <option key={`i-${value}`}>{label}</option>;
          })}
      </Select>
    </FormFieldWrapper>
  );
}
