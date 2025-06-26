import type { FC, LegacyRef } from "react";
import React from "react";
import {
  useFormContext,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import SignatureCanvas from "react-signature-canvas";

import { IconCaret } from "./Icon";
import { RichText } from "./richtext";
import { FormFieldProps } from "@/lib/sanity/queries/form";
import { cn } from "@/lib/utils";
import SanitySelectFormField from "./ui/inputs/SanitySelectFormField";
import { SanityTextAreaFormField } from "./ui/inputs/SanityTextAreaFormField";
import { SanityInput } from "./ui/inputs/SanityInput";

const FOCUS_INPUT_CLASSES = [
  "focus:bg-theme-blue",
  "focus:bg-theme-green",
  "focus:bg-theme-yellow",
  "focus:bg-theme-red",
];

const DIRTY_INPUT_CLASSES = [
  "bg-theme-blue",
  "bg-theme-green",
  "bg-theme-yellow",
  "bg-theme-red",
];

export type ValidationRule = {
  type: string;
  value: string;
  message: string;
};

export interface FieldState {
  value?: string | number | readonly string[];
  onChange: (value: unknown) => void;
  onBlur?: () => void;
  ref?: unknown;
}

export interface FieldComponentProps {
  field: FormFieldProps;
  getFieldError?: (fieldName: string) => string | undefined;
  index: number;
}

interface FieldOptions {
  placeholder?: string;
  defaultValue?: string;
  richText?: any;
}

interface FileOptions {
  accept?: string;
  maxSize?: number;
}

export const DefaultField: FC<FieldComponentProps> = ({
  field,
  getFieldError,
  index,
}) => {
  const {
    type,
    label,
    name,
    columns,
    required,
    options = {
      placeholder: "",
      defaultValue: "",
      richText: null,
    } as FieldOptions,
    fileOptions = {} as FileOptions,
    choices = [],
    richText,
  } = field;
  if (!type || !name) return null;

  const {
    register,
    setValue,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const { ref, ...rest } = register(name, {
    required: field.required ? "This field is required" : false,
  });

  const renderInput = () => {
    const baseInputClasses =
      "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    const errorClasses = errors[name] ? "border-red-500" : "border-gray-300";

    if (richText) {
      return (
        <div className="prose prose-sm prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-base prose-h6:text-sm max-w-none">
          <RichText richText={richText} />
        </div>
      );
    }

    switch (type) {
      case "textarea":
        return (
          <SanityTextAreaFormField
            {...field}
            className={cn(
              dirtyFields[name] &&
                DIRTY_INPUT_CLASSES[index % DIRTY_INPUT_CLASSES.length],
              FOCUS_INPUT_CLASSES[index % FOCUS_INPUT_CLASSES.length],
              errorClasses,
            )}
          />
        );

      case "select":
        return (
          <SanitySelectFormField
            {...field}
            className={cn(
              dirtyFields[name] &&
                DIRTY_INPUT_CLASSES[index % DIRTY_INPUT_CLASSES.length],
              FOCUS_INPUT_CLASSES[index % FOCUS_INPUT_CLASSES.length],
              errorClasses,
            )}
          />
        );

      case "radio":
        return (
          <div className="space-y-2">
            {choices?.map((choice, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...rest}
                  ref={ref as LegacyRef<HTMLInputElement>}
                  value={choice.value ?? ""}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span>{choice.label}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {choices?.map((choice, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...rest}
                  ref={ref as LegacyRef<HTMLInputElement>}
                  value={choice.value ?? ""}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span>{choice.label}</span>
              </label>
            ))}
          </div>
        );

      // case "name":
      //   return (
      //     <div className="grid gap-2 sm:grid-cols-2">
      //       <div>
      //         <input
      //           type="text"
      //           {...register(`${name}.firstName`, {
      //             required: field.required ? "First name is required" : false,
      //           })}
      //           placeholder="First Name"
      //           className={`${baseInputClasses} ${getFieldError?.(`${name}.firstName`) ? "border-red-500" : "border-gray-300"}`}
      //         />
      //         <label
      //           htmlFor={`${name}.firstName`}
      //           className="text-xs opacity-60"
      //         >
      //           First Name
      //         </label>
      //         {getFieldError?.(`${name}.firstName`) && (
      //           <p className="mt-1 text-sm text-red-500">
      //             {getFieldError(`${name}.firstName`)}
      //           </p>
      //         )}
      //       </div>
      //       <div>
      //         <input
      //           type="text"
      //           {...register(`${name}.lastName`, {
      //             required: field.required ? "Last name is required" : false,
      //           })}
      //           placeholder="Last Name"
      //           className={`${baseInputClasses} ${getFieldError?.(`${name}.lastName`) ? "border-red-500" : "border-gray-300"}`}
      //         />
      //         <label
      //           htmlFor={`${name}.lastName`}
      //           className="text-xs opacity-60"
      //         >
      //           Last Name
      //         </label>
      //         {getFieldError?.(`${name}.lastName`) && (
      //           <p className="mt-1 text-sm text-red-500">
      //             {getFieldError(`${name}.lastName`)}
      //           </p>
      //         )}
      //       </div>
      //     </div>
      //   );

      // case "tel":
      //   const { ref: phoneRef, ...phoneRest } = register(name, {
      //     required: field.required ? "This field is required" : false,
      //     pattern: {
      //       value: /^(\+1)?[2-9]\d{2}[2-9]\d{2}\d{4}$/,
      //       message: "Please enter a valid US phone number (10 digits)",
      //     },
      //   });
      //   return (
      //     <div className="relative">
      //       <PhoneInput
      //         country="US"
      //         international={false}
      //         onChange={(value) => {
      //           if (value) {
      //             phoneRest.onChange({
      //               target: {
      //                 value,
      //                 name: phoneRest.name,
      //               },
      //             });
      //           }
      //         }}
      //         className={`${baseInputClasses} ${errorClasses} !w-full`}
      //         placeholder={options?.placeholder ?? "(XXX) XXX-XXXX"}
      //       />
      //       {/* {error && <p className="mt-1 text-sm text-red-500">{error}</p>} */}
      //     </div>
      //   );

      case "file":
        return (
          <input
            type="file"
            ref={ref as LegacyRef<HTMLInputElement>}
            {...rest}
            className={`${baseInputClasses} ${errorClasses} file:bg-accent file:text-primary hover:file:bg-accent/60 file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold`}
            accept={fileOptions?.accept ?? undefined}
          />
        );

      default:
        return (
          <SanityInput
            {...field}
            className={cn(
              dirtyFields[name] &&
                DIRTY_INPUT_CLASSES[index % DIRTY_INPUT_CLASSES.length],
              FOCUS_INPUT_CLASSES[index % FOCUS_INPUT_CLASSES.length],
              errorClasses,
            )}
          />
        );
    }
  };

  return (
    <div className={cn(columns === 2 && "lg:col-span-2")}>{renderInput()}</div>
  );
};
