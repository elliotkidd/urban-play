import type { ComponentType, FC, HTMLProps } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

import { FormFieldProps, FormProps } from "@/lib/sanity/queries/form";
import { DefaultField, type FieldComponentProps } from "./DefaultField";

interface FormRendererProps extends HTMLProps<HTMLFormElement> {
  formData?: FormProps;
  register?: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>;
  getFieldError?: (fieldName: string) => string | undefined;
  fieldComponents?: Record<string, ComponentType<FieldComponentProps>>;
  isSubmitting?: boolean;
  children?: React.ReactNode;
}

export const FormRenderer: FC<FormRendererProps> = (props) => {
  const {
    id,
    formData,
    register,
    setValue,
    getFieldError,
    fieldComponents = {},
    children,
    isSubmitting,
    ...rest
  } = props;

  const renderField = (field: FormFieldProps) => {
    if (!field.name) return null;

    const CustomComponent = field.type
      ? fieldComponents[field.type]
      : undefined;
    const error = getFieldError?.(field.name);

    if (CustomComponent) {
      return <CustomComponent field={field} />;
    }

    return <DefaultField field={field} />;
  };

  return (
    <form {...rest} id={id}>
      {formData?.fields?.map((field) => (
        <div key={field._key} className="mb-4">
          {renderField(field)}
        </div>
      ))}
      {children}
    </form>
  );
};
